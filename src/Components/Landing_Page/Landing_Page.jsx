import React from 'react'; // Importing the necessary modules from React library
import { Link } from 'react-router-dom';

import './Landing_Page.css'; // Importing the CSS styles for the Landing_Page component
import heroImage from '../../assets/hero-doctor.jpg';

// Defining the Function component Landing_Page
const Landing_Page = () => {
  return (
    <section className="landing">
      <div className="landing__copy">
        <h1 className="landing__headline">
          <span>Your Health</span>
          <span className="landing__headline-sub">Our Responsibility</span>
        </h1>
        <p className="landing__text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at quae ducimus. Suscipit omnis quibusdam non cum rem
          voluptatem!
        </p>
        {/* Get Started takes new visitors to the sign up page */}
        <Link to="/signup" className="btn btn--primary landing__cta">
          Get Started&nbsp;&nbsp;→
        </Link>
      </div>
      <img className="landing__visual" src={heroImage} alt="Smiling doctor in a white coat" width="560" height="520" />
    </section>
  );
};

export default Landing_Page; // Exporting the Landing_Page component to be used in other parts of the application
