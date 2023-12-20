import './Header.css'
import { IoIosSearch } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import linkedin from '../../Image/linkedin.png'
import HeaderOption from './HeaderOption';
import { auth, db } from '../../DB/Firebase'; // Your Firebase configuration file import
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
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

    const ProfileDropDown = () => {
        return (
            <div className="dropdown">
                <Link id="dropdownMenuLink" data-bs-toggle="dropdown" style={{ textDecoration: 'none' }}>
                    <HeaderOption avatar={img} title={name.substring(0, 5)} />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div className="divProfile">
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

    return (
        <>
            <div className="header">
                <div className="header__left">
                    <Link className="header__left" to='/home'>
                        <img src={linkedin} alt='' />
                    </Link>

                    <div className="header__search">
                        <IoIosSearch />
                        <input type='text' placeholder='Search' />
                    </div>
                </div>
                <div className="header__right">
                    <HeaderOption Icon={TiHomeOutline} title='Home' path='/home' />
                    <HeaderOption Icon={MdOutlineAccountBalance} title='My Network' />
                    <HeaderOption Icon={FaBusinessTime} title='Jobs' />
                    <HeaderOption Icon={MdOutlineChat} title='Messaging' />
                    <HeaderOption Icon={MdOutlineNotifications} title='Notification' />
                    <ProfileDropDown />
                </div>
            </div>
        </>
    )
}

export default Header