import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, info, clearNotification }) => {
  if (message !== null) {
    setTimeout(() => {
      clearNotification()
    }, 3000)
    return (
      <div className="error">
        {message}
      </div>
    )
  } else if (info !== null) {
    setTimeout(() => {
      clearNotification()
    }, 2000)
    return (
      <div className="info">
        {info}
      </div>
    )
  } else {
    return null
  }
}

Notification.propTypes = {
  clearNotification: PropTypes.func.isRequired
}

export default Notification