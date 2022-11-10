// Write your JS code here
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''} // here intializing the error msg

  // update the input fields
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  // navigate to the different paths
  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  // update the failure response
  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  // make api call request to server
  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    // send req in post method
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    // now get tne response from the server
    const response = await fetch(url, options)
    const data = await response.json()

    // now handle the server response
    if (response.ok === true) {
      this.onSubmitSuccess()
    }
    // if its not matched then diplay the errormsg
    else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="username-style">
          PASSWORD
        </label>
        <input
          className="usernamefield"
          id="password"
          placeholder="Password"
          value={password}
          type="password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="username-style">
          USERNAME
        </label>
        <input
          className="usernamefield"
          type="text"
          id="username"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="loginform-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="login-image"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="button">
            Login
          </button>
          {showSubmitError && <p className="error-mag">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
