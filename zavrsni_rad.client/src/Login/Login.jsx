import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [data, SetData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        SetData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("https://localhost:5068/api/Users/login", data, { withCredentials: true });
            sessionStorage.setItem("user", JSON.stringify(response.data));

            toast.success(`Welcome, ${response.data.name}. You have logged in successfully`);
            navigate("/");

        } catch (err) {
            console.log(err);
            setError("Invalid username or password.");

        }
    };

    return (


        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div
                className="card p-4 shadow-sm"
                style={{ width: '100%', maxWidth: 400, borderRadius: '10px' }}
            >
                <div className="text-center mb-1" style={{ fontSize: '3rem' }}>
                    <i className="bi bi-person-lock"></i>
                </div>
                <h3 className="text-center mb-3">Login</h3>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="*******"
                            className="form-control"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                    >
                        Login
                    </button>

                    <p className="mt-3 text-center">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                </form>
            </div>
        </div>
    );
}

export default Login;
