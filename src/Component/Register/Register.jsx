import React, { useState, useEffect } from "react"
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from '../../Image/upload.png'
import Linked_logo from '../../Image/login-logo.svg'
import { auth, db, storage } from "../../DB/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, serverTimestamp, setDoc, } from "firebase/firestore";
import { Alert } from "react-bootstrap"

const Register = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [error, setError] = useState("");
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
          console.log("Upload is " + progress + "% done");
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
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);


  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setError("User Added")
     navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>

      <div className="Header_Logo">
        <img src={Linked_logo} alt="" />
        <h1 className="text-center">{title}</h1>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="bottom">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
          <p style={{marginTop:'110px'}}>Already have account <Link to='/login'>Sign In</Link> </p>
        </div>
        <div className="right">
          <form onSubmit={handleAdd}>
            <div className="formInput">
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

            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleInput}
                />
              </div>
            ))}
            <button className="RegBtn" disabled={per !== null && per < 100} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Register