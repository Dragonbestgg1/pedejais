import React from "react";
import style from "../styles/header.module.css";
import ReactModal from "react-modal";
import Login from "./login";
import { BsPersonCircle } from "react-icons/bs";

function Header(){
    return(
        <div className={`${style.header}`}>
            <div className={`${style.align}`}>
                <div className={`${style.routes}`}>
                    <a className={`${style.res}`} href="/">Home</a>
                    <a className={`${style.res}`} href="/films">Films</a>
                    <a className={`${style.res}`} href="/activities">Activities</a>
                    <a className={`${style.res}`} href="/user_profile">Profile</a>
                </div>
                <button onClick className={`${style.log}`}><BsPersonCircle /> Login</button> {/*<BiLogOut /> */}
                <ReactModal>
                    <Login />
                </ReactModal>
            </div>
        </div>
    )
}

export default Header;
