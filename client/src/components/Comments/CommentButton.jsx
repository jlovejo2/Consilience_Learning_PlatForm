import React, { useState, useRef } from 'react';

import {Grid, Box, Tooltip, Fab, TextField, Button} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';

const  CommentButton = () => {

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
        <Grid item xs={11}>
            <Box ref={visibleEl} visibility={ visible ? 'visible' : 'hidden'}>
                <TextField variant='outlined' placeholder='Enter comment here' fullWidth multiline rows='2' margin='dense'></TextField>
            </Box>
        </Grid>
        </>
 )

}

export default CommentButton;

// const Counter = () => {
//     const [count, setCount] = useState(0)
//     const counterEl = useRef(null)
  
//     const increment = () => {
//       setCount(count + 1)
//       console.log(counterEl)
//     }
  
//     return (
//       <>
//         Count: <span ref={counterEl}>{count}</span>
//         <button onClick={increment}>+</button>
//       </>
//     )
//   }