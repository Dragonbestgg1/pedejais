import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Control_activity() {
    const [activity, setActivity] = useState({
        activity_name: '',
        date: new Date(),
        availabe_seats_id: ''
    });

    const [seats, setSeats] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // Fetch available seats from the database
        axios.get('/seats')
            .then(response => {
                setSeats(response.data.map(seat => ({ value: seat.id, label: seat.name })));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = e => {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (selectedOption, e) => {
        setActivity({
            ...activity,
            [e.name]: selectedOption.value
        });
    };

    const handleDateChange = date => {
        setActivity({
            ...activity,
            date: date
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/activities', activity)
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
                    <input type="text" name="activity_name" onChange={handleChange} placeholder="Activity Name" />
                    <DatePicker selected={activity.date} onChange={handleDateChange} />
                    <Select name="availabe_seats_id" options={seats} onChange={handleSelectChange} placeholder="Available Seats ID" />
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Control_activity;
