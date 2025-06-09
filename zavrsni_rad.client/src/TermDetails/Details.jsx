import {
    APIProvider,
    Map,
    useMap,
    useMapsLibrary,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserSession } from '../Hooks/UserHook';
import { toast } from 'react-toastify';

function Details() {


    const { id } = useParams();
    const [term, setTerm] = useState(null);
    const [tab, setTab] = useState("details");
    const [showDirections, setShowDirections] = useState(false);
    const [travelTime, setTravelTime] = useState(null);

    const getUser = UserSession();

    const apiKey = "AIzaSyBUNHVpiCehFnl9BPa0nN4szb-T9O4yyfQ";

    const fetchTermById = async () => {
        try {
            const res = await axios.get(`https://localhost:5068/api/Terms/${id}`);
            setTerm(res.data);

            if (getUser) {

                const origin = { lat: getUser.latitude, lng: getUser.longitude };
                const destination = { lat: res.data.latitude, lng: res.data.longitude };
                fetchTravelTime(origin, destination);
            }
        } catch (error) {
            console.error("Error fetching term", error);
        }
    };

    useEffect(() => {

        fetchTermById();

    }, []);

    const fetchTravelTime = (origin, destination) => {
        const service = new window.google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === "OK") {
                    const duration = response.rows[0].elements[0].duration;
                    if (duration) {
                        setTravelTime(duration.text);
                    }
                } else {
                    console.error("DistanceMatrixService failed due to:", status);
                }
            }
        );
    };

    function Directions() {
        const map = useMap();
        const routesLibrary = useMapsLibrary("routes");
        const [directionsService, setDirectionsService] = useState(null);
        const [directionsRenderer, setDirectionsRenderer] = useState(null);

        useEffect(() => {
            if (!map || !routesLibrary) return;

            setDirectionsService(new routesLibrary.DirectionsService());
            setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));

        }, [map, routesLibrary]);


        useEffect(() => {
            if (!directionsService || !directionsRenderer || !term) return;

            directionsService
                .route({
                    origin: { lat: getUser.latitude, lng: getUser.longitude },
                    destination: { lat: term.latitude, lng: term.longitude },
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true,
                })
                .then((res) => {
                    directionsRenderer.setDirections(res);
                });

        }, [directionsService, directionsRenderer, term]);

        return null;
    }

    return (
        <div
            className="card mx-auto mt-5"
            style={{ width: "60%", height: "80%", padding: "20px", overflowY: "auto" }}
        >
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={`nav-link ${tab === "details" ? "active" : ""}`}
                        onClick={() => setTab("details")}
                    >
                        Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${tab === "location" ? "active" : ""}`}
                        onClick={() => setTab("location")}
                    >
                        Location
                    </button>
                </li>
            </ul>

            <div className="card-body p-0">
                {tab === "details" && (
                    <div>
                        <h5>Term Details</h5>
                        {term ? (
                            <ul>
                                <li><strong>Name:</strong> {term.name}</li>
                                <li><strong>Category:</strong> {term.category.name}</li>
                                <li><strong>Description:</strong> {term.description}</li>
                                <img
                                    className="mt-3"
                                    src={term.imageUrl}
                                    alt="Slika termina"
                                    style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
                                />
                            </ul>
                        ) : (
                            <p>Loading data...</p>
                        )}
                    </div>
                )}

                {tab === "location" && (

                    <div style={{ height: "400px" }}>

                        <APIProvider apiKey={apiKey}>
                            {term ? (
                                <div style={{ height: "350px", width: "100%", position: "relative" }}>

                                    <Map
                                        center={{ lat: term.latitude, lng: term.longitude }}
                                        zoom={10}
                                        mapId="default"
                                    >
                                        <AdvancedMarker position={{ lat: term.latitude, lng: term.longitude }}>
                                            <Pin />
                                        </AdvancedMarker>

                                        {showDirections && <Directions />}
                                    </Map>


                                    {showDirections && travelTime && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "60px",
                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                padding: "8px 12px",
                                                borderRadius: "8px",
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                                zIndex: 1000,
                                                fontWeight: "500"
                                            }}
                                        >
                                            Estimated travel time: <strong>{travelTime}</strong>

                                        </div>
                                    )}

                                </div>
                            ) : (
                                <p>Loading map...</p>
                            )}
                        </APIProvider>

                        <button
                            className="mt-3 btn btn-success flex-grow-1"
                            onClick={() => {
                                if (!getUser) {

                                    toast.info("You must be logged in in order to get directions.");
                                    return;
                                }
                                setShowDirections(true);
                            }}
                        >
                            <i className="bi bi-sign-turn-right me-2"></i>Get directions
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
}

export default Details;
