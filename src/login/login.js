import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider'; 
import style from "../styles/loginErr.module.css";

function LoginErrorPage() {
    const location = useLocation();
    const error = location.state ? location.state.error : null;
    const [modalIsOpen, setModalIsOpen] = useState(!!error);
    const [name, setname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { name, password });
            console.log(response.data); // Log the server response
    
            if (response.data.message === 'Login successful') {
                login(response.data.userId, name);
                navigate('/user_profile');
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            setModalIsOpen(true);
        }
    };
    
    
    return (
        <div className={style.module}>
            <div className={style.main}>
                <div className={style.title}>
                    <h1 className={style.h1}>Login</h1>
                </div>
                <Modal
                    className={`${style.errorModal}`}
                    isOpen={modalIsOpen} 
                    onRequestClose={closeModal}
                >
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button className={`${style.closeModal}`} onClick={closeModal}>X</button>
                </Modal>
                <form onSubmit={handleSubmit} className={style.inputCon}>
                    <input 
                        type="text" 
                        placeholder="name" 
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className={style.input}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={style.input}
                    />
                    <button type="submit" className={style.submitButton}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginErrorPage;
