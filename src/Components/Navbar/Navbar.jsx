import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleClick = () => setMenuOpen(!menuOpen);

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
            <NavLink to="/" end>Home</NavLink>
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
          <Link to="/login" className="btn btn--ghost">
            Login
          </Link>
          <Link to="/signup" className="btn btn--primary">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
