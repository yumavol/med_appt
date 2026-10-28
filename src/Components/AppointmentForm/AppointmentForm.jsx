import React, { useId, useState } from 'react';

import '../Sign_up/Sign_up.css';
import './AppointmentForm.css';
import chevronDown from '../../assets/chevron-down.svg';

const slotHours = [9, 10, 11, 12, 14, 15, 16, 17];

const formatHour = (hour) => `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;

const AppointmentForm = ({ onSubmit }) => {
  const id = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  const today = new Date().toLocaleDateString('en-CA');
  const availableHours = date === today ? slotHours.filter((hour) => hour > new Date().getHours()) : slotHours;

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setSlot('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phone, date, slot });
    setName('');
    setPhone('');
    setDate('');
    setSlot('');
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
      <div className="field">
        <label htmlFor={`${id}-date`}>Date of Appointment</label>
        <input value={date} onChange={handleDateChange} type="date" min={today} id={`${id}-date`} className="field__input" required />
      </div>
      <div className="field">
        <label htmlFor={`${id}-slot`}>Book Time Slot</label>
        <div className="field__box">
          <select value={slot} onChange={(e) => setSlot(e.target.value)} id={`${id}-slot`} className="field__input" required>
            <option value="" disabled>
              {availableHours.length ? 'Select a time slot' : 'No slots left today'}
            </option>
            {availableHours.map((hour) => (
              <option key={hour} value={formatHour(hour)}>
                {formatHour(hour)}
              </option>
            ))}
          </select>
          <span className="field__icon">
            <img src={chevronDown} alt="" width="20" height="20" />
          </span>
        </div>
      </div>
      <button type="submit" className="btn btn--primary btn--block appointment-form__submit">
        Book Now
      </button>
    </form>
  );
};

export default AppointmentForm;
