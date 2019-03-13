// import { asyncFetch } from 'config/fetch';
// import { asyncFetch } from 'cross-fetch';

/**
 * 获取推荐歌单
 * @param {*} payload
 */
// export const getPersonalized = async () => await asyncFetch('GET', personalized);

/**
 * 获取首页banner
 * @param {*} payload
 */
// export const getBanner = async () => await asyncFetch('GET', banner);

/**
 * 获取推荐电台
 * @param {*} payload
 */
// export const getDjprogram = async () => await asyncFetch('GET', djprogram);


export const getPersonalized = async () => await require('../mock/personalized.json')
export const getBanner = async () => await require('../mock/banner.json')
export const getDjprogram = async () => await require('../mock/djprogram.json')
