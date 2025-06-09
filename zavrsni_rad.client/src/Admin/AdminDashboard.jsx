import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';


const AdminCheck = () => {

    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [accessGranted, setAccessGranted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {


        const checkAdminAccess = async () => {
            try {
                const response = await axios.get(
                    "https://localhost:5068/api/admin/protected",
                    { withCredentials: true }
                );

                if (response.status === 200) {

                    setMessage("✅ Access granted");
                    setAlertType("success");
                    setAccessGranted(true);
                } else {

                    setMessage("❌ Access denied!");
                    setAlertType("danger");
                }

            } catch {

                setMessage("❌ Access denied!");
                setAlertType("danger");
            }
        };

        checkAdminAccess();
    }, []);

    useEffect(() => {

        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setAlertType("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleManageUsers = () => {
        navigate('/admin/users'); 
    };

    const handleManageTerms = () => {
        navigate('/admin/terms'); 
    };

    return (

        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '22rem' }}>
                <h4 className="text-center mb-3">Admin Dashboard</h4>

                {message && (
                    <div className={`alert alert-${alertType} text-center`} role="alert">
                        {message}
                    </div>

                )}

                {accessGranted && (
                    <div className="d-grid gap-3 mt-3">
                        <button className="btn btn-outline-primary" onClick={handleManageUsers}>
                            Manage Users
                        </button>
                        <button className="btn btn-outline-primary" onClick={handleManageTerms}>
                            Manage Terms
                        </button>

                        <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
                            Return to App
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCheck;
