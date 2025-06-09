import './Navbar.css';
import logo from "../assets/SPORTIVO.png";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserSession } from '../Hooks/UserHook';
import Notification from '../Notifications/Notification';
import { toast } from 'react-toastify';
import axios from 'axios';

function Navbar() {

    const navigate = useNavigate();
    const getUser = UserSession();

   
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);



    useEffect(() => {


        if (getUser) {

            setIsLoggedIn(true);
            

        } else {

            setIsLoggedIn(false);
        }
    }, [getUser]);

  
    const handleLogout = async () => {
        try {

            await axios.post("https://localhost:5068/api/Users/logout", { withCredentials: true });
        } catch (err) {

            console.error("Logout failed on server", err);
        }

        sessionStorage.clear();
        setIsLoggedIn(false);
        toast.info("You have logged out successfully!");
        navigate("/login");
    };


    return (
        <header>
            <nav className="navbar navbar-expand-lg d-flex align-items-center">
                <div className="container-fluid">
                  
                    <div className="d-flex align-items-center p-0">
                        <Link className="navbar-brand d-flex align-items-center" to="/">
                            <img src={logo} alt="Sportivo Logo" width="50" height="50" />
                        </Link>
                        <span className="navbar-brand">Sportivo</span>
                    </div>

                  
                    <div className="d-none d-lg-flex me-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item pt-1">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>
                    </div>

                   
                    <div className="d-none d-lg-flex ms-auto">
                        <ul className="navbar-nav">

                            {isLoggedIn ? (
                                <>


                                    <li className="nav-item pt-1 me-1">
                                        <Link className="nav-link" to="/profile">
                                            <i className="bi bi-person-circle"></i>
                                        </Link>
                                    </li>


                                    <button
                                        className="nav-link position-relative"
                                        onClick={() => setShowNotifications(!showNotifications)}
                                    >
                                        <i className="bi bi-bell"></i>
                                    </button>

                                    {showNotifications && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "80px",
                                                right: "0",
                                                width: "300px",
                                                maxHeight: "400px",
                                                overflowY: "auto",
                                                backgroundColor: "#fff",
                                                border: "1px solid #ccc",
                                                borderRadius: "8px",
                                                padding: "10px",
                                                zIndex: 9999,
                                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                                            }}
                                        >
                                            <Notification />
                                        </div>
                                    )}


                                    <li className="nav-item pt-1 me-1">
                                        <Link className="nav-link" to="/my-reservations">

                                            My reservations
                                            <i class="bi bi-calendar-check ms-2"></i>

                                        </Link>
                                    </li>



                                    <li className="nav-item pt-1">
                                        <button className="nav-link" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item pt-1">
                                        <Link className="nav-link" to="/register">Signup</Link>
                                    </li>
                                    <li className="nav-item pt-1">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                            )}
                           
                        </ul>
                    </div>

                    <button
                        className="navbar-toggler d-lg-none navbar-dark"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
