import React, { useState } from "react";
import axios from "axios";
import style from "../styles/register.module.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', { username, password });
            setMessage("User registered successfully");
        } catch (err) {
            setMessage("Registration failed");
        }
    };

    return (
        <div className={style.module}>
            <div className={style.main}>
                <div className={style.title}>
                    <h1 className={style.h1}>Register</h1>
                </div>
                <form onSubmit={handleSubmit} className={style.inputCon}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className={style.input}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className={style.input}
                    />
                    <button type="submit" className={style.submitButton}>Register</button>
                </form>
                {message && <p className={style.message}>{message}</p>}
            </div>
        </div>
    );
}

export default Register;
