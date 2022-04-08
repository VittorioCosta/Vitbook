import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Login() {

    const initialValues = {
        email:'',
        password:''
    }

    const [values, setValues] = useState(initialValues)

    const onChange = e=> setValues({...values, [e.target.name]: e.target.value})

    const onSubmit = async e=> {
        e.preventDefault()
        console.log(values, 'SUCCESS')

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

export default Login