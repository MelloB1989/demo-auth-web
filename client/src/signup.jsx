import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    mobileNo: '',
    dob: '',
    gender: '',
    city: '',
    state: '',
    district: '',
    pincode: '',
    loginId: '',
    password: '',
    confirmPassword: '',
    securityA1: '',
    securityA2: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3002/register', formData)
      .then(result => {
        console.log(result);
        // Handle success, maybe show a success message or redirect to login
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        // Handle error, maybe show an error message
      });

    console.log('Form submitted:', formData);
  };

  const handleGoogleSignIn = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

    // Send credentialResponseDecoded to your backend
    axios.post('http://localhost:3002/google-signin', { googleData: credentialResponseDecoded })
      .then(result => {
        console.log(result);
        // Handle success, maybe show a success message or redirect
        navigate('/home');
      })
      .catch(err => {
        console.log(err);
        // Handle error, maybe show an error message
      });
  };

  return (
    <html>
      <head>
        <title>Signup Page</title>
        <style>
          {`
            body {
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif; 
            }
            h1 {
              color: black;
              font-family: Georgia;
              font-size: 300%;
              text-align: center;
            }
            .form1 {
              margin-left: 38%;
              justify-content: center;
              align-items: center;
            }
            .heading {
              color: black;
              font-family: Arial;
              font-size: 100%;
              text-align: left;
            }
            form {
              width: 300px;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 8px;
              font-size: 16px;
            }
            input, select, textarea {
              width: 100%;
              margin-bottom: 10px;
              padding: 8px;
              box-sizing: border-box;
              font-size: 16px; 
            }
            .terms {
              margin-left: 38%;
              justify-content: center;
              align-items: center;
              font-size: larger;
            }
          `}
        </style>
      </head>
      <body>
        <h1>Signup: Citizen</h1>

        <div className="form1">
          <h1 className="heading">Personal Details</h1>
          <form onSubmit={handleSubmit} className="form">
            Name: <input type="text" name="Name" value={formData.Name} onChange={handleChange} required pattern="[A-Za-z\s]+" maxLength="15" /><br />
            Email ID: <input type="email" name="email" value={formData.email} onChange={handleChange}  /><br />
            Mobile no.: <input type="number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required maxLength="10" /><br />
            DOB: <input type="date" name="dob" value={formData.dob} onChange={handleChange} required max="2005-04-09" /><br />
            Gender: 
            Male: <input type="radio" name="gender" value="male" onChange={handleChange} />
            Female: <input type="radio" name="gender" value="female" onChange={handleChange} />
            Other: <input type="radio" name="gender" value="other" onChange={handleChange} /><br />
            {/* ... (other personal details fields) */}
          </form>
        </div>

        <div className="form1">
          <h1 className="heading">Address details</h1>
          <form onSubmit={handleSubmit} className="form">
            City: <input type="text" name="city" value={formData.city} onChange={handleChange} required pattern="[A-Za-z\s]+" /><br />
            State: <input type="text" name="state" value={formData.state} onChange={handleChange} required pattern="[A-Za-z\s]+" /><br />
            District: <input type="text" name="district" value={formData.district} onChange={handleChange} required pattern="[A-Za-z\s]+" /><br />
            Pincode: <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} required maxLength="6" /><br />
            {/* ... (other address details fields) */}
          </form>
        </div>

        <div className="form1">
          <h1 className="heading">Login credentials</h1>
          <form onSubmit={handleSubmit} className="form">
            Login id: <input type="text" name="loginId" value={formData.loginId} onChange={handleChange} required pattern="(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$" /><br />
            Password: <input type="password" name="password" value={formData.password} onChange={handleChange} required pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$" /><br />
            Confirm password: <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$" /><br />
            <br />
            <br />
            <input type="submit" value="Signup" />
          </form>
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <p>Already Have an Account</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        </div>

        <div className="terms">
          <p>
            By creating an account you agree to our{' '}
            <a href="#" style={{ color: 'dodgerblue' }}>
              Terms & Privacy
            </a>
            .
          </p>
        </div>
      </body>
    </html>
  );
}

export default Signup;
