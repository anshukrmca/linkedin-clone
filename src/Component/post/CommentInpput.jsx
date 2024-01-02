import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { db } from '../../DB/Firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

const CommentInpput = ({ postId, ComID, mode }) => {
    const [newComment, setNewComment] = useState('');
    const user = useSelector(selectUser)

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (ComID !== undefined) {
              const docRef = doc(db, "PostOnCommnet", ComID);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setNewComment(docSnap.data().CommnetMessage);
              } else {
                setNewComment("");
                console.log("No matching document found");
              }
            } else {
              setNewComment("");
            }
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        };
      
        fetchData();
      }, [ComID, setNewComment]);

    const ButtonAction = async () => {
        if (ComID !== undefined) {
            const UserRef = doc(db, "PostOnCommnet", ComID);
            await updateDoc(UserRef, {
                CommnetMessage: newComment,
                CreatedAt: serverTimestamp()
            });
            toast.warning("Commnet Updated !")
            setNewComment("")
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        else {
            await addDoc(collection(db, "PostOnCommnet"), {
                postId: postId,
                CommnetMessage: newComment,
                CommnetByNmae: user.name,
                CommnetByImg: user.img,
                CommnetByUserID: user.uid,
                CreatedAt: serverTimestamp(),
            });
            toast.success("Commnet add !")
            setNewComment("")
            setTimeout(() => {
              window.location.reload();
          }, 2000);
        }
    }




    return (
        <div>
            <div className="commnet_Box" >
                <input
                    placeholder="Write your comment here..."
                    value={newComment}
                    onChange={(e) => { setNewComment(e.target.value) }}
                />
                <AiOutlineSend size={35} style={{ cursor: 'pointer' }} onClick={ButtonAction} />
            </div>
        </div>
    )
}

export default CommentInpput