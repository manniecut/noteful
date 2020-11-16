export const findFolder = (folders = [], folderid) =>
  folders.find(folder => folder.id === folderid)

export const findNote = (notes = [], noteId) =>
  notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes = [], folder_id) => (
  (!folder_id)
    ? notes
    : notes.filter(note => note.folderid === parseInt(folder_id))
)