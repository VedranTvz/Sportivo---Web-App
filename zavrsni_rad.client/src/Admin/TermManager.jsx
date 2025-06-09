import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TermManager = () => {
    const [terms, setTerms] = useState([]);

    useEffect(() => {

        const fetchTerms = async () => {
            try {
                const response = await axios.get('https://localhost:5068/api/admin/terms', {
                    withCredentials: true,
                });
                setTerms(response.data);
            } catch (error) {
                console.error("Greška prilikom dohvata termina", error);
            }
        };

        fetchTerms();
    }, []);

    const handleDelete = async (id) => {

        try {

            await axios.delete(`https://localhost:5068/api/admin/terms/${id}`, {
                withCredentials: true,
            });
            setTerms(prevTerms => prevTerms.filter(term => term.id !== id));

        } catch (error) {
            console.error("Error deleting term:", error);
        }
    };


    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">List of terms</h2>

            <div className="mb-3 text-start">
                <Link to="/terms/add" className="btn btn-success">Add New Term</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Average Rating</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>

                        {terms.map(term => (
                            <tr key={term.id} className="border-bottom">
                                <td>{term.name}</td>
                                <td>{term.description}</td>
                                <td>{term.location}</td>
                                <td>{term.categoryName}</td>
                                <td>{term.averageRating.toFixed(1)}</td>
                                <td> <button className="btn btn-danger" onClick={() => handleDelete(term.id)}>Delete</button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to="/admin" className="btn btn-primary">Go back to dasboard</Link>

        </div>
    );
};

export default TermManager;
