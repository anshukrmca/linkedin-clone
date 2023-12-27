import { Link } from 'react-router-dom'
import './HeaderOption.css'
//import { Avatar } from '@mui/material'

const HeaderOption = ({ avatar, Icon, title,path }) => {
  return (
    <>
        <Link  className='headerOption' to={path} style={{textDecoration:'none'}} >
          {Icon && <Icon className='headerOption__icon'/>}
          {avatar && <img className='ProfilePic' src={avatar} alt='img' />}
          {title && <h3 className='headerOption__title'>{title}</h3>}
        </Link>
    </>
  )
}

export default HeaderOption