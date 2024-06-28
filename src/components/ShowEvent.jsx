import React, { useState, useEffect } from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import { ImExit } from "react-icons/im";

function ShowEvent() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [singleEventData, setSingleEventData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getSingleEventData() {
        try {
            let res = await fetch(`https://eventstellar-backend.onrender.com/events/${eventId}`);
            if (res.ok) {
                let data = await res.json();
                console.log(data);
                setSingleEventData(data);
                setLoading(false);
            } else {
                console.error("Failed to fetch event data");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching event data:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getSingleEventData();
    }, []);

    const getSeatCount = (email) => {
    return singleEventData?.booked
      .filter((booking) => booking.userEmail === email)
      .reduce((total, booking) => total + booking.ticketNo, 0);
  };

    return (
        <>
            {singleEventData ? (
                <>
                    <div className='container py-4 Edit_event'>
                        <div className="row">
                            <div className="col-md-8 mb-4 mb-md-0">
                                <h4 className='mb-3'>Event Details</h4>
                                <div className="mb-3">
                                    <p>Name:</p>
                                    <h5>{singleEventData.name}</h5>
                                </div>
                                <div className="mb-3">
                                    <p>Description:</p>
                                    <span>{singleEventData.description}</span>
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <p>Place:</p>
                                            <h6>{singleEventData.place}</h6>
                                        </div>
                                        <div className="col-6">
                                            <p>Location:</p>
                                            <h6>{singleEventData.location}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                            <p>Number of Seats You Booked:</p>
                                            <h5 className='text-success'>{getSeatCount(localStorage.getItem('EventStellar-Email'))}</h5>
                                       
                                </div>
                                <div className="mb-3">
                                    <p>Ticket Price:</p>
                                    <h5 >₹ {singleEventData.price}/-</h5>
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <p>Event Date:</p>
                                            <h6>{singleEventData.date}</h6>
                                        </div>
                                        <div className="col-6">
                                            <p>Event Time:</p>
                                            <h6>{singleEventData.starttime + "-" + singleEventData.endtime}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className=' mb-3'>
                                    <h4 className='mb-1'>Upadtes about Event</h4>
                                    <p>by Event Manager</p>
                                </div>
                                {loading ? (
                                    <div className='d-flex justify-content-center align-items-center' style={{ height: '400px' }}>
                                        <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-07-846_512.gif" alt="" style={{ width: "100px" }} />
                                    </div>
                                ) : singleEventData.comment.length === 0 ? (
                                    <div className='text-center'>
                                        <img src="https://img.freepik.com/free-vector/warning-concept-illustration_114360-1551.jpg" alt="" style={{ height: "200px" }} />
                                        <h5 className='text-primary'>No comments Yet</h5>
                                    </div>
                                ) : (
                                    singleEventData.comment.map((item, index) => (
                                        <div className='comment_card' key={index}>
                                            <p>update-{index + 1}</p>
                                            <h6>{item}</h6>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>                    
                </>
            ) : (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '400px' }}>
                    <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-07-846_512.gif" alt="" style={{ width: "100px" }} />
                </div>
            )}
            
            <Link to='/account' className='btn btn-primary' 
            style={{position: 'fixed',bottom: '10px',right: '10px',
                padding:'7px 9px 7px 14px',border:'1px solid black'}}><ImExit/></Link>
            
        </>
    )
}

export default ShowEvent