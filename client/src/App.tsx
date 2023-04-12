
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
import RegisterLoginModal from "./components/RegisterLoginModal.components";
import AppLoader from "./components/AppLoader.component";
import AuthenticatedView from "./components/AuthenticatedView.component";
import { BrowserRouter } from "react-router-dom";

function App() {

  /////////////////////////
  // STATE ////////////////
  /////////////////////////

  const dispatch = useDispatch<AppDispatch>();

  /////////////////////////
  // APP STATE ////////////
  /////////////////////////

  const isAppLoading = useSelector(getIsAppLoading);
  const showSignUpLoginModal = useSelector(getShowSignUpLoginModal);
  const user = useSelector(getAuthenticatedUser);
  const isLogin = useSelector(getIsLogin);

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
          )
        }


      </React.Fragment>
    </BrowserRouter>
  )
}

export default App
