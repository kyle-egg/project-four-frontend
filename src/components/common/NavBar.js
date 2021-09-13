import React from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

function NavBar() {
  useLocation()
  const history = useHistory()
  const isAuth = isAuthenticated()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

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
            {!isAuth && (
              <>
                <NavLink to="/register" className="navbar-item">
                Register
                </NavLink>
                <NavLink to="/login" className="navbar-item">
                Login
                </NavLink>
              </>
            )}
            {isAuth && (
              <NavLink to="/" exact className="navbar-item" onClick={handleLogout}>
            Log Out
              </NavLink>
            )}
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