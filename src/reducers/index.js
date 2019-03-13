import { combineReducers } from 'redux';
import { requestBannerList, bannerParam } from './findmusic/recommend'
import { requestInfo, userLoginParam } from './login'

export default combineReducers({
  requestBannerList,
  bannerParam,
  requestInfo,
  userLoginParam
})
