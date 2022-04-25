import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    instruments,
    status,
    location,
    skills,
    genre
  }
}) => {
    
  return (

    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>{status}</p>
        <p>{genre && <span>{genre}</span>}</p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <p className='my-1'>{skills && <span>{skills}</span>}</p> 
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {instruments.map((instrument, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {instrument}
          </li>
        ))}
      </ul> 
    </div>  

  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
