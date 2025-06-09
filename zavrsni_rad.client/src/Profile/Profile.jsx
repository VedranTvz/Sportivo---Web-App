
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserSession } from "../Hooks/UserHook";
import { toast } from 'react-toastify';

function Profile() {

    
   
    const apiKey = "AIzaSyBUNHVpiCehFnl9BPa0nN4szb-T9O4yyfQ";
    const getUser = UserSession();

    const [user, setUser] = useState(() => getUser);
    const [subscriptions, setSubscriptions] = useState([]);
    const [coordinates, setCoordinates] = useState(null);
    const [edit, setEdit] = useState(false);


    const [formData, setFormData] = useState({
        name: user.name,
        surname: user.surname,
        userName: user.userName,
        email: user.email
    });


    const fetchSubscriptions = async () => {

        try {
            const res = await axios.get(`https://localhost:5068/api/Subscription/${user.id}`);
            setSubscriptions(res.data);

        } catch (err) {
            console.log("Error fetching subscriptions", err);
        }
    };


    const fetchCoordinates = async () => {

        try {


            const res = await axios.get(`https://localhost:5068/api/Users/profile/${user.id}`);


            console.log(res.data);

            setCoordinates({
                lat: res.data.latitude,
                lng: res.data.longitude
            })

        } catch (err) {

            console.log("error getting coordinates", err);
        }
    }

    useEffect(() => {

        fetchCoordinates();
        fetchSubscriptions();

    }, [])


    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.put(`https://localhost:5068/api/Users/profile/edit/${user.id}`, formData);

            const updatedData = res.data;

            const updatedUser = { ...updatedData, id: user.id, city: user.city };

            sessionStorage.setItem("user", JSON.stringify(updatedUser));

            setUser(updatedUser);
            setEdit(false);

            toast.success("Profile updated successfully!");


        } catch (err) {

            console.log(err, "Error updating user");

            toast.error("There was an error updating the profile.");
        };


        

    }
    return (

        
        <>
            <div className="d-flex flex-column min-vh-100">
               

                <div className="container py-5">
                    <h1 className="h3 mb-4">Profile</h1>

                   
                    <div className="card shadow mb-4">
                        <div className="card-header bg-white py-3">
                            <h2 className="h5 mb-0">Profile Information</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                               
                                <div className="col-md-6 mb-4 mb-md-0">
                                    <div className="d-flex flex-column h-100">
                                       
                                        {edit ? (
                                            <>
                                                <input
                                                    className="form-control mb-3"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    className="form-control mb-3"
                                                    name="surname"
                                                    value={formData.surname}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    className="form-control mb-3"
                                                    name="userName"
                                                    value={formData.userName}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    className="form-control mb-3"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    className="form-control mb-3"
                                                    value={user.city}
                                                    disabled
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-3 border rounded mb-3">
                                                    <p className="text-muted mb-0">{user.name}</p>
                                                </div>
                                                <div className="p-3 border rounded mb-3">
                                                    <p className="text-muted mb-0">{user.surname}</p>
                                                </div>
                                                <div className="p-3 border rounded mb-3">
                                                    <p className="text-muted mb-0">{user.userName}</p>
                                                </div>
                                                <div className="p-3 border rounded mb-3">
                                                    <p className="text-muted mb-0">{user.email}</p>
                                                </div>
                                                <div className="p-3 border rounded mb-3">
                                                    <p className="text-muted mb-0">{user.city}</p>
                                                </div>
                                            </>
                                        )}



                                       
                                        <div className="d-grid gap-2 d-md-flex mt-auto">
                                            {edit ? (
                                                <>
                                                    <button
                                                        className="btn btn-primary me-2"
                                                        onClick={handleSubmit}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => setEdit(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                        className="btn btn-success"
                                                        onClick={() => setEdit(true)}
                                                >
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-md-6">
                                    <div className="card h-100">
                                        <div className="card-header bg-white py-3">
                                            <h3 className="h6 mb-0">Location</h3>
                                        </div>
                                        <div className="card-body p-0">
                                            <div style={{ height: "350px" }}>

                                                <APIProvider apiKey={apiKey}>
                                                    {coordinates ? (
                                                        <div style={{ height: "350px", width: "100%" }}>

                                                            <Map
                                                                center={coordinates}
                                                                zoom={15}
                                                                mapId="default"
                                                            >
                                                                <AdvancedMarker position={coordinates}>
                                                                    <Pin />
                                                                </AdvancedMarker>
                                                            </Map>
                                                        </div>

                                                    ) : (
                                                        <p>Loading map...</p>
                                                    )}
                                                </APIProvider>



                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow mb-4 mt-3">
                            <div className="card-header bg-white py-3">
                                <h2 className="h5 mb-0">Your Subscriptions</h2>
                            </div>
                            <div className="card-body">
                                {subscriptions.length > 0 ? (
                                    <ul className="list-group">
                                        {subscriptions.map((sub, index) => (
                                            <li key={index} className="list-group-item">
                                                {sub.category?.name ?? "Unnamed category"}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted">You are not subscribed to any categories yet.</p>
                                )}
                            </div>
                        </div>


                    </div>


                </div>

                
            </div>

        </>
    );

}

export default Profile;
