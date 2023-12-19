import React from 'react'
import '../../App.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice';
import Loading from '../Loading/Loading';
// import SessionTimeOut from '../../PrivateRoute/SessionTimeOut';
import Header from '../Header/Header';
import Sidebar from '../sidebar/Sidebar'
import Feed from '../Feed/Feed'


const Home = () => {
  const user = useSelector(selectUser)
  return (
    <>
      {/* <SessionTimeOut /> */}

      <div >
        {user ?
          <div>
            <Header />
            <div className='app__body'>
              <Sidebar />
              <Feed/>
            </div>
          </div>
          :
          <div>
            <Loading />
          </div>
        }
      </div>
    </>
  )
}

export default Home