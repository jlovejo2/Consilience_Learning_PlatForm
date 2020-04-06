import React, { useEffect, useState } from 'react'
import API from '../utils/API';
// import ClassroomContext from '../utils/classroomContext'

import ClassBanner from '../components/ClassBanner/ClassBanner';
import Container from '../components/Container/Container';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 500,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export const Classroom = (props) => {

    const classes = useStyles();
    const [ currentClassObj, setCurrentClassObj ] = useState([])

    useEffect(() => {
        const { classroomID } = props.location.state
        loadClassInfo(classroomID)
    }, [])

    function loadClassInfo(param) {
        API.getClass(param)
            .then(resp => {
                console.log(resp.data)
                const classInfo = resp.data.classInfo

                setCurrentClassObj( classInfo )

            })
            .catch
            (err => console.log(err))
    }
// eslint-disable-next-line
    function handleClass() {
        console.log(currentClassObj)
    }

    return (
        <div>

            <ClassBanner />
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {/* {currentClassObj.classInfo.courseTitle} */}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    where are all the students??
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    well shit ...
                                </Typography>
                                <Typography variant="body2" component="p">
                                    well meaning and kindly.
                        <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={handleClass}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );

}

export default Classroom;