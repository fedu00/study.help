import Note from "../Note/Note";
import "./NotesStyles.css";

const Notes = ({ notes, deleteNote, editNote }) => {
  return (
    <div className="notes-container">
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          editNote={editNote}
        />
      ))}
    </div>
  );
};

export default Notes;