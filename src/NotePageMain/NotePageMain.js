import React, { Component } from 'react';
import Note from '../Note/Note';
import NotesContext from '../NotesContext';
import { findNote } from '../notes-helpers';
//import PropTypes from 'prop-types';
import './NotePageMain.css';

class NotePageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotesContext
    /*
        static propTypes = {
            notes: PropTypes.arrayOf(PropTypes.shape({
                content: PropTypes.string,
                folderId: PropTypes.number,
                id: PropTypes.number,
                modified: PropTypes.string,
                name: PropTypes.string
            })),
            noteId: PropTypes.string
        }
    */

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
                    name={note.title}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className='NotePageMain__content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )

    }
}


export default NotePageMain;