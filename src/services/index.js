import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
export function request(url, params) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  })

  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      if (localStorage.getItem('token')) {
        console.log('token 存在')
      }
      return config
    },
    err => {
      console.log(err)
    }
  )

  // 响应拦截器
  // 响应拦截
  instance.interceptors.response.use(
    config => {
      return config
    },
    err => {
      console.log([err])
    }
  )
  instance.defaults.withCredentials = true
  // get请求
  if (params) {
    params = {
      params: params,
    }
    return instance.get(url, params)
  } else {
    return instance.get(url)
  }
}
