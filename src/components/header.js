import React from "react";
import style from "../styles/header.module.css";

function Header(){
    return(
        <div className={`${style.header}`}>
            <div className={`${style.align}`}>
                <a className={`${style.res}`} href="/">Home</a>
                <a className={`${style.res}`} href="/login">Login</a>
            </div>
        </div>
    )
}

export default Header;
