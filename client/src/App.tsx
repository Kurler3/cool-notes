import Note from "./components/Note.component";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import notesPageStyles from "./styles/notesPage.module.css";
import utilsStyles from "./styles/utils.module.css";
import { NotesApi } from "./api/notes.api";
import { useCallback, useEffect, useState } from "react";
import AddEditNoteModal from "./components/AddEditNoteModal.component";
import {
  useSelector,
  useDispatch
} from "react-redux";
import { getIsAppLoading, getShowAddNoteModal } from "./redux/selectors/app.selectors";
import { setAppLoading, showHideAddNoteModal } from "./redux/slices/app.slice";
import { getNotesState } from "./redux/selectors/notes.selectors";
import { fetchNotes, removeNote } from "./redux/slices/notes.slice";
import { AppDispatch } from "./redux/store";
import {FaPlus} from "react-icons/fa";
import { INote, NoteInput } from "./types/note.types";

function App() {

  /////////////////////////
  // STATE ////////////////
  /////////////////////////

  const dispatch = useDispatch<AppDispatch>();

    
  const showAddNoteModal = useSelector(getShowAddNoteModal);
  const isAppLoading = useSelector(getIsAppLoading);

  const {
    notes,
    loading,
    error,
  } = useSelector(getNotesState);

  /////////////////////////
  // FUNCTIONS ////////////
  /////////////////////////

  const handleEditNote = useCallback(async (noteId: string, newNoteInput: NoteInput) => {
    try {
      
    } catch (error) {
      // CONSOLE ERROR
      console.error(error);

      // SHOW TOAST 
      alert(error);
    } finally {
      // REMOVE LOADING
      dispatch(setAppLoading(false));
    }

  }, [])

  const handleDeleteNote = useCallback(async (
    noteId:string,
  ) => {
    try {

      // START LOADING
      dispatch(setAppLoading(true));
  
      // CALL DELETE METHOD FROM NOTES API
      await NotesApi.deleteNote(noteId);

      // REMOVE NOTE FROM STATE
      dispatch(removeNote(noteId));

    } catch (error) {

      // CONSOLE ERROR
      console.error('Error removing...', error);

      // SHOW TOAST 
      alert(error);

    } finally {
      // REMOVE LOADING
      dispatch(setAppLoading(false));
    }
  }, []);

  /////////////////////////
  // USE EFFECT ///////////
  /////////////////////////

  useEffect(() => {

    dispatch(fetchNotes())

  }, [])

  /////////////////////////
  // RENDER ///////////////
  /////////////////////////

  if(isAppLoading) {
      return (
        <div>
          App is LOADING BOIS
        </div>
      ) 
  }

  if(loading) return "Loading...";

  if(error) return (
      <div>
        An error has occurred: {error as string}
      </div>
  )


  // RETURN
  return (
    <Container className="p-4">

      <Button className={`${utilsStyles.blockCenter} mb-4 gap-2 ${utilsStyles.flexCenter}`} onClick={() => dispatch(showHideAddNoteModal())}>
        <FaPlus />
        Add new note
      </Button>

      <Row xs={1} md={2} xl={3} className="gap-4 p-4">
        {
          notes ? 
          notes.length > 0 ? 
            notes?.map((note:INote) => {
            return (
              <Col key={note._id}>
                <Note 
                  note={note}
                  className={notesPageStyles.note}
                  handleDeleteNote={handleDeleteNote}
                />
              </Col>
            )
            }) 
            :
            <div>You haven't added any notes</div>
          :
          null
        }
        
      </Row>

      {
        showAddNoteModal &&
        <AddEditNoteModal 
        />
      }

    </Container>
  )
}

export default App
