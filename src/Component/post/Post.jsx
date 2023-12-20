import React from 'react'
import './Post.css'
import { FaRegThumbsUp } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { IoMdShare } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import InputOption from '../Feed/InputOption'
import { SlOptionsVertical } from "react-icons/sl";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from '../../DB/Firebase';
import { deleteObject, ref } from 'firebase/storage';

const Post = ({ id, name, description, message, photourl, userImg }) => {

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

    const OptionDropDown = () => {
        return (
            <div className="dropdown">
                <SlOptionsVertical className='Post_option' id="dropdownMenuLink" data-bs-toggle="dropdown" />
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div className='DrPost_Op'>
                        <li onClick={() => { alert("del") }}>Edit Post</li>
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
                    <InputOption Icon={FaRegThumbsUp} title='Like' color='Gray' />
                    <InputOption Icon={IoChatbubbleEllipsesOutline} title='Comment' color='Gray' />
                    <InputOption Icon={IoMdShare} title='Share' color='Gray' />
                    <InputOption Icon={AiOutlineSend} title='Send' color='Gray' />
                </div>
            </div>
        </>
    )
}

export default Post