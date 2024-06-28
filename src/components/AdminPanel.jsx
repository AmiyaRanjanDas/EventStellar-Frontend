import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

function AdminPanel() {
    const navigate = useNavigate();

    // States for form data
    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventLoc, setEventLoc] = useState("");
    const [eventPlace, setEventPlace] = useState("");
    const [eventSlot, setEventSlot] = useState("");
    const [eventPrice, setEventPrice] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventStime, setEventStime] = useState("");
    const [eventEtime, setEventEtime] = useState("");

    // State for event data
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    function shortenParagraph(paragraph, wordLimit = 15) {
        const words = paragraph.split(' ');
        if (words.length <= wordLimit) {
            return paragraph;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
    }

    async function getEventData() {
        try {
            let res = await fetch(`https://eventstellar-backend.onrender.com/events?adminEmail=${localStorage.getItem('EventStellar-Email')}`);
            let data = await res.json();
            console.log(data);
            setEventData(data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching event data:", error);
            setLoading(false); // Set loading to false even if there is an error
        }
    }

    useEffect(() => {
        getEventData();
    }, []);

    async function addEvents(e) {
        e.preventDefault();
        if (!eventName || !eventDesc || !eventLoc || !eventPlace || !eventSlot || !eventPrice || !eventDate || !eventStime || !eventEtime) {
            alert("Invalid Data!");
        } else if (eventName.length < 5) {
            alert("Invalid eventName");
        } else if (eventDesc.length < 5) {
            alert("Invalid eventDesc");
        } else {
            let obj = {
                adminEmail: localStorage.getItem('EventStellar-Email'),
                name: eventName,
                description: eventDesc,
                location: eventLoc,
                place: eventPlace,
                slot: eventSlot,
                price: eventPrice,
                booked: [],
                date: eventDate,
                starttime: eventStime,
                endtime: eventEtime,
            };

            let res = await fetch("https://eventstellar-backend.onrender.com/events", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json",
                }
            });

            if (res.ok) {
                alert("Event Added Successfully 😄");
                setEventName(""); setEventDesc(""); setEventLoc(""); setEventPlace("");
                setEventSlot(""); setEventPrice(""); setEventDate(""); setEventStime(""); setEventEtime("");
                getEventData();  // Fetch the updated event list
                navigate('/adminPanel');
            } else {
                alert("Error adding event");
            }
        }
    }

    return (
        <>
            <div className="admin_head">
                <div className="container py-5 text-center">
                    <h3 className='text-primary'>Add Events</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, distinctio?</p>
                    <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Create Event</button>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create new Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder='Event Name' value={eventName} onChange={(e) => setEventName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" rows="3" placeholder='Event Description' value={eventDesc} onChange={(e) => setEventDesc(e.target.value)}></textarea>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder='Event Location' value={eventLoc} onChange={(e) => setEventLoc(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder='Event Place' value={eventPlace} onChange={(e) => setEventPlace(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder='Slots Available' value={eventSlot} onChange={(e) => setEventSlot(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" placeholder='Ticket Price' value={eventPrice} onChange={(e) => setEventPrice(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="date" className="form-control" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                                </div>
                                <div className='row'>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Start Time</label>
                                        <input type="time" className="form-control" value={eventStime} onChange={(e) => setEventStime(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">End Time</label>
                                        <input type="time" className="form-control" value={eventEtime} onChange={(e) => setEventEtime(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addEvents}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <h3 className='mb-3'>Created Events</h3>
                <div className="row">
                    {loading ? (
                        <div className='d-flex justify-content-center align-items-center' style={{height:'400px'}}>
                            <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-07-846_512.gif" alt="" style={{width:"100px"}}/>
                        </div>
                    ) : eventData.length === 0 ? (
                        <div className='text-center'>
                            <img src="https://cdn.vectorstock.com/i/500p/12/22/no-data-concept-vector-47041222.jpg" alt="" style={{height:"300px"}}/>
                            <h3>Create Your First Event</h3>
                        </div>
                    ) : (
                        eventData.map((item, index) => (
                            <div className="col-md-4" key={item.id}>
                                <Link to={`/editEvent/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <div className="admin_card">
                                        <h4>{item.name}</h4>
                                        <p>{shortenParagraph(item.description)}</p>
                                        <h6>{item.location}, {item.place}</h6>
                                        <h5>₹ {item.price}/-</h5>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <span>Available Seats</span>
                                                <h5>{item.slot}</h5>
                                            </div>
                                            <div>
                                                <span>Booked Seats</span>
                                                <h5>{item.booked.reduce((total, booking) => total + booking.ticketNo, 0)}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminPanel;
