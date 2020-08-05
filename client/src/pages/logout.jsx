import React, { useState, useEffect, useCallback } from "react";
import API from "../utils/API.js";
import JumbotronLogout from "../components/Jumbotron/JumbotronLogout.jsx";
import Container from "../components/Container/Container.jsx";
import history from "../history/history.jsx";

const Logout = () => {
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");

  // boilerplate
  const getAndVerifyUserInfo = useCallback(() => {
    API.readAndVerifyCookie()
      .then((resp) => {
        console.log("cookie call resp: ", resp);
        console.table("dropping the load: ", resp.data.payload);
        setUserType(resp.data.payload.type);
        setUserID(resp.data.payload._id);
        console.log(userType);
        console.log(userID);
      })
      .catch((error) => {
        console.log(error);
        history.replace("/");
      });
  }, [userID, userType]);

  useEffect(() => {
    getAndVerifyUserInfo();
  }, [getAndVerifyUserInfo]);

  function logoutUser() {
    // API.userLogout (by id, userID) ==> replaces cookie containing JWT with
    // new cookie (same name) containing ephemeral JWT (lifespan of 1 millisecond)
    API.userAuthLogout(userID);
    console.log("logging out");
    history.replace("/");
  }
  return (
    <Container fluid>
      <JumbotronLogout logout={logoutUser} />
    </Container>
  );
};

export default Logout;
