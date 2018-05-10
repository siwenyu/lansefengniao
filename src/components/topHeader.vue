<template>
    <div class="head container">
        <Row>
            <Col span="12">
                <img src="../assets/img/logo.svg" width="38">
                <span class="c-gap-left-small c-gap-right-small">|</span>
                嗨购
            </Col>   
            <Col span="12" class="head-right">
                <span v-if="logInfo.pid">
                    <i class="iconfont c-gap-right c-font-small">&#xe610;</i>推广位：{{logInfo.pid}}
                    <span class="c-gap-left-small c-gap-right-small">| </span>姓名：{{logInfo.nick_name}}
                </span>
                <span v-else>
                    <i class="iconfont c-gap-right c-font-small">&#xe610;</i>未登录
                </span>
            </Col>
        </Row>
    </div>
</template>

<script>
/* eslint-disable */

import tool from  '@/assets/js/tool.js'

export default {
    name: 'topHeader',
    props:[],
    mounted(){
        this.getInfo();
    },
    data () {
        return {
            showRight: true,
            duration: 33,
            logInfo:{
                pid:'',
                nick_name:''
            }
        }
    },
    components: {
        
    },
    methods:{
        getInfo(){
            let self = this;
            let url = self.ajaxUrl + "/user/userInfo?";
            
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                if(stories.code == 0) {
                    if(stories.data[0].user_type == 0) {
                        self.logInfo.pid = stories.data[0].user_name;
                    } else {
                        self.logInfo.pid = stories.data[0].pid;
                    }
                    self.logInfo.nick_name = stories.data[0].nick_name;
                    if(stories.data[0].user_type == 0) {
                        self.$parent.isAdmin = true;
                    }
                    
                    self.logInfo = tool.deepCopy(self.logInfo);
                }else {
                     self.$router.push('/login');
                }
                
               
            }).then(function(err){
                err ? console.log(err) : '';
            })
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .head {
        height: 50px;
        background:#060c0f;
        color :#fff;
        line-height: 50px;
        font-size: 16px;
        
    }
    #app {
        height: 100%;
    }
    html, body {
        height:100%;
    }
    .head-right {
        text-align: right;
        font-size: 14px;
    }
    
</style>