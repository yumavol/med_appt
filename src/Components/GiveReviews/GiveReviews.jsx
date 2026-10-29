import React, { useEffect, useRef, useState } from 'react';

import '../Sign_up/Sign_up.css';
import './GiveReviews.css';
import starFilled from '../../assets/star-filled.svg';
import starEmpty from '../../assets/star-empty.svg';

const starValues = [1, 2, 3, 4, 5];

// Popup: shows the trigger and opens the children in a modal <dialog> while `open` is true.
const Popup = ({ trigger, open, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) dialogRef.current.showModal();
    else dialogRef.current.close();
  }, [open]);

  return (
    <>
      {trigger}
      <dialog ref={dialogRef} className="dialog" onClose={onClose} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="dialog__body">
          <button type="button" className="dialog__close" onClick={onClose} aria-label="Close">
            ×
          </button>
          {children}
        </div>
      </dialog>
    </>
  );
};

const GiveReviews = ({ report, reviewData, onSubmit }) => {
  const [formData, setFormData] = useState(() => ({ name: sessionStorage.getItem('name') ?? '', review: '', rating: 0 }));
  const [open, setOpen] = useState(false);
  const reviewGiven = Boolean(reviewData[report.serialNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'rating' ? Number(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(report.serialNumber, formData);
    setOpen(false);
  };

  return (
    <Popup
      open={open}
      onClose={() => setOpen(false)}
      trigger={
        // Once a review is submitted for this report, the control is disabled and shows "Review Given".
        <button type="button" className="btn btn--primary" disabled={reviewGiven} onClick={() => setOpen(true)}>
          {reviewGiven ? 'Review Given' : 'Give Review'}
        </button>
      }
    >
      <div className="reviews__form-header">
        <h2 className="reviews__form-title">Give Your Review</h2>
        <p className="reviews__form-subtitle">{report.doctorName}</p>
      </div>
      <form className="give-review" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor={`review-name-${report.serialNumber}`}>Name</label>
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            name="name"
            id={`review-name-${report.serialNumber}`}
            className="field__input"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor={`review-text-${report.serialNumber}`}>Review</label>
          <textarea
            value={formData.review}
            onChange={handleChange}
            name="review"
            id={`review-text-${report.serialNumber}`}
            rows={4}
            className="field__input give-review__textarea"
            placeholder="Share your experience"
            required
          />
        </div>
        <fieldset className="field give-review__rating">
          <legend>Rating</legend>
          <div className="give-review__stars">
            {starValues.map((star) => (
              <label key={star} className="give-review__star">
                <input type="radio" name="rating" value={star} checked={formData.rating === star} onChange={handleChange} required />
                <img src={star <= formData.rating ? starFilled : starEmpty} alt={`${star} star${star > 1 ? 's' : ''}`} width="32" height="32" />
              </label>
            ))}
          </div>
        </fieldset>
        <button type="submit" className="btn btn--primary btn--block">
          Submit
        </button>
      </form>
    </Popup>
  );
};

export default GiveReviews;
