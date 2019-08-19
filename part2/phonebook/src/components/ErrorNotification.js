import React from 'react'

const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="errorInfo">
        {message}
      </div>
    )
  }

  export default ErrorNotification
  