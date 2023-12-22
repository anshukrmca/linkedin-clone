import React from 'react'
import '../../App.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice';
import Loading from '../Loading/Loading';
// import SessionTimeOut from '../../PrivateRoute/SessionTimeOut';
import Sidebar from '../sidebar/Sidebar'
import Feed from '../Feed/Feed'
import Layout from '../layout/Layout';
import Widget from '../Widget/Widget'

const Home = () => {
  const user = useSelector(selectUser)
  return (
    <>
      {/* <SessionTimeOut /> */}
      <Layout>
        <div >
          {user ?
            <div className='app__body'>
              <Sidebar />
              <Feed />
              <Widget/>
            </div>
            :
            <div>
              <Loading />
            </div>
          }
        </div>
      </Layout>
    </>
  )
}

export default Home