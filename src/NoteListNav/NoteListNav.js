import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton'
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import './NoteListNav.css'

class NoteListNav extends Component {
    static contextType = NotesContext;

    static defaultProps = {
        notes: [],
        folders: []
    }

    static propTypes = {
        notes: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string,
            folderId: PropTypes.string,
            id: PropTypes.string,
            modified: PropTypes.string,
            name: PropTypes.string
        })),
        folders: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        })),
    }

    render() {
        const { folders = [], notes = [] } = this.context
        return (
            <div className='NoteListNav' >
                <ul className='NoteListNav__list'>
                    {folders.map(folder =>
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
                        +FOLDER
                </CircleButton>
                </div>
            </div>
        )
    }
}


export default NoteListNav;