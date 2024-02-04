import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../styles/login.module.css";
import { AuthContext } from '../AuthProvider';

function Login({ closeModal }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { name: username, password });
            console.log(response.data); // Log the server response
    
            if (response.data.message === 'Login successful') {
                login(response.data.userId, username);
                // Store the user's privilege in local storage
                localStorage.setItem('userPrivilage', response.data.privilage);
                if (typeof closeModal === 'function') {
                    closeModal();
                }
                navigate('/user_profile');
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            closeModal();
            navigate('/login', { state: { error: err.response.data.message } });
        }
    };
    

    const handleRegister = () => {
        if (typeof closeModal === 'function') {
            closeModal();
        }
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
