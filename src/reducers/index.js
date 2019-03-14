import { combineReducers } from 'redux';
import { requestBannerList, bannerParam } from './findmusic/recommend'
import { requestInfo, userLoginParam } from './login'
import { requestFmList, fmParam } from './fm'

export default combineReducers({
  requestBannerList,
  bannerParam,
  requestInfo,
  userLoginParam,
  requestFmList,
  fmParam
})
