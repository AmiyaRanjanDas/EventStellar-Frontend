import React,{useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =================================Login=======================================
  async function Login(e) {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) alert("Invalid Data!");
    else {
      let res = await fetch("https://eventstellar-backend.onrender.com/user");
      let data = await res.json();
      let temp = 0;
      for (var i = 0; i < data.length; i++) {
        if (email === data[i].mail && password === data[i].password) {
          localStorage.setItem('EventStellar-Email', data[i].mail);
          localStorage.setItem('EventStellar-UserName', data[i].name);
          navigate("/");
          navigate(0);
          temp = 1;
          break;
        }
      }
      if (temp == 0) alert("Invalid Credentials!");
    }
  }

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5">Login Form</h2>
        <div className="card my-3">

          <form className="card-body cardbody-color py-lg-4 px-lg-5">

            <div className="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"/>
            </div>

            <div className="mb-3">
              <input type="text" className="form-control" id="Email" aria-describedby="emailHelp"
                placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="password" placeholder="password"
                value={password} onChange={(e) => { setPassword(e.target.value) }} required 
              />
            </div>
            <div className="text-center">
            <button type="submit" className="btn btn-primary px-5 mb-5 w-100" onClick={Login}>Login</button>
            </div>
            <div id="emailHelp" className="form-text text-center mb-0 text-dark">Not
              Registered? 
              <NavLink to="/signup" className="text-dark fw-bold"> 
                Create an Account
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login