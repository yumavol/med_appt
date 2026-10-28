import React from 'react';

import './DoctorCard.css';
import doctorPhoto from '../../assets/doctor-photo.jpg';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic = doctorPhoto }) => {
  return (
    <article className="doctor-card">
      <div className="doctor-card__details">
        <img className="doctor-card__photo" src={profilePic} alt={name} width="120" height="120" />
        <h3 className="doctor-card__name">{name}</h3>
        <p className="doctor-card__speciality">{speciality}</p>
        <p className="doctor-card__experience">{experience} years experience</p>
        <p className="doctor-card__ratings" aria-label={`Ratings: ${ratings} out of 5`}>
          Ratings: <span className="doctor-card__stars">{'★'.repeat(ratings)}</span>
        </p>
      </div>

      <button type="button" className="btn btn--primary btn--block doctor-card__book">
        <span>Book Appointment</span>
        <span className="doctor-card__fee">No Booking Fee</span>
      </button>
    </article>
  );
};

export default DoctorCard;
