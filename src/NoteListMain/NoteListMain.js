import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotesContext from '../NotesContext';
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NotesContext

    render() {
        const { folder_Id } = this.props.match.params
        const { notes = [] } = this.context
        const notesForFolder = getNotesForFolder(notes, folder_Id)
        console.log(notes)
        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                title={note.title}
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
                        className='NoteListMain__add-note-button'>
                        +NOTE
                    </CircleButton>
                </div>
            </section>
        )
    }
}

export default NoteListMain;