import React from "react";

const RootContext = React.createContext({
  userType: '',
  setUserType: () => {},
  userID: '',
  setUserID: () => {},
  classID: '',
  setClassID: () => {}
});

export default RootContext;