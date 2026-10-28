import React, { useEffect, useState } from 'react';

import './Notification.css';
import { APPOINTMENTS_EVENT, getAppointments } from '../../appointments';

const shouldShow = (appointments) => Boolean(sessionStorage.getItem('auth-token')) && Object.keys(appointments).length > 0;

const Notification = ({ children }) => {
  const [appointments, setAppointments] = useState(getAppointments);
  const [showNotification, setShowNotification] = useState(() => shouldShow(getAppointments()));

  useEffect(() => {
    const handleAppointmentsChange = () => {
      const latest = getAppointments();
      setAppointments(latest);
      setShowNotification(shouldShow(latest));
    };
    window.addEventListener(APPOINTMENTS_EVENT, handleAppointmentsChange);
    return () => window.removeEventListener(APPOINTMENTS_EVENT, handleAppointmentsChange);
  }, []);

  return (
    <>
      {children}
      {showNotification && (
        <div className="notification" role="status">
          {Object.entries(appointments).map(([doctorName, appointment]) => (
            <div key={doctorName} className="notification__card">
              <p className="notification__title">Appointment Details</p>
              <dl className="notification__details">
                <dt>Doctor</dt>
                <dd>{doctorName}</dd>
                <dt>Speciality</dt>
                <dd>{appointment.speciality}</dd>
                <dt>Patient</dt>
                <dd>{appointment.name}</dd>
                <dt>Phone</dt>
                <dd>{appointment.phone}</dd>
                <dt>Date</dt>
                <dd>{appointment.date}</dd>
                <dt>Time</dt>
                <dd>{appointment.slot}</dd>
              </dl>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Notification;
