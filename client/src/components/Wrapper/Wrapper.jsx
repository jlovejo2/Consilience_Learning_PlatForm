import React from 'react';

const style = {
    height: 'auto !important',
    width: 'auto !important',
}
const Wrapper = (props) => {
    return (
        <main className="wrapper" style={style}{...props} />
    )
}
export default Wrapper;