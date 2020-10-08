import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotesContext from './NotesContext';
import { getNotesForFolder, findNote, findFolder } from './notes-helpers'
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/notes'),
      fetch('http://localhost:9090/folders')
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
        console.error({ error });
      });
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  //this function works by creating 2 variables to correspond with the state, and then mapping them out to their respective links
  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <Route path='/note/:noteId' component={NotePageNav} />
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    )
  }
  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageMain} />
      </>
    )
  }
  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };
    return (
      <NotesContext.Provider value={value}>
        <div className='App' >
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to='/'>Noteful</Link>{'  '}
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;