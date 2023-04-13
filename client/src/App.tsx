
import {
  Container,
} from "react-bootstrap";
import React, { useEffect } from "react";
import {
  useSelector,
  useDispatch
} from "react-redux";
import { getAuthenticatedUser, getIsAppLoading, getIsLogin, getShowSignUpLoginModal } from './redux/selectors/app.selectors';
import { fetchLoggedInUser } from "./redux/slices/app.slice";
import { fetchNotes } from "./redux/slices/notes.slice";
import { AppDispatch } from "./redux/store";
import NavBar from "./components/NavBar.component";
import AppLoader from "./components/AppLoader.component";
import NotesPage from "./pages/NotesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivatePage from "./pages/PrivatePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterLoginModal from "./components/RegisterLoginModal.components";

function App() {

  /////////////////////////
  // STATE ////////////////
  /////////////////////////

  const dispatch = useDispatch<AppDispatch>();

  /////////////////////////
  // APP STATE ////////////
  /////////////////////////

  const isAppLoading = useSelector(getIsAppLoading);
  const user = useSelector(getAuthenticatedUser);
  const isLogin = useSelector(getIsLogin);
  const showSignUpLoginModal = useSelector(getShowSignUpLoginModal);

  /////////////////////////
  // USE EFFECT ///////////
  /////////////////////////

  // GET LOGGED IN USER
  useEffect(() => {
    if (!user) {
      dispatch(fetchLoggedInUser());
    }
  }, []);

  // AFTER LOGGED IN => FETCH NOTES
  useEffect(() => {
    if (user) {
      // FETCH NOTES INITIALLY
      dispatch(fetchNotes())
    }
  }, [user])

  /////////////////////////
  // RENDER ///////////////
  /////////////////////////

  // RETURN
  return (
    <BrowserRouter>
      <React.Fragment>
        <NavBar
          user={user}
        />

        {
          isAppLoading ? (
            <AppLoader />
          ) : (
            <Container className="p-4">

              <Routes>

                {/* HOME  */}
                <Route
                  path="/"
                  element={
                    <NotesPage
                      user={user}
                    />
                  }
                />

                {/* PRIVACY */}
                <Route
                  path="/privacy"
                  element={
                    <PrivatePage />
                  }
                />

                {/* ANY OTHER */}
                <Route
                  path="/*"
                  element={
                    <NotFoundPage />
                  }
                />
              </Routes>


            </Container>
          )
        }

        {
          showSignUpLoginModal &&
          (
            <RegisterLoginModal
              isLogin={isLogin}
            />
          )
        }

      </React.Fragment>
    </BrowserRouter>
  )
}

export default App
