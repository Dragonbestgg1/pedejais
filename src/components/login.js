import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../styles/login.module.css";

function Login({ closeModal }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            // handle successful login here
        } catch (err) {
            closeModal(); // Close the modal
            navigate('/login', { state: { error: err.response.data.message } });
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className={style.module}>
            <div className={style.main}>
                <div className={style.title}>
                    <h1 className={style.h1}>Login</h1>
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
                    <button type="submit" className={style.submitButton}>Login</button>
                </form>
                <div className={`${style.reroute}`}>
                    <h1 className={`${style.rerouteH1}`}>Not registered?</h1>
                    <div onClick={handleRegister} className={`${style.rerouteButton}`}>Register</div>
                </div>
            </div>
        </div>
    );
} 

export default Login;
