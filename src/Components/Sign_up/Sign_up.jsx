// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import chevronDown from '../../assets/chevron-down.svg';
import eyeOff from '../../assets/eye-off.svg';

// Function component for Sign Up form
const Sign_Up = () => {
  // State variables using useState hook
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showerr, setShowerr] = useState(''); // State to show error messages
  const navigate = useNavigate(); // Navigation hook from react-router

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // API Call to register user
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });

    const json = await response.json(); // Parse the response JSON

    if (json.authtoken) {
      // Store user data in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('phone', phone);
      sessionStorage.setItem('email', email);

      // Redirect user to home page
      navigate('/');
      window.location.reload(); // Refresh the page
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          setShowerr(error.msg); // Show error messages
        }
      } else {
        setShowerr(json.error);
      }
    }
  };

  // Function to clear all fields
  const reset = () => {
    setRole('');
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setShowerr('');
  };

  // JSX to render the Sign Up form
  return (
    <section className="auth">
      <div className="auth__card">
        <div className="auth__header">
          <h1 className="auth__title">Sign Up</h1>
          <p className="auth__subtitle">
            Already a member? <Link to="/login">Login</Link>
          </p>
        </div>
        <form className="auth__form" method="POST" onSubmit={register}>
          <div className="field">
            <label htmlFor="role">Role</label>
            <div className="field__box">
              <select value={role} onChange={(e) => setRole(e.target.value)} name="role" id="role" className="field__input" required>
                <option value="" disabled>
                  Select role
                </option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              <span className="field__icon">
                <img src={chevronDown} alt="" width="20" height="20" />
              </span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              className="field__input"
              placeholder="Enter your name"
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Keep digits only
              type="tel"
              inputMode="numeric"
              maxLength={10}
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits"
              required
              name="phone"
              id="phone"
              className="field__input"
              placeholder="Enter your phone number"
            />
          </div>
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
          {showerr && <div className="auth__error">{showerr}</div>}
          <div className="auth__actions">
            <button type="submit" className="btn btn--primary btn--block">
              Submit
            </button>
            <button type="button" className="btn btn--danger btn--block" onClick={reset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
    /* Note: Sign up role is not stored in the database. Additional logic can be implemented for this based on your React code. */
  );
};

export default Sign_Up; // Export the Sign_Up component for use in other components
