import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import './UserProFile.css'
import { useParams } from 'react-router-dom';
import { db } from '../../DB/Firebase';
import { AiOutlineEdit } from "react-icons/ai";
const UserProfileView = () => {
    const UserID = useParams()
    const [data, setData] = useState([]);

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
            <div className="d-flex mx-4 py-4">
                <div className="col-md-8 border-end ">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Details</h4>
                            <AiOutlineEdit data-bs-toggle="modal" data-bs-target="#staticBackdrop" role="button" className='fs-1 text-warning bg-light p-2 rounded-circle' />
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

            </div>
        </>
    )
}

export default UserProfileView