import { useState } from "react";
import style from "../styles/login.module.css";
import { IconName } from "react-icons/ci";


function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className={`${style.module}`}>
        <div className={`${style.main}`}>
            <div className={`${style.title}`}>
                <h1 className={style.h1}>Login</h1>
            </div>
            <div className={`${style.inputCon}`}>
                <input className={`${style.input}`} placeholder="Username"></input>
            </div>
        </div>
        </div>
    )
}

export default Login;