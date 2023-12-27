import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from '../../Image/upload.png'
import {  db, storage } from '../../DB/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {  toast } from 'react-toastify';
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

const updateUser = async()=>{
    try{
        const UserRef = doc(db, "users", UserID.id);
        await updateDoc(UserRef, {
            name:name,
            email:email,
            profession:profession,
            phone:phone,
            address:address,
            country:country,
            password:password,
            img:img
          }).then(()=>{
            toast.success("Profile Successful Updated !")
            setTimeout(() => {
                window.location.reload();
            }, 3000);
          })
    }catch(err){
        toast.error("Profile Updated fail !")
    }
   
}

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
                                <div className='col-5'>
                                    <label>Profession</label>
                                    <input value={profession} onChange={(e) => { setProfession(e.target.value) }}
                                    />
                                </div>
                                <div className='col-5'>
                                    <label>Phone</label>
                                    <input value={phone} onChange={(e) => { setPhone(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex gap-3  mt-2 justify-content-center">
                               
                                <div className='col-5'>
                                    <label>Address</label>
                                    <input value={address} onChange={(e) => { setAddress(e.target.value) }}
                                    />
                                </div>
                                <div className='col-5'>
                                    <label>Country</label>
                                    <input value={country} onChange={(e) => { setCountry(e.target.value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={updateUser} style={{width:'200px'}} type="submit" disabled={per !== null && per < 100} className="btn btn-success">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default UserProfileEdit