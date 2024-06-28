import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [singleEventData, setSingleEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  // States for form data
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventLoc, setEventLoc] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventSlot, setEventSlot] = useState("");
  const [eventPrice, setEventPrice] = useState();
  const [eventDate, setEventDate] = useState("");
  const [eventStime, setEventStime] = useState("");
  const [eventEtime, setEventEtime] = useState("");
  const [eventBooked, setEventBooked] = useState([]);
  const [eventComment, setEventComment] = useState([]);

  async function getSingleEventData() {
    try {
      let res = await fetch(`https://eventstellar-backend.onrender.com/events/${eventId}`);
      if (res.ok) {
        let data = await res.json();
        setSingleEventData(data);
        setLoading(false);
        setEventName(data.name);
        setEventDesc(data.description);
        setEventLoc(data.location);
        setEventPlace(data.place);
        setEventSlot(data.slot);
        setEventPrice(data.price);
        setEventDate(data.date);
        setEventStime(data.starttime);
        setEventEtime(data.endtime);
        setEventBooked(data.booked);
        setEventComment(data.comment);
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
  }, [eventId]);

  async function updateEvent(e) {
    e.preventDefault();
    let obj = {
      adminEmail: localStorage.getItem('EventStellar-Email'),
      name: eventName,
      description: eventDesc,
      location: eventLoc,
      place: eventPlace,
      slot: eventSlot,
      price: eventPrice,
      booked: singleEventData.booked,
      comment: singleEventData.comment,
      date: eventDate,
      starttime: eventStime,
      endtime: eventEtime,
    };

    try {
      let res = await fetch(`https://eventstellar-backend.onrender.com/events/${eventId}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        }
      });

      if (res.ok) {
        alert("Event Updated Successfully 😄");
        navigate('/adminPanel');
      } else {
        alert("Error updating event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  }


  const [addComment, setAddComment] = useState("");
 
  async function AddComments() {
    try {
      // Fetch current event data
      let res = await fetch(`https://eventstellar-backend.onrender.com/events/${eventId}`);
      if (addComment.length < 5) {
        alert("Invalid Comment!");
      }
      else if (res.ok) {
        let eventData = await res.json();
        eventData.comment.push(addComment);
        let obj = {
          ...eventData, 
          comment: eventData.comment 
        };
        let updateRes = await fetch(`https://eventstellar-backend.onrender.com/events/${eventId}`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json",
          }
        });
        if (updateRes.ok) {
          alert("Comment added successfully");
          getSingleEventData();
        } else {
          alert("Failed to add comment");
        }
      }
    } catch (error) {
      alert("Error adding comment:", error);
    }
  }
  
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
                  <div className="row">
                    <div className="col-6">
                      <p>Booked Slot:</p>
                      <h6>{singleEventData.booked.length}</h6>
                    </div>
                    <div className="col-6">
                      <p>AvailableSlot:</p>
                      <h6>{singleEventData.slot - singleEventData.booked.length}</h6>
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
                      <h6>{singleEventData.starttime + "-" + singleEventData.endtime}</h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex py-3 justify-content-between">
                  <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#example1Modal">See Bookings</button>
                  <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#example2Modal">Edit Event</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <h4>Comments</h4>
                  <button className='btn btn-outline-primary btn-sm' data-bs-toggle="modal" data-bs-target="#example3Modal">Add Comment</button>
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
                      <p>comment-{index + 1}</p>
                      <h6>{item}</h6>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* =============Booking modal=============== */}
          <div className="modal fade" id="example1Modal" tabIndex="-1" aria-labelledby="example1ModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="example1ModalLabel">Booking Details</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {loading ? (
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '400px' }}>
                      <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-07-846_512.gif" alt="" style={{ width: "100px" }} />
                    </div>
                  ) : singleEventData.booked.length === 0 ? (
                    <div className='text-center'>
                      <img src="https://img.freepik.com/free-vector/warning-concept-illustration_114360-1551.jpg" alt="" style={{ height: "200px" }} />
                      <h5 className='text-primary'>No Booking Yet</h5>
                    </div>
                  ) : (
                    singleEventData.booked.map((item, index) => (
                      <div className='d-flex align-items-center justify-content-between my-2' key={index}>
                        <p className='text-primary'>{item.userEmail}</p>
                        <h6>{item.ticketNo}</h6>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ===========edit event modal=============== */}
          <div className="modal fade" id="example2Modal" tabIndex="-1" aria-labelledby="example1ModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="example1ModalLabel">Edit Event Details</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder='Event Name' value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows="5" placeholder='Event Description' value={eventDesc} onChange={(e) => setEventDesc(e.target.value)}></textarea>
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
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateEvent}>Save</button>
                </div>
              </div>
            </div>
          </div>
          {/* ===========Add Comment modal=============== */}
          <div className="modal fade" id="example3Modal" tabIndex="-1" aria-labelledby="example1ModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="example1ModalLabel">Add new comment</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <textarea className="form-control" rows="5" placeholder='Event Description' value={addComment} onChange={(e) => setAddComment(e.target.value)}></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={AddComments}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '400px' }}>
          <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-07-846_512.gif" alt="" style={{ width: "100px" }} />
        </div>
      )}
    </>
  )
}

export default EditEvent