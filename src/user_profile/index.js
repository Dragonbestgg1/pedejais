import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import style from "../styles/user.module.css";
import { AuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const { logout, userId } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
    
                console.log(`Fetching data for user ID: ${userId}`);
    
                const userResponse = await axios.get(`/users/${userId}`, config);
                setUser(userResponse.data);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchUser();
    }, [userId]);
    

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
                        <p className={`${style.p}`}>ID: {user.id}</p>
                    </div>
                    <div className={`${style.logout}`}>
                        <button className={`${style.logoutBut}`}>Edit</button>
                        <button className={`${style.logoutBut}`} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
