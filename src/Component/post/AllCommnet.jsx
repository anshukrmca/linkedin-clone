import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../DB/Firebase';
import CommnetCard from './CommnetCard';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout'
import Loading from '../Loading/Loading';

const AllCommnet = () => {
    const [commentData, setCommentData] = useState([]);
    const PostID = useParams()
    //  const Userid = auth.currentUser.uid;
    // get all comment on this particuler post by ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const PostOnCommnetRef = collection(db, 'PostOnCommnet');
                const q = query(PostOnCommnetRef, where('postId', '==', PostID.id));
                const querySnapshot = await getDocs(q);
                const commentsArray = [];
                querySnapshot.forEach((doc) => {
                    commentsArray.push({ CommentId: doc.id, data: doc.data() });
                });
                setCommentData(commentsArray);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [PostID.id])

    return (
        <>
            <Layout>
                <div className="mx-5">
                    <p className='my-2'>Commnet List..</p>
                    <div style={{ display: 'grid', gridTemplateColumns: "repeat(2, 1fr)", gap: '20px' }}>
                        {commentData ?
                            commentData.map((m) => {
                                return (
                                    <>
                                        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px", marginBottom: '10px' }}>
                                            <CommnetCard ByUserID={m.data.CommnetByUserID} id={m.CommentId} img={m.data.CommnetByImg} name={m.data.CommnetByNmae} massage={m.data.CommnetMessage} />
                                        </div>
                                    </>
                                )
                            })
                            :
                            <Loading />
                        }

                    </div>

                </div>

            </Layout>

        </>
    )
}

export default AllCommnet