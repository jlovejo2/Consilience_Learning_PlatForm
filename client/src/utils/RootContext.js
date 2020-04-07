import React from "react";

const RootContext = React.createContext({
  userType: '',
  setUserType: () => {}
});

export default RootContext;