import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import API from '../../utils/API';
// import history from '../../history/history.jsx';


function GradebookTable(props) {

    const [classID, setClassID] = useState()
    const [gradebook, setGradebook] = useState({

        columnsGradeBook: [
            { title: "Surname", field: "surname", editable: 'never' },
            { title: "Name", field: "name", editable: 'never' },
            { title: 'Student ID', field: 'ID', editable: 'never'},
            { title: "Email", field: "email", editable: 'never' }
        ],
        // data: props.students.map(student => {
        //     const obj = {
        //         name: student.firstName,
        //         surname: student.lastName,
        //         email: student.email
        //     }
        //     return obj
        // })
    });

    useEffect(() => {

        setClassID(localStorage.getItem('classId'))

        const studentArr = props.students.map(student => {
            const obj = {
                name: student.firstName,
                surname: student.lastName,
                ID: student.ID,
                email: student.email   
            }   

            for (let assignmentGrade of student.grades) {
                
                obj[assignmentGrade.assignment] = assignmentGrade.grade
            }

            return obj
        })

        console.log(studentArr);

        const assignmentArr = props.assignments.map(assignment => {
            const obj = {
                title: assignment.title,
                field: assignment.title.toLowerCase(),
                // editComponent: props => (
                //     <input
                //         type="text"
                //         value={props.value}
                //         onChange={e => props.onChange(e.target.value)}
                //     />
                // )
            }
            return obj
        })

        setGradebook({ ...gradebook, columnsGradeBook: gradebook.columnsGradeBook.concat(assignmentArr), data: studentArr })

    }, [])

    function refreshpage() {
        window.location.reload(false)
    }

    console.log(gradebook);
    console.log(props.userInfo)

    return (
        <MaterialTable
            title="Grade Book"
            columns={gradebook.columnsGradeBook}
            data={gradebook.data}
            //Code inside of the editable props is mostly boiler plate code provided by material-table for client-side rendering to the table
            editable={{
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
                }}
                actions={
                    [
                    {
                        icon: 'save',
                        tooltip: 'Save Assignment',
                        onClick: (event, rowData) => {
                            console.log(props.userInfo)
                            API.addGrade(classID, rowData, props.userInfo)
                                .then(resp => {
                                    console.log(resp)
                                    refreshpage()
                                })
                                .catch(err => console.log(err))
                        }
                    },
                ]}
        />

    )

};


export default GradebookTable;


