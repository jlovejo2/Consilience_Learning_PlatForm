import React, { useState, useEffect } from 'react';
import API from '../utils/API.js';
import JumbotronLogout from '../components/Jumbotron/JumbotronLogout.jsx';
import Container from '../components/Container/Container.jsx';
import history from '../history/history.jsx';

const Logout = () => {

    const [userType, setUserType] = useState("");
    const [userID, setUserID] = useState("")

    // boilerplate or boilerbased? 
    function getAndVerifyUserInfo() {
        API.readAndVerifyCookie()
            .then((resp) => {
                console.log("cookie call resp: ", resp)
                console.table("dropping the load: ", resp.data.payload)
                setUserType(resp.data.payload.type)
                setUserID(resp.data.payload._id)
                console.log(userType)
                console.log(userID)
            })
            .catch(error => {
                console.log(error)
                // boot their expired ass back home
                history.replace('/')
            })
    }
    // lifecycle hook
    useEffect(() => {
        getAndVerifyUserInfo()
    }, [userType, userID])

    // the edible has taken hold, RIP 
    // api to use ====> 
    // API.userLogout (by id, userID) ==> replaces cookie containing JWT with
    // new cookie (same name) containing ephemeral JWT (lifespan of 1 millisecond)
    return (
        <Container fluid>
            <JumbotronLogout />
        </Container>
    )
 
}

export default Logout;
