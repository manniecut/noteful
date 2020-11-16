import React from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import config from '../config';
import './Note.css';


class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => { }
    }

    static contextType = NotesContext;

    handleclickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id

        fetch(fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res
                        .then(e => Promise.reject(e))
                return res
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
        const { title, id, modified } = this.props
        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/notes/${id}`}>
                        {title}
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