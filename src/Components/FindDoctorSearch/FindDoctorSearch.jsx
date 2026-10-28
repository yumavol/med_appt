import React, { useState } from 'react'; // Importing the necessary modules from React library

import './FindDoctorSearch.css'; // Importing the CSS styles for the FindDoctorSearch component
import searchIcon from '../../assets/search.svg';

// List of doctor specialties shown in the search dropdown
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
              // onMouseDown fires before the input's onBlur, so the click still registers
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
    </section>
  );
};

export default FindDoctorSearch;
