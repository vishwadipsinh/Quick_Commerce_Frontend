import axios from 'axios';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { error } } = useForm();

    const navigate = useNavigate();



    const formLogin = (data) => {
        console.log(data);
        axios.post('https://quick-commerce-backend.onrender.com/user/login', data, { withCredentials: true }).then(response => console.log(response));
        navigate('/');
    }


    return (
        <>
            <Container className='border p-4 w-50'>
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
        </>

    )
}