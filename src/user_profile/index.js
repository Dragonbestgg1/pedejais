import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import style from "../styles/user.module.css";
import Modal from "react-modal";
import { AuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { logout, user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        name: '',
        surname: '',
        password: '',
        confirmPassword: '',
        city: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (!user) {
            const fetchUser = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
        
                    console.log(`Fetching data for user ID: ${user.userId}`);
        
                    const userResponse = await axios.get(`/users/${user.userId}`, config);
                    setUser(userResponse.data);
                } catch (err) {
                    console.error(err);
                }
            };
        
            fetchUser();
        } else {
            setForm({
                name: user.name,
                surname: user.surname,
                city: user.city,
                email: user.email,
                phoneNumber: user.phoneNumber
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        // Call your API to save the changes
        // ...

        setEditMode(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return <button onClick={handleLogout}>Logout</button>;
    }

    return (
        <div className={`${style.main}`}>
            <div className={`${style.box}`}>
                <div className={`${style.title}`}>
                    <h1 className={`${style.name}`}>{user.name}</h1>
                </div>
                <div className={`${style.info}`}>
                    <div className={`${style.mainInfo}`}>
                        <p className={`${style.p}`}>Email: {user.email}</p>
                        <p className={`${style.p}`}>City: {user.city}</p>
                        <p className={`${style.p}`}>ID: {user.userId}</p>
                    </div>
                    <div className={`${style.logout}`}>
                        <button className={`${style.logoutBut}`} onClick={handleEdit}>Edit</button>
                        <Modal className={`${style.modal}`} isOpen={editMode} onRequestClose={() => setEditMode(false)}>
                            <form onSubmit={handleSave}>
                                <input type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="Name" />
                                <input type="text" name="surname" value={form.surname} onChange={handleInputChange} placeholder="Surname" />
                                <input type="password" name="password" value={form.password} onChange={handleInputChange} placeholder="Password" />
                                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" />
                                <input type="text" name="city" value={form.city} onChange={handleInputChange} placeholder="City" />
                                <input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" />
                                <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" />
                                <button type="submit">Save</button>
                            </form>
                        </Modal>
                        <button className={`${style.logoutBut}`} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
