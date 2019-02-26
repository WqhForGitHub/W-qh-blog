import axios from 'axios'
import qs from 'qs'
import { apiURL } from './api.cfg'

// const SERVER = 'http://localhost:3000'

// 获取个人信息
export const getPersonalInfo = () => axios.get(`${apiURL.PERSONALINFO}`)
// 获取所有博客
export const getbloglist = () => axios.get(`${apiURL.BLOGLIST}`)
// 页面改变
export const changePage = (params) => axios.post(`${apiURL.PAGE}`, qs.stringify(params))
