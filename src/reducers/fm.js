import {
  REQUEST_FM_LIST,
  RECEIVE_FM_LIST,
  REQUEST_FM_PARAM
} from '../actions/fm'

export const fmParam = (state = "", action) => {
  switch(action.type) {
    case REQUEST_FM_PARAM:
      return action.param
    default: return state
  }
}

export const posts = (state = {
  isFetching: false,
  items: {},
  lastUpdateAt: Date.now()
}, action) => {
  switch(action.type) {
    case REQUEST_FM_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_FM_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
        lastUpdated: action.receivedAt
      })
    default: return
  }
}

export const requestFmList = (state = '', action) => {
  switch(action.type) {
    case RECEIVE_FM_LIST:
    case REQUEST_FM_LIST:
      console.log(action)
      return Object.assign({}, state, {
        data: posts(state[action.param], action)
      })
    default: return state
  }
} 
