import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home.js'
import NavBar from './components/common/NavBar.js'
import GinProfile from './components/gins/GinProfile.js'
import Gins from './components/gins/Gins.js'
import UserProfile from './components/user/UserProfile.js'
import Register from './components/user/Register.js'
import Login from './components/user/Login.js'
import CheckOut from './components/user/CheckOut.js'

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/gins/:ginId">
          <GinProfile />
        </Route>
        <Route path="/gins">
          <Gins />
        </Route>
        <Route path="/user">
          <UserProfile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/checkout">
          <CheckOut />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
