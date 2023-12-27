import React, { useEffect, useState } from 'react'
import './Post.css'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { IoMdShare } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import InputOption from '../Feed/InputOption'
import { SlOptionsVertical } from "react-icons/sl";
import { doc, deleteDoc, updateDoc, collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { auth, db, storage } from '../../DB/Firebase';
import { deleteObject, ref } from 'firebase/storage';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
const Post = ({ id, name, description, message, photourl, userImg, NoOfLike }) => {

    const [CheckLiked, setCheckLiked] = useState(false)
    const Userid = auth.currentUser.uid;
    const deletePost = async (id, photourl) => {
        try {
            await deleteDoc(doc(db, "posts", id));
            if (!photourl === "") {
                deleteImg(photourl)
            }
            window.location.reload();
            alert("Deleted with image");
        } catch (error) {
            console.error("Error deleting post and image:", error);
        }
    };

    const deleteImg = (photourl) => {
        const storageRef = ref(storage, photourl);
        return deleteObject(storageRef)
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const likedPostRef = collection(db, 'LikedPost');
                const q = query(
                    likedPostRef,
                    where('postId', '==', id),
                    where('LikedBy', '==', Userid)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setCheckLiked(true);
                    return;
                } else {
                    console.log('No matching documents.');
                }
            } catch (error) {
                console.error('Error fetching documents: ', error);
            }
        };
        fetchData(id, Userid);
    }, [id, Userid]); // Dependency array, update if 'id' changes

    const LikeFN = async () => {
        try {
            const likedPostRef = collection(db, 'LikedPost');
            const q = query(
                likedPostRef,
                where('postId', '==', id),
                where('LikedBy', '==', Userid)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setCheckLiked(true);
                return;
            } else {
                const UserRef = doc(db, "posts", id);
                await updateDoc(UserRef, {
                    NoOfLike: NoOfLike + 1,
                });

                await addDoc(collection(db, "LikedPost"), {
                    postId: id,
                    LikedBy: auth.currentUser.uid,
                    like: true
                });
                setCheckLiked(true);
                console.log("Post updated with like. LikedPost added:");
            }
        } catch (err) {
            console.log("Error while updating post/adding LikedPost:", err);
        }
    };


    const OptionDropDown = () => {
        return (
            <div className="dropdown">
                <SlOptionsVertical className='Post_option' id="dropdownMenuLink" data-bs-toggle="dropdown" />
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div className='DrPost_Op'>
                        <li onClick={() => { deletePost(id, photourl) }}>Delete</li>
                    </div>

                </div>
            </div>
        );
    }


    return (
        <>
            <div className="post" key={id}>
                <div className="post__header">
                    <div className='post_headerOP'>
                        <img src={userImg} alt='img' />
                        <div className="post__info">
                            <h2>{name}</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                    {window.location.pathname !== '/home' ? <OptionDropDown /> : ""}

                </div>
                <div className="post__body">
                    <p>{message}</p>
                    {photourl &&
                        <div className='post__body_Img'>
                            <img src={photourl} alt='img' />
                        </div>}
                </div>

                <div className="post__buttons">
                    <InputOption Icon={CheckLiked ? FaHeart : FaRegHeart} title={NoOfLike <= 0 ? "" : NoOfLike} color={CheckLiked ? 'red' : 'gray'} functions={LikeFN} />
                    <InputOption Icon={IoChatbubbleEllipsesOutline} title='Comment' color='Gray' />
                    <InputOption Icon={IoMdShare} title='Share' color='Gray' />
                    <InputOption Icon={AiOutlineSend} title='Send' color='Gray' />
                </div>
            </div>
        </>
    )
}

export default Post