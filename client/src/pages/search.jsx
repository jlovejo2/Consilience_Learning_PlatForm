import React, { useState, useEffect, useCallback } from "react";

import API from "../utils/API";
// import RootContext from '../utils/RootContext';

import {
  Input,
  Button,
  MenuItem,
  Select,
  Grid,
  Box,
  ListItem,
  Paper,
  Container,
  Modal,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/AddCircleOutline";
// import { sizing, positions } from '@material-ui/system';
import "./pageStyle/search.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Search = () => {
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [classSearchObj, setClassSearchObj] = useState({
    selectValue: "all",
    inputValue: "",
  });
  const [apiClasses, setApiClasses] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getAndVerifyUserInfo = useCallback(async () => {
    try {
      const { data } = await API.readAndVerifyCookie();
      const userData = data.payload;
      console.log("cookie call resp: ", data);
      console.log("dropping the load: ", userData);
      setUserType(userData.type);
      setUserID(userData._id);
      console.log(userType);
      console.log(userID);
    } catch (error) {
      console.log(error);
    }
  }, [userID, userType]);

  useEffect(() => {
    getAndVerifyUserInfo();
  }, [getAndVerifyUserInfo]);

  //This function is called when the user his the request to join button
  //it sends the user's info back to the database and adds them to the class
  async function handleJoinClass(event) {
    const requestInfo = event.currentTarget.value;
    const userInfo = {};
    userInfo.id = userID;

    try {
      const classJoinServerResp = await API.requestToJoinClass(
        requestInfo,
        userInfo
      );

      console.log(classJoinServerResp);
      if (classJoinServerResp) {
        toast.success("", { position: toast.POSITION.TOP_CENTER });
      }
    } catch (error) {
      console.log(error.response);
      const errorMessage = error.response.data.msg;

      if (error.response.data.error === 1) {
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      } else if (error.response.data.error === 2) {
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      }
    }

    // if (classJustJoined) {
    //   toast.success("You were successfully added to the class!", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    // } else {
    //   toast.error("There was an error when adding you to the class.", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    // }
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  //This function what the user is typing and what they select in the select dropdown
  //Sets those to the classSearchObj state
  function handleSearchChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);

    const { name, value } = event.target;

    setClassSearchObj({ ...classSearchObj, [name]: value });
    console.log(classSearchObj);
  }

  async function handleSearchSubmit() {
    console.log(classSearchObj.selectValue);
    console.log(classSearchObj.inputValue);

    if (!classSearchObj.selectValue) {
      setOpenModal(true);
    } else {
      try {
        const classSearchResult = await API.searchClasses(
          classSearchObj.selectValue,
          classSearchObj.inputValue
        );

        // const classSearchResult = data;
        console.log(classSearchResult);
        await setApiClasses(classSearchResult.data);
      } catch {
        throw new Error("Failed to find classes based on search criteria");
      }
    }
  }

  return (
    <Container className="parent" alignContent="center">
      <Box className="content">
        <Paper>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3} className="dropdown">
              <Select
                className="searchbox"
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                variant="outlined"
                value={classSearchObj.selectValue}
                name={"selectValue"}
                onChange={handleSearchChange}
              >
                <MenuItem value={"all"}>All Classes</MenuItem>
                <MenuItem value={"courseTitle"}>Title</MenuItem>
                <MenuItem value={"courseDescription"}>Description</MenuItem>
                <MenuItem value={"subject"}>Subject</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6} className="searchbar">
              <Box py={2}>
                <Input
                  color="primary"
                  placeholder="search for classes here"
                  fullWidth
                  disableUnderline
                  name={"inputValue"}
                  onChange={handleSearchChange}
                />
              </Box>
            </Grid>
            <Grid item xs={2} className="searchbutton">
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSearchSubmit}
              >
                <SearchIcon />
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box m={3}>
        <Paper>
          <Grid item xs={12} justifyContent="center">
            <Box m={2} p={2}>
              <ul>
                {apiClasses.length > 0 ? (
                  apiClasses.map((item, index) => {
                    return (
                      <ListItem key={index} className="addicon">
                        <Grid item xs={3}>
                          <h3>{item.courseTitle}</h3>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            value={item.id}
                            onClick={handleJoinClass}
                          >
                            <AddIcon />
                            Request to Join
                          </Button>
                        </Grid>
                        <Grid item xs={6} className="description">
                          {item.courseDescription}
                        </Grid>
                        <Grid item xs={3}>
                          Course subject: <p /> <h6>{item.courseDiscipline}</h6>
                        </Grid>
                      </ListItem>
                    );
                  })
                ) : (
                  <p>No classes Found</p>
                )}
              </ul>
            </Box>
          </Grid>
        </Paper>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
      >
        {
          <>
            <Box
              width="25%"
              height="25%"
              p={2}
              zIndex="modal"
              position="absolute"
              top="20%"
              left="35%"
            >
              <Paper elevation={6}>
                <Typography variant="h6" align="center">
                  <p id="modal-title">
                    Please select search criteria in select dropdown.
                  </p>
                </Typography>
              </Paper>
            </Box>
          </>
        }
      </Modal>
    </Container>
  );
};

export default Search;
