import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { ChevronDown } from 'react-feather'; 
import style from '../styles/register.module.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <ChevronDown color="#FFCF07" /> 
        </components.DropdownIndicator>
    );
};

function Register() {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        birthMonth: '',
        birthYear: '',
        city: '',
        phoneNumber: ''
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = Array.from({length: 31}, (_, i) => i + 1).map((day) => ({ value: day, label: day }));
    const months = Array.from({length: 12}, (_, i) => ({ value: i + 1, label: monthNames[i] }));
    const years = Array.from({length: 2024 - 1970 + 1}, (_, i) => i + 1970).map((year) => ({ value: year, label: year }));

    const handleSelectChange = (selectedOption, { name }) => {
        setForm({
            ...form,
            [name]: selectedOption.value
        });
    };

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const isFormEmpty = [
        'name', 
        'surname', 
        'email', 
        'password', 
        'confirmPassword', 
        'birthDate', 
        'birthMonth', 
        'birthYear'
    ].some((fieldName) => form[fieldName] === '');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (form.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            setModalIsOpen(true);
            return;
        }
    
        if (form.password !== form.confirmPassword) {
            setErrorMessage('Password and Confirm Password must be the same.');
            setModalIsOpen(true);
            return;
        }
        
        if (!isFormEmpty) {
            axios.post('/register', form)
                .then(response => {
                    console.log(response.data);
                    navigate('/user_profile');
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage('An error occurred while registering.');
                    setModalIsOpen(true);
                });
        }
    };    

    return (
        <div className={`${style.main}`}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Error Message"
                className={`${style.modal}`}
            >
                <h2>Error</h2>
                <p>{errorMessage}</p>
                <button className={`${style.button}`} onClick={() => setModalIsOpen(false)}>X</button>
            </Modal>

            <div className={`${style.Page}`}>
                <h1 className={`${style.h1}`}>Register</h1>
            </div>
            <form className={`${style.form}`} onSubmit={handleSubmit}>
                <div className={`${style.person}`}>
                    <input className={`${style.name}`} type="text" name="name" placeholder="Name:" onChange={handleInputChange} />
                    <input className={`${style.surname}`} type="text" name="surname" placeholder="Surname:" onChange={handleInputChange} />
                </div>
                <div className={`${style.birth}`}>
                    <Select
                        className={`${style.date}`}
                        name="birthDate"
                        options={days}
                        onChange={handleSelectChange}
                        placeholder="BirthDay"
                        components={{ DropdownIndicator }}
                    />
                    <Select
                        className={`${style.month}`}
                        name="birthMonth"
                        options={months}
                        onChange={handleSelectChange}
                        placeholder="Birth Month"
                        components={{ DropdownIndicator }}
                    />
                    <Select
                        className={`${style.year}`}
                        name="birthYear"
                        options={years}
                        onChange={handleSelectChange}
                        placeholder="Birth Year"
                        components={{ DropdownIndicator }}
                    />
                </div>
                <input className={`${style.other}`} type="email" name="email" placeholder="Email:" onChange={handleInputChange} />
                <input className={`${style.other}`} type="tel" name="phoneNumber" placeholder="Phone Number:" onChange={handleInputChange} />
                <input className={`${style.other}`} type="text" name="city" placeholder="City:" onChange={handleInputChange} />
                <input className={`${style.other}`} type="password" name="password" placeholder="Password:" onChange={handleInputChange} />
                <input className={`${style.other}`} type="password" name="confirmPassword" placeholder="Confirm Password:" onChange={handleInputChange} />
                <button type="submit" disabled={isFormEmpty} className={`${style.submitButton}`}>Register</button>
            </form>
        </div>
    );
}

export default Register;
