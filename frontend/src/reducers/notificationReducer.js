
const initialInfo = {
  type: 0,
  content: ''
}

const notificationReducer = (store = initialInfo, action) => {
  switch (action.type) {
  case 'INFO':
    return {
      type: 1,
      content: action.data.content
    }
  case 'ERROR':
    return {
      type: 2,
      content: action.data.content
    }
  case 'CLEAR':
    return initialInfo
  default:
    return store
  }
}

export const notificationInfo = (content, showtime=5) => {
  return async (dispatch) => {
    dispatch({
      type: 'INFO',
      data: { content }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, showtime*1000)
  }
}

export const notificationError = (content, showtime=5) => {
  return async (dispatch) => {
    dispatch({
      type: 'ERROR',
      data: { content }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, showtime*1000)
  }
}

export const notificationClear = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR'
    })
  }
}

export default notificationReducer