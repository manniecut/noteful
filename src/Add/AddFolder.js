import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import ValidError from '../ValidError';
import PropTypes from 'prop-types';

class AddFolder extends Component {
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
            folderTitle: {
                value: '',
                touched: false
            }
        }
    }


    validateContent() {
        const title = this.state.folderTitle.value.trim();
        if (title.length === 0) {
            return 'Folder name cannot be blank'
        }
    }

    handleFolderTitleUpdate = title => {
        this.setState({
            folderTitle: { value: title, touched: true }
        })
    }

    handleCancel = () => {
        this.props.history.goBack();
    }

    handleSubmit = e => {
        e.preventDefault();
        const folder = {
            title: this.state.folderTitle.value,
        }

        this.setState({ error: null })
        fetch('http://localhost:9090/api/folders', {
            method: 'POST',
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
                this.context.addFolder(folder)
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({ error })
            })
    }

    render() {
        return (
            <section className='AddFolder'>
                <h2>Add a new folder</h2>
                <form
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
                            placeholder='My New Folder'
                            onChange={e => this.handleFolderTitleUpdate(e.target.value)}
                            required
                        />
                        {this.state.folderTitle.touched && (
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
                </form>
            </section>
        );
    }
}

export default AddFolder; 