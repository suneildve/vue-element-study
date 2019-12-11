<template>
  <div class="page">
    <h2>Home Page</h2>
    <!-- <el-button type="primary" @click="getUser()">获取用户</el-button>
    <el-button type="primary" @click="getMuenu()">获取菜单</el-button> -->

  </div>
</template>

<script>
import axios from 'axios'
import mock from '@/mock/index.js'
export default {
  name: 'Home',
  methods:{
      // getUser() {
      //   axios.get('/user')  
      //   .then(function (response) {  
      //       alert(JSON.stringify(response.data));
      //       console.log(response);  
      //   })  
      //   .catch(function (error) {  
      //       //alert(error);
      //       console.log(error);  
      //   });  
      // },
      // getMuenu() {
      //   axios.get('/menu')  
      //   .then(function (response) {  
      //       alert(JSON.stringify(response.data));
      //       console.log(response);  
      //   })  
      //   .catch(function (error) {  
      //       //alert(error);
      //       console.log(error);  
      //   });  
      // }

  }
}
</script>