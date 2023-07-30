import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddNoteDialogue from "./AddNote";
import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "../model/note";
import * as NotesApi from "../network/notesApi";
import Note from "./Note";
import stylesUtils from "../styles/utils.module.css";
import styles from "../styles/NotePage.module.css";

const NotesPageLoggedInView = () => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingErr, setShowNotesLoadingErr] = useState(false);
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingErr(false);
        setNotesLoading(true);
        const notesFromDb = await NotesApi.fetchNotes();
        setNotes(notesFromDb);
      } catch (error) {
        console.log(error);
        setShowNotesLoadingErr(true);
      } finally {
        setNotesLoading(false);
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

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
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
  );

  return (
    <>
      <Button
        onClick={() => {
          setShowAddNote(true);
        }}
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
      >
        <FaPlus />
        Add New Note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingErr && (
        <p>Something went wrong. Please refresh the page</p>
      )}
      {!notesLoading && !showNotesLoadingErr && (
        <>
          {notes.length > 0 ? (
            notesGrid
          ) : (
            <p>You Don't have any notes to show. Add new Notes</p>
          )}
        </>
      )}
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
    </>
  );
};

export default NotesPageLoggedInView;
