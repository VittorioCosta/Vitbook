/* eslint-disable */
import React, { useState } from 'react'
import { connect } from 'react-redux' // it needs to be exported
import { Link } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'


// function Register(props) {  // props aggiunto con lo stato

function Register({setAlert}) {   // destructuring of props
  

  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })

  const { name, email ,password, password2 } = values

  const onChange = e=> setValues({...values, [e.target.name]: e.target.value})

  const onSubmit = async e=> {
    e.preventDefault()
    if(password !== password2) {
      setAlert('passwords do not match', 'danger')
    }
    console.log(values, 'SUCCESS')

  }

  return (

    <div className='container'>
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={onSubmit}>

        <div className="form-group">
          <input 
            type="text" 
            placeholder="Name" 
            name="name"
            value={name}
            onChange={onChange}
            required 
          />
        </div>

        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email}
            onChange={onChange}
            required
        />

          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={onChange}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
        >Register</button>

      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  )
}

Register.PropTypes = {
  setAlert: PropTypes.func.isRequired
}


export default connect(
  null, 
  { setAlert }
) (Register) 