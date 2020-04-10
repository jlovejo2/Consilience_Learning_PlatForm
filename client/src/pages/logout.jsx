import React, { useState, useEffect } from 'react';
import API from '../utils/API.js';


// add util api.logout call here
// redirect to / on user logout
// add safety net "are you sure you want to logout? (onClick, logout user, redirect to landing page (home))"
const Logout = () => {

    const [userType, setUserType] = useState("");
    const [userID, setUserID] = useState("")


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

    useEffect(() => {
        getAndVerifyUserInfo()
        console.log(userType)
        console.log(userID)
    }, [userType, userID])



    return (
        <div>
            
        </div>
    )
 
}

export default Logout;
