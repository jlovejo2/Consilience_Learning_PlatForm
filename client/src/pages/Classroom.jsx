import React, { useEffect, useState } from 'react'
import API from '../utils/API';
// import ClassroomContext from '../utils/classroomContext'

export const Classroom = (props) => {
    const {currentClassObj, setCurrentClassObj} = useState({})

    useEffect( () => {
        const { classroomID } = props.location.state
        loadClassInfo(classroomID)
    })

    function loadClassInfo(param) {
        API.getClass(param)
            .then(resp => {
                console.log(resp)
                setCurrentClassObj({resp})
                console.log(currentClassObj)
            })
            .catch(err => console.log(err))
    }

    function handleClass() {
    }

    return (
        <div>
            {/* <ClassroomContext.Provider> */}
                Classroom Page
                <button onClick={handleClass}>Click me!!</button>
            {/* </ClassroomContext.Provider> */}
        </div>
    )
}

export default Classroom;