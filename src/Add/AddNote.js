
import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import ValidError from '../ValidError';
import PropTypes from 'prop-types';
import config from '../config'
import NotefulForm from '../NotefulForm/NotefulForm';

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
        const { selectedFolderId, noteTitle, noteContent } = this.state;
        const note = {
            folderid: selectedFolderId.value,
            title: noteTitle.value,
            content: noteContent.value,
            modified: new Date(),
        }
        this.setState({ error: null })
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(note),
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


    handleFolderSelection = folderid => {
        this.setState({
            selectedFolderId: { value: folderid }
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
                <NotefulForm
                    className='AddNote__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddNote__error'>
                        {this.state.error && <p>{this.state.error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='folder'>Select a Folder:</label>
                        <select
                            id='folder'
                            name='folder'
                            defaultValue='$defaultselection'
                            onChange={e => this.handleFolderSelection(e.target.value)}
                        >
                         <option disabled value='$defaultselection'> -- select Folder -- </option>
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
                </NotefulForm>

            </section>
        );
    }

}

export default AddNote; 