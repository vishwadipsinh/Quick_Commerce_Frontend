import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const { register, handleSubmit, formState: { error } } = useForm();

    const navigate = useNavigate();

    const formRegister = (data) => {
        console.log(data);
        axios.post('https://quick-commerce-backend.onrender.com/user/register', data).then(response => console.log(response));
        // axios.post('http://localhost:3000/user/register', data).then(response => console.log(response));
        navigate('/login');
    }

    return (
        <>
            <Container className='border p-4 w-50'>
                <Form onSubmit={handleSubmit(formRegister)}>
                    <h2 className='text-center pb-3'>Register</h2>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="3">
                            Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="Name" {...register("name")} />
                        </Col>
                    </Form.Group>
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
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhone">
                        <Form.Label column sm="3">
                            Phone Number
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="Phone Number" {...register("phone")} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
                        <Form.Label column sm="3">
                            Address
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="Address" {...register("address")} />
                        </Col>
                    </Form.Group>
                    <div className='m-2 text-center'>
                        Already have Account? <NavLink to="/login">Login</NavLink>
                    </div>
                    <div className='text-center'>
                        <Button variant="primary" type='submit' >Submit</Button>
                    </div>
                </Form>
            </Container>
        </>

    )
}