import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import ValidError from '../ValidError';
import NotefulForm from '../NotefulForm/NotefulForm'
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import config from '../config';

class EditNote extends Component {
    static contextType = NotesContext;

    static defaultProps = {
        history: {
            goBack: () => { }
        }
    }

    static propTypes = {
        history: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            selectedFolderId: {
                value: ''
            },
            noteTitle: {
                value: ''
            },
            noteContent: {
                value: '',
                touched: false
            },
            noteId: {
                value: ''
            }
        };
    }

    componentDidMount() {
        const noteId = this.props.match.params.note_Id
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(note => {
                this.setState({
                    selectedFolderId: { value: note.folderid },
                    noteTitle: { value: note.title },
                    noteContent: { value: note.content },
                    noteId: { value: note.id }
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({ error })
            })
    }

    handleCancel = () => {
        this.props.history.goBack();
    };

    handleSubmit = e => {
        e.preventDefault();
        const { selectedFolderId, noteTitle, noteContent, noteId } = this.state;
        const note = {
            folderid: selectedFolderId.value,
            title: noteTitle.value,
            content: noteContent.value,
            //modified: format(new Date(), 'yyyy-mm-do,HH:mm:ss'),
            id: noteId.value
        }
        console.log(note)
        this.setState({ error: null })
        fetch(`${config.API_ENDPOINT}/notes/${noteId.value}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(note),
        })
            .then(res => {
                if (!res.ok)
                    return res
                        .then(e => Promise.reject(e))
                return res
            })
            .then(() => {
                note.modified = format(new Date(), 'yyyy-LL-dd,HH:mm:ss.sss');
                const updatedNote = {
                    note: note,
                    id: noteId.value
                }
                this.context.updateNote(updatedNote)
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({ error })
            })
    }


    handleFolderSelection = folder => {
        this.setState({
            selectedFolder: { value: folder }
        })
    }

    handleNoteTitleUpdate = name => {
        this.setState({
            noteTitle: { value: name }
        })
    }

    handleNoteContentUpdate = content => {
        this.setState({
            noteContent: { value: content, touched: true }
        })
    }

    validateContent() {
        const content = this.state.noteContent.value.trim();
        if (content.length === 0) {
            return 'Note cannot be blank'
        }
    }

    render() {
        const folders = this.context.folders;
        const folderId = this.state.selectedFolderId.value
        const title = this.state.noteTitle.value
        const content = this.state.noteContent.value
        return (
            <section className='EditNote'>
                <h2>Edit note</h2>
                <NotefulForm
                    className='AddNote__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddNote__error'>
                        {this.state.error && <p>{this.state.error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='folder'>Select a Folder: </label>
                        <select
                            id='folder'
                            name='folder'
                            defaultValue={folderId}
                            onChange={e => this.handleFolderSelection(e.target.value)}
                        >
                            {folders.map(option => (
                                <option
                                    key={option.id}
                                    value={option.id}
                                >
                                    {option.title}
                                </option>)
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='title'>Note Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={title}
                            onChange={e => this.handleNoteTitleUpdate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='content'>Note Content</label>
                        <textarea
                            name='content'
                            id='content'
                            value={content}
                            onChange={e => this.handleNoteContentUpdate(e.target.value)}
                            required
                        />
                        {this.state.noteContent.touched && (
                            <ValidError message={this.validateContent()} />)}

                    </div>
                    <div className='AddNote__buttons'>
                        <button type='button' onClick={this.handleCancel}>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={this.validateContent()}
                        >
                            Save
                        </button>
                    </div>
                </NotefulForm>

            </section>
        );
    }

}

export default EditNote; 