import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../post/Post'
import { db } from '../../DB/Firebase'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import Layout from '../layout/Layout'
import Loading from '../Loading/Loading'
import UserProfileView from './UserProfileView';
import UserProfileEdit from './UserProfileEdit';
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
        {ID ?
          <div style={{ width: '98%' }}>
            <UserProfileView />
            <UserProfileEdit />
            <div style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
              {post.map((item) => {
                return (
                  <>
                    <Post
                      id={item.ID}
                      name={item.name}
                      description={item.description}
                      message={item.message}
                      photourl={item.photourl}
                      userImg={item.userImg} />
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