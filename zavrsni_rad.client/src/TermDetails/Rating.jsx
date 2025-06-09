import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { UserSession } from "../Hooks/UserHook";
import { toast } from 'react-toastify';

const RatingComponent = () => {


    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);



    const navigate = useNavigate();

    const getUser = UserSession();

    const handleSubmit = async () => {

        try {
            await axios.post("https://localhost:5068/api/ratings", 

                {
                    Score: rating,
                    TermId: parseInt(id),
                    UserId: getUser.id
                }
            );

            setSubmitted(true);

        } catch (error) {
            console.error(error);

               toast.info("You have already submitted a rating for this reservation.");
           
        }
    };

    const handleClose = () => {
        navigate("/");
    };

    return (


        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="rating-box shadow p-4 rounded bg-white" style={{ width: "400px" }}>

            
                  
                <h3 className="mb-3 text-center">Leave a Rating</h3>

                {!submitted ? (
                    <>
                        <div className="d-flex justify-content-center">
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                size="large"
                            />
                        </div>

                        <button
                            className="btn btn-success mt-3 w-100"
                            onClick={handleSubmit}
                            disabled={rating === 0}
                        >
                            Submit
                        </button>

                        <button className="btn btn-secondary mt-2 w-100" onClick={handleClose}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-success mt-3 text-center">Thank you for your rating!</p>
                        <button className="btn btn-primary w-100" onClick={handleClose}>
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RatingComponent;
