import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUser } from '../../features/userSlice'
import Header from '../Header/Header'

const UserProFile = () => {
    const ID = useParams()
    const user = useSelector(selectUser)
   
    return (
        <>
        <Header/>
            <p>id: {ID.id}</p>
            <p>Name: {user.name}</p>
            <p>emali: {user.email}</p>
           
        </>
    )
}

export default UserProFile