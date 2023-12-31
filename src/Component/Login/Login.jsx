import React, { useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { Link } from 'react-router-dom'
import Linked_logo from '../../Image/login-logo.svg'
import './Login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../..//DB/Firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navitage = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    localStorage.setItem('logIn', user.uid)
                })
            toast.success("Login SuccessFull !")
            setTimeout(() => {
                navitage("/home")
            }, 3000);

        } catch {
            toast.error("Wrong Email and Password !")
        }
    }

    return (
        <>
            <div className="Main_div">
                <div className="Header_Logo">
                    <img src={Linked_logo} alt="" />
                </div>
                <ToastContainer />
                <div className="container d-flex align-items-center justify-content-center my-2">
                    <Card style={{ width: '25rem', backgroundColor: 'whitesmoke' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign In</h2>

                            <Form >
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control autoComplete="username" type="email" required onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control autoComplete="current-password" type="password" required onChange={(e) => { setPassword(e.target.value) }} value={password} />
                                </Form.Group>

                            </Form>
                            <Button onClick={handleSubmit} className="w-100 mt-4" style={{ marginLeft: '-3px' }} type="submit">
                                Log In
                            </Button>
                            <div className="d-flex justify-content-between w-100 text-center mt-5 mb-2">
                                <Link to='/forget-password'>Forgot Password?</Link>
                                <p >Need an account? <Link to='/register'>Sign Up</Link></p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Login