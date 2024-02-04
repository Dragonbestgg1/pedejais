import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function Control_stage() {
    const [seat, setSeat] = useState({
        id: '',
        max_seats: '',
        available_seats: '',
        taken_seats: '',
        stage: ''
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleChange = e => {
        setSeat({
            ...seat,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/seats', seat)
            .then(response => {
                console.log(response.data);
                setModalIsOpen(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Open Form</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <input type="number" name="max_seats" onChange={handleChange} placeholder="Max Seats" />
                    <input type="text" name="stage" onChange={handleChange} placeholder="Stage" />
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Control_stage;
