import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../post/Post'
import { db } from '../../DB/Firebase'
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Layout from '../layout/Layout'
import Loading from '../Loading/Loading'
import UserProfileView from './UserProfileView';
import SessionTimeOut from '../../PrivateRoute/SessionTimeOut'

const UserProFile = () => {
  const ID = useParams()
  const [post, setPost] = useState([])

  // get post details 
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const collectionRef = (collection(db, 'posts'));
        const q = query(collectionRef, where('userId', '==', ID.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const fetchedPosts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            ID: doc.id,
          }));
         // console.log(fetchedPosts)
          setPost(fetchedPosts);
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    if (ID) {
      fetchUserPosts();
    }
  }, [ID]);

  //console.log(post)
  return (
    <>
      <Layout>
        <SessionTimeOut />
        {ID ?
          <div style={{ width: '98%' }}>
            <UserProfileView />
            <div style={{ margin: '0px 10px' }}>
              {post.map((item) => {
                return (
                  <>
                    <Post
                      PostId={item.ID}
                      name={item.name}
                      description={item.description}
                      message={item.message}
                      photourl={item.photourl}
                      userImg={item.userImg}
                      NoOfLike={item.NoOfLike} />
                  </>
                )
              })}
            </div>
          </div>
          :
          <div>
            <Loading />
          </div>
        }

      </Layout>
    </>
  )
}

export default UserProFile