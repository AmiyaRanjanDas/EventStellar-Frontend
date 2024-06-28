import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

function BookEvent() {
    const navigate = useNavigate();
    const { eventId } = useParams();

    const [singleEventData, setSingleEventData] = useState(null);
    const [adminDetails, setAdminDetails] = useState(null);

    const [seats, setSeats] = useState();

    useEffect(() => {
        async function fetchEventData() {
            try {
                // Fetch event data
                const res = await fetch(`https://eventstellar-backend.onrender.com/events/${eventId}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch event data (status ${res.status})`);
                }
                const eventData = await res.json();
                setSingleEventData(eventData);

                // Fetch admin details using adminEmail from event data
                const res2 = await fetch(`https://eventstellar-backend.onrender.com/user?mail=${eventData.adminEmail}`);
                if (!res2.ok) {
                    throw new Error(`Failed to fetch admin details (status ${res2.status})`);
                }
                const adminData = await res2.json();
                if (adminData.length > 0) {
                    setAdminDetails(adminData[0]);
                } else {
                    console.error("Admin details not found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchEventData();
    }, [eventId]);

    async function BookEvent() {
        try {
            const userEmail = localStorage.getItem('EventStellar-Email');
            const noOfTickets = seats;

            if (!userEmail || !noOfTickets || isNaN(noOfTickets) || noOfTickets <= 0) {
                alert("Please enter valid number of tickets");
                return;
            }

            // Update the events object with booked information
            const updatedEventData = {
                ...singleEventData,
                booked: [
                    ...singleEventData.booked,
                    {
                        userEmail: userEmail,
                        ticketNo: noOfTickets,
                    },
                ],
            };

            const res = await fetch(`https://eventstellar-backend.onrender.com/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEventData),
            });

            if (!res.ok) {
                throw new Error(`Failed to update event data (status ${res.status})`);
            }

            // Update the user object with booking information
            const res2 = await fetch(`https://eventstellar-backend.onrender.com/user?mail=${userEmail}`);
            if (!res2.ok) {
                throw new Error(`Failed to fetch user data (status ${res2.status})`);
            }
            const userData = await res2.json();
            if (userData.length === 1) {
                const user = userData[0];
                const updatedUserData = {
                    ...user,
                    myBookings: [
                        ...user.myBookings,
                        {
                            eventId: parseInt(eventId, 10),
                            noOfTicket: noOfTickets,
                        },
                    ],
                };

                const res3 = await fetch(`https://eventstellar-backend.onrender.com/user/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUserData),
                });

                if (!res3.ok) {
                    throw new Error(`Failed to update user data (status ${res3.status})`);
                }

                alert(`Booking successful! Tickets booked: ${noOfTickets}`);
                navigate('/success');
            } else {
                throw new Error("User not found or multiple users found with the same email.");
            }
        } catch (error) {
            console.error("Error booking event:", error);
            alert("Error booking event. Please try again later.");
        }
    }

    return (
        <>
            {singleEventData && adminDetails ? (
                <>
                    <div className='container py-4 Edit_event'>
                        <div className="row">
                            <div className="col-md-8 mb-4 mb-md-0">
                                <h3 className='mb-3'>Event Details</h3>
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
                                    <div className="row">
                                        <div className="col-6">
                                            <p>Booked Slot:</p>
                                            <h6>{singleEventData.booked.reduce((total, booking) => total + booking.ticketNo, 0)}</h6>
                                        </div>
                                        <div className="col-6">
                                            <p>Available Slot:</p>
                                            {singleEventData.slot - singleEventData.booked.reduce((total, booking) => total + booking.ticketNo, 0) < 10 ? (
                                                <h6 className='text-danger'>{singleEventData.slot - singleEventData.booked.reduce((total, booking) => total + booking.ticketNo, 0)}</h6>
                                            ) : (
                                                <h6 className='text-success'>{singleEventData.slot - singleEventData.booked.reduce((total, booking) => total + booking.ticketNo, 0)}</h6>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <p>Ticket Price:</p>
                                    <h5>₹ {singleEventData.price}/-</h5>
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <p>Event Date:</p>
                                            <h6>{singleEventData.date}</h6>
                                        </div>
                                        <div className="col-6">
                                            <p>Event Time:</p>
                                            <h6>{singleEventData.starttime} - {singleEventData.endtime}</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <h3 className='mb-3'>Admin Details</h3>
                                    <div className="mb-3">
                                        <p>Name:</p>
                                        <h5>{adminDetails.name}</h5>
                                    </div>
                                    <div className="mb-3">
                                        <p>Email:</p>
                                        <h6>{adminDetails.mail}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-outline-primary my-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Book Event</button>
                    </div>




{/* =========modal==================== */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Choose Seats</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>                                
                                <div className="mb-3">
                                
                                <label className="form-label">Number of seats you want to book</label>
                                    <input type="number" className="form-control" placeholder='no of seats' value={seats} onChange={(e) => setSeats(e.target.value)} />
                                </div>                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={BookEvent}>Confirm Booking</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* =================modal end================= */}
                </>) : (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '400px' }}>
                    <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-07-846_512.gif" alt="" style={{ width: "100px" }} />
                </div>
            )}
        </>
    )
}

export default BookEvent;
