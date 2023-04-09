import React, { useCallback } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { showHideAddNoteModal } from '../redux/slices/app.slice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../types/note.types';
import { NotesApi } from '../api/notes.api';

const AddNoteModal: React.FC = ({

}) => {

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

    const onSaveNote = useCallback(async (input: NoteInput) => { 

        try {

            const noteResponse = await NotesApi.createNote(input);

            

        } catch (error) {
            console.error(error);
            alert(error);
        }

    },[]);

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

                <Form id="addNoteForm">

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Title
                        </Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Title..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Text
                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text..."
                        />
                    </Form.Group>

                </Form>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    onClick={() => dispatch(showHideAddNoteModal())}
                >
                    Close
                </Button>

                <Button
                    type="submit"
                    form="addNoteForm"
                >
                    Save
                </Button>


            </Modal.Footer>

        </Modal>
    )
}

export default AddNoteModal;