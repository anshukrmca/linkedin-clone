import React from 'react'
import './Post.css'
import { FaRegThumbsUp } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { IoMdShare } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import InputOption from '../Feed/InputOption'


const Post = ({ id, name, description, message, photourl, userImg }) => {
    return (
        <>
            <div className="post" key={id}>
                <div className="post__header">
                    <img src={userImg} alt='img' />
                    <div className="post__info">
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
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