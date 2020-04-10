import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';


function GradebookTable (props) {

    const [gradebook, setGradebook] = useState({

        columnsGradeBook: [
            { title: "Surname", field: "surname" },
            { title: "Name", field: "name" },
            { title: "Email", field: "email", }
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

        const studentArr = props.students.map(student => {
                const obj = {
                    name: student.firstName,
                    surname: student.lastName,
                    email: student.email
                }
                return obj
            })
        
        const assignmentArr = props.assignments.map(assignment => {
            const obj = {
                title: assignment.title,
                field: assignment.title.toLowerCase()
            }
            return obj
        })

        setGradebook({...gradebook, columnsGradeBook: gradebook.columnsGradeBook.concat(assignmentArr), data: studentArr})

    }, [])


    console.log(gradebook);

return (
    <MaterialTable
    title="Grade Book"
    columns={gradebook.columnsGradeBook}
    data={gradebook.data}
//     actions={[
//         {
//             icons: 'edit',
//             tooltip: 'Edit Grade',
//             onClick: (event, asdf) => {

//             }
//     }
// ]}
/>

)

};


export default GradebookTable;


