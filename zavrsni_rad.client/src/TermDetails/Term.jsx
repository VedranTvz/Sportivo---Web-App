import { Rating } from "@mui/material";
import React from "react";


const Term = ({ term, image, onDetailsClick, onReservationClick, onRatingClick, user }) => {


    return (

        <div className="col" key={term.id}>
            <div className="card h-100 shadow-sm">
                <img
                    src={image}
                    alt={term.name}
                    className="card-img-top"
                    style={{ height: "330px", objectFit: "cover" }}
                />


                <div className="card-body">
                    <h3 className="card-title h5 fw-bold mb-2">{term.name}</h3>
                    <div className="text-muted small mb-1"><i className="bi bi-geo-alt-fill text-danger"></i> {term.location}</div>
                    <div className="text-muted small mb-1">Category: {term.category.name}</div>
                    <div className="text-muted small mt-2">
                        <Rating name="read-only" value={term.averageRating} precision={0.5} readOnly size="small" />
                    </div>


                    <div className="gap-2 mt-3">
                        <button className="btn btn-outline-warning w-100" disabled={!user} onClick={() => onRatingClick(term.id)}>
                            Leave Rating
                        </button>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-outline-success flex-grow-1" onClick={() => onDetailsClick(term.id)}>Details</button>
                        <button className="btn btn-success flex-grow-1" onClick={() => onReservationClick(term.id)} disabled={!user}>
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Term;
