import React, { useState } from 'react';

import './FindDoctorSearch.css';
import searchIcon from '../../assets/search.svg';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda',
];

const FindDoctorSearch = ({ search, onSearch }) => {
  const [hideResult, setHideResult] = useState(true);

  const specialities = initSpeciality.filter((speciality) => speciality.toLowerCase().includes(search.toLowerCase()));

  const handleDoctorSelect = (speciality) => {
    onSearch(speciality);
    setHideResult(true);
  };

  return (
    <div className="finddoctor__search">
      <div className="finddoctor__bar">
        <input
          type="text"
          className="finddoctor__input"
          placeholder="Search doctors, clinics, hospitals, etc."
          aria-label="Search doctors by speciality"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
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
  );
};

export default FindDoctorSearch;
