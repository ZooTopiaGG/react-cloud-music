import { asyncFetch } from 'config/fetch';

/**
 * 通过id 获取歌曲信息
 * @param {*} payload
 */
export const getSongUrl = async (payload) => await asyncFetch('GET','/song/url', payload);

/**
 * 通过id 获取歌曲信息
 * @param {*} payload
 */
export const toLogin = async (payload) => await asyncFetch('GET','/login/cellphone', payload);
