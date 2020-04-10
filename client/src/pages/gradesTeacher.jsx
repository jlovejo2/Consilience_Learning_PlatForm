import React, { useEffect, useState, useContext } from "react";
import Container from "../components/Container/Container.jsx";
// import Dashboard from '../components/Grades/TeacherDashboard'
import MaterialTable from "material-table";
// import RootContext from '../utils/RootContext.js';
import API from '../utils/API';

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
    const [userType, setUserType] = useState('')

    useEffect(() => {
        // // const { classroomID } = props.location.state
        // loadClassInfo(classroomID)
        console.log(userType);
        console.log(userID);
        // loadAnnouncements(classroomID);
    }, [ userType, userID])

    function loadClassInfo(param) {
        API.getClass(param)
            .then(resp => {
                console.log(resp.data)
                const classInfo = resp.data

                setCurrentClassObj(classInfo)
            })
            .catch
            (err => console.log(err))
    }


  const [state, setState] = useState({

    columns: [
      { title: "Surname", field: "surname" },
      { title: "Name", field: "name" },
      {
        title: "ID",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
      }
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34
      }
    ]
  });
  
  return (
    <Container fluid>
      <MaterialTable
        title="Editable Example"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
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
                  setState(prevState => {
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
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </Container>
  );
};

export default GradesTeacher;
