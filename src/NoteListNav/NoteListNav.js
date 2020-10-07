import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton'
import './NoteListNav.css'

function NoteListNav(props) {
    return (
        <div className='NoteListNav'>
            <ul className='NoteListNav__list'>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='NoteListNav__folder-link'
                            to={`/folder/${folder.id}`}>
                            {folder.name}
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className='NoteListNav__button-wrapper'>
                <CircleButton tag={Link}
                to='/add-folder'
                type='button'
                className='NoteListNav__add-folder-button'>
                    FOLDER
                </CircleButton>
            </div>
        </div>
    )
}

NoteListNav.defaultProps = {
    folders:[]
}

export default NoteListNav;