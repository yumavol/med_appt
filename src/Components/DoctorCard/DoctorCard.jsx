import React, { useRef, useState } from 'react';

import './DoctorCard.css';
import doctorPhoto from '../../assets/doctor-photo.jpg';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { getAppointments, saveAppointment } from '../../appointments';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic = doctorPhoto, Form = AppointmentForm }) => {
  const dialogRef = useRef(null);
  const [appointment, setAppointment] = useState(() => getAppointments()[name] ?? null);

  const handleFormSubmit = (details) => {
    const booked = { ...details, speciality };
    setAppointment(booked);
    saveAppointment(name, booked);
    dialogRef.current.close();
  };

  const handleCancel = () => {
    setAppointment(null);
    saveAppointment(name, null);
  };

  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) dialogRef.current.close();
  };

  const details = (
    <div className="doctor-card__details">
      <img className="doctor-card__photo" src={profilePic} alt={name} width="120" height="120" />
      <h3 className="doctor-card__name">{name}</h3>
      <p className="doctor-card__speciality">{speciality}</p>
      <p className="doctor-card__experience">{experience} years experience</p>
      <p className="doctor-card__ratings" aria-label={`Ratings: ${ratings} out of 5`}>
        Ratings: <span className="doctor-card__stars">{'★'.repeat(ratings)}</span>
      </p>
    </div>
  );

  return (
    <article className="doctor-card">
      {details}

      {appointment ? (
        <div className="doctor-card__booked">
          <p className="doctor-card__booked-title">Appointment booked</p>
          <p>
            {appointment.date} at {appointment.slot}
          </p>
          <p>
            {appointment.name} · {appointment.phone}
          </p>
          <button type="button" className="btn btn--danger btn--block" onClick={handleCancel}>
            Cancel Appointment
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn--primary btn--block doctor-card__book" onClick={() => dialogRef.current.showModal()}>
          <span>Book Appointment</span>
          <span className="doctor-card__fee">No Booking Fee</span>
        </button>
      )}

      <dialog ref={dialogRef} className="dialog" onClick={handleDialogClick} aria-label={`Book an appointment with ${name}`}>
        <div className="dialog__body">
          <button type="button" className="dialog__close" onClick={() => dialogRef.current.close()} aria-label="Close">
            ×
          </button>
          {details}
          <Form onSubmit={handleFormSubmit} />
        </div>
      </dialog>
    </article>
  );
};

export default DoctorCard;
