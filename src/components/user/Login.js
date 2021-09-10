import React from 'react'
import { useHistory } from 'react-router-dom'
import { setToken } from '../../lib/auth'
import axios from 'axios'

function Login() {
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })
  const [isError, setIsError] = React.useState(false)

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setToken(data.token)
      history.push('/gins')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Username:</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password:</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            {isError && (
              <>
                <p className="help is-danger">
                Email Or Password Are Incorrect!<br></br>
                Forgotten Your Password? <a>CLICK HERE!</a>
                </p>
              </>
            )}
            <div className="field">
              <button type="submit" className="button is-fullwidth is-black">
                Log In!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login