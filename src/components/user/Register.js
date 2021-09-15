import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { FadeInDiv } from '../gins/Gins'

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

function Register() {
  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  

  return (
    <FadeInDiv>
      <section className="hero is-fullheight" id="myprofile">
        <div className="hero-body" id="profile-body">
          <h1 id="checkoutheader">Register!</h1>
          <div className="section">
            <form
              className="column"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${formErrors.username ? 'is-danger' : ''}`}
                    placeholder="Username"
                    onChange={handleChange}
                    name="username"
                    value={formData.username}
                  />
                </div>
                {formErrors.username && (
                  <p className="help is-danger">{formErrors.username}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${formErrors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                  />
                </div>
                {formErrors.email && (
                  <p className="help is-danger">{formErrors.email}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${formErrors.password ? 'is-danger' : ''}`}
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                </div>
                {formErrors.password && (
                  <p className="help is-danger">{formErrors.password}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${
                      formErrors.passwordConfirmation ? 'is-danger' : ''
                    }`}
                    placeholder="Password Confirmation"
                    onChange={handleChange}
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                  />
                </div>
                {formErrors.passwordConfirmation && (
                  <p className="help is-danger">
                    {formErrors.passwordConfirmation}
                  </p>
                )}
              </div>
              <div className="field">
                <button type="submit" className="buttons">
                Sign Up!
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </FadeInDiv>
  )
}

export default Register