import axios from 'axios'
import qs from 'qs'
import { apiURL } from './api.cfg'

// 获取个人信息
export const getPersonalInfo = () => axios.get(`${apiURL.PERSONALINFO}`)
// 获取所有博客
export const getbloglist = () => axios.get(`${apiURL.BLOGLIST}`)
// 页面改变
export const changePage = (params) => axios.post(`${apiURL.PAGE}`, qs.stringify(params))
// 修改博客浏览数
export const modifyblog = (params) => axios.post(`${apiURL.MODIFYBLOG}`, qs.stringify(params))
