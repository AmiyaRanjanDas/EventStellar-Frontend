import React from 'react';
import "../styles/style.css";

import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <div className="container">
        <div className="row py-4">          
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div>
            <h2 className="text-primary">About Us</h2>
            <p style={{textAlign:'justify'}}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia distinctio nihil officiis incidunt eveniet error a voluptatem, deleniti provident totam nostrum ea illo similique delectus obcaecati non explicabo sapiente quam!
            </p>
            <Link className="btn btn-outline-primary" to='/event'>Book Now</Link>
            </div>
          </div>
          <div className="col-md-6 p-0 p-md-4">
            <img src="https://member365.com/wp-content/uploads/2019/12/Member365-events.jpg" alt="" className="w-100"/>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <h2 className='text-primary text-center'>Our Team</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="about_card">
              <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719360000&semt=sph" alt="" />
              <div className="content">
                <h5>Amiya Ranjan Das</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, ipsam?</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="about_card">
              <img src="https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg" alt="" />
              <div className="content">
                <h5>Lipsa Praharaj</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, ipsam?</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="about_card">
              <img src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
              <div className="content">
                <h5>Shubhalaxmi Barik</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, ipsam?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="mission">

        </div>
      </div>
    </>
  )
}

export default About