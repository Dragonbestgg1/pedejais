import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";

function Control_film() {
    const [film, setFilm] = useState({
        film_name: '',
        category: '',
        airing: [new Date()], // 'airing' is already an array
        length: '',
        availabe_seats_id: ''
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
                setStages(response.data.map(stage => ({ value: stage.id, label: stage.stage })));
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
        newAiring[index] = date;
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

        axios.post('/films', film)
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
            <button onClick={() => setModalIsOpen(true)}>New Film</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="film_name" onChange={handleChange} placeholder="Film Name" />
                    <Select name="category" options={genres} onChange={handleSelectChange} placeholder="Category" />
                    {film.airing.map((date, index) => (
                        <DatePicker key={index} selected={date} onChange={date => handleDateChange(date, index)} />
                    ))}
                    <button type="button" onClick={addDate}>Add another date</button>
                    <input type="number" name="length" onChange={handleChange} placeholder="Length" />
                    <Select name="availabe_seats_id" options={stages} onChange={handleSelectChange} placeholder="Stage" />
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Control_film;
