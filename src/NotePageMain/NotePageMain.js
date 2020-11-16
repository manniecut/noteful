import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import NotesContext from '../NotesContext';
import { findNote } from '../notes-helpers';
import './NotePageMain.css';
import NavCircleButton from '../CircleButton/CircleButton';

class NotePageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotesContext

    handleDeleteNote = (noteId) => {
        this.props.history.push('/')
    }

    render() {
        const { notes = [] } = this.context
        const id = parseInt(this.props.match.params.note_Id)
        const note = findNote(notes, id) || { content: '' }
        return (
            <section className='NotePageMain'>
                <Note
                    id={note.id}
                    title={note.title}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className='NotePageMain__content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
                <NavCircleButton
                    tag={Link}
                    to={`/edit/notes/${note.id}`}
                    type='button'
                    className='NoteListMain__edit-note-button'>
                    EDIT
                    </NavCircleButton>
            </section>
        )

    }
}


export default NotePageMain;