import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';


function GradebookTable (props) {

    const [gradebook, setGradebook] = useState({

        columnsGradeBook: [
            { title: "Surname", field: "surname" },
            { title: "Name", field: "name" },
            { title: "Email", field: "email", }
        ],
        dataGradebook: props.students.map(student => {
            const obj = {
                name: student.firstName,
                surname: student.lastName,
                email: student.email
            }
            return obj
        })
    });

    useEffect(() => {


    })




return (
    <MaterialTable
    title="Grade Book"
    columns={gradebook.columnsGradeBook}
    data={gradebook.dataGradebook}
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


