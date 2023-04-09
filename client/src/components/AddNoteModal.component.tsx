import React, { useCallback } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { showHideAddNoteModal } from '../redux/slices/app.slice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../types/note.types';
import { NotesApi } from '../api/notes.api';
import { addNote } from '../redux/slices/notes.slice';

const AddNoteModal: React.FC = () => {

    //////////////////////
    // DATA //////////////
    //////////////////////

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<NoteInput>();


    //////////////////////
    // FUNCTIONS /////////
    //////////////////////

    const onSaveNote = async (input: NoteInput) => { 

        try {

            // CREATE NEW NOTE
            const newNote = await NotesApi.createNote(input);

            // PUSH TO NOTES ARRAY
            dispatch(addNote(newNote));

            // CLOSE MODAL
            dispatch(showHideAddNoteModal());
            
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    //////////////////////
    // RENDER ////////////
    //////////////////////

    return (
        <Modal show={true}
            onHide={() => dispatch(showHideAddNoteModal())}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form id="addNoteForm" onSubmit={handleSubmit(onSaveNote)}>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Title
                        </Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Title..."
                            isInvalid={!!errors.title}
                            {
                                ...register(
                                    "title", 
                                    {
                                        required: "Title is required!"
                                    }
                                )
                            }
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Text
                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text..."
                            isInvalid={!!errors.text}
                            {
                                ...register('text', 
                                    {
                                        required: "Text is required!"
                                    }
                                )
                            }
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.text?.message}
                        </Form.Control.Feedback>

                    </Form.Group>

                </Form>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    onClick={() => dispatch(showHideAddNoteModal())}
                    disabled={isSubmitting}
                >
                    Close
                </Button>

                <Button
                    type="submit"
                    form="addNoteForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>


            </Modal.Footer>

        </Modal>
    )
}

export default AddNoteModal;