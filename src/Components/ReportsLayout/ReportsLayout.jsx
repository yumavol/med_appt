import React from 'react';

import '../ReviewForm/ReviewForm.css';
import './ReportsLayout.css';

const reports = [
  { doctorName: 'Dr. John Doe', speciality: 'Cardiology' },
  { doctorName: 'Dr. Jane Smith', speciality: 'Dermatology' },
];

const ReportsLayout = () => {
  return (
    <section className="reviews">
      <h1 className="reviews__title">Reports</h1>

      <div className="reviews__card">
        <table className="reviews__table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(({ doctorName, speciality }, index) => (
              <tr key={doctorName}>
                <td>{index + 1}</td>
                <td className="reviews__doctor">{doctorName}</td>
                <td>
                  <span className="reviews__tag">{speciality}</span>
                </td>
                <td>
                  <button type="button" className="btn btn--primary">
                    View Report
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn--ghost reports__download">
                    Download Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReportsLayout;
