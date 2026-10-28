import React, { useState } from 'react';

import '../Sign_up/Sign_up.css';
import './GiveReviews.css';
import starFilled from '../../assets/star-filled.svg';
import starEmpty from '../../assets/star-empty.svg';

const starValues = [1, 2, 3, 4, 5];

const GiveReviews = ({ onSubmit }) => {
  const [formData, setFormData] = useState(() => ({ name: sessionStorage.getItem('name') ?? '', review: '', rating: 0 }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'rating' ? Number(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="give-review" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="review-name">Name</label>
        <input
          value={formData.name}
          onChange={handleChange}
          type="text"
          name="name"
          id="review-name"
          className="field__input"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="review-text">Review</label>
        <textarea
          value={formData.review}
          onChange={handleChange}
          name="review"
          id="review-text"
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
  );
};

export default GiveReviews;
