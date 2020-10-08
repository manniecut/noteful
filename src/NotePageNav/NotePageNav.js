import React, { Component } from 'react';
import CircleButton from '../CircleButton/CircleButton';
import NotesContext from '../NotesContext'
import { findNote, findFolder } from '../notes-helpers'
import PropTypes from 'prop-types';
import './NotePageNav.css'

class NotePageNav extends Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
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
        noteId: PropTypes.string,
        goBack: PropTypes.func
    }

    static contextType = NotesContext;

    render() {
        const { notes, folders } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        return (
            <div className='NotePageNav'>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__back-button'>
                    BACK
            </CircleButton>
                {folder && (
                    <h3 className='NotePageNav__folder-name'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}


export default NotePageNav;