import React from 'react'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth' 

function Navbar({ auth: { isAuthenticated }, logout }) {

  const authLinks = (

    <ul>
      <li>
        <Link to="/profiles">
        <i className='fas fa-headphones' />
        <span> </span>Musicians
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
        <i className='fas fa-user'></i>{' '}
        <span className='hide-dash-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-dash-sm'>Logout</span>
        </Link>
      </li>
    </ul>

  )

  const guestLinks = (

    <ul>
      <li><Link to="/profiles">Musicians</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>

  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><img alt='logo' src={logo} /> </Link>
      </h1>
       <>{ !isAuthenticated ? guestLinks : authLinks}</> 
    </nav>
  )
}

Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state=>({
  auth: state.auth
})

export default connect(
  mapStateToProps, 
  { logout }
)(Navbar)