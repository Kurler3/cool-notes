import React, { useCallback } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { IUser } from '../types/users.types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setIsLogin, setUser, showHideSignUpLoginModal } from '../redux/slices/app.slice';
import { UsersApi } from '../api/users.api';

interface IProps {
    user: IUser | null;
}

const NavBar: React.FC<IProps> = ({
    user,
}) => {

    const dispatch = useDispatch<AppDispatch>();

    ///////////////////////////
    // STATE //////////////////
    ///////////////////////////

    ///////////////////////////
    // FUNCTIONS //////////////
    ///////////////////////////

    // HANDLE SIGN UP
    const handleSignUp = useCallback(() => {

        dispatch(showHideSignUpLoginModal());
        dispatch(setIsLogin(false));

     }, []);

    // HANDLE SIGN IN
    const handleSignIn = useCallback(() => {

        dispatch(showHideSignUpLoginModal());
        dispatch(setIsLogin(true));

     }, []);

    // HANDLE LOGOUT
    const handleLogout = useCallback(async () => { 
        try {
            
            await UsersApi.logout();

        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setUser(null));
        }
        

     }, []);

    ///////////////////////////
    // RENDER /////////////////
    ///////////////////////////

    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand>Cool Notes</Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">

                    <Nav className='ms-auto'>
                        {
                            user ?
                                <React.Fragment>

                                    <Navbar.Text className='me-2'>
                                        Signed in as: {user.username}
                                    </Navbar.Text>
                    
                                    <Button onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </React.Fragment>
                                :
                                (
                                    <React.Fragment>
                                        <Button onClick={handleSignIn}>Login</Button>
                                        <Button onClick={handleSignUp}>Sign Up</Button>
                                    </React.Fragment>
                                )
                        }
                    </Nav>

                </Navbar.Collapse>


            </Container>
        </Navbar>
    )
}

export default NavBar;