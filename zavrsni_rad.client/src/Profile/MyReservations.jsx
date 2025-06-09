import { useEffect, useState } from "react";
import axios from "axios";
import { UserSession } from '../Hooks/UserHook';

function MyReservations() {

    const [myReservations, setMyReservations] = useState([]);

    const getUser = UserSession();


    console.log("User id for request:", getUser.id);


    useEffect(() => {

        const getReservations = async () => {

            try {



                const res = await axios.get(`https://localhost:5068/api/reservations/user/${getUser.id}`)

                setMyReservations(res.data);

            } catch(err) {

                console.log(err, "Error getting reservations for this user");
            }
        }

        getReservations();

    }, [getUser.id]);



    const handleRemoveReservation = async (id) => {

        try {

            await axios.delete(`https://localhost:5068/api/reservations/delete/${id}`);

            setMyReservations(reservation => reservation.filter(res => res.id !== id));

        } catch (err) {

            console.error("Failed to delete reservation:", err);
        }
    };


  return (


      <div className="container py-5">
          <h2 className="mb-4">My Reservations</h2>
          <div className="row g-4">

              {myReservations.length === 0 && (
                  <div className="col-12">
                      <div className="alert alert-info text-center" role="alert">
                          You have no current reservations.
                      </div>
                  </div>
              )}


              {myReservations.map(reservation => (

                  <div key={reservation.id} className="col-12 col-md-6 col-lg-4">
                      <div className="card shadow-sm border-success">
                          <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                  <div className="text-success fw-bold">Reserved</div>
                                  <i className="bi bi-check-circle-fill text-success fs-4"></i>
                              </div>
                              <hr />
                              <div className="ps-2">
                                  <p className="mb-1"><i className="bi bi-tag text-primary ms-1"></i> {reservation.term.name}</p>
                                  <p className="mb-1"><i className="bi bi-geo-alt-fill text-danger ms-1"></i> {reservation.term.location}</p>
                                  <p className="mb-1"><i className="bi bi-calendar-event ms-1 me-1"></i> {reservation.date}</p>
                                  <p className="mb-1"><i className="bi bi-clock ms-1 me-1"></i>  {reservation.time}</p>
                              </div>

                              <div className="d-flex justify-content-end mt-3">
                                  <button className="btn btn-danger" onClick={() => handleRemoveReservation(reservation.id)}>Remove Reservation</button>
                              </div>

                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>


  );
 }
export default MyReservations;