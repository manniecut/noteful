import React from 'react'

const NotesContext = React.createContext({
    notes: [],
    folders: [],
    addNote: () => { },
    addFolder: () => { },
    deleteNote: () => { },
    deleteFolder: () => { },
    updateNote: () => { },
    updateFolder: () => { },
    fetchError: null,
})

export default NotesContext