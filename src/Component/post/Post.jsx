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
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import CommnetCard from './CommnetCard';
import { Link } from 'react-router-dom';
import AllCommnet from './AllCommnet';
const Post = ({ PostId, name, description, message, photourl, userImg, NoOfLike }) => {

    const [CheckLiked, setCheckLiked] = useState(false)
    const [CommnetOpen, setCommnentOpen] = useState(false)
    const Userid = auth.currentUser.uid;
    const [newComment, setNewComment] = useState('');
    const [commentData, setCommentData] = useState([]);
    const user = useSelector(selectUser)
    const [CommentYes, setCommentYes] = useState(false)

    const deletePost = async (PostId, photourl) => {
        try {
            await deleteDoc(doc(db, "posts", PostId));
            DeletelikePost(PostId)
            if (!photourl === "") {
                deleteImg(photourl)
            }
            toast.error("Post Successfully Delete!");

            // Delay window reload after displaying the toast for 5 seconds
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Error deleting post and image:", error);
        }
    };

    const DeletelikePost = async (PostId) => {
        const LikedPostCollectionRef = collection(db, 'LikedPost');
        const q = query(LikedPostCollectionRef, where('postId', '==',PostId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log(`Document with ID ${doc.id} deleted successfully.`);
        });
    }
    const deleteImg = (photourl) => {
        const storageRef = ref(storage, photourl);
        return deleteObject(storageRef)
    };


    // check which post is like by current user 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const likedPostRef = collection(db, 'LikedPost');
                const q = query(
                    likedPostRef,
                    where('postId', '==', PostId),
                    where('LikedBy', '==', Userid)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setCheckLiked(true);
                    return;
                }
            } catch (error) {
                console.error('Error fetching documents: ', error);
            }
        };
        fetchData(PostId, Userid);
    }, [PostId, Userid]); // Dependency array, update if 'id' changes

    // get all comment on this particuler post by ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const PostOnCommnetRef = collection(db, 'PostOnCommnet');
                const q = query(PostOnCommnetRef, where('postId', '==', PostId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setCommentYes(true);
                } else {
                    setCommentYes(false);
                }
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

    }, [PostId])


    const LikeFN = async () => {
        try {
            const likedPostRef = collection(db, 'LikedPost');
            const q = query(
                likedPostRef,
                where('postId', '==',PostId),
                where('LikedBy', '==', Userid)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setCheckLiked(true);
                return;
            } else {
                const UserRef = doc(db, "posts", PostId);
                await updateDoc(UserRef, {
                    NoOfLike: NoOfLike + 1,
                });

                await addDoc(collection(db, "LikedPost"), {
                    postId: PostId,
                    LikedBy: auth.currentUser.uid,
                });
                setCheckLiked(true);
                console.log("Post updated with like. LikedPost added:");
            }
        } catch (err) {
            console.log("Error while updating post/adding LikedPost:", err);
        }
    };

    const OpenCommnetBox = () => {
        setCommnentOpen(!CommnetOpen)
    }
    const AddComment = async () => {
        await addDoc(collection(db, "PostOnCommnet"), {
            postId: PostId,
            CommnetMessage: newComment,
            CommnetByNmae: user.name,
            CommnetByImg: user.img,
        });
        toast.success("Commnet add !")
        setNewComment("")
    }

    const OptionDropDown = () => {
        return (
            <div className="dropdown">
                <SlOptionsVertical className='Post_option' id="dropdownMenuLink" data-bs-toggle="dropdown" />
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div className='DrPost_Op'>
                        <li onClick={() => { deletePost(PostId, photourl) }}>Delete</li>
                    </div>

                </div>
            </div>
        );
    }
    const handleOpenModal = (PostId) => {
        console.log("ID ",PostId)
      };

    return (
        <>
            
            <div className="post" key={PostId}>
                <p>{PostId}</p>
                <div className="post__header">
                    <div className='post_headerOP'>
                        <img src={userImg} alt='imgs' />
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
                    <InputOption Icon={IoChatbubbleEllipsesOutline} title='Comment' color='Gray' functions={OpenCommnetBox} />
                    <InputOption Icon={IoMdShare} title='Share' color='Gray' />
                    <InputOption Icon={AiOutlineSend} title='Send' color='Gray' />
                </div>

                <div className='comment_Div' style={{ display: CommnetOpen ? "block" : "none" }}>
                    <div className="commnet_Box" >
                        <input
                            placeholder="Write your comment here..."
                            value={newComment}
                            onChange={(e) => { setNewComment(e.target.value) }}
                        />
                        <AiOutlineSend size={35} style={{ cursor: 'pointer' }} onClick={AddComment} />
                    </div>
                </div>
                <div style={{ display: CommentYes ? "block" : "none", overflow: "hidden", marginTop: '10px', height: '90px' }}>
                    <p className='my-2'>Commnet List..</p>
                    {commentData.map((m) => {
                        return (
                            <>
                                <CommnetCard id={m.CommentId} img={m.data.CommnetByImg} name={m.data.CommnetByNmae} massage={m.data.CommnetMessage} />
                            </>
                        )
                    })}
                </div>

                {!CommentYes ? "" :
                    <div style={{ textAlign: 'right' }}>
                        <Link to={`/comment/${PostId}`} style={{ fontSize: '12px', fontWeight: 400, textAlign: 'end', color: 'black' }}
                        >view more comment</Link>
                    </div>
                }
            </div>
            {/* <AllCommnet postID={PostId}/> */}
            
        </>
    )
}

export default Post