// import fetch from 'cross-fetch';
import { getBanner } from 'services/recommend';

export const REQUEST_BANNER_LIST = 'REQUEST_BANNER_LIST'
export const RECEIVE_BANNER_LIST = 'RECEIVE_BANNER_LIST'
export const BANNER_PARAM = 'BANNER_PARAM'

export function initBannerParam(param) {
  return {
    type: BANNER_PARAM,
    param
  }
}

export function requestBannerList(param) {
  return {
    type: REQUEST_BANNER_LIST,
    param
  }
}

export function receiveBannerList(param, res) {
  return {
    type: RECEIVE_BANNER_LIST,
    param,
    data: res,
    receivedAt: Date.now()
  }
}

export function fetchBannerList(param) {
  return async dispatch => {
    let res = await getBanner()
    if(res && res.code === 200) {
      dispatch(receiveBannerList(param, res))
    } else {
      return null
    }
  }
}
