import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getProfile } from '../../actions/profile'

const initialData = {
  instruments: '',
  status: '',
  location: '',
  skills: '',
  description: '',
  genre: '',
  facebook: '',
  twitter: ''
}

const CreateProfile = ({
  profile: { profile, loading },
  createProfile,
  getProfile
}) => {

  const [data, setData] = useState(initialData)
  const [socialInputs, setsocialInputs] = useState(false)

  const navigate = useNavigate()

  

  const {
    instruments,
    status,
    location,
    skills,
    description,
    genre,
    facebook,
    twitter
  } = data

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(data, navigate, false);
  };
  
    

  return (
    
    <section className="container">
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        <span> </span>Information About You
      </p>
      <small>* required</small>

      <form className="form" onSubmit={onSubmit}>

        <div className="form-group">
            <input
                type="text"
                placeholder="Instruments"
                name="instruments"
                value={instruments}
                onChange={onChange}
            />
            <small className="form-text">
            Please use comma separated values (eg. bass, guitar, drum)
            </small>
        </div>

        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Status</option>
            <option value="Hobbyist">Hobbyist</option>
            <option value="Indipendent Artist">Indipendent Artist</option>
            <option value="Major Label Artist">Major Label Artist</option>
            <option value="Session Musician">Session Musician</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Teacher">Teacher</option>
            <option value="Producer-Composer">Producer-Composer</option>
            <option value="Orchestra Musician">Orchestra Musician</option>
            <option value="Retired Artist">Retired Artist</option>
          </select>
          <small className="form-text">
            Give an idea of your main occupation
          </small>
        </div>

        <div className="form-group">
            <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
            />
            <small className="form-text">
                City & state suggested (eg. Liverpool, UK)
            </small>
        </div>

        <div className="form-group">
            <input
                type="text"
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange}
            />
            <small className="form-text">
                Please use comma separated values (eg. motivation, determination, perseverance)
            </small>
        </div>

        <div className="form-group">
            <textarea
                id='description'
                type='text'
                name='description'
                placeholder='* Enter your description'
                value={description}
                onChange={onChange}
                rows = {5}
                max='240'
            />
            <small className="form-text">
                Please describe yourself as a Musician
            </small>
        </div>

        <div className="form-group">
            <input
                type="text"
                placeholder="* Genre"
                name="genre"
                value={genre}
                onChange={onChange}
            />
            <small className="form-text">
                The kind of Music you play
            </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => setsocialInputs(!socialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        
        {socialInputs && <>
        
            <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x" />
                <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
                />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x" />
                <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
                />
            </div>

        </>}

        <input type="submit" className="btn btn-primary my-1" />

        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>

      </form>
    </section>

  )
  
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getProfile })(
  CreateProfile
);