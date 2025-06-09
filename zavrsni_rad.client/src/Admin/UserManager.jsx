import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserManager = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:5068/api/admin/users', {
                    withCredentials: true,
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error getting users", error);
            }
        };

        fetchUsers();

    }, []);

    const handleDelete = async (userId) => {

        try {
            await axios.delete(`https://localhost:5068/api/admin/users/${userId}`, { withCredentials: true });
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (e) {
            console.log(e.message, "error deleting user!");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">List of users</h2>
            <div className="mb-3 text-start">
                <Link to="/users/add" className="btn btn-success">Add New User</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-bottom">
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.city}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to="/admin" className="btn btn-primary">Go back to dasboard</Link>
        </div>
    );
};

export default UserManager;
