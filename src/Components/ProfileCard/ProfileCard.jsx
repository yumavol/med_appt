import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import './ProfileCard.css';
import { API_URL } from '../../config';

const ProfileCard = () => {
  const email = sessionStorage.getItem('email');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) return;
    fetch(`${API_URL}/api/auth/user`, { headers: { email } })
      .then((res) => res.json())
      .then((data) => (data.error ? setError(data.error) : setUser(data)))
      .catch(() => setError('Could not load your profile. Please try again later.'));
  }, [email]);

  if (!sessionStorage.getItem('auth-token') || !email) return <Navigate to="/login" replace />;

  if (error) return <p className="profile__status">{error}</p>;
  if (!user) return <p className="profile__status">Loading profile...</p>;

  const initials = user.name
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
            <h1 className="profile__name">{user.name}</h1>
            {user.role && <p className="profile__role">{user.role}</p>}
          </div>
        </div>

        <dl className="profile__details">
          <dt>Email</dt>
          <dd>{user.email}</dd>
          <dt>Phone</dt>
          <dd>{user.phone}</dd>
          {user.createdAt && (
            <>
              <dt>Member since</dt>
              <dd>{new Date(user.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</dd>
            </>
          )}
        </dl>
      </div>
    </section>
  );
};

export default ProfileCard;
