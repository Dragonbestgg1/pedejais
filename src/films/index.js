import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/films.module.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function Films() {
    const [films, setFilms] = useState([]);
    const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchGenre, setSearchGenre] = useState("");
    const [searchFilm, setSearchFilm] = useState("");
    const navigate = useNavigate();
    const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"]; // replace this with your list of genres

    const handleBuyTicketClick = (film, date) => {
        const filmWithSelectedDate = { ...film, airing: date };
        navigate('/ticket', { state: { film: filmWithSelectedDate } });
    };
    
    // Generate an array of dates for the next 2 weeks
    const dates = Array.from({length: 28}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString().split('T')[0]; // Use ISO string and split to get the date part
    });

    useEffect(() => {
        axios.get('/films')
            .then(response => {
                setFilms(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    let filteredFilms = films.filter(film => {
        if (searchDate !== "" && !film.airing.some(date => date === searchDate)) return false;
        if (searchGenre !== "" && film.category.toLowerCase() !== searchGenre.toLowerCase()) return false;
        if (searchFilm !== "" && !film.film_name.toLowerCase().includes(searchFilm)) return false;
        return true;
    });    
      
    const dateOptions = dates.map((date, index) => ({
        value: date,
        label: index === 0 ? `Today ${new Date(date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })}` : 
        index === 1 ? `Tomorrow ${new Date(date).toLocaleDateString(undefined, {  month: 'numeric', day: 'numeric', year: 'numeric' })}` :
        new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
    }));

    const genreOptions = genres.map((genre, index) => ({
        value: genre,
        label: genre
    }));
    const handleDateChange = (selectedDate) =>{
        setSearchDate(selectedDate);
        setSearchGenre("")
    };
    
    const handleGenreChange = (selectedOption) => {
        setSearchGenre(selectedOption ? selectedOption.value.toLowerCase() : "");
    };

    const handleFilmChange = (e) => {
        setSearchFilm(e.target.value.toLowerCase());
    };
    return (
        <div className={`${style.main}`}>
            <div className={`${style.options}`}>{/*options */}
                <div>{/*date search */}
                    <Select
                        value={dateOptions.find(option => option.value === searchDate)}
                        onChange={option => handleDateChange(option.value)}
                        options={dateOptions}
                    />
                </div>
                <div>{/* genre search*/}
                <Select
                    value={genreOptions.find(option => option.value === searchGenre)}
                    onChange={option => handleGenreChange(option)}
                    options={genreOptions}
                />
                </div>
                <div>{/*  sort by  */}
                    <div className={`${style.options}`}>
                        <input className={`${style.input}`} type="text" placeholder="Search film" onChange={handleFilmChange} />
                    </div>
                </div>
            </div>
            <div className={`${style.display}`}>{/*display */}
            {filteredFilms.length > 0 && filteredFilms.flatMap((film, index) => 
                film.airing.filter(date => date === searchDate).map((date, dateIndex) => (
                        <div key={`${film.id}-${dateIndex}`}>{/*film display */}
                            <div className={`${style.container1}`}>{/*container */}
                                <div className={`${style.contain}`}>{/*img */}
                                    <img className={`${style.img}`} src={film.imageURL}></img>
                                </div>
                                <div className={`${style.adjust}`}>
                                    <div className={`${style.content}`}>{/*rest */}
                                        <div className={`${style.title}`}>{/*title */}
                                            <h1 className={`${style.h1}`}>{film.film_name}</h1>
                                        </div>
                                        <div className={`${style.strong}`}>
                                            <div className={`${style.cat}`}>
                                                <p>{film.category}</p>
                                            </div>
                                            <div className={`${style.price}`}>{/*price */}
                                                <p>{`Price: ${film.price}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${style.button}`}>
                                        <button className={`${style.but}`} onClick={() => handleBuyTicketClick(film, date)}>
                                            Buy ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Films;
