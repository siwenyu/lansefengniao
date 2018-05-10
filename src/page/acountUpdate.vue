<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4" class="c-gap-left-zero c-gap-inner-left-zero"><leftNav></leftNav></Col>
                <Col span="20" class="c-gap-inner-left main-content">
                    <Row v-if="isAdmin" class="main-content-default">
                        <Button @click="addCount" type="primary" icon="plus">添加账户</Button>
                        <Row class="c-line-top c-gap-top">
                            <Col span="12" class="col-md-offset-3">
                                <form v-show="showForm"  class="form-horizontal c-gap-top">
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
                                                required
                                                />
                                        </div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <div>
                                            姓名：
                                            <input v-model="form.nick_name"
                                                class="example-input"
                                                placeholder="姓名"
                                                required
                                                />
                                        </div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <div>
                                            状态：
                                            <select v-model="form.user_status" class="form-control">
                                                <option value=0>未开通</option>
                                                <option value=1>已开通</option>
                                                <option value=2>其他</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <div>
                                            代理比例:
                                            <input v-model="form.commission_rate"
                                                class="example-input"
                                                placeholder="代理比例"
                                                @on-change="setTime"
                                                /><span class="c-gap-left">(百分比，如50%，填50)</span>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group has-feedback">
                                        <div>
                                            最近结算:
                                            <DatePicker @on-change="setTime" v-model="toForm.account_day" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                                            <span class="c-gap-left">(最近结算日期)</span>
                                        </div>
                                    </div>
                                    
                                    <div class="form-bottons">
                                        <Button v-show="isUpdateBtn" @click="submit" style="width:20%" class="btn btn-primary">更新</Button>
                                        
                                        <Button v-show="!isUpdateBtn" @click="addCountSubmit" style="width:20%" class="btn btn-primary">添加</Button>
                                        <Button style="width:20%" class="btn btn-primary" @click="goList" >取消</Button>
                                        <Button style="width:20%" @click="deleteAcount" class="btn btn-warning c-gap-left-large"  v-show="isUpdateBtn">删除用户</Button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Row>
                    <Row v-else class="main-content-default">
                        您暂时没有权限！
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
            isAdmin:false,
            btnText:'提交',
            isUpdateBtn: true,
            defaultForm:{
                user_pwd:'',
                user_name:'',
                pid:'',
                user_status:'0',
                nick_name: '',
                commission_rate: '',
                account_day:''
            },
            form:{
                user_pwd:'',
                user_name:'',
                pid:'',
                user_status:'0',
                nick_name: '',
                commission_rate: '',
                account_day:''
            },
            showForm: false,
            toForm: {
                user_pwd:'',
                user_name:'',
                pid:'',
                user_status:'0',
                nick_name: '张三',
                commission_rate: '20%',
                account_day:''
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
        addCount(){
            self = this;
            self.form = self.defaultForm;
            self.isUpdateBtn = false;
        },
        goList(){
            this.$router.push('/acountList');
        },
        fatchData(){
            let self = this;
            let url = self.ajaxUrl + "/user/userInfo?";

            url += tool.jsonToUrl(self.$route.query);
            fetch(url,self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                if(stories.data[0]) {
                    self.showForm = true;
                    let data = stories.data[0];
                    self.form.pid = data.pid;
                    self.form.user_pwd = data.user_pwd;
                    self.form.user_name = data.user_name;
                    self.form.nick_name = data.nick_name;
                    self.form.user_status = data.user_status;
                    self.form.commission_rate = data.commission_rate;
                    self.form.account_day = data.account_day;
                    self.toForm.account_day = data.account_day;
                } else {

                }
                
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        setTime(date){
            this.form.account_day = date;
        },
        updateData(){
            let self = this;
            let url = self.ajaxUrl + "/user/userUpdate?";
            self.toForm = tool.deepCopy(self.form);
            self.toForm.account_day = tool.getDates(self.toForm.account_day).numStr;
            url += tool.jsonToUrl(self.toForm);
            
            fetch(url,self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                if(stories.code == 0) {
                    setTimeout(function(){
                        self.$router.push('/acountList');
                    });
                    self.$Message.info({
                        content: '用户' + self.form.user_name + '更新成功',
                        duration: 2
                    });
                }
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        submit(){
            this.updateData();
        },
        addCountSubmit(){
            let self = this;
            let url = self.ajaxUrl + "/user/userAdd?";
            url += tool.jsonToUrl(self.form);
            console.log(url);
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                if(stories.code == 0) {
                    self.$Message.info({
                        content: '用户' + self.form.user_name + '添加成功',
                        duration: 3
                    });
                    self.form = self.defaultForm;
                    self.form = tool.deepCopy(self.form);
                }else {
                    self.$Message.info({
                        content: stories.msg,
                        duration: 3
                    });
                }
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        deleteAcount(){
            let self = this;
            let url = 'http://47.94.10.18:8989/user/userDelete?';
            url += tool.jsonToUrl(self.$route.query);
            fetch(url,self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                if(stories.code == 0) {
                    self.$router.push('/acountList');
                }
            }).then(function(err){
                err ? console.log(err) : '';
            })
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
        margin-top: 20px;
        background: #fff;
        border-radius: 3px;
        min-height: 590px;
        padding: 15px;
    }
    .main-content-default .form-control {
        width: 168px;
    }
</style>
