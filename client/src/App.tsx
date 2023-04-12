import Note from "./components/notes/Note.component";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from "react-bootstrap";
import notesPageStyles from "./styles/notesPage.module.css";
import utilsStyles from "./styles/utils.module.css";
import { NotesApi } from "./api/notes.api";
import React, { useCallback, useEffect } from "react";
import AddEditNoteModal from "./components/notes/AddEditNoteModal.component";
import {
  useSelector,
  useDispatch
} from "react-redux";
import { getAuthenticatedUser, getIsAppLoading, getIsLogin, getShowAddNoteModal, getShowSignUpLoginModal } from './redux/selectors/app.selectors';
import { fetchLoggedInUser, setAppLoading, showHideAddEditNoteModal } from "./redux/slices/app.slice";
import { getNotesState } from "./redux/selectors/notes.selectors";
import { fetchNotes, removeNote, setEditingNote } from "./redux/slices/notes.slice";
import { AppDispatch } from "./redux/store";
import { FaPlus } from "react-icons/fa";
import { INote } from "./types/note.types";
import NavBar from "./components/NavBar.component";
import RegisterLoginModal from "./components/RegisterLoginModal.components";
import AppLoader from "./components/AppLoader.component";
import AuthenticatedView from "./components/AuthenticatedView.component";

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
  const showSignUpLoginModal = useSelector(getShowSignUpLoginModal);
  const user = useSelector(getAuthenticatedUser);
  const isLogin = useSelector(getIsLogin);

  //---------------------//
  /////////////////////////

  console.log(showSignUpLoginModal)

  const {
    notes,
    loadingNotes,
    fetchNotesError,
    editingNote,
  } = useSelector(getNotesState);


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

  // RETURN
  return isAppLoading ? (
    <AppLoader />
    ) : (
    <React.Fragment>
      <NavBar
        user={user}
      />

      <Container className="p-4">

        {
          user ?
            (
              <AuthenticatedView />
            )
            :
            (
              <React.Fragment>
                  
                  <h1 className="text-center">You are not signed in</h1>

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
