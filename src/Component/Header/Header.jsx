import './Header.css'
import { IoIosSearch } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import linkedin from '../../Image/linkedin.png'
import HeaderOption from './HeaderOption';
import { auth } from '../../DB/Firebase'; // Your Firebase configuration file import
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/userSlice';

const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const LogoutToApp = () => {
        dispatch(logout());
        auth.signOut()
        localStorage.removeItem('logIn')
        console.log("loout")
        alert("logout")
        navigate("/login")
    }

    const ProfileDropDown = () => {
        return (
            <div className="dropdown">
                <Link id="dropdownMenuLink" data-bs-toggle="dropdown" style={{textDecoration:'none'}}>
                    <HeaderOption avatar={user.img} title={user.name.substring(0, 5)}/>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div className="divProfile">
                        <div className="div__detail">
                            <img src={user.img} alt="userpic" />
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                        <hr />
                        <div className="div__action">
                            {/* <Link onClick={() => { navigate(`/profile/${user.uid}`) }} className='div__action'>Profile view</Link> */}
                            <Link to={`/profile/${user.uid}`} className='div__action'>Profile view</Link>
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

                    <img src={linkedin} alt='' />

                    <div className="header__search">
                        <IoIosSearch />
                        <input type='text' placeholder='Search' />
                    </div>
                </div>
                <div className="header__right">
                    <HeaderOption Icon={TiHomeOutline} title='Home' />
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