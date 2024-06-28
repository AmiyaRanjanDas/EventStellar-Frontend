import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <>
        <div className="container text-center pb-5">
            <img src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif" alt="" style={{display:'block',height:'300px',margin:'auto'}}/>
            <Link className="btn btn-primary" to='/'>Go to Home</Link>
        </div>
    </>
  )
}

export default Success