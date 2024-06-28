import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import validator from 'validator';

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    // =================================Login=======================================
    async function signup(e) {
        e.preventDefault();
        if (name.length == 0 || email.length == 0 || mobile.length == 0 || password.length == 0) alert("Invalid Data!");
        else if (name.length < 5) alert("Invalid Username");
        else if (email.length < 5) alert("Invalid Email");
        else if (!validator.isEmail(email)) alert("invalid Email");
        else {
            let res = await fetch("https://eventstellar-backend.onrender.com/user");
            let data = await res.json();
            let temp = 0;
            for (var i = 0; i < data.length; i++) {
                if (email === data[i].mail) temp = 1;
            }
            if (temp == 1) alert("Username is used before");
            else {
                let obj = {
                    "name":name,"mail":email,"mobile":mobile,"myBookings":[],"password": password
                };
                let res = await fetch("https://eventstellar-backend.onrender.com/user", {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        "Content-type": "application/json",
                    }
                });
                alert("SignUp Sucssfully 😄")
                setName(""); setEmail(""); setMobile(""); setPassword("");
                navigate("/login");
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">SignUp Form</h2>
                    <div className="card my-3">

                        <form className="card-body cardbody-color py-lg-4 px-lg-5">

                            <div className="text-center">
                                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px" alt="profile" />
                            </div>

                            <div className="mb-3">
                                <input type="text" className="form-control" id="Name"
                                    placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="Email" aria-describedby="emailHelp"
                                    placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control" id="Mobile"
                                    placeholder="Mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} required />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="password" placeholder="password"
                                    value={password} onChange={(e) => { setPassword(e.target.value) }} required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary px-5 mb-5 w-100" onClick={signup}>Sign Up</button>
                            </div>
                            <div id="emailHelp" className="form-text text-center mb-0 text-dark">Already have Account?
                                <NavLink to="/login" className="text-dark fw-bold">
                                    Login
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup