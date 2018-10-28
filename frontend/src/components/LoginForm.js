import React from 'react'

const loginForm = ({ handleSubmit, handleChange, username, password }) => (
  <div>
    <h2>Login to application</h2>
    <form className="loginform" onSubmit={handleSubmit}>      
      <div>
        Username :
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div>
        Password :
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
)

export default loginForm