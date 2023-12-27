import React from 'react'
import Header from '../Header/Header'
import { ToastContainer } from 'react-toastify'
const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <div className="content">
        <ToastContainer/>
            {children}
        </div>
    </div>
  )
}

export default Layout