import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { setEditingNote, showHideAddEditNoteModal } from '../redux/slices/app.slice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { INote, NoteInput } from '../types/note.types';
import { NotesApi } from '../api/notes.api';
import { addNote, updateNote } from '../redux/slices/notes.slice';
import TextInputField from './form/TextInputField';

interface IProps {
    editingNote: INote | null;
}

const AddEditNoteModal: React.FC<IProps> = ({editingNote}) => {

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
    } = useForm<NoteInput>({
        defaultValues: {
            ...editingNote
        }
    });


    //////////////////////
    // FUNCTIONS /////////
    //////////////////////

    const onSaveNewNote = async (input: NoteInput) => { 

        try {

            // CREATE NEW NOTE
            const newNote = await NotesApi.createNote(input);

            // PUSH TO NOTES ARRAY
            dispatch(addNote(newNote));

            // CLOSE MODAL
            dispatch(showHideAddEditNoteModal());
            
        } catch (error) {
            console.error(error);
            alert(error);
        } 
    }

    const onSaveEditingNote = async (input: NoteInput) => {
        try {

            // UPDATE NOTE
            const updatedNote = await NotesApi.updateNote(
                editingNote!._id,
                input,
            );

            // SUBSTITUTE IN NOTES ARRAY
            dispatch(updateNote(updatedNote));

            // CLOSE MODAL
            dispatch(showHideAddEditNoteModal());

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
            onHide={() => {
                dispatch(showHideAddEditNoteModal());
                dispatch(setEditingNote(null));
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {editingNote?"Edit":"Add"} Note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form id="addNoteForm" onSubmit={handleSubmit(editingNote ? onSaveEditingNote : onSaveNewNote)}>

                    <TextInputField 
                        name="title"
                        label="Title"
                        register={register}
                        registerOptions={{
                            required: "Title is required!"
                        }}
                        error={errors.title}
                        type="text"
                        placeholder="Title..."
                    />

                    <TextInputField 
                        name="text"
                        label="Text"
                        register={register}
                        registerOptions={{
                            required: "Text is required!"
                        }}
                        error={errors.text}
                        as="textarea"
                        rows={5}
                        placeholder="Text..."
                    />

                </Form>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    onClick={() => dispatch(showHideAddEditNoteModal())}
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

export default AddEditNoteModal;