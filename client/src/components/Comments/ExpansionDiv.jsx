import React, { useState, useRef } from 'react';

import { ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpansionDiv = (props) => {


    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            > 
            Comments: &nbsp; &nbsp; 
            </ExpansionPanelSummary>
            {props.children}
        </ExpansionPanel>

    )
}

export default ExpansionDiv;