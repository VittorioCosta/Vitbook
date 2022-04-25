import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    instruments,
    location,
    genre,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">{status}</p>
      <p>{instruments.map(instrument=> <span key={instrument}>{instrument} </span>)}</p>
      <p>{genre ? <span>{genre}</span> : null}</p>
      <p>{location ? <span>{location}</span> : null}</p>
      </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
