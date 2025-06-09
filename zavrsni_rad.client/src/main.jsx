import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dashboard from './Dashboard';
import Navbar from './Navigation/Navbar';
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import Details from './TermDetails/Details';
import Reservation from './Reservation/Reservation';
import MyReservations from './Profile/MyReservations';
import Rating from './TermDetails/Rating';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Admin/AdminDashboard';
import UserManager from './Admin/UserManager';
import TermManager from './Admin/TermManager';
import AddUser from './Admin/AddUser';
import AddTerm from './Admin/AddTerm';

createRoot(document.body).render(
    <StrictMode>
        <Router>
            <Routes>


                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManager />} />
                <Route path="/admin/terms" element={<TermManager />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/terms/add" element={<AddTerm />} />
             
                <Route
                    path="*"
                    element={
                        <>
                            <Navbar />

                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/details/:id" element={<Details />} />
                                <Route path="/reservation/:id" element={<Reservation />} />
                                <Route path="/my-reservations" element={<MyReservations />} />
                                <Route path="/rating/:id" element={<Rating />} />
                            </Routes>

                            <ToastContainer
                                position="top-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnHover={false}
                            />
                        </>
                    }
                />

            </Routes>
        </Router>
    </StrictMode>
);
