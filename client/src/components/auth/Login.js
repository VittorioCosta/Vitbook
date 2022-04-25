import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import { loadUser } from '../../actions/auth'


function Login({ login, isAuthenticated }) {

    
  const [values, setValues] = useState({
    email:'',
    password:''
  })

  const { email, password } = values

  const onChange = e=> setValues({...values, [e.target.name]: e.target.value})

  const onSubmit = async e=> {
    e.preventDefault()
    login(email, password)  
    loadUser()
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (

    <div className='container'>
        <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={onSubmit}>

        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={values.email}
            onChange={onChange}
            required
        />

        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={values.password}
            onChange={onChange}
          />
        </div>

        <button 
            type="submit" 
            className="btn btn-primary" 
        >Login</button>

      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
  
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps, 
  { login }
)(Login);
