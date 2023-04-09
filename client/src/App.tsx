import axios from "axios";
import {
  useQuery
} from "react-query";
import { INote } from "./types/note.types";
import Note from "./components/Note.component";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import notesPageStyles from "./styles/notesPage.module.css";
import { NotesApi } from "./api/notes.api";
import { useState } from "react";
import AddNoteModal from "./components/AddNoteModal.component";
import {
  useSelector,
  useDispatch
} from "react-redux";
import { getShowAddNoteModal } from "./redux/selectors/app.selectors";
import { showHideAddNoteModal } from "./redux/slices/app.slice";

function App() {

  const dispatch = useDispatch();

  const showAddNoteModal = useSelector(getShowAddNoteModal);

  const {
    isLoading,
    data,
    error,
  } = useQuery<INote[]>(
    ["notes"],
    NotesApi.getNotes
  );

  if(isLoading) return "Loading...";

  if(error) return (
    <div>
      An error has occurred: {error as string}
    </div>
  )

  // RETURN
  return (
    <Container>

      <Button onClick={() => dispatch(showHideAddNoteModal)}>
        Add new note
      </Button>

      <Row xs={1} md={2} xl={3} className="gap-4 p-4">
        {
          data?.map((note) => {
            return (
              <Col key={note._id}>
                <Note 
                  note={note}
                  className={notesPageStyles.note}
                />
              </Col>
            )
          })
        }
      </Row>

      {
        showAddNoteModal &&
        <AddNoteModal />
      }

    </Container>
  )
}

export default App
