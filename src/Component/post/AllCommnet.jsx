import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../DB/Firebase';
import CommnetCard from './CommnetCard';
import { useParams } from 'react-router-dom';

const AllCommnet = () => {
    const [commentData, setCommentData] = useState([]);
    const PostID = useParams()
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
                    console.log(commentsArray); // Log comment with postId

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

            <div class="modal-body">
                <p className='my-2'>Commnet List..</p>
                {commentData.map((m) => {
                    return (
                        <>
                            <CommnetCard id={m.CommentId} img={m.data.CommnetByImg} name={m.data.CommnetByNmae} massage={m.data.CommnetMessage} />
                        </>
                    )
                })}
            </div>

        </>
    )
}

export default AllCommnet