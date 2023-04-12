import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingNotes = () => {
    return (
        <div className="mx-auto w-100 d-flex justify-content-center">
            <Spinner
                animation="border"
                variant="primary"
                className="mx-auto"
            />
        </div>
    )
}

export default LoadingNotes