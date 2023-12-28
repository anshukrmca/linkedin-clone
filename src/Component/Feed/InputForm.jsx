import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { FcGallery } from "react-icons/fc";
import { MdOutlineSubscriptions } from "react-icons/md";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../DB/Firebase'
import {
    collection,
    serverTimestamp,
    addDoc,
} from "firebase/firestore";
import InputOption from './InputOption';
import { Form, Button, Card } from "react-bootstrap"
import { toast } from "react-toastify"
import Layout from '../layout/Layout'
import { useNavigate } from 'react-router-dom';

const InputForm = () => {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("")
    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [per, setPerc] = useState(null);
    const navigate = useNavigate()

    // pic Upload 
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;

            console.log(name);
            const storageRef = ref(storage, `PostImg/${file.name}`);
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


    // save  data on firebase store 
    const sendPost = async (e) => {
        e.preventDefault();
        if (input.length === 0) {
            toast.error("Enter Containt for Post !")
        } else {
            try {
                const postRef = collection(db, "posts");
                const newPost = {
                    userId: user.uid,
                    name: user.name,
                    description: user.profession || "", // Ensure a default value for description
                    message: input,
                    photourl: data.img || '', // Ensure a default value for photourl
                    userImg: user.img,
                    NoOfLike: 0,
                    timestamp: serverTimestamp(),

                };

                await addDoc(postRef, newPost);
                setInput(""); // Reset input field after successful submission
                toast.success("Post Successfully Added!");
                setTimeout(() => {
                    navigate('/home')
                }, 3000);
            } catch (error) {
                toast.error("Add Post failed!");
                // Handle error state or logging as needed
            }
        }
    };
    return (
        <>
            <Layout>

                <div className="container d-flex align-items-center justify-content-center my-4">
                    <Card style={{width:'50dvw'}}> 
                        <Card.Body>
                            <h2 className="text-center mb-4">Add Post !</h2>

                            <Form >
                                <Form.Group id="email">
                                    <Form.Control required
                                        as="textarea"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <div className="feed__inputOption">
                                        <div className="formInput">
                                            <label htmlFor="file">
                                                <InputOption Icon={FcGallery} title='Photo' color='#0073b1' />
                                            </label>
                                            <input
                                                type="file"
                                                id="file"
                                                onChange={(e) => setFile(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                        <InputOption Icon={MdOutlineSubscriptions} title='Video' color='#C37D16' />
                                    </div>
                                </Form.Group>

                            </Form>
                            <Button onClick={sendPost}  disabled={per !== null && per < 100} className="w-100 mt-4 btn-success" style={{ marginLeft: '-3px' }} type="submit">
                                Send Post
                            </Button>
                            {/* <button type="submit" disabled={per !== null && per < 100} onClick={sendPost} className="btn btn-success">Send Post</button> */}

                        </Card.Body>
                    </Card>
                </div>
            </Layout>
        </>
    )
}

export default InputForm