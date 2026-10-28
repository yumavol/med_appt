import React, { useId, useState } from 'react';

import '../Sign_up/Sign_up.css';
import '../AppointmentForm/AppointmentForm.css';

// Instant consultation only needs name and phone; it is booked for right now
const AppointmentFormIC = ({ onSubmit }) => {
  const id = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phone, date: new Date().toLocaleDateString('en-CA'), slot: 'Now' });
    setName('');
    setPhone('');
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={`${id}-name`}>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id={`${id}-name`}
          className="field__input"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-phone`}>Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          type="tel"
          inputMode="numeric"
          maxLength={10}
          pattern="\d{10}"
          title="Phone number must be exactly 10 digits"
          id={`${id}-phone`}
          className="field__input"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <button type="submit" className="btn btn--primary btn--block appointment-form__submit">
        Book Now
      </button>
    </form>
  );
};

export default AppointmentFormIC;
