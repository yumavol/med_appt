import React, { useState } from 'react';

import './ReviewForm.css';
import GiveReviews from '../GiveReviews/GiveReviews';
import starFilled from '../../assets/star-filled.svg';
import starEmpty from '../../assets/star-empty.svg';

const reports = [
  { serialNumber: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiology' },
  { serialNumber: 2, doctorName: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { serialNumber: 3, doctorName: 'Dr. Sarah Lee', speciality: 'Orthopedics' },
];

const starValues = [1, 2, 3, 4, 5];

const storageKey = 'reviewData';

const loadReviewData = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? {};
  } catch {
    return {};
  }
};

const Stars = ({ rating }) => (
  <span className="reviews__stars" aria-label={`${rating} out of 5 stars`}>
    {starValues.map((star) => (
      <img key={star} src={star <= rating ? starFilled : starEmpty} alt="" width="18" height="18" />
    ))}
  </span>
);

const ReviewForm = () => {
  const [reviewData, setReviewData] = useState(loadReviewData);

  const handleReviewSubmit = (serialNumber, review) => {
    const next = { ...reviewData, [serialNumber]: review };
    localStorage.setItem(storageKey, JSON.stringify(next));
    setReviewData(next);
  };

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
            {reports.map((report) => {
              const review = reviewData[report.serialNumber];
              return (
                <tr key={report.serialNumber}>
                  <td>{report.serialNumber}</td>
                  <td className="reviews__doctor">{report.doctorName}</td>
                  <td>
                    <span className="reviews__tag">{report.speciality}</span>
                  </td>
                  <td>
                    <GiveReviews report={report} reviewData={reviewData} onSubmit={handleReviewSubmit} />
                  </td>
                  <td className="reviews__given">
                    {review ? (
                      <>
                        <Stars rating={review.rating} />
                        <p className="reviews__text">{review.review}</p>
                      </>
                    ) : (
                      <span className="reviews__empty">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReviewForm;
