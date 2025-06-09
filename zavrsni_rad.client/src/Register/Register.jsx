import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        username: "",
        password: "",
        city: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({}); 

        try {
            const res = await axios.post("https://localhost:5068/api/Users/register", data);

            console.log("Uspješna registracija:", res.data);
            sessionStorage.setItem("user", JSON.stringify(res.data));
            toast.success("Thank you for your registration😀");
            navigate("/");
        } catch (err) {
            if (err.response?.data) {
                console.log("Greške s backend-a:", err.response.data);
                setErrors(err.response.data); 
            } else {
                toast.error("Registration failed!");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "100%", maxWidth: 400 }}>
                <h3 className="text-center mb-4">Register</h3>
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        type="text"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="form-control mb-2"
                        required
                    />
                    {errors.Name && <small className="text-danger mb-3">{errors.Name[0]}</small>}

                    <input
                        name="surname"
                        type="text"
                        value={data.surname}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="form-control mb-2"
                        required
                    />
                    {errors.Surname && <small className="text-danger mb-3">{errors.Surname[0]}</small>}

                    <input
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="form-control mb-2"
                        required
                    />
                    {errors.Email && <small className="text-danger mb-3">{errors.Email[0]}</small>}

                    <input
                        name="username"
                        type="text"
                        value={data.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="form-control mb-2"
                        required
                    />
                    {errors.UserName && <small className="text-danger mb-3">{errors.UserName[0]}</small>}

                    <input
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="*******"
                        className="form-control mb-2"
                        required
                    />
                    {errors.Password && <small className="text-danger mb-3">{errors.Password[0]}</small>}

                    <input
                        name="city"
                        type="text"
                        value={data.city}
                        onChange={handleChange}
                        placeholder="Resident Place"
                        className="form-control mb-3"
                    />
                    {errors.City && <small className="text-danger mb-3">{errors.City[0]}</small>}

                    <button type="submit" className="btn btn-success" style={{ color: "white" }}>
                        Register
                    </button>

                </form>
                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
