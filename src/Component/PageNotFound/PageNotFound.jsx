import React from 'react'
import './PageNotFound.css'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
      <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <h1 style={{ fontSize: '4rem' }}>Oops  !</h1>
          <h5>Page not Found 404 ! <span className='fs-2'>&#128640;</span></h5>
          <p>We can’t seem to find the page you’re looking for</p>
          <Link to="/home" className="link_404" style={{ textDecoration: 'none' }}>
            Go to Home
          </Link>
        </div>
        <div className="col-md-8 mt-4 mt-md-0">
          <div className="four_img p-4 ">
            <img
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
              alt="404"
            />
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default PageNotFound