import React from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import './Note.css'


class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => { }
    }
    static contextType = NotesContext;
    handleclickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id

        fetch(fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(() => {
                this.context.deleteNote(noteId)
                this.props.onDeleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
        )
    }
    render() {
        const { name, id, modified } = this.props
        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button className='Note__delete' type='button' onClick={this.handleclickDelete}>
                    DEL
            </button>
                <div className='Note__dates'>
                    <div className='Note__dates-modified'>
                        Last modified: {modified}
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;