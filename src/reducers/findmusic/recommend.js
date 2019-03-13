import {
  REQUEST_BANNER_LIST,
  RECEIVE_BANNER_LIST,
  BANNER_PARAM
} from '../../actions/findmusic/recommend'

export const bannerParam = (state = '', action) => {
  switch(action.type) {
    case BANNER_PARAM:
      return action.param
    default: return state
  }
}

const posts = (state = {
  isFetching: false,
  items: [],
  lastUpdated: Date.now()
}, action) => {
  switch(action.type) {
    case REQUEST_BANNER_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_BANNER_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
        lastUpdated: action.receivedAt
      })
    default: return state
  }
}


export const requestBannerList = (state = '', action) => {
  switch(action.type) {
    case RECEIVE_BANNER_LIST:
    case REQUEST_BANNER_LIST:
      return Object.assign({}, state, {
        [action.param]: posts(state[action.param], action)
      })
    default: return state
  }
}
