import React from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'
import { basket } from '../gins/GinProfile'

function NavBar() {
  useLocation()
  const history = useHistory()
  const isAuth = isAuthenticated()
  const [showBasket, setShowBasket] = React.useState(false)

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  const seeBasket = () => {
    if (!showBasket) {
      setShowBasket(true)
    } else {
      setShowBasket(false)
    }
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
            {isAuth && (
              <NavLink to="/user/" className="navbar-item">
              My Profile
              </NavLink>
            )}
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
            <button className="basketbutton" onClick={seeBasket}>
              <svg xmlns="http://www.w3.org/2000/svg" id="cart" className="ionicon" viewBox="0 0 512 512"><title>Cart</title><circle cx="176" cy="416" r="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><circle cx="400" cy="416" r="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 80h64l48 272h256"/><path d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
              <p className="basketnumber">{basket.length}</p>
            </button>
          </div>
        </div>
      </nav>
      {showBasket && (
        <div className="basket">
          <h2 id="profileheader">Your Basket:</h2>
          {basket.length ? basket.map(gin => {
            return <div key={gin.id}>
              <div>
                <h2 id="profileheader">{gin.name} £{gin.price}</h2>
              </div>
              <button className="buttons">Go To Check Out!</button>
            </div> 
          })
            :
            <h3 id="profileheader">No Items In Basket!</h3>
          }
        </div>
      )}
    </header>

  )
}

export default NavBar