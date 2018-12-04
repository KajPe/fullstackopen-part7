import userService from './../services/users'

const usersReducer = (store = [], action) => {
  switch (action.type) {
  case 'INIT': {
    return action.data
  }
  default:
    return store
  }
}

export const usersInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT',
      data: users
    })
  }
}

export default usersReducer