import React, { useEffect, useReducer, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';
import { clearAppointments } from '../../appointments';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, refresh] = useReducer((count) => count + 1, 0);

  useEffect(() => {
    window.addEventListener('profile-change', refresh);
    return () => window.removeEventListener('profile-change', refresh);
  }, []);

  const handleClick = () => setMenuOpen(!menuOpen);

  const isLoggedIn = Boolean(sessionStorage.getItem('auth-token'));
  const userName = sessionStorage.getItem('name') || sessionStorage.getItem('email')?.split('@')[0];

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    localStorage.removeItem('doctorData');
    clearAppointments();
    Object.keys(localStorage)
      .filter((key) => key.startsWith('reviewFormData_'))
      .forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  return (
    <nav>
      <Link to="/" className="nav__logo">
        <img src={logo} alt="StayHealthy" width="196" height="40" />
      </Link>

      <div className="nav__icon" onClick={handleClick}>
        <i className={menuOpen ? 'fa fa-times' : 'fa fa-bars'}></i>
      </div>

      <div className={menuOpen ? 'nav__menu active' : 'nav__menu'}>
        <ul className="nav__links">
          <li className="link">
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li className="link">
            <NavLink to="/appointments">Appointments</NavLink>
          </li>
          <li className="link">
            <NavLink to="/blog">Health Blog</NavLink>
          </li>
          <li className="link">
            <NavLink to="/reviews">Reviews</NavLink>
          </li>
        </ul>
        <div className="nav__auth">
          {isLoggedIn ? (
            <>
              <div className="welcome-user">
                <button type="button" className="nav__user" aria-haspopup="true">
                  Welcome, {userName}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" onClick={(e) => e.currentTarget.blur()}>
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports" onClick={(e) => e.currentTarget.blur()}>
                      Your Reports
                    </Link>
                  </li>
                </ul>
              </div>
              <button type="button" className="btn btn--danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn--primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
