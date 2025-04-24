import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import './ProfilePage.css';


export default function Login() {
    const [profile, setProfile] = useState(null);

    const { register, handleSubmit, formState: { error } } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        // console.log("token", token);

        if (token) {
            const fetchProfile = async () => {
                try {
                    const response = await axios.get('https://quick-commerce-backend.onrender.com/user/getuser', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    // console.log("response", response)
                    setProfile(response.data);
                    // console.log(profile)
                } catch (err) {
                    console.error("Error fetching profile:", err);
                }

            };

            fetchProfile();
        }
    }, []);

    const formLogin = async (data) => {
        try {
            const response = await axios.post(
                "https://quick-commerce-backend.onrender.com/user/login",
                // "http://localhost:3000/user/login",
                data,
                { withCredentials: true }
            );

            if (response.status == 200) {
                // console.log("Login successful", response.data);
                localStorage.setItem("authToken", response.data.token);
                navigate("/");
            } else {
                console.log(response)
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        // navigate("/login");
        setProfile(null);
    };


    return (
        <>
            {
                profile ? <div className="profile-container">
                    <h1 className="greeting">👋 Welcome back, {profile.name}!</h1>
                    <div className="profile-card">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
                        <p><strong>Address:</strong> {profile.address || 'N/A'}</p>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div> : <Container className='border p-4 w-50'>
                    <Form onSubmit={handleSubmit(formLogin)}>
                        <h2 className='text-center pb-3'>Login</h2>

                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label column sm="3">
                                Email address
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="email" placeholder="name@example.com" {...register("email")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                                Password
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="password" placeholder="Password" {...register("password")} />
                            </Col>
                        </Form.Group>
                        <div className='m-2 text-center'>
                            Don't have Account? <NavLink to="/register">SignUp</NavLink>
                        </div>
                        <div className='text-center'>
                            <Button variant="primary" type='submit' >Submit</Button>
                        </div>
                    </Form>
                </Container>
            }

        </>

    )
}