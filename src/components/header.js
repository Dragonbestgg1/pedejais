import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import style from "../styles/header.module.css";
import Modal from "react-modal";
import Login from "./login";
import { BsPersonCircle } from "react-icons/bs";
import { AuthContext } from '../AuthProvider';

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, name } = useContext(AuthContext);
  const privilege = localStorage.getItem('userPrivilage');

  const handleButtonClick = () => {
    if (isAuthenticated) {
      window.location.href = '/user_profile';
    } else {
      setModalIsOpen(true);
    }
  };

  return (
    <div className={`${style.header}`}>
      <div className={`${style.align}`}>
      <div className={`${style.routes}`}>
          <a className={`${style.res}`} href="/">Home</a>
          <a className={`${style.res}`} href="/films">Films</a>
          <a className={`${style.res}`} href="/activities">Activities</a>
          <a className={`${style.res}`} href="/announcements">Announcements</a>
          {privilege === '1' && <a className={`${style.res}`} href="/control">Control</a>}
      </div>
        <button onClick={handleButtonClick} className={`${style.log}`}>
          <BsPersonCircle /> {name || 'Login'}
        </button>
        <Modal className={`${style.modal}`} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <div className={`${style.modalClose}`}>
                <button className={`${style.modalBut}`} onClick={() => setModalIsOpen(false)}>X</button>
            </div>
            <Login closeModal={() => setModalIsOpen(false)} />
        </Modal>
      </div>
    </div>
  )
}

export default Header;
