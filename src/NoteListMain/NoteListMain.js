import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotesContext from '../NotesContext';
import { getNotesForFolder } from '../notes-helpers'
import PropTypes from 'prop-types';
import './NoteListMain.css'

class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        notes: []
    }

    static contextType = NotesContext

    static propTypes = {
        notes: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string,
            folderId: PropTypes.string,
            id: PropTypes.string,
            modified: PropTypes.string,
            name: PropTypes.string
        })),
        folderId: PropTypes.string
    }


    render() {
        const { folderId } = this.props.match.params
        const { notes = [] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
                <div className='NoteListMain__button-container'>
                    <CircleButton
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='NoteListMain__add-note-button'
                    >
                        +NOTE
                </CircleButton>
                </div>
            </section>
        )
    }
}

export default NoteListMain;