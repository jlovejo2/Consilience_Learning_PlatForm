import React from "react";

const RootContext = React.createContext({
  userType: '',
  setUserType: () => {},
  userID: '',
  setUserID: () => {}
});

export default RootContext;