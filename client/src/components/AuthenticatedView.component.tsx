import React from 'react'
import utilsStyles from "../styles/utils.module.css";
import {
    useDispatch, useSelector
} from "react-redux";
import { showHideAddEditNoteModal } from '../redux/slices/app.slice';
import { FaPlus } from 'react-icons/fa';
import { getEditingNote, getFetchNotesError, getLoadingNotes, getNotesState } from '../redux/selectors/notes.selectors';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { INote } from '../types/note.types';
import Note from './notes/Note.component';
import AddEditNoteModal from './notes/AddEditNoteModal.component';
import { getShowAddNoteModal } from '../redux/selectors/app.selectors';
import LoadingNotes from './notes/LoadingNotes.component';
import NotesGrid from './notes/NotesGrid.component';


const AuthenticatedView = () => {

    ////////////////////////
    // REDUX ///////////////
    ////////////////////////

    const dispatch = useDispatch();

    // NOTES STATE
    const fetchNotesError = useSelector(getFetchNotesError);
    const loadingNotes = useSelector(getLoadingNotes);
    const editingNote = useSelector(getEditingNote);

    // APP STATE
    const showAddEditNoteModal = useSelector(getShowAddNoteModal);

    ////////////////////////
    // RENDER //////////////
    ////////////////////////

    return (
        <React.Fragment>

            <Button className={`${utilsStyles.blockCenter} mb-4 gap-2 ${utilsStyles.flexCenter}`} onClick={() => dispatch(showHideAddEditNoteModal())}>
                <FaPlus />
                Add new note
            </Button>

            {
                (fetchNotesError) &&
                <div className="mx-auto w-100 d-flex justify-content-center">
                    <p>Something went wrong :( Please refresh the page.</p>
                </div>
            }

            {
                loadingNotes ?
                    (
                        <LoadingNotes />
                    )
                    :
                    (
                        <NotesGrid />
                    )
            }

            {
                showAddEditNoteModal &&
                <AddEditNoteModal
                    editingNote={editingNote}
                />
            }

        </React.Fragment>
    )
}

export default AuthenticatedView