import React from 'react'
import utilsStyles from "../styles/utils.module.css";
import {
    useDispatch, useSelector
} from "react-redux";
import { showHideAddEditNoteModal } from '../redux/slices/app.slice';
import { FaPlus } from 'react-icons/fa';
import { getEditingNote, getFetchNotesError, getLoadingNotes } from '../redux/selectors/notes.selectors';
import { Button} from 'react-bootstrap';
import AddEditNoteModal from '../components/notes/AddEditNoteModal.component';
import { getShowAddNoteModal } from '../redux/selectors/app.selectors';
import LoadingNotes from '../components/notes/LoadingNotes.component';
import NotesGrid from '../components/notes/NotesGrid.component';
import { IUser } from '../types/users.types';

interface IProps {
    user: IUser | null;
}

const NotesPage:React.FC<IProps> = ({
    user,
}) => {

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
        user ?

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

        :

        (
            <React.Fragment>
              <h1 className="text-center">You are not signed in</h1>
            </React.Fragment>
          )
    )
}

export default NotesPage