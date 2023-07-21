import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../model/note";
import React from "react";
import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClick: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  className,
  onDeleteNoteClick,
  onNoteClicked,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedDateString: string;

  if (updatedAt > createdAt) {
    createdUpdatedDateString = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedDateString = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClick(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {createdUpdatedDateString}
      </Card.Footer>
    </Card>
  );
};

export default Note;
