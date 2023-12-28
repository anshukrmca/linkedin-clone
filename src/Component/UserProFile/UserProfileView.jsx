import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import './UserProFile.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../DB/Firebase';
import { AiOutlineEdit } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
import { toast } from 'react-toastify';

const UserProfileView = () => {
    const UserID = useParams()
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LogoutToApp = () => {
        dispatch(logout());
        auth.signOut()
        localStorage.removeItem('logIn')
        toast.success("Logout Successfull !")
        setTimeout(() => {
            navigate("/login")
        }, 3000)

    }



    useEffect(() => {
        const getUserData = async (id) => {
            try {
                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setData(docSnap.data())
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUserData(UserID.id);
    }, [UserID]);

    return (
        <>
            <div className="ProfileView">
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mb-3" width="300px" height="300px"
                            src={data.img}
                            alt=""
                        />
                        <span className="font-weight-bold fs-4">{data.name}</span>
                        <span className="text-black-50 fs-5">{data.email}</span>
                        <span></span>
                    </div>
                </div>
                <div className="col-md-8 border-end">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Details</h4>
                            <div className='mx-2'>
                                <Link to={`/pUpdate/${UserID.id}`}>
                                    <AiOutlineEdit  className='fs-1 text-warning bg-light p-2 rounded-circle' />
                                </Link>

                                <span onClick={LogoutToApp} className='mx-2' role='button'>Logout <FaPowerOff /></span>
                            </div>

                        </div>
                        <div className="row mt-2 d-flex justify-between">
                            <div className="col-11">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {data.name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">E-mail</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {data.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Profession</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {data.profession}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {data.phone}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {data.address}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Country</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {data.country}
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default UserProfileView