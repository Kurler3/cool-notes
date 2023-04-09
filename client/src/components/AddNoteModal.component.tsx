import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

interface IState {
    title: string;
    text: string;
}

const AddNoteModal: React.FC = () => {

    const [input, setInput] = useState<IState>({
        title: "",
        text: "",
    })

    return (
        <Modal show={true}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>
        </Modal>
    )
}

export default AddNoteModal;