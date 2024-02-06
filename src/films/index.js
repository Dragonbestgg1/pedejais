import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/films.module.css";

function Films() {
    const [films, setFilms] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [searchGenre, setSearchGenre] = useState("");
    const [sortBy, setSortBy] = useState("");

    const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"]; // replace this with your list of genres

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
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    console.log(films);

    let filteredFilms = films.filter(film => {
        // If film.airing is an array, iterate over it
        if (Array.isArray(film.airing)) {
            return film.airing.some(dateStr => {
                // Remove square brackets and double quotes from dateStr
                dateStr = dateStr.replace(/[\[\]"]/g, '');
                dateStr = dateStr.replace(/"/g, '');
                if (isNaN(Date.parse(dateStr))) {
                    console.error('Invalid date:', dateStr);
                    return false;
                }
                let filmDate = new Date(dateStr).toISOString().split('T')[0]; // Convert to ISO string and split to get the date part
                return filmDate.includes(searchDate);
            }) && (searchGenre === "" || film.category === searchGenre);
        } else {
            console.error('Invalid date:', film.airing);
            return false;
        }
    });
    

    if (sortBy === "name") {
        filteredFilms.sort((a, b) => a.film_name.localeCompare(b.film_name));
    } else if (sortBy === "date") {
        filteredFilms.sort((a, b) => new Date(b.airing) - new Date(a.airing));
    }

    const handleDateChange = (e) => {
        setSearchDate(e.target.value);
        setSearchGenre("");
    };
    
    const handleGenreChange = (e) => {
        setSearchGenre(e.target.value);
    };
    
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setSearchDate("");
        setSearchGenre("");
    };
    return (
        <div className={`${style.main}`}>
            <div className={`${style.options}`}>{/*options */}
                <div>{/*date search */}
                <select value={searchDate} onChange={handleDateChange}>
                    {dates.map((date, index) => (
                        <option key={index} value={date}>
                            {index === 0 ? `Today ${new Date(date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })}` : 
                            index === 1 ? `Tomorrow ${new Date(date).toLocaleDateString(undefined, {  month: 'numeric', day: 'numeric', year: 'numeric' })}` :
                            new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </option>
                    ))}
                </select>
                </div>
                <div>{/* genre search*/}
                    <select value={searchGenre} onChange={handleGenreChange}>
                        <option value="">All Genres</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
                <div>{/*  sort by  */}
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="">Sort by</option>
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>
            <div className={`${style.display}`}>{/*display */}
                {filteredFilms.map((film, index) => (
                    <div key={index}>{/*film display */}
                        <div className={`${style.container1}`}>{/*container */}
                            <div className={`${style.contain}`}>{/*img */}
                                <img className={`${style.img}`} src={film.imageURL}></img>
                            </div>
                            <div className={`${style.adjust}`}>
                                <div className={`${style.content}`}>{/*rest */}
                                    <div className={`${style.title}`}>{/*title */}
                                        <h1 className={`${style.h1}`}>{film.film_name}</h1>
                                    </div>
                                    <div className={`${style.date}`}>{/*airing info */}
                                    <h1 className={`${style.dateH}`}>{new Date(film.airing).toLocaleTimeString()}</h1>
                                    </div>
                                    <div className={`${style.cat}`}>{/*rest */}
                                        <p>{film.category}</p>
                                    </div>
                                </div>
                                <div className={`${style.button}`}>
                                    <button className={`${style.but}`}>
                                        Buy ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Films;
