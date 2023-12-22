import './Header.css'
import HeaderOption from './HeaderOption';
import { auth, db } from '../../DB/Firebase'; // Your Firebase configuration file import
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';


const ProfileDiv = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState("");

    const LogoutToApp = () => {
        dispatch(logout());
        auth.signOut()
        localStorage.removeItem('logIn')
        alert("logout")
        navigate("/login")
    }

    useEffect(() => {

        auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                await getUserData(userAuth.uid)
            }
            else {
                dispatch(logout())
            }
        });

        const getUserData = async (id) => {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef)
            setID(id)
            setName(docSnap.data().name)
            setImg(docSnap.data().img)
            setEmail(docSnap.data().email)
        }
    }, [dispatch])


    return (
        <div className="">
            <Link id="dropdownMenuLink" data-bs-toggle="dropdown" style={{ textDecoration: 'none' }}>
                <HeaderOption avatar={img} title={name.substring(0, 5)} />
            </Link>
            <ul className="dropdown-menu" style={{marginLeft:'70%'}}  aria-labelledby="dropdownMenuLink">
                <div className="divProfile" >
                    <div className="div__detail">
                        <img src={img} alt="userpic" />
                        <p>{name}</p>
                        <p>{email}</p>
                    </div>
                    <hr />
                    <div className="div__action">
                        {/* <Link onClick={() => { navigate(`/profile/${user.uid}`) }} className='div__action'>Profile view</Link> */}
                        <Link to={`/profile/${id}`} className='div__action'>Profile view</Link>
                        <button onClick={LogoutToApp} className='div__action' style={{ color: "red" }}>Logout</button>
                    </div>
                </div>
            </ul>
        </div>
    );
}

export default ProfileDiv