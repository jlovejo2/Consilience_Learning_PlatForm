import React from "react";

const RootContext = React.createContext({
  classID: '',
  setClassID: () => {}
});

export default RootContext;