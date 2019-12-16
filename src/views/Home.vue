<template>
  <div class="page">
    <h2>Home Page</h2>
    <el-button type="primary" @click="getUser()">获取用户</el-button>
    <el-button type="primary" @click="getMuenu()">获取菜单</el-button>

  </div>
</template>

<script>
import axios from 'axios'
// import mock from '@/mock/index.js'
export default {
  name: 'Home',
  methods:{
      getUser() {
        this.$api.getUser().then((res) => {
                //Cookies.set('token', res.data.token) // 放置token到Cookie
          console.log(res.data)
          // sessionStorage.setItem('authorization',res.data.token)
          // sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
          // this.$router.push('/')  // 登录成功，跳转到主页
        }).catch(function(res) {
            console.log(res)
            alert(res);
        });
        
        // axios.get('http://localhost:3001/user',{headers: {'Authorization':sessionStorage.getItem('authorization')}})  
        // .then(function (response) {  
        //     alert(JSON.stringify(response.data));
        //     console.log(response);  
        // })  
        // .catch(function (error) {  
        //     //alert(error);
        //     console.log(error);  
        // });  
      },
      getMuenu() {
        this.$api.register().then((res) => {
                //Cookies.set('token', res.data.token) // 放置token到Cookie
          console.log(res.data)
          // sessionStorage.setItem('authorization',res.data.token)
          // sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
          // this.$router.push('/')  // 登录成功，跳转到主页
        }).catch(function(res) {
            console.log(res)
            alert(res);
        }); 
      }

  }
}
</script>