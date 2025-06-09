import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        name: '',
        surname: '',
        city: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {

            await axios.post('https://localhost:5068/api/admin/users/add', formData, {
                withCredentials: true
            });

            navigate('/admin/users');

        } catch (error) {

            const apiErrors = error.response?.data?.errors;
            if (apiErrors) setErrors(apiErrors);
            else console.error('Unexpected error:', error);
        }
    };

    return (


        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
                <h3 className="card-title text-center mb-4">Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                        {errors.userName && <small className="text-danger">{errors.userName}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ime</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Prezime</label>
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                        {errors.surname && <small className="text-danger">{errors.surname}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Grad</label>
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                        {errors.city && <small className="text-danger">{errors.city}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Lozinka</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Add User</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddUser;
