import axios from 'axios';
import config from './config';
import Cookies from "js-cookie";
import router from '@/router'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function (data) {}]
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        //let token = Cookies.get('token')
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        console.log('准备发送请求...')
        // config.withCredentials = true 
        // let token = sessionStorage.getItem('access_token')
        let token = sessionStorage.getItem('authorization')
        // 2. 带上token
        if (token) {
          // config.headers.accessToken = token;
          // config.headers['Authorization'] = token;   
          instance.defaults.headers.common['Authorization'] = token;  
          instance.defaults.headers.common['token'] = token;  
          // config.headers.common['Authorization'] = token;      
        } else {
          // 重定向到登录页面
          //router.push('/login')
        }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {
          // if (config.data.__proto__ === FormData.prototype
          //   || config.url.endsWith('path')
          //   || config.url.endsWith('mark')
          //   || config.url.endsWith('patchs')
          // ) {
          // } else {
          //   config.data = qs.stringify(config.data)
          // }
        }
      //   if (config.method.toLocaleLowerCase() === 'post'
      //    || config.method.toLocaleLowerCase() === 'put'
      //    || config.method.toLocaleLowerCase() === 'delete') {
  
      //    config.data = JSON.stringify(config.data)
      //    console.log(config)
      //  }


        // console.log(config);
        // console.log(instance.defaults.headers);
        
        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          response.data = JSON.parse(response.request.responseText)
        }
        //  else {
        //   data = response.data
        // }

        // 根据返回的code值来做不同的处理
        switch (response.data.rc) {
          case 1:
            console.log(response.data.desc)
            break;
          case 0:
            store.commit('changeState')
            // console.log('登录成功')
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err

        return response
      },
      error => {

        if (error && error.response) {
          switch (error.response.status) {
              case 400: error.message = '请求错误(400)' ; break;
              case 401: error.message = '未授权，请重新登录(401)'; break;
              case 403: error.message = '拒绝访问(403)'; break;
              case 404: error.message = '请求出错(404)'; break;
              case 408: error.message = '请求超时(408)'; break;
              case 500: error.message = '服务器错误(500)'; break;
              case 501: error.message = '服务未实现(501)'; break;
              case 502: error.message = '网络错误(502)'; break;
              case 503: error.message = '服务不可用(503)'; break;
              case 504: error.message = '网络超时(504)'; break;
              case 505: error.message = 'HTTP版本不受支持(505)'; break;
              default: error.message = `连接出错(${error.response.status})!`;
          }
        }else{
            err.message = '连接服务器失败!'
        }

      

        if (error && err.response) {
          switch (error.response.status) {
            case 400:
              error.message = '请求错误'
              break
            case 401:
              error.message = '未授权，请登录'
              break
            case 403:
              error.message = '拒绝访问'
              break
            case 404:
              error.message = `请求地址出错: ${error.response.config.url}`
              break
            case 408:
              error.message = '请求超时'
              break
            case 500:
              error.message = '服务器内部错误'
              break
            case 501:
              error.message = '服务未实现'
              break
            case 502:
              error.message = '网关错误'
              break
            case 503:
              error.message = '服务不可用'
              break
            case 504:
              error.message = '网关超时'
              break
            case 505:
              error.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        console.error(error)
        return Promise.reject(error) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}