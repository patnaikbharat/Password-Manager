import './index.css'

const SavedPasswords = props => {
  const {passwordDetails, onDeleteUser} = props
  const {id, website, username, password} = passwordDetails

  const onClickDelete = () => {
    onDeleteUser(id)
  }

  return (
    <li className="saved-password-bg-container">
      <div className="logo-container">
        <p className="logo-text">{website[0].toUppercase()}</p>
      </div>
      <div>
        <p className="website-text">{website}</p>
        <p className="username-text">{username}</p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          className="star-image"
          alt="stars"
        />
      </div>
      <button type="button" className="delete-button" onClick={onClickDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default SavedPasswords
