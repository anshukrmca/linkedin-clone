import React, { useEffect, useState } from 'react'
import './Feed.css'
import { MdOutlineCreate } from "react-icons/md";
import { FcGallery } from "react-icons/fc";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import InputOption from './InputOption'
import Post from '../post/Post'
import { db } from '../../DB/Firebase'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice';
import { Link } from 'react-router-dom';



const Feed = () => {
  const user = useSelector(selectUser);
  const [post, setPost] = useState([])

  // get post details 
  useEffect(() => {
    // get data from firebase store 
    const Getpost = onSnapshot(
      query(collection(db, 'posts'), orderBy('CreatedAt', 'desc')),
      (snapshot) => {
        const updatedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(updatedPosts);
      },
      (error) => {
        console.error('Error fetching posts: ', error);
      }
    );
    return () => Getpost();
  }, []);

  return (
    <>
      <div className="feed">
        <div className="feed__inputContainer">
          <Link className="DivFeed__Input" to='/addPost'>
            <img alt='img' className='rounded-circle feed__UserPic' src={user.img} />
            <div className="feed__input">
              <MdOutlineCreate style={{ fontSize: '30px' }} />
              </div>
            </Link>
          
          <div className="feed__inputOption">
            <InputOption Icon={FcGallery} title='Photo' color='#0073b1' />
            <InputOption Icon={MdOutlineSubscriptions} title='Video' color='#C37D16' />
            <InputOption Icon={MdEventAvailable} title='Event' color='#E06847' />
            <InputOption Icon={SlCalender} title='Write artical' color='lightgreen' />
          </div>
        </div>

       
        {/* post feeds*/}

        {post.map((item) => {
          return (
            <>
              <Post
                PostId={item.id}
                name={item.name}
                description={item.description}
                message={item.message}
                photourl={item.photourl}
                userImg={item.userImg}
                NoOfLike={item.NoOfLike}
                 />
            </>
          )
        })}
      </div>

    </>
  )
}

export default Feed
