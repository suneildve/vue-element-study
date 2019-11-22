// 登录接口
export function login () {
  return {
    // isOpen: false,
    url: '/login',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': {
      'token': '4344323121398'
        // 其他数据
      }
    }
  }
}