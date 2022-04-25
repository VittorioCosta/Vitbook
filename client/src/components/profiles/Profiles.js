import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  
  
  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Musicians</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            musicians
          </p>
           
          <div className="profiles">
            {Object.keys(profiles).length > 0 ? (
              Object.keys(profiles).map((n) => (
                <ProfileItem key={profiles[n]._id} profile={profiles[n]} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
