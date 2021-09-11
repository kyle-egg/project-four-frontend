import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" className="navbar-item">
              Home 
            </NavLink>
            <NavLink to="/gins" className="navbar-item">
              Gins
            </NavLink>
            <NavLink to="/user/" className="navbar-item">
              My Profile
            </NavLink>
            <NavLink to="/register" className="navbar-item">
              Register
            </NavLink>
            <NavLink to="/login" className="navbar-item">
              Login
            </NavLink>
            <NavLink to="/checkout" className="navbar-item">
              Check Out
            </NavLink>
          </div>
        </div>
      </nav>
    </header>

  )
}

export default NavBar