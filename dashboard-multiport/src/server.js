import axios from "axios";
import { Component } from "react";

let base = "http://139.196.28.123/API";
// http://139.196.28.123/API
// http://localhost:8080

axios.defaults.withCredentials = true; // 携带cookie
// 请求前拦截
axios.interceptors.request.use(
  config => {
    // console.log(config)
    config['url'] = base + config['url']
    return config;
  },
  err => {
    console.log("请求超时");
    return Promise.reject(err);
    
  }
);

// 返回后拦截
axios.interceptors.response.use(
  data => {
    // console.log(data)
    return data;
  },
  err => {
    console.log(err)
    console.log(err.response)
    switch(err.response.status){
      case 504||404:
        console.log("服务器被吃了 ⊙﹏⊙∥");
        break
      case 401:
        console.log("登录信息失效 ⊙﹏⊙∥");
        break
      case 500:
        console.log("服务器开小差了 ⊙﹏⊙∥");
        break
      default:
        console.log("辣鸡服务器 [○･｀Д´･ ○]");
    }
    return Promise.reject(err);
  }
);

// @RequestBody请求
const postRequestBody = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "application/json",
      // charset: "utf-8"
    }
  });
};

// @RequsetParam请求
const postRequestParam = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const get = url => {
  return axios({
    method: "get",
    url: `${base}${url}`
  });
};

const multiple = function(requsetArray, callback) {
  axios.all(requsetArray).then(axios.spread(callback));
};

Component.prototype.get = get;
Component.prototype.postRequestBody = postRequestBody;
Component.prototype.postRequestParam = postRequestParam;
Component.prototype.multiple = multiple;
