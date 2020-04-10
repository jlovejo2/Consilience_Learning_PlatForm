import React, { useState, useEffect } from 'react';

import API from '../utils/API';
// import RootContext from '../utils/RootContext';

import { Input, Button, MenuItem, Select, Grid, Box, ListItem, Paper, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import './pageStyle/search.css';
    


const Search = () => {

    const [ userID, setUserID ] = useState('');
    const [ userType, setUserType] = useState('');
    const [classSearchObj, setClassSearchObj] = useState({});
    const [apiClasses, setApiClasses] = useState([]);

    useEffect(() => {

        getAndVerifyUserInfo()
        console.log(apiClasses);

    }, [apiClasses])


    async function getAndVerifyUserInfo() {
        try {
            await API.readAndVerifyCookie()
            .then((resp) => {
                console.log("cookie call resp: ", resp)
                console.log("dropping the load: ", resp.data.payload)
                setUserType(resp.data.payload.type)
                setUserID(resp.data.payload._id)
                console.log(userType)
                console.log(userID)
                }
            )
        }
        catch (error) {
            console.log(error)
        }
    }


    //This function is called when the user his the request to join button
    //it sends the user's info back to the database and adds them to the class
    function handleJoinClass(event) {
        const requestInfo = event.currentTarget.value
        const userInfo = {}
        userInfo.id = userID
        
        API.requestToJoinClass(requestInfo, userInfo)
            .then( resp => {
                console.log(resp)
            })
            .catch( err => console.log(err))
    }

    //This function what the user is typing and what they select in the select dropdown
    //Sets those to the classSearchObj state
    function handleSearchChange(event) {
        console.log(event.target.name);
        console.log(event.target.value);

        const { name, value } = event.target;
        
        setClassSearchObj({ ...classSearchObj, [name]: value })
        console.log(classSearchObj);
    };

    function handleSearchSubmit() {
        console.log(classSearchObj.selectValue);
        console.log(classSearchObj.inputValue);

        if (!classSearchObj.selectValue || !classSearchObj.inputValue) {
            console.log('search criteria undefined');
        } else {

            API.searchClasses(classSearchObj.selectValue, classSearchObj.inputValue)
                .then(respObj => {
                    setApiClasses(respObj.data);
                    console.log(apiClasses);
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Container className= 'parent'>
            <Grid xs ={12} justifyContent='center' className= 'child'>
                <Paper>
                <Box px={1}>
                    <Grid 
                    container 
                    spacing={2} 
                    alignItems='center' 
                    container className= 'content'
                    >
                    <Grid item xs={3} className = 'dropdown'>
                        <Select className = 'searchbox'
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            variant='outlined'
                            name={'selectValue'}
                            // value={age}
                            onChange={handleSearchChange}
                        >
                            <MenuItem value={'all'}>All Classes</MenuItem>
                            <MenuItem value={'courseTitle'}>Title</MenuItem>
                            <MenuItem value={'courseDescription'}>Description</MenuItem>
                            <MenuItem value={'subject'}>Subject</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6} className = 'searchbar'>
                        <Box py={2}>
                            <Input
                                color='primary'
                                placeholder='search for classes here'
                                fullWidth
                                disableUnderline
                                name={'inputValue'}
                                onChange={handleSearchChange} />
                        </Box>
                    </Grid>
                        <Grid item xs={2} alignContent='center' className = 'searchbutton'>
                            <Button
                                size='large'
                                variant='contained'
                                color='primary'
                                onClick={handleSearchSubmit}>
                                <SearchIcon/>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                </Paper>
            </Grid>
            <Box m={3}>
                <Paper>
                    <Grid item xs={12} justifyContent='center'>
                        <Box m={2} p={2}>
                            <ul>
                            {
                        apiClasses.length > 0 ? apiClasses.map((item, index) => {
                            return (
                               <ListItem key={index} className = 'addicon'>
                                   <Grid item xs={3}>
                                        <h3>{item.courseTitle}</h3>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            color='primary'
                                            value={item.id}
                                            onClick={handleJoinClass}
                                            >
                                                <AddIcon/>
                                                Request to Join
                                        </Button>
                                   </Grid>
                                   <Grid item xs={6} className='description'>
                                   {item.courseDescription}
                                   </Grid>
                                   <Grid item xs={3}>
                                   Course subject: <p/> <h6>{item.courseDiscipline}</h6>
                                    </Grid>
                                    
                               </ListItem>
                            )
                        })
                            : <p>No classes Found</p>
                    }
                            </ul>
                        </Box>

                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
}


export default Search;