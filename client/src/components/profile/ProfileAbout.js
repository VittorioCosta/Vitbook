import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    description,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>      
        <h2 className='text-primary'>{description}</h2> 
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
