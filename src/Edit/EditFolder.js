import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import ValidError from '../ValidError';
import config from '../config';
import PropTypes from 'prop-types';
import NotefulForm from '../NotefulForm/NotefulForm';

class EditFolder extends Component {
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
            folderid: '',
            folderTitle: '',
        };
    }

    componentDidMount() {
        const folderid = this.props.match.params.folderid
        fetch(`${config.API_ENDPOINT}/folders/${folderid}`, {
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
            .then(folder => {
                this.setState({
                    selectedFolderId: folder.id,
                    folderTitle: folder.title
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            })
    }

    handleCancel = () => {
        this.props.history.goBack();
    };

    handleSubmit = e => {
        e.preventDefault();
        const folder = {
            id: this.state.folderid,
            title: this.state.folderTitle
        }

        this.setState({ error: null })
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
              },
            body: JSON.stringify(folder),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(folder => {
                this.context.updateFolder(folder)
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({ error })
            })
    }

    validateContent() {
        const name = this.state.folderTitle.trim();
        if (name.length === 0) {
            return 'Folder name cannot be blank'
        }
    }

    handleFolderTitleUpdate = name => {
        this.setState({
            folderTitle: name
        })
    }


    render() {
        const folderTitle = this.state.folderTitle;
        return (
            <section className='AddFolder'>
                <h2>Add a new folder</h2>
                <NotefulForm
                    className='AddFolder__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddFolder__error'>
                        {this.state.error && <p>{this.state.error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='name'>Folder Name</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={folderTitle}
                            onChange={e => this.handleFolderNameUpdate(e.target.value)}
                            required
                        />
                        {this.state.folderName.touched && (
                            <ValidError message={this.validateContent()} />)}
                    </div>
                    <div className='AddFolder__buttons'>
                        <button
                            type='button'
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            onSubmit={this.handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </NotefulForm>
            </section>
        );
    }
}

export default EditFolder; 