import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import '../Sign_up/Sign_up.css';
import './ProfileCard.css';
import { API_URL } from '../../config';

const ProfileCard = () => {
  const authtoken = sessionStorage.getItem('auth-token');
  const email = sessionStorage.getItem('email');
  const [userDetails, setUserDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!authtoken || !email) return;
    fetch(`${API_URL}/api/auth/user`, { headers: { Authorization: `Bearer ${authtoken}`, email } })
      .then((res) => res.json())
      .then((data) => (data.error ? setError(data.error) : setUserDetails(data)))
      .catch(() => setError('Could not load your profile. Please try again later.'));
  }, [authtoken, email]);

  if (!authtoken || !email) return <Navigate to="/login" replace />;
  if (!userDetails) return <p className="profile__status">{error || 'Loading profile...'}</p>;

  const handleEdit = () => {
    setUpdatedDetails({ name: userDetails.name, phone: userDetails.phone });
    setError('');
    setMessage('');
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: name === 'phone' ? value.replace(/\D/g, '') : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${authtoken}`, 'Content-Type': 'application/json', email },
        body: JSON.stringify(updatedDetails),
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.errors?.[0]?.msg ?? json.error ?? 'Failed to update profile.');
        return;
      }
      sessionStorage.setItem('name', updatedDetails.name);
      sessionStorage.setItem('phone', updatedDetails.phone);
      window.dispatchEvent(new Event('profile-change'));
      setUserDetails({ ...userDetails, ...updatedDetails });
      setEditMode(false);
      setMessage('Profile updated successfully.');
    } catch {
      setError('Failed to update profile. Please try again later.');
    }
  };

  const initials = userDetails.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="profile">
      <div className="profile__card">
        <div className="profile__header">
          <span className="profile__avatar" aria-hidden="true">
            {initials}
          </span>
          <div>
            <h1 className="profile__name">Welcome, {userDetails.name}</h1>
            {userDetails.role && <p className="profile__role">{userDetails.role}</p>}
          </div>
        </div>

        {editMode ? (
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="profile-email">Email</label>
              <input type="email" id="profile-email" className="field__input" value={userDetails.email} disabled />
            </div>
            <div className="field">
              <label htmlFor="profile-name">Name</label>
              <input
                type="text"
                name="name"
                id="profile-name"
                className="field__input"
                value={updatedDetails.name}
                onChange={handleInputChange}
                minLength={4}
                title="Name must be at least 4 characters"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="profile-phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="profile-phone"
                className="field__input"
                value={updatedDetails.phone}
                onChange={handleInputChange}
                inputMode="numeric"
                maxLength={10}
                pattern="\d{10}"
                title="Phone number must be exactly 10 digits"
                required
              />
            </div>
            {error && <p className="auth__error">{error}</p>}
            <div className="profile__actions">
              <button type="submit" className="btn btn--primary">
                Save
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <dl className="profile__details">
              <dt>Email</dt>
              <dd>{userDetails.email}</dd>
              <dt>Phone</dt>
              <dd>{userDetails.phone}</dd>
              {userDetails.createdAt && (
                <>
                  <dt>Member since</dt>
                  <dd>{new Date(userDetails.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</dd>
                </>
              )}
            </dl>
            {message && (
              <p className="profile__message" role="status">
                {message}
              </p>
            )}
            <div className="profile__actions">
              <button type="button" className="btn btn--primary" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileCard;
