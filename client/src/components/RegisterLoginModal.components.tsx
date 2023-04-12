import React from 'react'
import { ISignUpCredentials } from '../types/users.types';
import {
    useDispatch
} from "react-redux";
import { Button, Form, Modal } from 'react-bootstrap';
import { setUser, showHideSignUpLoginModal } from '../redux/slices/app.slice';
import { useForm } from 'react-hook-form';
import TextInputField from './form/TextInputField';
import { UsersApi } from '../api/users.api';

interface IProps {
    isLogin: boolean;
}

const RegisterLoginModal: React.FC<IProps> = ({
    isLogin,
}) => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<ISignUpCredentials>();


    ///////////////////////////
    // FUNCTIONS //////////////
    ///////////////////////////

    const handleSave = async (
        input: ISignUpCredentials
    ) => {
        try {
            // GET USER
            const user = isLogin ? await UsersApi.login(input) : await UsersApi.signUp(input);
            
            // SET USER
            dispatch(setUser(user));

            // CLOSE MODAL
            dispatch(showHideSignUpLoginModal());

        } catch (error:any) {
            console.error(error.response?.data?.error);

            alert(error.response?.data?.error);
        }
    }

    ///////////////////////////
    // RENDER /////////////////
    ///////////////////////////

  return (
    <Modal show={true}
            onHide={() => {
                dispatch(showHideSignUpLoginModal());
            }}
    >
        <Modal.Header closeButton>
                <Modal.Title>
                    {isLogin ? "Login" : "Register"}
                </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form id="signUpLoginForm" onSubmit={handleSubmit(handleSave)}>
                {
                    !isLogin &&
                    <TextInputField 
                        name="email"
                        label="Email"
                        register={register}
                        registerOptions={{
                            required: "Email is required!"
                        }}
                        error={errors.email}
                        type="text"
                        placeholder="Email..."
                    />
                }

                <TextInputField 
                    name="username"
                    label="Username"
                    register={register}
                    registerOptions={{
                        required: "Username is required!"
                    }}
                    error={errors.username}
                    type="text"
                    placeholder="Username..."
                />

                <TextInputField 
                    name="password"
                    label="Password"
                    register={register}
                    registerOptions={{
                        required: "Password is required!"
                    }}
                    error={errors.password}
                    type="password"
                    placeholder="Password..."
                />
            </Form>
        </Modal.Body>

        <Modal.Footer>

            <Button 
                onClick={() => dispatch(showHideSignUpLoginModal())}
                disabled={isSubmitting}
                variant="danger"
            >
                Close
            </Button>

            <Button
                type="submit"
                form="signUpLoginForm"
                disabled={isSubmitting}
                variant="success"
            >
                Save
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default RegisterLoginModal;