import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import SavedPasswords from '../SavedPasswords'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordsList: [],
    isChecked: false,
  }

  updateWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  updateUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  updatePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateCheckedStatus = event => {
    this.setState({isChecked: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const newUser = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newUser],
      }))
    }
  }

  onDeleteUser = id => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    })
  }

  noPasswordContainer = () => {
    const random = ''
    return (
      <div className="no-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          className="no-password-image"
          alt="no passwords"
        />
        <p className="no-password-text">No Passwords</p>
      </div>
    )
  }

  passwordsListContainer = () => {
    const {websiteInput, searchInput, passwordsList} = this.state
    const filteredList = passwordsList.filter(eachPassword =>
      eachPassword.websiteInput
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="list-container">
        {filteredList.map(eachPassword => (
          <SavedPasswords
            key={eachPassword.id}
            passwordDetails={eachPassword}
            onDeleteUser={this.onDeleteUser}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      passwordsList,
      isChecked,
    } = this.state
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="logo"
          alt="app-logo"
        />
        <div className="top-container">
          <form className="input-container" onSubmit={this.onClickAdd}>
            <h1 className="add-password">Add New Password</h1>
            <div className="flex-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="icon"
                  alt="website"
                />
              </div>
              <input
                type="text"
                className="user-input"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.updateWebsiteInput}
              />
            </div>
            <div className="flex-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="icon"
                  alt="username"
                />
              </div>
              <input
                type="text"
                className="user-input"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.updateUsername}
              />
            </div>
            <div className="flex-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="icon"
                  alt="password"
                />
              </div>
              <input
                type="password"
                className="user-input"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={this.updatePasswordInput}
              />
            </div>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="top-image"
            alt="password manager"
          />
        </div>
        <div className="bottom-container">
          <div className="header-container">
            <div className="count-container">
              <h1 className="your-password">Your Passwords</h1>
              <p className="count">{passwordsList.length}</p>
            </div>
            <div className="search-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="icon"
                  alt="search"
                />
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.updateSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <input
              type="checkbox"
              className="checked-input"
              id="check"
              value={isChecked}
              onChange={this.updateCheckedStatus}
            />
            <label htmlFor="check" className="show-password-text">
              Show Password
            </label>
          </div>
          {passwordsList.length === 0
            ? this.noPasswordContainer()
            : this.passwordsListContainer()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
