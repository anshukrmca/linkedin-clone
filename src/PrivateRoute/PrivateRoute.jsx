import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import {Navigate, Routes } from 'react-router-dom'

const PrivateRoute = ({ element: Component, ...rest }) => {
    const user = useSelector(selectUser)
    console.log(user)
    return (
        <>
            <Routes
                {...rest}
                render={props => {
                    return user ? <Component {...props} /> : <Navigate to="/login" />
                }}
            >
             </Routes>
    </>
    )
}

export default PrivateRoute