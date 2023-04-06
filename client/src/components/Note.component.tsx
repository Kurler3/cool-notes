

import React, {useMemo} from 'react'
import { INote } from '../types/note.types'
import { Card, Button } from 'react-bootstrap';
import noteStyles from "../styles/note.module.css";
import formatDate from '../utils/formatDate';

interface IProps {  
    note: INote;
    className?: string;
}

const Note:React.FC<IProps> = ({
    note,
    className,
}) => {
  

  const displayDate = useMemo(() => {

    const dateKey = new Date(note.createdAt) > new Date(note.updatedAt) ? "createdAt" : "updatedAt";

    const initialText = dateKey === "createdAt" ? "Created: " : "Updated: ";

    return initialText + " " + formatDate(note[dateKey]);
  }, []);

  return (
    <Card className={`${noteStyles.noteCard} ${className ?? ""}`}>
        <Card.Body className={noteStyles.cardBody}>
            <Card.Title>
                {note.title}
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