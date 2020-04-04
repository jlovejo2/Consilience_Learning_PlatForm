import React, { useEffect } from 'react'
// import ClassroomContext from '../utils/classroomContext'

export const Classroom = (props) => {
    // const {currentClass} = useContext(ClassroomContext)

    useEffect( () => {
        const { classroomID } = props.location.state
        console.log(classroomID);
    })

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