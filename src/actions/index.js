import { toLogin } from 'services/api'
export const USER_LOGIN_PARAM = 'USER_LOGIN_PARAM'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_INFO = 'RECEIVE_INFO'

export function userLogin(param) {
  return {
    type: USER_LOGIN_PARAM,
    param
  }
}

export function receiveInfo(param, data) {
  console.log('data:', data)
  return {
    type: RECEIVE_INFO,
    param,
    data,
    receivedAt: Date.now()
  }
}

export function requestLogin(param) {
  return {
    type: REQUEST_LOGIN,
    param
  }
}

export function fetchLogin(param) {
  return async dispatch => {
    let res = await toLogin(param)
    console.log('res:::::::::', res)
    if (res && res.code) {
      dispatch(receiveInfo(param, res))
    }
  }
}
