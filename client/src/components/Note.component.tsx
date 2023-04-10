

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
}

const Note:React.FC<IProps> = ({
    note,
    className,
}) => {
  
  ///////////////////////////////
  // MEMO ///////////////////////
  ///////////////////////////////

  const displayDate = useMemo(() => {

    const dateKey = new Date(note.createdAt) > new Date(note.updatedAt) ? "createdAt" : "updatedAt";

    const initialText = dateKey === "createdAt" ? "Created: " : "Updated: ";

    return initialText + " " + formatDate(note[dateKey]);
  }, []);

  ///////////////////////////////
  // FUNCTIONS //////////////////
  ///////////////////////////////

  const handleDelete = useCallback(() => {

    try {

      // START LOADING

      // CALL DELETE METHOD FROM NOTES API

      // REMOVE NOTE FROM STATE

      // SHOW OK TOAST

    } catch (error) {

      // CONSOLE ERROR

      // SHOW TOAST

    } finally {
      // REMOVE LOADING
    }
  }, []);

  return (
    <Card className={`${noteStyles.noteCard} ${className ?? ""}`}>
        <Card.Body className={noteStyles.cardBody}>
            <Card.Title className={utilsStyles.flexCenter}>
                {note.title}

                <MdDelete 
                  className='text-muted ms-auto'
                  onClick={(e) => {

                    handleDelete()

                    // DOESN'T TRIGGER CLICK IN PARENT COMPONENT
                    e.stopPropagation()
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