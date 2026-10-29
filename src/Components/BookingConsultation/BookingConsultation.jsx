import React from 'react';
import { useSearchParams } from 'react-router-dom';

import './BookingConsultation.css';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';

const doctors = [
  { name: 'Dr. Jiao Yang', speciality: 'Dentist', experience: 9, ratings: 5 },
  { name: 'Dr. Denis Raj', speciality: 'Dentist', experience: 24, ratings: 4 },
  { name: 'Dr. Lyn Christie', speciality: 'Dermatologist', experience: 11, ratings: 3 },
  { name: 'Dr. Jessica White', speciality: 'Dentist', experience: 18, ratings: 4 },
  { name: 'Dr. Dudu Red', speciality: 'General Physician', experience: 18, ratings: 4 },
];

const BookingConsultation = ({ Form }) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('speciality') ?? '';
  const query = search.trim().toLowerCase();
  const filteredDoctors = doctors.filter((doctor) => doctor.speciality.toLowerCase().includes(query));

  return (
    <section className="booking">
      <div className="booking__header">
        <h1 className="booking__title">Find a doctor and Consult instantly</h1>
        <p className="booking__subtitle">Search by speciality to see who is available.</p>
      </div>

      <FindDoctorSearch />

      <div className="booking__doctors">
        <div className="booking__header">
          <h2 className="booking__count">
            {filteredDoctors.length} doctors available{query && ` in ${search.trim()}`}
          </h2>
          <p className="booking__subtitle">Book appointments with minimum wait-time & verified doctor details</p>
        </div>
        <div className="doctor-cards">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.name} {...doctor} Form={Form} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingConsultation;
