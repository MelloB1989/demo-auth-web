import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="113614079343-7p7sp9aa11p5dk85mvb6u3rbl81s21ck.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>

   
  </React.StrictMode>,
)
