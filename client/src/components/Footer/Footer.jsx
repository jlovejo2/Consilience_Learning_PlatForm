import React from 'react';

const style = {
    display: 'inline-table',
    paddingTop: '1px',
    opacity: '1 !important',
    position: 'fixed',
    color: 'white',
    width: '100%',
    bottom: '0',
    background: 'linear-gradient(254deg, rgba(66,66,66,1) 0%, rgba(97,219,251,1) 100%)',
}

const Footer = () => {
    return (
        <footer style={style}>
                    <div className='center'>©2020</div>
        </footer>
    )
};

export default Footer;