import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  users: usersReducer,
  blogs: blogReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store