import React from 'react';
import CircleButton from '../CircleButton/CircleButton';
import './NotePageNav.css'

function NotePageNav(props) {
    return (
        <div className='NotePageNav'>
            <CircleButton
            tag='button'
            role='link'
            onClick={() => props.history.goBack()}
            className='NotePageNav__back-button'>
                BACK
            </CircleButton>
            {props.folder && (
                <h3 className='NotePageNav__folder-name'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    )
}

NotePageNav.defaultProps= {
    history: {
        goBAck: () => {}
    }
}

export default NotePageNav;