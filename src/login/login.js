// LoginErrorPage.js
import React from "react";
import { useLocation } from "react-router-dom";
import style from "../styles/loginErr.module.css";

function LoginErrorPage() {
    const location = useLocation();
    const error = location.state ? location.state.error : null;

    return (
        <div className={style.module}>
            <div className={style.main}>
                <div className={style.title}>
                    <h1 className={style.h1}>Login</h1>
                </div>
                {error && <p className={style.error}>{error}</p>}
                <form className={style.inputCon}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className={style.input}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className={style.input}
                    />
                    <button type="submit" className={style.submitButton}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginErrorPage;
