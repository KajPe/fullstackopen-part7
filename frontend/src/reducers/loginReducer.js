import loginService from './../services/login'

const loginReducer = (store = [], action) => {
  switch (action.type) {
  case 'LOGOUT': {
    return []
  }
  case 'LOGIN': {
    return action.data
  }
  default:
    return store
  }
}

export const dologin = (username, password) => {
  return async (dispatch) => {
    const login = await loginService.login({
      username: username,
      password: password
    })
    dispatch({
      type: 'LOGIN',
      data: login
    })
  }
}

export const dologout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const tokenLogin = (locstorage) => {
  return async (dispatch) => {
    const login = JSON.parse(locstorage)
    dispatch({
      type: 'LOGIN',
      data: login
    })
  }
}

export default loginReducer