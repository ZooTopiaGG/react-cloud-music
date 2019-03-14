import { getPersonalFm } from 'services/fm'

export const REQUEST_FM_LIST = 'REQUEST_FM_LIST';
export const RECEIVE_FM_LIST = 'RECEIVE_FM_LIST';
export const REQUEST_FM_PARAM = 'REQUEST_FM_PARAM';

export function requestFmParam(param) {
  return {
    type: REQUEST_FM_PARAM,
    param
  }
}

export function receiveFmList(param, res) {
  return {
    type: RECEIVE_FM_LIST,
    data: res,
    param,
    isFetching: false,
    receivedAt: Date.now()
  }
}

export function requestFmList(param) {
  return {
    type: REQUEST_FM_LIST,
    param
  }
}

/**
 * 请求FmList 并返回参数和结果
 * @export
 * @param {*} param
 * @returns
 */
export function fetchFmList(param) {
  return async dispatch => {
    let res = await getPersonalFm()
    if(res && res.code === 200) {
      dispatch(receiveFmList(param, res))
    } else {
      return null
    }
  }
}
