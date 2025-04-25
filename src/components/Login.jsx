import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

export default function Login() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { error } } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            const fetchProfile = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get('https://quick-commerce-backend.onrender.com/user/getuser', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setProfile(response.data);
                } catch (err) {
                    console.error("Error fetching profile:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, []);

    const formLogin = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post(
                "https://quick-commerce-backend.onrender.com/user/login",
                data,
                { withCredentials: true }
            );

            if (response.status === 200) {
                localStorage.setItem("authToken", response.data.token);
                navigate("/");
            } else {
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setProfile(null);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

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
                            Don't have an account? <NavLink to="/register">Sign Up</NavLink>
                        </div>

                        <div className='text-center'>
                            <Button variant="primary" type='submit'>Submit</Button>
                        </div>
                    </Form>
                </Container>
            }
        </>
    );
}
