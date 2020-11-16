import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotesContext from './NotesContext';
import NotesError from './NotesError/NotesError';
import AddFolder from './Add/AddFolder';
import AddNote from './Add/AddNote';
import EditNote from './Edit/EditNote';
import EditFolder from './Edit/EditFolder';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null
  };

  /****** Loads Notes/Folders into State at Startup **************************************** */

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok)
          return notesResponse.json().then(e => Promise.reject(e));
        if (!foldersResponse.ok)
          return foldersResponse.json().then(e => Promise.reject(e));
        return Promise.all([notesResponse.json(), foldersResponse.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        this.setState({ error })
      });
  }



  /******** Create/Update/Delete Functions **************************************** */

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  handleUpdateNote = updatedNote => {
    const newNotes = this.state.notes.map(note =>
      (note.id === updatedNote.id)
        ? updatedNote
        : note
    )
    this.setState({
      notes: newNotes
    })
  };

  handleUpdateFolder = updatedFolder => {
    const newFolders = this.state.folders.map(folder =>
      (folder.id === updatedFolder.id)
        ? updatedFolder
        : folder
    )
    this.setState({
      folders: newFolders
    })
  };

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleDeleteFolder = (folderid) => {
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== folderid)
    });
  };


  /***** Renders the Navigation ************************************************ */

  renderNavRoutes() {
    return (
      <>
        <NotesError>
          {['/', '/folders/:folder_Id'].map(path => (
            <Route
              exact
              key={path}
              path={path}
              component={NoteListNav}
            />
          ))}
          <Route path='/notes/:note_Id' component={NotePageNav} />
          <Route path='/add-note' component={NotePageNav} />
          <Route path='/add-folder' component={NotePageNav} />
          <Route path='/edit/notes/:note_Id' component={NotePageNav} />
          <Route path='/edit/folders/:folder_Id' component={NotePageNav} />
        </NotesError>
      </>
    )
  }


  /****** Renders Main Window ****************************************/

  renderMainRoutes() {
    return (
      <>
        <NotesError>
          {['/', '/folders/:folder_Id'].map(path => (
            <Route
              exact
              key={path}
              path={path}
              component={NoteListMain}
            />
          ))}
          <Route
            path="/notes/:note_Id"
            component={NotePageMain} />
          <Route
            path='/add-folder'
            component={AddFolder}
          />
          <Route
            path='/add-note'
            component={AddNote}
          />
          <Route
            path='/edit/notes/:note_Id'
            component={EditNote}
          />
          <Route
            path='/edit/folders/:folder_Id'
            component={EditFolder}
          />
        </NotesError>
      </>
    )
  }


  /**** App Render *********************************** */

  render() {
    const value = {

      notes: this.state.notes,
      folders: this.state.folders,

      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder,

      deleteNote: this.handleDeleteNote,
      deleteFolder: this.handleDeleteFolder,

      updateNote: this.handleUpdateNote,
      updateFolder: this.handleUpdateFolder,

      fetchError: this.state.error
    };

    return (
      <NotesContext.Provider value={value}>
        <div className='App' >
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NotesContext.Provider>
    );
  }
}


export default App;