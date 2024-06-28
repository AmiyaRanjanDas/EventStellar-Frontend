import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Account() {
    const navigate = useNavigate();

    function shortenParagraph(paragraph, wordLimit = 15) {
        const words = paragraph.split(' ');
        if (words.length <= wordLimit) {
          return paragraph;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
      }

    const Logout = () => {
        if (confirm("Sure you want to logout!")) {
            localStorage.setItem('EventStellar-Email', null);
            localStorage.setItem('EventStellar-UserName', null);
            navigate("/");
            window.location.reload();
        }
    }


    const [userData, setUserData] = useState(null);
    const [bookedEvents, setBookedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem('EventStellar-Email');

    useEffect(() => {
        async function fetchUserData() {
            try {
                let res = await fetch(`https://eventstellar-backend.onrender.com/user?mail=${userEmail}`);
                if (res.ok) {
                    let data = await res.json();
                    setUserData(data[0]);
                    await fetchBookedEvents(data[0].myBookings);

                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        }

        async function fetchBookedEvents(bookings) {
            const eventRequests = bookings.map(booking =>
                fetch(`https://eventstellar-backend.onrender.com/events/${booking.eventId}`)
            );

            try {
                const eventResponses = await Promise.all(eventRequests);
                const eventData = await Promise.all(eventResponses.map(res => res.json()));
                setBookedEvents(eventData);
                console.log(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        }

        fetchUserData();
    }, [userEmail]);


    return (
        <>
            <div className="account_head">
                <div className="container">
                    <div className="row py-4">
                        <div className="col-md-8 mb-4 mb-md-0">
                            <h3>Welcome&nbsp;
                                <span className='text-primary'>
                                    {userData?.name}
                                </span>
                            </h3>

                            <p className='m-0 mt-3'>Email address:</p>
                            <h6>{userData?.mail}</h6>
                            <p className='m-0 mt-3'>Mobile No:</p>
                            <h6>{userData?.mobile}</h6>
                        </div>
                        <div className="col-md-4 px-4 d-flex align-items-center justify-content-center">
                            <div>
                                <button className="btn btn-outline-danger w-100 mb-3" onClick={Logout}>Logout</button>
                                <Link className="btn btn-outline-success w-100" to="/changePassword">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bookings">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-8">
                            <h3 className='text-primary text-center mb-3'>Booked Events</h3>
                            <div className="row all_events">

                                {loading ? (
                                    <div className='d-flex justify-content-center align-items-center' style={{ height: '400px' }}>
                                        <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-07-846_512.gif" alt="" style={{ width: "100px" }} />
                                    </div>
                                ) : bookedEvents.length === 0 ? (
                                    <div className='text-center'>
                                        <img src="https://cdn.vectorstock.com/i/500p/12/22/no-data-concept-vector-47041222.jpg" alt="" style={{ height: "300px" }} />
                                        <h3>No Events Booked Yet</h3>
                                    </div>
                                ) : (
                                    bookedEvents.map((item, index) => {
                                    const eventDate = new Date(`${item.date}T${item.endtime}`);
                                    const now = new Date();
                                    const isEventPassed = eventDate < now;
                                    return(
                                        <div className="col-md-6 p-0" key={index}>
                                            <div className="event-card">
                                                <span>{item.place}</span>
                                                <h3>{item.name}</h3>
                                                <p>{shortenParagraph(item.description)}</p>
                                                <h6>₹ {item.price}/-</h6>
                                                {
                                                    isEventPassed ?
                                                    <button className="btn btn-sm btn-outline-danger">expired</button>
                                                    :                                                    
                                                    <Link className="btn btn-sm btn-outline-primary" to={`/showEvent/${item.id}`}>Show</Link>
                                                }                                                
                                            </div>
                                        </div>
                                    )})
                                )}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='side_card'>
                                <h4>Be a Event manager</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, labore!</p>
                                <ul>
                                    <li>create own event</li>
                                    <li>market your events</li>
                                    <li>create money</li>
                                    <li>work with us</li>
                                </ul>
                                <Link className='btn btn-primary' to='/adminPanel'>Create</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account