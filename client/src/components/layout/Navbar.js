import React from 'react'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><img alt='logo' src={logo} /> </Link>
      </h1>
      <ul>
        <li><Link to="/profile">Musicians</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar