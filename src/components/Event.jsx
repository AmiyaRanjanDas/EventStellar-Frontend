import React, { useState, useEffect } from 'react';
import "../styles/style.css";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Event() {
  const [searchText, setSearchText] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterEvents(searchText);
  }, [searchText]);

  // Function to filter events by name or location and exclude expired events
  const filterEvents = async (searchText) => {
    setLoading(true);
    let res = await fetch("https://eventstellar-backend.onrender.com/events");
    let events = await res.json();
    const filtered = events.filter(event =>
      (event.name.toLowerCase().includes(searchText.toLowerCase()) ||
        event.location.toLowerCase().includes(searchText.toLowerCase())) &&
      new Date(event.date) > new Date()
    );
    setTimeout(() => {  // Simulate loading delay
      setFilteredEvents(filtered);
      setLoading(false);
    }, 500);
  };

  function shortenParagraph(paragraph, wordLimit = 15) {
    const words = paragraph.split(' ');
    if (words.length <= wordLimit) {
      return paragraph;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  return (
    <>
      <div className="search_section">
        <div className='container py-5'>
          <h3 className='mb-4'>
            <FaSearch className='text-primary me-3' style={{ marginBottom: '5px' }} />
            Search for Events
          </h3>
          <div className='d-flex align-items-center'>
            <input className="form-control form-control-lg me-2" type="search" placeholder="Search by your location or Event name"
              value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
            <button className="btn btn-lg btn-outline-primary" type="submit">Search</button>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <h3 className='text-primary mb-3'>Filtered Events</h3>
        <div className="row all_events">
          {loading ? (
            <div className='d-flex justify-content-center align-items-center' style={{ height: '400px' }}>
              <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-07-846_512.gif" alt="" style={{ width: "100px" }} />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className='text-center'>
              <img src="https://cdn.vectorstock.com/i/500p/12/22/no-data-concept-vector-47041222.jpg" alt="" style={{ height: "300px" }} />
              <h3>Create Your First Event</h3>
            </div>
          ) : (
            filteredEvents.map((item, index) => (
              <div className="col-md-4 p-0">
                <div className="event-card">
                  <span>{item.place}</span>
                  <h3>{item.name}</h3>
                  <p>{shortenParagraph(item.description)}</p>
                  <h6>{item.price}/-</h6> 
                  <Link className="btn btn-sm btn-outline-primary" to={`/bookEvent/${item.id}`}>book now</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Event