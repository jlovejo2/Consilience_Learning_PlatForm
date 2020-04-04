import React from 'react'
import ClassroomContext from '../utils/classroomContext'

export const Classroom = () => {
    return (
        <div>
            <ClassroomContext.Provider>
                Classroom Page
            </ClassroomContext.Provider>
        </div>
    )
}

export default Classroom;