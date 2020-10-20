/*
Create a new component AddNote that implements a form to capture the name, content and folder for a new Note. 
Submit to the POST /notes endpoint on the server. Add validation to ensure that the name of the note is not left blank. 
The folder should be selected from a list of existing folders. 
Ensure that errors are properly handled. 
Add a button to the note list page to invoke this new form.
*/
import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import ValidError from '../ValidError';
import { getRandomHexString } from '../notes-helpers';
import PropTypes from 'prop-types';

class AddNote extends Component {
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
            }
        };
    }

    handleCancel = () => {
        this.props.history.goBack();
    };

    handleSubmit = e => {
        e.preventDefault();
        const randomNoteId = `${getRandomHexString()}-ffaf-11e8-8eb2-f2801f1b9fd1`

        const { selectedFolderId, noteTitle, noteContent } = this.state;

        const note = {
            folderId: selectedFolderId.value,
            name: noteTitle.value,
            content: noteContent.value,
            modified: new Date(),
            id: randomNoteId
        }

        this.setState({ error: null })
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
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
                this.context.addNote(note)
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
        return (
            <section className='AddNote'>
                <h2>Add a new note</h2>
                <form
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
                            onChange={e => this.handleFolderSelection(e.target.value)}
                        >
                            {folders.map(option => (
                                <option
                                    key={option.id}
                                    value={option.id}
                                >
                                    {option.name}
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
                            placeholder='My New Note'
                            onChange={e => this.handleNoteTitleUpdate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='content'>Note Content</label>
                        <textarea
                            name='content'
                            id='content'
                            placeholder='Type your note here'
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
                </form>

            </section>
        );
    }

}

export default AddNote; 