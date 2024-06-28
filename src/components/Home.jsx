import React from "react";
import { FaArrowRight } from "react-icons/fa";
import service_img1 from '../assets/time.png';
import service_img2 from '../assets/customer-service.png';
import service_img3 from '../assets/high-quality.png';
import slidecard1 from '../assets/teamwork.png';
import slidecard2 from '../assets/rings.png';
import slidecard3 from '../assets/cake.png';
import slidecard4 from '../assets/meeting.png';
import slidecard5 from '../assets/concert.png';
import slidecard6 from '../assets/music.png';
import slidecard7 from '../assets/tournament.png';
import slidecard8 from '../assets/education.png';
import slidecard9 from '../assets/bullhorn.png';

import { Link } from "react-router-dom";

function Home() {
  return (
    <>      
      <div className="container">
        <div className="row py-4">
          <div className="col-md-6 p-0 p-md-4">
            <img src="https://ischoolconnect.com/blog/wp-content/uploads/2022/02/download-34.png" alt="" className="w-100"/>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div>
            <h2 className="text-primary">Best Event Planners</h2>
            <p style={{textAlign:'justify'}}>
              with more than 30 wonderful destinations around India, join us to
              experience the Timeless moments
            </p>
            <Link className="btn btn-outline-primary" to='/event'>Book Now</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container services py-4">
          <h2 className="pb-3 text-primary">Our Services</h2>
          <div className="row">
            <div className="col-md-4 p-0">
              <div className="service-card">
                <img src={service_img1} alt="" />
                <div className="content">
                  <h3>Timely Services</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quos.</p>
                  <button><FaArrowRight /></button>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="service-card">
                <img src={service_img2} alt="" />
                <div className="content">
                  <h3>Best Support</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quos.</p>
                  <button><FaArrowRight /></button>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="service-card">
                <img src={service_img3} alt="" />
                <div className="content">
                  <h3>Award Winners</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quos.</p>
                  <button><FaArrowRight /></button>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="container py-4">
        <h2 className="pb-3 text-center text-primary">Book Events</h2>
        <div className="slider-event">
          <div className="slide">
            <div className="slide-card">
              <img src={slidecard1} alt="" />
              <h6>Conferences</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard2} alt="" />
              <h6>Weddings</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard3} alt="" />
              <h6>Birthdays</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard4} alt="" />
              <h6>Reunions</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard5} alt="" />
              <h6>Festivals</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard6} alt="" />
              <h6>Concerts</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard7} alt="" />
              <h6>Tournaments</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard8} alt="" />
              <h6>CollegeEvents</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard9} alt="" />
              <h6>Campaigns</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard1} alt="" />
              <h6>Conferences</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard2} alt="" />
              <h6>Weddings</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard3} alt="" />
              <h6>Birthdays</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard4} alt="" />
              <h6>Reunions</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard5} alt="" />
              <h6>Festivals</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard6} alt="" />
              <h6>Concerts</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard7} alt="" />
              <h6>Tournaments</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard8} alt="" />
              <h6>CollegeEvents</h6>
            </div>
            <div className="slide-card">
              <img src={slidecard9} alt="" />
              <h6>Campaigns</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
