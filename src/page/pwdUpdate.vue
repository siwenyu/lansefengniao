<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4" class="c-gap-left-zero"><leftNav></leftNav></Col>
                <Col span="20" class="main-content c-gap-inner-left">
                    <Row class="main-content-default c-gap-inner-left">
                        <h4 class="c-gap-inner-bottom">修改密码</h4>
                        <Row class="c-line-top c-gap-top">
                            <Col span="12" class="c-gap-top-large col-md-offset-3 c-gap-left-inner-large">
                                <form @submit.prevent="submit" class="c-gap-top">
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
                                            旧密码：
                                            <input v-model="form.old_pwd"
                                                class="example-input"
                                                placeholder="密码"
                                                required
                                                />
                                        </div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <div>
                                            新密码：
                                            <input v-model="form.new_pwd"
                                                class="example-input"
                                                placeholder="密码"
                                                required
                                                />
                                        </div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <div>
                                            重复密码：
                                            <input v-model="form.re_new_pwd"
                                                class="example-input"
                                                placeholder="密码"
                                                required
                                                />
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="form-bottons">
                                        <button type="submit" style="width:20%" class="btn btn-primary" v-text="btnText"></button>
                                        <button style="width:20%" class="btn btn-primary" @click="goList" v-show="btnCancle">取消</button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Row>
                </Col>

            </Row>
        </div>

        <bottomFooter></bottomFooter>  
    </div>
</template>


<script>
/* eslint-disable */
import topHeader from '@/components/topHeader'
import leftNav from '@/components/leftNav'
import bottomFooter from '@/components/bottomFooter'
import tableList from '@/components/tableList'
import tool from  '@/assets/js/tool.js'

export default {
    name: 'defaultMain',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            showRight: true,
            duration: 33,
            tableList: {
                trList:['姓名','数量','其他'],
                tdList:[{
                    name: '张三',
                    num:'2111',
                    other:'wqeqw'
                }]
            },
            btnCancle :false,
            btnText:'提交',
            form:{
                user_pwd:'',
                user_name:'',
                pid:'',
                user_status:'0',
                nick_name: '',
                commission_rate: '',
                account_day:''
            },
            toForm: {
                user_name:'',
                old_pwd:'',
                new_pwd:'',
                re_new_pwd:''
            },
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            }
        }
    },
    components: {
        topHeader, leftNav, bottomFooter, tableList
    },
    methods: {
        goList(){
            this.$router.push('/acountList');
        },
        fatchData(){
            let self = this;
            let url = self.ajaxUrl + "/user/userInfo?";
            url += tool.jsonToUrl(self.$route.query);
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                let data = stories.data[0];
                self.form.old_pwd = data.user_pwd;
                self.form.user_name = data.user_name;
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        updateData(){
            if(this.form.re_new_pwd == this.form.new_pwd) {
                let self = this;
                this.toForm.old_pwd = self.form.old_pwd;
                this.toForm.new_pwd = self.form.new_pwd;
                let url = self.ajaxUrl + "/user/changePwd?";
                url += tool.jsonToUrl(self.toForm);
                fetch(url, self.jsonData).then(function(res){
                    return res.json();
                }).then(function(stories){
                    console.log(stories);
                    if(stories.code == 0) {
                        self.$Message.info({
                            content: '恭喜你，密码修改成功！请重新登录！',
                            duration: 3
                        });
                        self.$router.push('/login');
                    }else {
                        self.$Message.info({
                            content: '很抱歉，密码修改失败！',
                            duration: 3
                        });
                    }
                    
                }).then(function(err){
                    err ? console.log(err) : '';
                })
            }else {
                self.$Message.info({
                    content: '很抱歉，两次新密码不一致',
                    duration: 3
                });
            }
            
        },
        submit(){
            this.updateData();
        }
    },
    mounted(){
        this.fatchData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-content-default {
        background: #fff;
        border-radius: 3px;
        min-height: 590px;
        padding: 15px;
    }
    .main-content-default .form-control {
        width: 168px;
    }
</style>
