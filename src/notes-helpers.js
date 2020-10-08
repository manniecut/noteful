export const findFolder = (folders = [], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes = [], noteId) =>
  notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes = [], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)
export const getRandomHexString = () => {
  return [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}