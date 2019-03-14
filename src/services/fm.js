// import { asyncFetch } from 'config/fetch';

// /**
//  * 获取推荐歌单
//  * @param {*} payload
//  */
// export const getPersonalFm = async () => await asyncFetch('GET', '/personal_fm');

// /**
//  * 获取首页banner
//  * @param {*} payload
//  */
// export const getBanner = async () => await asyncFetch('GET', '/banner');

export const getPersonalFm = async () => await require('../mock/fm.json')
