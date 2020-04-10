import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container.jsx";
// import Dashboard from '../components/Grades/TeacherDashboard'
import MaterialTable from "material-table";
// import RootContext from '../utils/RootContext.js';
import API from '../utils/API';
import history from '../history/history.jsx';

import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core';

// creating a gradebook that is student (n) responsive
// similar to a relational database (x, y col/row)
// perhaps utilize a drop box and/or tabs to
// toggle various assigments
// always display a cumulative grade
// incorporate charts.js npm to model
// bell curve distribution
// https://www.npmjs.com/chart.js
// https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bellcurve/

const GradesTeacher = (props) => {

    // const { userType, userID } = useContext(RootContext);
    const [currentClassObj, setCurrentClassObj] = useState([]);
    const [userID, setUserID] = useState('');
    const [userType, setUserType] = useState('');
    const [classID, setClassID] = useState('');
    const [tabValue, setTabValue] = useState('');
    const [gradebook, setGradebook] = useState({

        columnsGradeBook: [
            { title: "Surname", field: "surname" },
            { title: "Name", field: "name" },
            { title: "Email", field: "email", }
        ],
    });
    const [ assignments, setAssignments] = useState({
        columnsAssignment: [
            { title: "Title", field: "title" },
            { title: "Description", field: "description" },
            { title: "Attachments", field: "attachments" },
        ]
    })

    useEffect(() => {
        getAndVerifyUserInfo()
        loadClassInfo()
        console.log(userType)
        console.log(userID)
    }, [userType, userID])


    function getAndVerifyUserInfo() {
        API.readAndVerifyCookie()
            .then((resp) => {
                console.log("cookie call resp: ", resp)
                console.log("dropping the payload: ", resp.data.payload)
                setUserType(resp.data.payload.type)
                setUserID(resp.data.payload._id)
                console.log(userType)
                console.log(userID)
                //load the classes after the userID And userType are received from token
            })
            .catch(error => {
                console.log(error)
                history.replace('/')
            })
    }

    function loadClassInfo() {
        setClassID(localStorage.getItem('classId'))
        console.log(classID);
        API.populateByID(classID)
            .then(resp => {

                console.log(resp.data)

                setGradebook({
                    ...gradebook, dataGradebook: resp.data.students.map(student => {
                        const obj = {
                            name: student.firstName,
                            surname: student.lastName,
                            email: student.email
                        }
                        return obj
                    })
                })

                for (assignments of resp.data.assignments) {
                    gradebook.columnsGradeBook.push(assignments.title)
                }
                

                setAssignments({...assignments, dataAssignments: resp.data.assignments.map(assignment => {
                    return assignment
                })})

            })
            .catch(err => console.log(err))
    }

    const handleTabSelect = (event, newValue) => {
        setTabValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (<Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
        );

    }

    // TabPanel.propTypes = {
    //     children: PropTypes.node,
    //     index: PropTypes.any.isRequired,
    //     value: PropTypes.any.isRequired,
    //   };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleTabSelect} aria-label="simple tabs example">
                    <Tab label="GradeBook" {...a11yProps(0)} />
                    <Tab label="Assignments" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <Container fluid>
                    <MaterialTable
                        title="Grade Book"
                        columns={gradebook.columnsGradeBook}
                        data={gradebook.dataGradebook}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        setGradebook(prevState => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            setGradebook(prevState => {
                                                const data = [...prevState.data];
                                                data[data.indexOf(oldData)] = newData;
                                                return { ...prevState, data };
                                            });
                                        }
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        setGradebook(prevState => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                })
                        }}
                    />
                </Container>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <MaterialTable
                    title="Assignments"
                    columns={assignments.columnsAssignment}
                    data={assignments.dataAssignments}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setAssignments(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setAssignments(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setAssignments(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            })
                    }}
                />
            </TabPanel>

        </>

    );
};

export default GradesTeacher;
