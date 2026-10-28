import React, { useState } from 'react';

import './FindDoctorSearch.css';
import searchIcon from '../../assets/search.svg';
import DoctorCard from '../DoctorCard/DoctorCard';

const doctors = [
  { name: 'Dr. Jiao Yang', speciality: 'Dentist', experience: 9, ratings: 5 },
  { name: 'Dr. Denis Raj', speciality: 'Dentist', experience: 24, ratings: 4 },
  { name: 'Dr. Lyn Christie', speciality: 'Dentist', experience: 11, ratings: 3 },
  { name: 'Dr. Jessica White', speciality: 'Dentist', experience: 18, ratings: 4 },
];

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda',
];

const FindDoctorSearch = () => {
  const [hideResult, setHideResult] = useState(true);
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const filteredDoctors = doctors.filter((doctor) => doctor.speciality.toLowerCase().includes(query));

  const specialities = initSpeciality.filter((speciality) => speciality.toLowerCase().includes(search.toLowerCase()));

  const handleDoctorSelect = (speciality) => {
    setSearch(speciality);
    setHideResult(true);
  };

  return (
    <section className="finddoctor">
      <div className="finddoctor__header">
        <h1 className="finddoctor__title">Find a doctor and Consult instantly</h1>
        <p className="finddoctor__subtitle">Search by speciality to see who is available.</p>
      </div>

      <div className="finddoctor__search">
        <div className="finddoctor__bar">
          <input
            type="text"
            className="finddoctor__input"
            placeholder="Search doctors, clinics, hospitals, etc."
            aria-label="Search doctors by speciality"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setHideResult(false)}
            onBlur={() => setHideResult(true)}
          />
          <button type="button" className="finddoctor__button" aria-label="Search">
            <img src={searchIcon} alt="" width="20" height="20" />
          </button>
        </div>

        {!hideResult && specialities.length > 0 && (
          <ul className="finddoctor__results">
            {specialities.map((speciality) => (
              <li key={speciality} className="finddoctor__result" onMouseDown={() => handleDoctorSelect(speciality)}>
                <span className="finddoctor__result-icon">
                  <img src={searchIcon} alt="" width="14" height="14" />
                </span>
                <span className="finddoctor__result-name">{speciality}</span>
                <span className="finddoctor__result-tag">Speciality</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="finddoctor__doctors">
        <div className="finddoctor__summary">
          <h2 className="finddoctor__count">
            {filteredDoctors.length} doctors available{query && ` in ${search.trim()}`}
          </h2>
          <p className="finddoctor__subtitle">Book appointments with minimum wait-time & verified doctor details</p>
        </div>
        <div className="doctor-cards">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.name} {...doctor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindDoctorSearch;
