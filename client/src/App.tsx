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
import React, { useCallback, useEffect } from "react";
import AddEditNoteModal from "./components/AddEditNoteModal.component";
import {
  useSelector,
  useDispatch
} from "react-redux";
import { getAuthenticatedUser, getEditingNote, getIsAppLoading, getIsLogin, getShowAddNoteModal, getShowSignUpLoginModal } from './redux/selectors/app.selectors';
import { fetchLoggedInUser, setAppLoading, setEditingNote, showHideAddEditNoteModal } from "./redux/slices/app.slice";
import { getNotesState } from "./redux/selectors/notes.selectors";
import { fetchNotes, removeNote } from "./redux/slices/notes.slice";
import { AppDispatch } from "./redux/store";
import { FaPlus } from "react-icons/fa";
import { INote } from "./types/note.types";
import NavBar from "./components/NavBar.component";
import RegisterLoginModal from "./components/RegisterLoginModal.components";

function App() {

  /////////////////////////
  // STATE ////////////////
  /////////////////////////

  const dispatch = useDispatch<AppDispatch>();

  /////////////////////////
  // SELECTORS ----------//
  //---------------------//

  const showAddNoteModal = useSelector(getShowAddNoteModal);
  const isAppLoading = useSelector(getIsAppLoading);
  const editingNote = useSelector(getEditingNote);
  const showSignUpLoginModal = useSelector(getShowSignUpLoginModal);
  const user = useSelector(getAuthenticatedUser);
  const isLogin = useSelector(getIsLogin);

  //---------------------//
  /////////////////////////

  console.log(showSignUpLoginModal)

  const {
    notes,
    loading,
    error,
  } = useSelector(getNotesState);

  /////////////////////////
  // FUNCTIONS ////////////
  /////////////////////////

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

  // GET LOGGED IN USER
  useEffect(() => {
    if(!user) {
      dispatch(fetchLoggedInUser());
    }
  }, []);

  useEffect(() => {
    if(user) {
       // FETCH NOTES INITIALLY
      dispatch(fetchNotes())
    }
  }, [user])

  /////////////////////////
  // RENDER ///////////////
  /////////////////////////

  if (isAppLoading) {
    return (
      <div>
        App is LOADING BOIS
      </div>
    )
  }

  console.log("LOADING: ", loading)

  // if (loading) return "Loading...";

  if (error) return (
    <div>
      An error has occurred: {error as string}
    </div>
  )


  // RETURN
  return (
    <React.Fragment>
      <NavBar
        user={user}
      />

      <Container className="p-4">

        {
          user ?
            (
              <React.Fragment>

                <Button className={`${utilsStyles.blockCenter} mb-4 gap-2 ${utilsStyles.flexCenter}`} onClick={() => dispatch(showHideAddEditNoteModal())}>
                  <FaPlus />
                  Add new note
                </Button>

                <Row xs={1} md={2} xl={3} className="gap-4 p-4">
                  {
                    notes ?
                      notes.length > 0 ?
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
                        <div>You haven't added any notes</div>
                      :
                      null
                  }

                </Row>

                {
                  showAddNoteModal &&
                  <AddEditNoteModal
                    editingNote={editingNote}
                  />
                }

              </React.Fragment>
            )
            :
            (
              <React.Fragment>
                  <h1>You are not signed in</h1>

                  {
                    showSignUpLoginModal &&
                    (
                      <RegisterLoginModal 
                        isLogin={isLogin}
                      />
                    )
                  }
              </React.Fragment>
            )
        }

      </Container>
    </React.Fragment>

  )
}

export default App
