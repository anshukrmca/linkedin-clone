import React from 'react'
import './Landing_page.css'
import Linkedin__logo from '../../Image/login-logo.svg'
import Linkedin__hero from '../../Image/login-hero.svg'
import google from '../../Image/google.svg'
import { NavLink } from 'react-router-dom'
const LandingPage = () => {
    return (
        <>
            <div className="Landing__head">

                <img src={Linkedin__logo} alt="logo" />
                <div className="Login__option">
                    <NavLink className='btn' to='./login'>Sign In</NavLink>
                    <NavLink className='btn' to='./register'>Sign Up</NavLink>

                </div>
            </div>
            <div className="Landing__body">
                <div className="Landing__Hero">
                    <div className="Landing__google">
                        <h1>Welcome to your professional community</h1>
                        <div className="Landing__gle">
                            <img src={google} alt="" />
                            Sign in with Google
                        </div>
                    </div>

                    <img src={Linkedin__hero} alt="Hero Logo" />
                </div>

            </div>
        </>
    )
}

export default LandingPage