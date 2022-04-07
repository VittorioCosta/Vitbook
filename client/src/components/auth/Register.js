import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Register() {

    const initialValues = {
        name:'',
        email:'',
        password:'',
        password2:''
    }

    const [values, setValues] = useState(initialValues)

    const onChange = e=> setValues({...values, [e.target.name]: e.target.value})

    const onSubmit = async e=> {
        e.preventDefault()
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
            value={values.name}
            onChange={onChange}
            required 
          />
        </div>

        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={values.email}
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
            value={values.password}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={values.password2}
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

export default Register