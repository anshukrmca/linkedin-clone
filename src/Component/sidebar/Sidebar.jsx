// import { Avatar } from '@mui/material'
import { selectUser } from '../../features/userSlice';
import './Sidebar.css'
import { useSelector } from 'react-redux';


const Sidebar = () => {
const user = useSelector(selectUser)

    const reacentItem = (topic) => {
        return (<div className="sidebar__reacentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>)
    };

    return (
        <>
            <div className="sidebar">
                <div className="sidebar__top">
                    <img className='sidebar__topBanner' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbbbTr1aQJiLqmCTxcE_4WSHDDCUi18J5zGg&usqp=CAU' alt='' />
                    <img className='sidebar__avatar' src={user.img} alt='img' />
                    <h2>{user.name}</h2>
                    <h4>{user.email}</h4>
                </div>

                <div className="sidebar__stats">
                    <div className="sidebar__stat">
                        <p>Profile viewed</p>
                        <p className='sidebar__statNumber'>2,343</p>
                    </div>
                    <div className="sidebar__stat">
                        <p>Viewed on Post</p>
                        <p className='sidebar__statNumber'>2,34</p></div>
                </div>

                <div className="sidebar__buttom">
                    <p>Recent</p>
                    {reacentItem("React js")}
                    {reacentItem("Programming")}
                    {reacentItem("softwareenginineering")}
                    {reacentItem("Design")}
                    {reacentItem("Developer")}
                </div>
            </div>
        </>
    )
}

export default Sidebar