import React, { useState, useRef } from 'react';

import {Grid, Box, Tooltip, Fab, TextField, Button} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
// import SendIcon from '@material-ui/icons/Send';

const  CommentButton = (props) => {

    const [visible, setVisible] = useState(false)
    const visibleEl = useRef(null)

    const makeComment = () => {

        if (visible) {
            setVisible(false);
        } else {
            setVisible(true)
        }
        
    }

    return (
        <>
        <Grid item xs={1}>
            <Tooltip title="Comment on Annoucement" aria-label="comment">
                <Button onClick={makeComment}>
                    <Fab size="small" color="primary" aria-label='comment' >
                        <CommentIcon />
                    </Fab>
                </Button>
            </Tooltip>
        </Grid>
        <Grid item xs={10}>
            <Box ref={visibleEl} visibility={ visible ? 'visible' : 'hidden'}>
                <TextField 
                variant='outlined' 
                placeholder='Enter comment here, submit by hitting enter' 
                fullWidth 
                multiline 
                rows='2' 
                margin='dense'
                onKeyUp={props.submitComment}/>
            </Box>
        </Grid>
        </>
 )

}

export default CommentButton;
