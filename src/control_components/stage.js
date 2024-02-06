import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import style from '../styles/component.module.css';

function Control_stage() {
    const [seat, setSeat] = useState({
        id: '',
        max_seats: '',
        available_seats: '',
        taken_seats: '',
        stage: ''
    });

    const [inputModalIsOpen, setInputModalIsOpen] = useState(false);
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleChange = e => {
        setSeat({
            ...seat,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!seat.max_seats || !seat.stage) {
            setModalMessage('Input fields are not filled');
            setMessageModalIsOpen(true);
            return;
        }

        axios.post('/stage', seat)
            .then(response => {
                console.log(response.data);
                setModalMessage('Stage added successfully!');
                setMessageModalIsOpen(true);
                setInputModalIsOpen(false); // Close the input modal
            })
            .catch(error => {
                console.error(error);
                setModalMessage('There was an error');
                setMessageModalIsOpen(true);
            });
    };

    return (
        <div>
            <button className={`${style.but}`} onClick={() => setInputModalIsOpen(true)}>New Stage</button>
            <Modal className={`${style.modal}`} isOpen={inputModalIsOpen} onRequestClose={() => setInputModalIsOpen(false)}>
                <form className={`${style.form}`} onSubmit={handleSubmit}>
                    <input className={`${style.input}`} type="number" name="max_seats" onChange={handleChange} placeholder="Max Seats" />
                    <input className={`${style.input}`} type="text" name="stage" onChange={handleChange} placeholder="Stage" />
                    <button className={`${style.But}`} type="submit">Submit</button>
                </form>
            </Modal>
            <Modal isOpen={messageModalIsOpen} onRequestClose={() => setMessageModalIsOpen(false)}>
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
}

export default Control_stage;
