import React from 'react'
import Header from '../Header/Header'
import { ToastContainer } from 'react-toastify'
import './Layout.css'
const Layout = ({children}) => {
  return (
    <div className='Layout_Div'>
        <Header/>
        <div className="">
        <ToastContainer/>
            {children}
        </div>
    </div>
  )
}

export default Layout