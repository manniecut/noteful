import React from 'react';
import PropTypes from 'prop-types';

function ValidError(props) {

    if(props.message) {
        return (
            <div className='error'>{props.message}</div>
        );
    }

    return <></>
}

ValidError.propTypes = {
    message: PropTypes.string
} 

export default ValidError;