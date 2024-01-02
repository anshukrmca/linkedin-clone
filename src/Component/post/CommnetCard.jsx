import React, { useEffect, useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl';
import { auth, db } from '../../DB/Firebase';
import CommentInpput from './CommentInpput';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {useNavigate}  from 'react-router-dom'


const CommnetCard = ({postId,ByUserID,id, img, name, massage }) => {
    const [commentAction, setCommentAction] = useState(true)
    const Userid = auth.currentUser.uid;
    const [editCommnet,setEditCommnent] = useState(false)
    const navigate = useNavigate()

    const deleteComment = async()=>{
        await deleteDoc(doc(db, "PostOnCommnet", id));
        toast.success("Comment deleted !");
       navigate('/home')
    }

    const CommentAction = () => {
        return (
            <div className="dropdown">
                <SlOptionsVertical className='Post_option' id="dropdownMenuLink" data-bs-toggle="dropdown" />
                <div className="dropdown-menu"  aria-labelledby="dropdownMenuLink">
                    <div className='DrPost_Op'>
                        <li onClick={()=>{setEditCommnent(!editCommnet)}}>Edit</li>
                        <li onClick={deleteComment}>Delete</li>
                    </div>

                </div>
            </div>
        );
    }

    useEffect(()=>{
        if(Userid === ByUserID )
        {
            setCommentAction(true)
        }else{
            setCommentAction(false)
        }

    },[ByUserID,Userid])
    
    return (
        <div>
            <div key={id} style={{ padding:"5px",paddingTop:'10px',borderLeft: '2px solid black'}}>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <img className="mx-2 rounded-circle" src={img} alt="img" width={'25px'} height={'25px'} />
                        <h5 className="mt-0 mb-1" style={{ fontSize: '12px' }}><u>{name}</u></h5>
                    </div>
                    {commentAction ? <CommentAction /> : ""}
                </div>
                <p style={{ marginLeft: '40px', fontSize: '12px', fontWeight: '400' }}>
                    {massage}
                    {editCommnet ? 
                    <CommentInpput postId={postId} ComID={id} mode="edit"/>
                    : ""}
                </p>
            </div>
        </div>
    )
}

export default CommnetCard