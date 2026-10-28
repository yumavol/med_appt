import React, { useRef, useState } from 'react';

import './ReviewForm.css';
import GiveReviews from '../GiveReviews/GiveReviews';
import starFilled from '../../assets/star-filled.svg';
import starEmpty from '../../assets/star-empty.svg';

const consultations = [
  { doctorName: 'Dr. John Doe', speciality: 'Cardiology' },
  { doctorName: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { doctorName: 'Dr. Sarah Lee', speciality: 'Orthopedics' },
];

const starValues = [1, 2, 3, 4, 5];

const storageKey = (doctorName) => `reviewFormData_${doctorName}`;

const loadReview = (doctorName) => {
  try {
    return JSON.parse(localStorage.getItem(storageKey(doctorName)));
  } catch {
    return null;
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
  const dialogRef = useRef(null);
  const [reviews, setReviews] = useState(() =>
    Object.fromEntries(consultations.map(({ doctorName }) => [doctorName, loadReview(doctorName)]))
  );
  const [activeDoctor, setActiveDoctor] = useState(null);

  const openForm = (doctorName) => {
    setActiveDoctor(doctorName);
    dialogRef.current.showModal();
  };

  const closeForm = () => dialogRef.current.close();

  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) closeForm();
  };

  const handleReviewSubmit = (review) => {
    localStorage.setItem(storageKey(activeDoctor), JSON.stringify(review));
    setReviews({ ...reviews, [activeDoctor]: review });
    closeForm();
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
            {consultations.map(({ doctorName, speciality }, index) => {
              const review = reviews[doctorName];
              return (
                <tr key={doctorName}>
                  <td>{index + 1}</td>
                  <td className="reviews__doctor">{doctorName}</td>
                  <td>
                    <span className="reviews__tag">{speciality}</span>
                  </td>
                  <td>
                    <button type="button" className="btn btn--primary" disabled={Boolean(review)} onClick={() => openForm(doctorName)}>
                      {review ? 'Reviewed' : 'Give Review'}
                    </button>
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

      <dialog ref={dialogRef} className="dialog" onClick={handleDialogClick} aria-labelledby="review-dialog-title">
        <div className="dialog__body">
          <button type="button" className="dialog__close" onClick={closeForm} aria-label="Close">
            ×
          </button>
          <div className="reviews__form-header">
            <h2 id="review-dialog-title" className="reviews__form-title">
              Give Your Review
            </h2>
            <p className="reviews__form-subtitle">{activeDoctor}</p>
          </div>

          <GiveReviews key={activeDoctor} onSubmit={handleReviewSubmit} />
        </div>
      </dialog>
    </section>
  );
};

export default ReviewForm;
