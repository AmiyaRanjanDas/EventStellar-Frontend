import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { FaUser } from "react-icons/fa";

function Navbar() {
    // ===================Storing data of user in local storege==================
    const [userName, setUserName] = useState(null);
    
    useEffect(() => {
      setUserName(localStorage.getItem('EventStellar-UserName'))
    }, [])
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 px-4">
                <div className="container-fluid">
                    <a className="navbar-brand text-primary" href="#" style={{ fontWeight: '600' }}>EventStellar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-2">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/event">Events</Link>
                            </li>
                            {userName!='null' ?
                                <li className="nav-item">
                                    <Link className="btn btn-outline-primary" to='/account'
                                    style={{padding:'3px 10px 8px 10px'}}><FaUser/>
                                    <span style={{position:'relative',top:'2px',paddingLeft:'5px'}}>{userName}</span>
                                    </Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link className="btn btn-outline-primary" to="/login">Login</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar