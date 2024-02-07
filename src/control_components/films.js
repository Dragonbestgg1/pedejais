import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";
import style from '../styles/component.module.css';

function Control_film() {
    const [film, setFilm] = useState({
        film_name: '',
        category: '',
        airing: [new Date()],
        lenght: '00:00:00',
        availabe_seats_id: '',
        price: '',
        imageURL: ''
    });

    const [stages, setStages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const genres = [
        { value: 'Action', label: 'Action' },
        { value: 'Adventure', label: 'Adventure' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Drama', label: 'Drama' },
        { value: 'Fantasy', label: 'Fantasy' },
        { value: 'Horror', label: 'Horror' },
        { value: 'Mystery', label: 'Mystery' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Thriller', label: 'Thriller' },
        { value: 'Western', label: 'Western' }
    ];

    useEffect(() => {
        axios.get('/stage')
            .then(response => {
                setStages(response.data.map(stage => ({ value: Number(stage.id), label: stage.stage })));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = e => {
        setFilm({
            ...film,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (selectedOption, e) => {
        setFilm({
            ...film,
            [e.name]: selectedOption.value
        });
    };

    const handleDateChange = (date, index) => {
        let newAiring = [...film.airing];
        newAiring[index] = date.toISOString().split('T')[0];
        setFilm({
            ...film,
            airing: newAiring
        });
    };
       

    const addDate = () => {
        setFilm({
            ...film,
            airing: [...film.airing, new Date()]
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
    
        // Convert the length from time string to seconds
        let [hours, minutes, seconds] = film.lenght.split(':');
        if (seconds === undefined) {
            seconds = '00';
        }
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            console.error('Invalid time format. It should be HH:MM or HH:MM:SS');
            return;
        }
        const lenghtInSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    
        const filmData = {
            ...film,
            airing: film.airing.map(date => {
                // Check if date is a Date object
                if (!(date instanceof Date)) {
                    // If not, create a new Date object from it
                    date = new Date(date);
                }
                return date.toISOString().split('T')[0]; // Convert each date in the airing array to 'YYYY-MM-DD' format
            }),
            lenght: lenghtInSeconds 
        };
    
        // Log the filmData object
        console.log(filmData);
    
        axios.post('/films', filmData)
            .then(response => {
                console.log(response.data);
                setModalIsOpen(false);
            })
            .catch(error => {
                console.error(error.response);
            });
    };

    return (
        <div>
            <button className={`${style.but}`} onClick={() => setModalIsOpen(true)}>New Film</button>
            <Modal className={`${style.modalF}`} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form className={`${style.modal}`} onSubmit={handleSubmit}>
                    <input className={`${style.inputF}`} type="text" name="film_name" onChange={handleChange} placeholder="Film Name" />
                    <Select className={`${style.select}`} name="category" options={genres} onChange={handleSelectChange} placeholder="Category" />
                    {film.airing.map((date, index) => (
                        <DatePicker className={`${style.inputD}`} key={index} selected={date} onChange={date => handleDateChange(date, index)} />
                    ))}
                    <button className={`${style.ButF}`} type="button" onClick={addDate}>Add another date</button>
                    <input className={`${style.inputF}`} type="time" name="lenght" onChange={handleChange} placeholder="Length" /> 
                    <input className={`${style.inputF}`} type="number" step="0.01" name="price" onChange={handleChange} placeholder="Price" />
                    <input className={`${style.inputF}`} type="text" name="imageURL" onChange={handleChange} placeholder="Image URL" />
                    <Select className={`${style.select}`} name="availabe_seats_id" options={stages} onChange={handleSelectChange} placeholder="Stage" />
                    <button className={`${style.ButF}`} type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
}
export default Control_film;