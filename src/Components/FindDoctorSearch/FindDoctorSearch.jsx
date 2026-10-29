import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

const FindDoctorSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get('speciality') ?? '');
  const [hideResult, setHideResult] = useState(true);

  const specialities = initSpeciality.filter((speciality) => speciality.toLowerCase().includes(search.toLowerCase()));

  // Navigate to the search-results route; BookingConsultation filters doctors by the `speciality` query param.
  const goToResults = (speciality) => {
    const query = speciality.trim();
    navigate(query ? `/appointments?speciality=${encodeURIComponent(query)}` : '/appointments');
  };

  const handleDoctorSelect = (speciality) => {
    setSearch(speciality);
    setHideResult(true);
    goToResults(speciality);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHideResult(true);
    goToResults(search);
  };

  return (
    <div className="finddoctor__search">
      <form className="finddoctor__bar" onSubmit={handleSubmit} role="search">
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
        <button type="submit" className="finddoctor__button" aria-label="Search">
          <img src={searchIcon} alt="" width="20" height="20" />
        </button>
      </form>

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
