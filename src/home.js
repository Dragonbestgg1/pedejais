import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../src/styles/home.module.css"

function Home(){
    const [films, setFilms] = useState([]);

    useEffect(() => {
        axios.get('/films')
            .then(response => {
                setFilms(response.data.slice(0, 5));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return(
        <div className={`${style.main}`}>
            <div className={`${style.display}`}>
                <div className={`${style.events}`}>
                    {films.map((film, index) => (
                        <div key={index}>
                            {/* Display film data here */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;