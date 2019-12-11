<template>
    <div class="login-container">
        <el-form :model="loginForm" :rules="rules"
         status-icon
         ref="ruleForm" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="loginForm.username" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                        v-model="loginForm.password" 
                        auto-complete="off" 
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
            <el-checkbox 
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:48%;" @click="login" :loading="logining">登录</el-button>
                <el-button type="primary" style="width:48%;" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import Cookies from "js-cookie";
export default {
    name: 'Login',
    data(){
        return {
            logining: false,
            loginForm: {
                username: 'admin',
                password: '1234556',
            },
            rules: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        login() {
            let userInfo = {username:this.loginForm.username, password:this.loginForm.password}
            this.$api.login(JSON.stringify(userInfo)).then((res) => {
                //Cookies.set('token', res.data.token) // 放置token到Cookie
                console.log(res.data)
                sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
                this.$router.push('/')  // 登录成功，跳转到主页
            }).catch(function(res) {
                console.log(res)
                alert(res);
            });
    //         this.$api.login().then(function(res) {
    //             // console.log(res)
    //             let data = JSON.stringify(res.data)
    // 　　　      alert(res.data.data.token)
    //             // Cookies.set('token', res.data.token) // 放置token到Cookie 
    //             // router.push('/')  // 登录成功，跳转到主页
    //         }).catch(function(res) {
    //             alert(res);
    //         });
          
        },
        reset() {
            this.$refs.loginForm.resetFields();
        }
    }

};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
     -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>