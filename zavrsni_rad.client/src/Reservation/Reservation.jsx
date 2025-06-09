import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserSession } from '../Hooks/UserHook';
import { toast } from 'react-toastify';

const Reservation = () => {



    const { id } = useParams();
    const navigate = useNavigate();

    const [term, setTerm] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reservationConfirmed, setReservationConfirmed] = useState(false);
    const [reservedTimes, setReservedTimes] = useState([]);

    const [lookingForPartner, setLookingForPartner] = useState(false);




    useEffect(() => {

        axios.get(`https://localhost:5068/api/Terms/${id}`)
            .then(res => setTerm(res.data))
            .catch(err => console.error('Error fetching term data', err));

    }, [id]);



    useEffect(() => {

        const fetchReservedTimes = async () => {
            if (!date) return;

            try {
                const response = await axios.get(
                    `https://localhost:5068/api/Reservations/reserved/${id}/${date}`
                );
                setReservedTimes(response.data); 

            } catch (err) {
                console.error("Error fetching reserved times", err);
            }
        };

        fetchReservedTimes();

    }, [date, id]);




    const handleReservation = async () => {

        if (!date || !time) {

            toast.info("Please select both date and time.");
            return;
        }


        const getUser = UserSession();



        const reservationData = {
            Date: date,
            Time: time + ":00",
            TermId: parseInt(id),
            UserId: getUser.id,
            LookingForPartner: lookingForPartner
        };

        console.log(reservationData);

        try {

            await axios.post("https://localhost:5068/api/Reservations", reservationData);

          
            setReservationConfirmed(true);

        } catch (err) {

            console.log("Reservation failed", err.response?.data || err.message);
        }
    };


  
    return (

        <>
            
            <div className="modal-backdrop show"></div>

           
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {reservationConfirmed
                                    ? "Reservation Confirmed"
                                    : `Reserve ${term?.name}`}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => navigate("/")}
                            ></button>
                        </div>

                        <div className="modal-body">
                            {reservationConfirmed ? (
                                <>
                                    <p>Your reservation for <strong>{term?.name}</strong> has been confirmed.</p>
                                    <p><i className="bi bi-calendar-event ms-1 me-1"></i> {date}</p>
                                    <p><i className="bi bi-clock ms-1 me-1"></i> {time}</p>
                                </>
                            ) : (
                                <>
                                        <p><i className="bi bi-geo-alt-fill text-danger ms-1"></i> {term?.location}</p>

                                    <div className="mb-3">
                                            <label htmlFor="date" className="mb-1"><i class="bi bi-calendar-event ms-1"></i></label>
                                        <input
                                                type="date"
                                                id="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="form-control"
                                                min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                        <div className="mb-3">
                                            <label htmlFor="time" className="mb-1"><i class="bi bi-clock ms-1"></i></label>

                                            <select

                                                id="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                className="form-control">


                                                <option value="" disabled>
                                                    Please select time...
                                                </option>

                                                {[
                                                    "10:00", "11:00", "12:00", "13:00", "14:00",
                                                    "15:00", "16:00", "17:00", "18:00", "19:00"
                                                ].map(t => (
                                                    <option key={t} value={t} disabled={reservedTimes.includes(t)}>
                                                        {t} {reservedTimes.includes(t) ? "(Reserved)" : ""}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>

                                        <div className="form-check mt-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="partnerCheckbox"
                                                checked={lookingForPartner}
                                                onChange={(e) => setLookingForPartner(e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor="partnerCheckbox">
                                                Looking for partner
                                            </label>
                                        </div>

                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            {reservationConfirmed ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/")}
                                >
                                    Back to Home
                                </button>
                            ) : (
                                <button className="btn btn-success" onClick={handleReservation}>
                                    Reserve
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reservation;
