import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import {Link} from "react-trouter-dom";

function ForgotPassword() {
  const [email, setEmail] = useState()
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3002/forgotpassword', { email })
      .then((res) => {
        if (res.data.status === 'Success') {
          // Redirect or perform other actions upon success
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  };
 
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className='bg-white p-3 rounded w-25'>
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
