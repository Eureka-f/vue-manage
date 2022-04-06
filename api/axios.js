import axios from "axios";
import config from "../config";
//对当前环境的判断，来选择接口请求地址
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      headers: {}
    }
    return config
  }

  //添加拦截器  
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      console.log(response, 'reponse');
      return response;

    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }

  request(options) {
    const instance = axios.create();
    options = { ...this.getInsideConfig(), ...options } //解构
    this.interceptors(instance);
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)