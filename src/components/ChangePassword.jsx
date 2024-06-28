import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

function ChangePassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(localStorage.getItem('EventStellar-Email'));
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function ChangePassword(e) {
        e.preventDefault();
        if (email.length == 0 || email.length == 0 || newPassword.length == 0 || confirmPassword.length == 0) alert("Invalid Data!");
        else if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match!");
            return;
        }
        else {
            let res = await fetch("https://eventstellar-backend.onrender.com/user");
            let data = await res.json();
            let userFound = false;
            for (let i = 0; i < data.length; i++) {
                if (email === data[i].mail && password === data[i].password) {
                    userFound = true;

                    // Update the user's password
                    let updatedUser = { ...data[i], password: newPassword };

                    // Send the updated user data back to the server
                    let updateRes = await fetch(`https://eventstellar-backend.onrender.com/user/${data[i].id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedUser)
                    });

                    if (updateRes.ok) {
                        alert("Password successfully changed!");
                        navigate("/account");
                    } else {
                        alert("Error updating password!");
                    }
                    break;
                }
            }
            if (!userFound) {
                alert("Invalid Credentials!");
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Change Password</h2>
                    <div className="card my-3">

                        <form className="card-body cardbody-color py-lg-4 px-lg-5">

                            <div className="text-center">
                                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px" alt="profile" />
                            </div>

                            <div className="mb-3">
                                <input type="text" className="form-control" aria-describedby="emailHelp"
                                    placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} disabled />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Previous password"
                                    value={password} onChange={(e) => { setPassword(e.target.value) }} required
                                />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="New password"
                                    value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} required
                                />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Confirm password"
                                    value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required
                                />
                            </div>
                            <div className="text-center">
                                {
                                    
                                }
                                <button type="submit" className="btn btn-primary px-5 mb-4 w-100" onClick={ChangePassword}>Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword