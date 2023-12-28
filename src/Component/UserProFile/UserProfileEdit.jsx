import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from '../../Image/upload.png'
import { db, storage } from '../../DB/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import Layout from '../layout/Layout';
const UserProfileEdit = () => {
    const [file, setFile] = useState("");
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
    const navigate = useNavigate()

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;

            console.log(name);
            const storageRef = ref(storage, `UserImg/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPerc(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImg(downloadURL)
                    });
                }
            );
        };

        file && uploadFile();

    }, [file]);

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
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUserData(UserID.id);
    }, [UserID]);

    const updateUser = async () => {
        try {
            const UserRef = doc(db, "users", UserID.id);
            await updateDoc(UserRef, {
                name: name,
                email: email,
                profession: profession,
                phone: phone,
                address: address,
                country: country,
                password: password,
                img: img
            }).then(() => {
                toast.success("Profile Successful Updated !")
                setTimeout(() => {
                    navigate(`/profile/${UserID.id}`)
                }, 3000);
            })
        } catch (err) {
            toast.error("Profile Updated fail !")
        }

    }

    return (
        <>
            <Layout>


                <div className="container d-flex align-items-center justify-content-center my-4 py-4">
                    <Card style={{ width: '80dvw', padding: '20px'}}>
                        <div className="modal-header px-3">
                            <h5 className="modal-title fs-3" id="staticBackdropLabel">Update Profile</h5>
                            <Link to={`/profile/${UserID.id}`} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="my-3 ">
                            <div className="row gap-3 mt-2 justify-content-center">
                                <div className='col-md-12'>
                                    <div className='row mb-3'>
                                        <div className='col-md-6'>
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
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-6'>
                                            <label>Profession</label>
                                            <input value={profession} onChange={(e) => setProfession(e.target.value)} />
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Address</label>
                                            <input value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Country</label>
                                            <input value={country} onChange={(e) => setCountry(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button onClick={updateUser} style={{ width: '200px' }} type="submit" disabled={per !== null && per < 100} className="btn btn-success">Update Profile</button>
                        </div>
                    </Card>
                </div>
            </Layout>
        </>
    )
}

export default UserProfileEdit