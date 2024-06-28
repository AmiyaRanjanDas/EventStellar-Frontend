import React from 'react';
import "../styles/style.css";
import { FaFacebook,FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { PiLinkSimpleBold } from "react-icons/pi";

function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start" id='footer' style={{background:'#0d6efd2e'}}>
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0 px-0 px-md-4">
                            <h6 className="text-uppercase">Content</h6>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                                molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
                                voluptatem veniam, est atque cumque eum delectus sint!
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0 px-0 px-md-4">
                            <h6 className="text-uppercase">Usefull Links</h6>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#"><PiLinkSimpleBold className='text-primary'/> Home</a>
                                </li>
                                <li>
                                    <a href="#"><PiLinkSimpleBold className='text-primary'/> About</a>
                                </li>
                                <li>
                                    <a href="#"><PiLinkSimpleBold className='text-primary'/> Event</a>
                                </li>
                                <li>
                                    <a href="#"><PiLinkSimpleBold className='text-primary'/> Login</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0 px-0 px-md-4">
                            <h6 className="text-uppercase">Social Media</h6>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#"><FaFacebook className='text-primary'/> facebook</a>
                                </li>
                                <li>
                                    <a href="#"><FaInstagram className='text-primary'/> Instagram</a>
                                </li>
                                <li>
                                    <a href="#"><FaXTwitter className='text-primary'/> Twitter</a>
                                </li>
                                <li>
                                    <a href="#"><BiLogoGmail className='text-primary'/> Email</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3 bg-primary">
                    © 2024 Copyright :
                    <a className="text-white" href="https://mdbootstrap.com/"> EventStellar.com</a>
                </div>
            </footer>
        </>
    )
}

export default Footer