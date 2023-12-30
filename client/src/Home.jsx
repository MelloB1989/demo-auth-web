import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3002/home')
      .then((result) => {
        console.log(result);
        if (result.data.message === 'Welcome to the home page!') {
          // Do something if the request is successful
        } else {
          // Redirect to the login page or handle the error as needed
          navigate('/login');
        }
      })
      .catch((error) => {
        // Handle the error, e.g., redirect to an error page
        console.error('Error:', error);
        navigate('/error');
      });
  }, [navigate]);

  return (
    <div>
      <h2>Home Component</h2>
      {/* Add your home component content here */}
    </div>
  );
}

export default Home;
