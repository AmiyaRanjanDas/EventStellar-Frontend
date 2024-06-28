import React from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Event from "./components/Event";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Account from "./components/Account";
import ChangePassword from "./components/ChangePassword";
import AdminPanel from "./components/AdminPanel";
import EditEvent from "./components/EditEvent";
import BookEvent from "./components/BookEvent";
import Success from "./components/Success";
import ShowEvent from "./components/ShowEvent";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/event" element={<Event/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/changePassword" element={<ChangePassword/>} />
        <Route path="/adminPanel" element={<AdminPanel/> } />
        <Route path="/editEvent/:eventId" element={<EditEvent/> } />
        <Route path="/bookEvent/:eventId" element={<BookEvent/> } />
        <Route path="/success" element={<Success/> } />
        <Route path="/showEvent/:eventId" element={<ShowEvent/> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
