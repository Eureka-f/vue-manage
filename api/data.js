import axios from "./axios";//引入的是工具类

export const getMenu = (param) => {
  return axios.request({
    url: '/api/permission/getMenu',
    method: 'post',
    data: param  //`data` 是作为请求主体被发送的数据
  })
}

export const getData = () => {
  return axios.request({
    url: '/home/getData'
  })
}

export const getUserData = (params) => {
  return axios.request({
    url: '/user/getuser',
    method: 'get',
    params
  })
}