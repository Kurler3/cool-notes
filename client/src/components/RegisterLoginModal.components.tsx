import React from 'react'
import { ISignUpCredentials } from '../types/users.types';
import {
    useDispatch
} from "react-redux";
import { Button, Form, Modal } from 'react-bootstrap';
import { showHideSignUpLoginModal } from '../redux/slices/app.slice';
import { useForm } from 'react-hook-form';
import TextInputField from './form/textInputField';

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

    const handleSave = (
        input: ISignUpCredentials
    ) => {
        try {
            
            console.log("Input: ", input);

        } catch (error) {
            console.error(error);
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
                    type="text"
                    placeholder="Password..."
                />
            </Form>
        </Modal.Body>

        <Modal.Footer>

            <Button 
                onClick={() => dispatch(showHideSignUpLoginModal())}
                disabled={isSubmitting}
            >
                Close
            </Button>

            <Button
                type="submit"
                form="signUpLoginForm"
                disabled={isSubmitting}
            >
                Save
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default RegisterLoginModal;