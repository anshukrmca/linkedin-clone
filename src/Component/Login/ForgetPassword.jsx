import React, { useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { Link } from 'react-router-dom'
import Linked_logo from '../../Image/login-logo.svg'
import './Login.css'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../..//DB/Firebase";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify"
const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const navitage = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            sendPasswordResetEmail(auth, email)
            toast.warning("Check your mail for Password reset !")
            setTimeout(() => {
                navitage("/login")
            }, 3000);
        } catch {
            toast.error("Wrong Email !")
        }
    }

    return (
        <>
            <div className="Main_div">
                <div className="Header_Logo">
                    <img src={Linked_logo} alt="" />
                </div>
                <ToastContainer/>
                <div className="container d-flex align-items-center justify-content-center my-2">
                    <Card style={{ width: '25rem', backgroundColor: 'whitesmoke' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">Forget Password</h2>
                            {/* {error && <Alert variant="danger">{error}</Alert>} */}
                            <Form >
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control placeholder="Enter your e-mail" type="email" required onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                </Form.Group>
                            </Form>
                            <Button onClick={handleSubmit} style={{ marginLeft: '-3px' }} className="w-100 mt-4" type="submit">
                                Forget Password
                            </Button>
                            <div className="d-flex justify-content-between w-100 text-center mt-5 mb-2">
                                <p >Go for <Link to='/login'>Sign In</Link></p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword