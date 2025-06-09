import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTerm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        categoryId: '',
        ImageUrl: ''
    });

    const [categories, setCategories] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:5068/api/terms/categories');
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {

            await axios.post('https://localhost:5068/api/terms', formData, {
                withCredentials: true
            });
            setSuccess('Term added successfully!');

            setFormData({
                name: '',
                description: '',
                location: '',
                categoryId: '',
                ImageUrl: ''
            });

            navigate('/admin/terms');
        } catch (err) {
            setError('Error adding term.');
            console.error(err);
        }
    };

    return (

        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>

                <h3 className="card-title text-center mb-4">Add New Term</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                            className="form-select"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL (custom)</label>
                        <input
                            type="text"
                            className="form-control"
                            name="ImageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL here"
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Add Term</button>
                    </div>
                    {success && <div className="alert alert-success mt-3 text-center">{success}</div>}
                    {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default AddTerm;
