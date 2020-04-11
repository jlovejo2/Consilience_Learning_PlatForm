import React, { useEffect, useState } from "react";
import Gradebook from '../components/MaterialTables/GradebookTable.jsx';
import AssignmentsTable from '../components/MaterialTables/AssignmentTable.jsx';
// import Container from "../components/Container/Container.jsx";
// import Dashboard from '../components/Grades/TeacherDashboard'
// import MaterialTable from "material-table";
// import RootContext from '../utils/RootContext.js';
import API from '../utils/API';
import history from '../history/history.jsx';
import PropTypes from 'prop-types';
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
    // const [currentClassObj, setCurrentClassObj] = useState([]);
    const [userID, setUserID] = useState('');
    const [userType, setUserType] = useState('');
    const [classID, setClassID] = useState('');
    const [tabValue, setTabValue] = useState(' ');
    const [studentArr, setStudentArr] = useState([]);
    const [assignmentArr, setAssignmentArr] = useState([]);


    useEffect(() => {
        // let mounted = true;

        getAndVerifyUserInfo()
        loadClassInfo()
        console.log("useEffect userType", userType)
        console.log('useEffect userID', userID)

        // console.log('useEffect Assignments', assignments)
        // console.log('useEffect Tab Value', tabValue)

        TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired,
        };

        // return () => mounted = false;

    }, [userType, userID])


    function getAndVerifyUserInfo() {
        API.readAndVerifyCookie()
            .then((resp) => {
                console.log("cookie call resp: ", resp)
                console.log("dropping the payload: ", resp.data.payload)
                setUserType(resp.data.payload.type)
                setUserID(resp.data.payload._id)
                selectLastTab()
                console.log("verify ", userType)
                console.log("verify ", userID)
                //load the classes after the userID And userType are received from token
            })
            .catch(error => {
                console.log(error)
                history.replace('/')
            })
    }

    function loadClassInfo() {
        setClassID(localStorage.getItem('classId'))

        console.log("load class ID", classID);
        console.log("load class Tab Value", tabValue)

        API.populateByID(classID)
            .then(resp => {

                console.log(resp.data)
                const studentsData = resp.data.students
                const assignmentsData = resp.data.assignments

                setStudentArr(studentsData)

                // for (assignments of resp.data.assignments) {
                //     // console.log(assignments)
                //     gradebook.columnsGradeBook.push(assignments.title)
                // }

                setAssignmentArr(assignmentsData)

            })
            .catch(err => console.log(err))
    }

    function selectLastTab() {
        const value = localStorage.getItem('tabValue')

        console.log(value)
        if (!value) {
            console.log('welcome to gradebook page')
        } else {
            console.log('Welcome back')
            setTabValue(value)
        }

    }

    const handleTabSelect = (event, newValue) => {
        setTabValue(newValue);
        localStorage.setItem('tabValue', newValue)

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
                <Gradebook
                    students={studentArr}
                    assignments={assignmentArr}
                    userInfo={userID}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <AssignmentsTable
                    assignments={assignmentArr}
                />
            </TabPanel>

        </>

    );
};

export default GradesTeacher;








// onRowAdd: newData =>
// new Promise(resolve => {
//     setTimeout(() => {
//         resolve();
//         setGradebook(prevState => {
//             const data = [...prevState.data];
//             data.push(newData);
//             return { ...prevState, data };
//         });
//     }, 600);
// }),
// onRowUpdate: (newData, oldData) =>
// new Promise(resolve => {
//     setTimeout(() => {
//         resolve();
//         if (oldData) {
//             setGradebook(prevState => {
//                 console.log(prevState);
//                 const data = [...prevState.data];
//                 data[data.indexOf(oldData)] = newData;
//                 return { ...prevState, data };
//             });
//         }
//     }, 600);
// }),
// onRowDelete: oldData =>
// new Promise(resolve => {
//     setTimeout(() => {
//         resolve();
//         setGradebook(prevState => {
//             const data = [...prevState.data];
//             data.splice(data.indexOf(oldData), 1);
//             return { ...prevState, data };
//         });
//     }, 600);
// })
// }}

