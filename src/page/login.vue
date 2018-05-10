<template>
    <div class="page">
        <!-- 头部组件 -->
        
        <div class="container login-body">
            <Row>
                <Col span="24" class="login-form-div">
                    <div class="login-form">
                        <Col span="24">
                            <div class="login-top">
                                <h3><img src="../assets/img/logo.svg" width="50px"> | 嗨购 </h3>
                            </div>
                        </Col>
                        <form @submit.prevent="submit"  class="form-horizontal">
                            <div class="form-group has-feedback">
                                <div>
                                    帐号：
                                    <input v-model="form.user_name"
                                        class="example-input"
                                        placeholder="用户名"
                                        required
                                        />
                                </div>
                            </div>
                            <div class="form-group has-feedback">
                                <div>
                                    密码：
                                    <input v-model="form.user_pwd"
                                        class="example-input"
                                        placeholder="密码"
                                        type="password" 
                                        required
                                        />
                                </div>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" checked> 记住密码
                                </label>
                            </div>
                            <div class="form-bottons">
                                <button type="submit" style="width:40%" class="btn btn-primary">登录</button>
                                <button type="reset" style="width:40%;margin-left:10%;" class="btn btn-danger">重置</button>
                            </div>
                        </form>
                    </div>
                </Col>   
                <Col span="2" >
                    
                </Col> 
            </Row>
        </div>
        <Modal
            v-model="logError"
            title="提示"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>用户名或密码错误！请您重新输入。</p>
        </Modal>
        
        <bottomFooter></bottomFooter>    
    </div>
</template>

<script>
/* eslint-disable */
import topHeader from '../components/topHeader'
import bottomFooter from '../components/bottomFooter'
import tool from  '@/assets/js/tool.js'
import sha1 from  'sha1'


export default {
    name: 'login',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            showRight: true,
            duration: 33,
            form:{
                user_pwd:'',
                user_name:''
            },
            defaultTrue:true,
            defaultFalse:false,
            logError:false,
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            }
        }
    },
    components: {
        topHeader, bottomFooter
    },
    methods:{
        submit(){
            let self = this;
            //http://47.94.10.18:8989/user/userLogin?user_name=lsfn2017&user_pwd=92462b3559d41c209397456a8eb259fb1d2d0274
            self.form.user_pwd = tool.trim(self.form.user_pwd);
            let url = self.ajaxUrl + "/user/userLogin?";
            url += tool.jsonToUrl(self.form);
            
            fetch(url,self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                if(stories.data) {
                    stories.data.is_login ? self.$router.push('/orderDetail') : self.logError = true;
                }
                
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        ok(){

        },
        cancel(){

        }
    },
    mounted(){
        
    }
}
</script>

<style>
    .page{
        height: 100%;
    }
    .page {
        background-size: 100% 100%;
    }
    .login-form-div {
        padding-left:38%;
    }
    
    .login-form {
        width: 100%;
        margin-top: 30%;
        margin-bottom: 10px;
        padding:5px 15px 25px 25px;
        width: 300px;
        border-radius: 5px;
        box-shadow: 0px 0px 11px 0px #ccc;
        background:#fff;
        
    }
    .login-form .form-horizontal .form-group {
        margin-right: 0;
        margin-left: 0;
    }
    .form-bottons {
        margin-top: 10px;
    }
    .login-body {
        min-height: 100%;
        margin-bottom: -60px;
        margin-top: -60px;
    }
    .login-form .example-input {
        width: 75%;
    }
    .login-top {
        text-align: center;
        margin-left: -10px;
    }
</style>
