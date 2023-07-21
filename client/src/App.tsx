import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./model/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notesApi";
import AddNoteDialogue from "./components/AddNote";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notesFromDb = await NotesApi.fetchNotes();
        setNotes(notesFromDb);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }

    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((current) => current._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        onClick={() => {
          setShowAddNote(true);
        }}
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
      >
        <FaPlus />
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              note={note}
              key={note._id}
              className={styles.note}
              onDeleteNoteClick={deleteNote}
              onNoteClicked={setNoteToEdit}
            />
          </Col>
        ))}
      </Row>
      {showAddNote && (
        <AddNoteDialogue
          onDismiss={() => setShowAddNote(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNote(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddNoteDialogue
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((newNote) =>
                newNote._id === updatedNote._id ? updatedNote : newNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
