import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { FcGallery } from "react-icons/fc";
import { MdOutlineSubscriptions } from "react-icons/md";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db,storage } from '../../DB/Firebase'
import {
    collection,
    serverTimestamp,
    addDoc,
} from "firebase/firestore";
import InputOption from './InputOption';

const InputForm = () => {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("")
    const [data, setData] = useState({});
    const [error, seterror] = useState(false)
    const [file, setFile] = useState("");
    const [per, setPerc] = useState(null);


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
            seterror(true);
        } else {
            seterror(false);
            try {
                const postRef = collection(db, "posts");
                const newPost = {
                    userId: user.uid,
                    name: user.name,
                    description: user.profession || "", // Ensure a default value for description
                    message: input,
                    photourl: data.img || '', // Ensure a default value for photourl
                    userImg: user.img,
                    timestamp: serverTimestamp()
                };

                await addDoc(postRef, newPost);
                setInput(""); // Reset input field after successful submission
                window.location.reload();
            } catch (error) {
                console.error("Error adding document:", error);
                // Handle error state or logging as needed
            }
        }
    };
    return (
        <>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Add Post</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <textarea type='text'
                                value={input}
                                onChange={e => setInput(e.target.value)} required
                                style={{ width: '100%' }} />

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
                        </div>
                        {error && input.length <= 0 ?
                            <span style={{ color: 'red', textAlign: 'center' }}>Enter something for post !</span> : ""}
                        <div class="modal-footer">
                            <button type="submit" disabled={per !== null && per < 100}  onClick={sendPost} class="btn btn-success">Send Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputForm