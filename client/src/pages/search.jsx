import React, { useState, useEffect } from 'react';

import API from '../utils/API';

import { Input, Button, MenuItem, Select, Grid, Box, Paper } from '@material-ui/core';
import Container from '../components/Container/Container.jsx';



const Search = () => {

    const [classSearchObj, setClassSearchObj] = useState({})

    const [apiClasses, setApiClasses] = useState([]);
    // const [activateModal, setActivateModal] = useState(false);

    useEffect(() => {

        // setSelectOptions(['Keyword', 'Author', 'Title', 'Subject']);
        console.log(apiClasses);

    }, [apiClasses])

    // function handleCloseModal() {
    //     console.log('closing Modal');
    //     setActivateModal(false);
    // }

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

        <Grid container>
            <Grid item xs={12}>
                <Container>
                    <Paper>
                        <Box px={2}>
                            <Grid container spacing={3} alignItems='center' justifyContent='center'>
                                <Grid item xs={2}>
                                    <Select
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
                                <Grid item xs={8}>
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
                                <Grid item xs={2} alignContent='center'>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        color='primary'
                                        onClick={handleSearchSubmit}>
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>

                        </Box>
                    </Paper>
                </Container>
            </Grid>
            <Box m={2}>
                <Paper>
                    <Grid item xs={12} justifyContent='center'>

                        <Box m={2} p={2}>


                        </Box>

                    </Grid>
                </Paper>
            </Box>

        </Grid>
        // </Container >
    )
}

export default Search;