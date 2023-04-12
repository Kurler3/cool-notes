import { Col, Row } from 'react-bootstrap'
import {
  useSelector,
  useDispatch
} from "react-redux";
import { getNotes, getNotesState } from '../../redux/selectors/notes.selectors';
import { INote } from '../../types/note.types';
import Note from './Note.component';
import notesPageStyles from "../../styles/notesPage.module.css";
import {
  useCallback
} from "react";
import { removeNote, setEditingNote } from '../../redux/slices/notes.slice';
import { setAppLoading, showHideAddEditNoteModal } from '../../redux/slices/app.slice';
import { NotesApi } from '../../api/notes.api';

const NotesGrid = () => {

  /////////////////////////////
  // REDUX ////////////////////
  /////////////////////////////

  const dispatch = useDispatch();

  const notes = useSelector(getNotes);


  /////////////////////////////
  // FUNCTIONS ////////////////
  /////////////////////////////

  const handleEditNote = useCallback(async (note: INote) => {

    // SET EDITING NOTE
    dispatch(setEditingNote(note));

    // SET SHOW ADD EDIT MODAL
    dispatch(showHideAddEditNoteModal());

  }, [])

  const handleDeleteNote = useCallback(async (
    noteId: string,
  ) => {
    try {

      // START LOADING
      dispatch(setAppLoading(true));

      // CALL DELETE METHOD FROM NOTES API
      await NotesApi.deleteNote(noteId);

      // REMOVE NOTE FROM STATE
      dispatch(removeNote(noteId));

    } catch (error: any) {

      // CONSOLE ERROR
      console.error('Error removing...', error.message);

      // SHOW TOAST 
      alert(error.message);

    } finally {
      // REMOVE LOADING
      dispatch(setAppLoading(false));
    }
  }, []);

  /////////////////////////////
  // RENDER ///////////////////
  /////////////////////////////

  return (
    <Row xs={1} md={2} xl={3} className="gap-4 p-4">
      {
        notes ?
          notes!.length > 0 ?
            notes?.map((note: INote) => {
              return (
                <Col key={note._id}>
                  <Note
                    note={note}
                    className={notesPageStyles.note}
                    handleDeleteNote={handleDeleteNote}
                    handleEditNote={handleEditNote}
                  />
                </Col>
              )
            })
            :
            <div className='w-100 d-flex justicy-items-center align-items-center'>
              <h3 className='text-center mx-auto'>You haven't added any notes</h3>
            </div>
          :
          null
      }

    </Row>
  )
}

export default NotesGrid