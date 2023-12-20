import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from '../../Image/upload.png'
import { db } from '../../DB/Firebase';
import { doc, getDoc } from 'firebase/firestore';
const UserProfileEdit = () => {
    const [error, seterror] = useState(false)
    const [file, setFile] = useState("");
    const [data, setData] = useState();
    const [per, setPerc] = useState(null);
    const UserID = useParams()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profession, setProfession] = useState("");
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState("");


    useEffect(() => {
        const getUserData = async (id) => {
            try {
                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setName(docSnap.data().name);
                    setEmail(docSnap.data().email);
                    setProfession(docSnap.data().profession);
                    setPhone(docSnap.data().phone);
                    setAddress(docSnap.data().address);
                    setCountry(docSnap.data().country);
                    setPassword(docSnap.data().password);
                    setImg(docSnap.data().img);
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
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg p-4">
                    <div className="modal-content p-8">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex gap-3  mt-2 justify-content-center">
                                <div className='col-5 ' >
                                    <label htmlFor="file">
                                        Image: <img src={DriveFolderUploadOutlinedIcon} alt="img" className="icon" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                <div className='col-5' >
                                    <label>Name</label>
                                    <input value={name} onChange={(e) => { setName(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex gap-3  mt-2 justify-content-center">
                                <div className='col-5' >
                                    <label>Email</label>
                                    <input value={email} onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                                <div className='col-5'>
                                    <label>Profession</label>
                                    <input value={profession} onChange={(e) => { setProfession(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex gap-3  mt-2 justify-content-center">
                                <div className='col-5'>
                                    <label>Phone</label>
                                    <input value={phone} onChange={(e) => { setPhone(e.target.value) }}
                                    />
                                </div>
                                <div className='col-5'>
                                    <label>Address</label>
                                    <input value={address} onChange={(e) => { setAddress(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex gap-3  mt-2 justify-content-center">
                                <div className='col-5'>
                                    <label>Country</label>
                                    <input value={country} onChange={(e) => { setCountry(e.target.value) }}
                                    />
                                </div>
                                <div className='col-5'>
                                    <label>Password</label>
                                    <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        {error && name.length <= 0 ?
                            <span style={{ color: 'red', textAlign: 'center' }}>Enter something for post !</span> : ""}
                        <div className="modal-footer">
                            <button style={{width:'200px'}} type="submit" disabled={per !== null && per < 100} className="btn btn-success">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default UserProfileEdit