import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

function Login() {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials=true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let user_captcha_value = document.getElementById('user_captcha_input').value;

    if (validateCaptcha(user_captcha_value)) {
      axios
        .post('http://localhost:3002/login', formData)
        .then((result) => {
          console.log(result);
          if (result.data === 'Success') {
            navigate('/home');
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert('Invalid Captcha');
    }
  };

  return (
    <html>

    <style>
      {`
         form {
          width: 400px; 
          padding: 30px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }
        .form1 {
          margin-left: 38%;
          justify-content: center;
          align-items: center;
          .button {
            background-color: aquamarine;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
          }

      `}
    </style>
    <div className="form1">
      <h1 className="form_title">Log In</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Login ID:
          <input
            type="text"
            name="loginId"
            value={formData.loginId}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </label>
        <br/>
        <br/>
      
        
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </label>
        <br/>
        <LoadCanvasTemplate />
        <br/>
        <div className="form_div">
          <input
            type="text"
            id="user_captcha_input"
            className="form_input"
            placeholder=" "
            autoComplete="off"
            onChange={handleChange}></input>
          <label className="form_label">Captcha</label>
        </div>
        <button type="submit" className="button">
          Log In
        </button>
      </form>
      <Link to="/forgotpassword" className="">
          forgot password?
      </Link>
    </div>
  </html>
  );
}

export default Login;
