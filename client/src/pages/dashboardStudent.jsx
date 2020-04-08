import React, { useState, useEffect, useContext } from "react";
import RootContext from "../utils/RootContext";
import API from "../utils/API";
import custFunc from "../utils/customFunctions";
//Importing components from component folder
import Container from "../components/Container/Container.jsx";
import ClassCard from "../components/ClassCard/ClassCard";
//Importing components and icons from material-ui

import Card from "@material-ui/core/Card";
import { styled } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

// import NavigationIcon from '@material-ui/icons/Navigation';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';

const MyCard = styled(Card)({
  background: "transparent",
});
const DashboardStudent = (props) => {

  const { userType, userID } = useContext(RootContext)

  const [classesArr, setClassesArr] = useState([]);

  useEffect(() => {

    loadClasses();
  
  }, []);

  //This function calls the backend and loads all the classes in the database onto the dashboard page
  //Eventually this function will only load the classes that the user has access too
  function loadClasses() {
    API.getClasses()
      .then((resp) => {
        console.log(resp.data);

        const newDataObj = resp.data.map((value, index) => {
          // console.log(value.image);
          if (value.image) {
            console.log("exists");

            const base64flag = "data:" + value.image.contentType + ";base64,";
            const imageStr = custFunc.arrayBufferToBase64(
              value.image.data.data
            );

            value.imageBase64Str = base64flag + imageStr;
            return value;
          } else {
            console.log("does not exist");
            return value;
          }
        });
        setClassesArr(newDataObj);
        // console.log(classesArr);
      })
      .catch((err) => console.log(err));
  }


  // const classes = useStyles();

  return (
    <Container fluid>
      <Grid align="center">
        {/* <p className='' style={{ color: "#ffff" }}>Welcome to the classroom dashboard.</p> */}
        <svg viewBox="0 0 2000 290">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="70%">
              Classroom Dashboard
            </text>
          </symbol>
          <g className="g-ants">
            <use xlinkHref="#s-text" className="text-copy"></use>
          </g>
        </svg>
        {/* <Fab size="small" color="secondary" aria-label="add">
                    <AddIcon onClick={handleCreateClass} />
                </Fab> */}
      </Grid>
      <MyCard>
        <Grid container spacing={5} align="center">
            {classesArr.length > 0 ? (
              classesArr.map((item, index) => {
                return (
                  <Grid key={index} item md={4} align="center">
                    <ClassCard
                      key={index}
                      title={item.courseTitle}
                      subheader={item.courseDiscipline}
                      paragraph1={item.courseDescription}
                      image={item.imageBase64Str}
                      imageTitle=""
                      imageCaption=""
                      // settingsButton={handleMenuClick}
                      classID={item._id}
                      usertype={userType}
                    ></ClassCard>
                  </Grid>
                );
              })
            ) : (
              <p>No classes Found</p>
            )}
        </Grid>
        </MyCard>
    </Container>
  );
};

export default DashboardStudent;
