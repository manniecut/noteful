import React from 'react'

const BookmarksContext = React.createContext({
    notes: [],
    folders: [],
    addNote: () => {},
    addFolder: () => {},
    deleteNote: () => {},
})

export default BookmarksContext