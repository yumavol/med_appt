import React from 'react';

import './ReviewForm.css';
import starFilled from '../../assets/star-filled.svg';
import starEmpty from '../../assets/star-empty.svg';

const consultations = [
  { doctorName: 'Dr. John Doe', speciality: 'Cardiology' },
  { doctorName: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { doctorName: 'Dr. Sarah Lee', speciality: 'Orthopedics', rating: 4 },
];

const ReviewForm = () => {
  return (
    <section className="reviews">
      <h1 className="reviews__title">Reviews</h1>

      <div className="reviews__card">
        <table className="reviews__table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide Review</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map(({ doctorName, speciality, rating }, index) => (
              <tr key={doctorName}>
                <td>{index + 1}</td>
                <td className="reviews__doctor">{doctorName}</td>
                <td>
                  <span className="reviews__tag">{speciality}</span>
                </td>
                <td>
                  <button type="button" className="btn btn--primary" disabled={Boolean(rating)}>
                    {rating ? 'Reviewed' : 'Give Review'}
                  </button>
                </td>
                <td>
                  {rating ? (
                    <span className="reviews__stars" aria-label={`${rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <img key={star} src={star <= rating ? starFilled : starEmpty} alt="" width="18" height="18" />
                      ))}
                    </span>
                  ) : (
                    <span className="reviews__empty">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReviewForm;
