import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { idj, tokenj } = useParams();

  const resetPassword = async () => {
    try {
      const response = await axios.post(`http://localhost:3002/reset-password/${idj}/${tokenj}`, {
        password,
      });

      if (response.data.Status === 'Success') {
        navigate('/login');
      } else {
        // Handle other cases or errors
        console.log(response.data);
        console.error('Password reset failed');
        // You might want to redirect to the home page or handle errors differently
        navigate('/home');
      }
    } catch (error) {
      console.error('Password reset failed with error:', error);
      // Handle the error, e.g., redirect to home page
      navigate('/home');
    }
  };

  useEffect(() => {
    // Ensure that id and token are defined before making the request
    if (idj && tokenj) {
      resetPassword();
    }
  }, [idj, tokenj, navigate, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Additional logic or validations can be added here

    // Update the password state with the new value
    // For example, you might want to perform some password validation before setting the state
    // setPassword(newValue);

    // Make sure to call resetPassword with the updated password value
    await resetPassword();
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
