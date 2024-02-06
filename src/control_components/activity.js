import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from '../styles/component.module.css';

function Control_activity() {
    const [activity, setActivity] = useState({
        activity_name: '',
        dates: [new Date()], // Changed 'date' to 'dates' and made it an array
        availabe_seats_id: ''
    });

    const [stages, setStages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get('/stage')
            .then(response => {
                setStages(response.data.map(stage => ({ value: stage.id, label: stage.stage })));
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

    const handleDateChange = (date, index) => { // Added 'index' parameter
        let newDates = [...activity.dates]; // Copy the current dates
        newDates[index] = date; // Update the specific date
        setActivity({
            ...activity,
            dates: newDates // Update the state with the new dates
        });
    };

    const addDate = () => {
        setActivity({
            ...activity,
            dates: [...activity.dates, new Date()] // Add a new date to the array
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
            <button onClick={() => setModalIsOpen(true)}>New Activity</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="activity_name" onChange={handleChange} placeholder="Activity Name" />
                    {activity.dates.map((date, index) => ( // Map over the dates
                        <DatePicker key={index} selected={date} onChange={date => handleDateChange(date, index)} /> // Pass the index to handleDateChange
                    ))}
                    <button type="button" onClick={addDate}>Add another date</button>
                    <Select name="availabe_seats_id" options={stages} onChange={handleSelectChange} placeholder="Stage" />
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Control_activity;
