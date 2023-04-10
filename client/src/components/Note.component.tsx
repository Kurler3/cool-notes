

import React, {useCallback, useMemo} from 'react'
import { INote } from '../types/note.types'
import { Card, Button } from 'react-bootstrap';
import noteStyles from "../styles/note.module.css";
import utilsStyles from "../styles/utils.module.css";
import formatDate from '../utils/formatDate';
import {
  MdDelete
} from "react-icons/md";

interface IProps {  
    note: INote;
    className?: string;
    handleDeleteNote: (noteId: string) => Promise<void>;
}

const Note:React.FC<IProps> = ({
    note,
    className,
    handleDeleteNote,
}) => {
  
  ///////////////////////////////
  // MEMO ///////////////////////
  ///////////////////////////////

  const displayDate = useMemo(() => {

    const dateKey = new Date(note.createdAt) > new Date(note.updatedAt) ? "createdAt" : "updatedAt";

    const initialText = dateKey === "createdAt" ? "Created: " : "Updated: ";

    return initialText + " " + formatDate(note[dateKey]);
  }, []);

  return (
    <Card className={`${noteStyles.noteCard} ${className ?? ""}`}>
        <Card.Body className={noteStyles.cardBody}>
            <Card.Title className={utilsStyles.flexCenter}>
                {note.title}

                <MdDelete 
                  className='text-muted ms-auto'
                  onClick={(e) => {
                    // DOESN'T TRIGGER CLICK IN PARENT COMPONENT
                    e.stopPropagation()

                    handleDeleteNote(note._id);
                  }}
                />
            </Card.Title>
            <Card.Text className={noteStyles.cardText}>
                {note.text}
            </Card.Text>
        </Card.Body>

        <Card.Footer className="text-muted">
                {displayDate}
        </Card.Footer>
    </Card>
  )
}

export default Note;