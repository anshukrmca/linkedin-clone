import './Header.css'
import { IoIosSearch } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import HeaderOption from './HeaderOption';
import { Link } from 'react-router-dom'
import ProfileDiv from './ProfileDiv'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
import { auth } from '../../DB/Firebase';
import { useEffect, useState } from 'react';


const Header = () => {
    const [id, setID] = useState("");
    const dispatch = useDispatch();

 
    useEffect(() => {

        auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                await setID(userAuth.uid)
            }
            else {
                dispatch(logout())
            }
        });

       
    }, [dispatch])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <img alt='img' height='40px' src="data:image/png;base64,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" />
                    </Link>
                    <div className="header__search">
                        <IoIosSearch />
                        <input type='text' placeholder='Search' />
                    </div>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* means */}
                    <div className="collapse navbar-collapse align-middle" style={{marginRight:'60px'}} id="navbarNav">
                        <ul className="navbar-nav ms-auto nav_ul align-items-center">

                            <HeaderOption Icon={TiHomeOutline} title='Home' path='/home' />
                            <HeaderOption Icon={MdOutlineAccountBalance} title='My Network' />
                            <HeaderOption Icon={FaBusinessTime} title='Jobs' />
                            <HeaderOption Icon={MdOutlineChat} title='Messaging' />
                            <HeaderOption Icon={MdOutlineNotifications} title='Notification' />
                            <div className='PDiv-nav'>
                            <ProfileDiv />
                            </div>
                            <div className='SmProfile'>
                            <HeaderOption Icon={FaRegUserCircle} title='Profile' path={`/profile/${id}`}/>
                            </div>

                        </ul>
                    </div>
                    {/* end */}
                </div>
            </nav>
        </>
    )
}

export default Header