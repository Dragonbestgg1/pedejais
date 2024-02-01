// Header.js
import React, { useState } from "react";
import style from "../styles/header.module.css";
import Modal from "react-modal";
import Login from "./login";
import { BsPersonCircle } from "react-icons/bs";

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className={`${style.header}`}>
      <div className={`${style.align}`}>
        <div className={`${style.routes}`}>
          <a className={`${style.res}`} href="/">Home</a>
          <a className={`${style.res}`} href="/films">Films</a>
          <a className={`${style.res}`} href="/activities">Activities</a>
          <a className={`${style.res}`} href="/user_profile">Profile</a>
        </div>
        <button onClick={() => setModalIsOpen(true)} className={`${style.log}`}><BsPersonCircle /> Login</button>
        <Modal className={`${style.modal}`} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <div className={`${style.modalClose}`}>
                <button className={`${style.modalBut}`} onClick={() => setModalIsOpen(false)}>X</button>
            </div>
            <Login closeModal={() => setModalIsOpen(false)} /> {/* Pass closeModal prop here */}
        </Modal>
      </div>
    </div>
  )
}

export default Header;
