import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal';
import { AuthContext } from '../AuthProvider';
import style from '../styles/ticket.module.css';

// Import your icons
import { LuSofa } from "react-icons/lu";

function BuyTicket() {
    const location = useLocation();
    const film = location.state.film;
    const [seats, setSeats] = useState({ max_seats: 0, taken_seats: 0, available_seats: [] });
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isVip, setIsVip] = useState(false);
    const [price, setPrice] = useState(parseFloat(film.price));
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [bankInfo, setBankInfo] = useState('');
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (value) => setCardNumber(value);
    const handleExpiryDateChange = (value) => setExpiryDate(value);
    const handleCvvChange = (value) => setCvv(value);


    useEffect(() => {
        axios.get(`/stage/${film.availabe_seats_id}`)
            .then(response => {
                setSeats(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [film]);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const openErrorModal = () => {
        setErrorModalIsOpen(true);
    };
    const closeErrorModal = () => {
        setErrorModalIsOpen(false);
    };
    const handleBankInfoChange = (event) => {
        setBankInfo(event.target.value);
    };
    const handleModalSubmit = (event) => {
        event.preventDefault();
        // Check if the input fields are empty
        if (!bankInfo) {
            // If they are, open the error modal
            openErrorModal();
        } else {
            closeModal();
            axios.post('/tickets', {
                film_id: film.id,
                activity_id: film.activity_id,
                seat_number: JSON.stringify(selectedSeats),
                price: price,
                status: isVip ? 'vip' : 'standard',
            })
            .then(response => {
                console.log(response.data);
                axios.post('/purchase-history', {
                    user_id: user.userId,
                    ticket_id: response.data.ticket_id,
                    film_id: film.id,
                    activity_id: film.activity_id,
                    price: price,
                    date_aired: location.state.film.airing,
                    payment_status: 'done',
                    refunded: null,
                })
                .then(response => {
                    console.log(response.data);
                    setIsSuccess(true);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
    };
    const handleSeatClick = (seatNumber) => {
        setSelectedSeats(prevSelectedSeats => {
            let newSelectedSeats;
            if (prevSelectedSeats.includes(seatNumber)) {
                // If the seat is already selected, unselect it
                newSelectedSeats = prevSelectedSeats.filter(seat => seat !== seatNumber);
            } else {
                // Otherwise, select the seat
                newSelectedSeats = [...prevSelectedSeats, seatNumber];
            }
            // Update the price based on the number of selected seats
            const newPrice = isVip ? parseFloat(film.price) * 1.5 : parseFloat(film.price);
            setPrice(parseFloat((newPrice * newSelectedSeats.length).toFixed(2))); // Round to 2 decimal places
            return newSelectedSeats;
        });
    };
    const handleVipChange = () => {
        setIsVip(prevIsVip => !prevIsVip);
    };
    
    useEffect(() => {
        const pricePerSeat = isVip ? parseFloat(film.price) * 1.5 : parseFloat(film.price);
        setPrice(parseFloat((pricePerSeat * selectedSeats.length).toFixed(2)));
    }, [isVip, selectedSeats.length]);
    
    
    return (
        <div className={`${style.main}`}>
            <div className={`${style.box}`}>
                <h1>Buy Ticket for {film.film_name}</h1>
                <p>Price: {price.toFixed(2)}</p>
                <label className={`${style.VIPcheck}`}>
                    <input type="checkbox" className={`${style.hide}`} checked={isVip} onChange={handleVipChange} />
                    <span>VIP</span>
                </label>
                <div className={`${style.chairs}`}>
                    {seats.available_seats.map(seatNumber => (
                        <button
                            key={seatNumber}
                            onClick={() => handleSeatClick(seatNumber)}
                            className={`${style.chair}`}
                        >
                            <LuSofa className={selectedSeats.includes(seatNumber) ? `${style.selectedChair}` : `${style.unselectedChair}`} />
                        </button>
                    ))}
                </div>
                <button className={`${style.modalBut}`} onClick={openModal}>Buy Ticket</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Bank Info Modal"
                    className={`${style.modal}`}
                >
                    <h2>Enter Bank Info</h2>
                    <form className={`${style.form}`} onSubmit={handleModalSubmit}>
                    <label className={`${style.label}`}>
                        <input 
                            type='text' 
                            value={cardNumber} 
                            onChange={(e) => {
                                let value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
                                if (value.replace(/\s/g, '').length <= 16) {
                                    handleCardNumberChange(value);
                                }
                            }} 
                            placeholder='credit card number'
                            className={`${style.modalInput}`}
                        />
                        <input 
                            type="text" 
                            value={bankInfo} 
                            onChange={handleBankInfoChange} 
                            placeholder='Card holder name'
                            className={`${style.modalInput}`}
                        />
                        <input 
                            type='text' 
                            value={expiryDate} 
                            onChange={(e) => {
                                let value = e.target.value.replace(/[^\d/]/g, '');
                                if (value.length <= 5) {
                                    handleExpiryDateChange(value);
                                }
                            }} 
                            onKeyUp={(e) => {
                                let value = e.target.value.replace(/[^\d/]/g, '');
                                if (value.length === 2 && !value.includes('/')) {
                                    handleExpiryDateChange(value + '/');
                                }
                            }} 
                            placeholder='expiry date'
                            className={`${style.modalInput}`}
                        />
                        <input 
                            type='text' 
                            value={cvv} 
                            onChange={(e) => {
                                let value = e.target.value.replace(/[^\d]/g, '').slice(0, 3);
                                handleCvvChange(value);
                            }} 
                            placeholder='CVV'
                            className={`${style.modalInput}`}
                        />
                    </label>
                        <button className={`${style.modalSubmit}`} type="submit">Purchase</button>
                    </form>
                    <button className={`${style.modalBut}`} onClick={closeModal}>Close</button>
                </Modal>
                <Modal
                    isOpen={errorModalIsOpen}
                    onRequestClose={closeErrorModal}
                    contentLabel="Error Modal"
                    className={`${style.closeModal}`}
                >
                    <h2>Error</h2>
                    <p>Please fill in all the fields.</p>
                    <button className={`${style.closeModal}`} onClick={closeErrorModal}>Close</button>
                </Modal>
                {isSuccess && (
                    <Modal
                        isOpen={isSuccess}
                        onRequestClose={() => {
                            setIsSuccess(false);
                            navigate('/');
                        }}
                        contentLabel="Success Modal"
                        className={`${style.closeModal}`}
                    >
                        <h2>Success</h2>
                        <p>Your ticket has been purchased successfully.</p>
                        <button onClick={() => {
                            setIsSuccess(false);
                            navigate('/');
                        }}
                        className={`${style.closeModal}`}
                        >Close</button>
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default BuyTicket;
