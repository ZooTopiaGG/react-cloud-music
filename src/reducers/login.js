import {
  USER_LOGIN_PARAM,
  REQUEST_LOGIN,
  RECEIVE_INFO
} from '../actions'

export const userLoginParam = (state = {
  phone: '',
  password: ''
}, action) => {
  switch(action.type) {
    case USER_LOGIN_PARAM:
      return action.param
    default: return state
  }
}

const posts = (state = {
  isShow: false,
  items: {},
  lastUpdated: Date.now()
}, action) => {
  switch(action.type) {
    case USER_LOGIN_PARAM:
      return Object.assign({}, state, {
        isShow: false
      })
    case RECEIVE_INFO:
      return Object.assign({}, state, {
        isShow: true,
        items: action.data,
        lastUpdated: action.receivedAt
      })
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isShow: false
      })
    default: return 
  }
}

export const requestInfo = (state = '', action) => {
  switch(action.type) {
    case RECEIVE_INFO:
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        data: posts(state[action.param], action)
      })
    default: return state
  }
}
