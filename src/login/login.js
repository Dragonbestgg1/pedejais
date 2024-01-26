import { useState } from "react";
import style from "../styles/login.module.css";


function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className={`${style.main}`}>
            <h1 className={style.title}>Login</h1>
        </div>
    )
}