// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
import '../Sign_up/Sign_up.css';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import eyeOff from '../../assets/eye-off.svg';

const Login = () => {

  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);

      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  // Function to clear all fields
  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <section className="auth">
      <div className="auth__card">
        <div className="auth__header">
          <h1 className="auth__title">Login</h1>
          <p className="auth__subtitle">
            Are you a new member? <Link to="/signup">Sign Up Here</Link>
          </p>
        </div>
        <form className="auth__form" onSubmit={login}>
          {/* Input field for email */}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="field__input"
              placeholder="Enter your email"
            />
          </div>
          {/* Input field for password */}
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="field__box">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                className="field__input"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="field__icon"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <img src={eyeOff} alt="" width="20" height="20" />
              </button>
            </div>
          </div>
          <div className="auth__actions">
            {/* Login button */}
            <button type="submit" className="btn btn--primary btn--block">
              Login
            </button>
            <button type="button" className="btn btn--danger btn--block" onClick={reset}>
              Reset
            </button>
          </div>
        </form>
        <p className="auth__forgot">Forgot Password?</p>
      </div>
    </section>
  )
}

export default Login;
