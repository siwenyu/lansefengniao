<template>
    <div class="leftNav">
        <ul :class="['list-unstyled']">
            <li v-for="(item, index) in navList" :key="index" :class="{'ul-active': item.selected,'ul-noraml': !item.selected}">
                <h4 v-show="item.isShow" class="c-gap-top c-gap-bottom"><i class="iconfont c-gap-right c-gap-inner-left-large" v-html="item.iconfont"></i></i>{{item.text}}</h4>
                <ul v-show="item.isShow" class="list-unstyled">
                    <li 
                    v-if="liItem.isShow" 
                    @click="changeLi(liItem, index, liIndex)" 
                    :key="liIndex" :class="[{'nav-active': liItem.selected}, 'c-gap-inner-left-large']" 
                    v-for="(liItem, liIndex) in item.list">
                        {{liItem.text}}
                    </li>
                </ul>   
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable */
import topHeader from './topHeader'

export default {
    name: 'leftNav',
    props:['index'],
    data() {
        return {
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            },
            navList: [{
            text: '订单查询',
            selected: true,
            isShow: false,
            iconfont: '&#xe649;',
            list: [{
                text: '订单详情',
                selected: true,
                toPath:'/orderDetail',
                isShow: false
            },{
                text: '订单图表',
                selected: false,
                toPath:'/orderChart',
                isShow: false
            },{
                text: '订单汇总',
                selected: false,
                toPath:'/orderAll',
                isShow: false
            }]},{
            text: '订单推广',
            selected: true,
            iconfont: '&#xe64a;',
            isShow: false,
            list: [{
                text: '商品推广',
                selected: false,
                toPath:'/spreadOne',
                isShow: false
            },{
                text: '推广历史',
                selected: false,
                toPath:'/spreadHistory',
                isShow: false
            }]},{
            text: '订单结算',
            selected: true,
            isShow: false,
            iconfont: '&#xe60b;',
            list: [{
                text: '结算详情',
                selected: false,
                toPath:'/balanceDetail',
                isShow: false
            },{
                text: '结算图表',
                selected: false,
                toPath:'/balanceChart',
                isShow: false
            }]},{
            text: '账户管理',
            selected: true,
            isShow: false,
            iconfont: '&#xe610;',
            list: [{
                text: '帐号列表',
                selected: false,
                toPath:'/acountList',
                isShow: false
            },{
                text: '帐号管理',
                selected: false,
                toPath:'/acountUpdate',
                isShow: false
            },{
                text: '修改密码',
                selected: false,
                toPath:'/pwdUpdate',
                isShow: false
            },{
                text: '退出登录',
                selected: false,
                toPath:'/login',
                isShow: false
            }]},
            ]
        }
    },
    components: {
        
    },
    methods: {
        changeLi(item, index, liIndex) {
            if(item.toPath == '/login') {
                this.fatchData();
            } else {
                this.$router.push(this.navList[index].list[liIndex].toPath);
            }
            
        },
        fatchData(){
            let self = this;
            let url = self.ajaxUrl + "/user/userLogout?";
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                self.$router.push('/login');
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        getInfo(){
            let self = this;
            let url = self.ajaxUrl + "/user/userInfo?";
            
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                if(stories.code == 0) {
                    if(stories.data[0].user_type == 0) {
                        self.isAdmin = true;
                    } else {
                        self.isAdmin = false;
                    }
                    self.renderNav();
                }else {
                    
                }
                
               
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        renderNav(){
            let y = 0;
            for(let i =0 , len=this.navList.length; i < len; i ++){
                let item = this.navList[i];
                if(this.isAdmin) {
                    item.isShow = true;
                } else {
                    if(i != 1) {
                        item.isShow = true;
                    }
                }
                for(let j =0 , len1=item.list.length; j < len1; j ++){
                    if(this.isAdmin) {
                        item.list[j].isShow = true;
                    } else {
                        item.list[j].isShow = true;
                        if(i == 3 && (j ==0 || j == 1)) {
                            item.list[j].isShow = false;
                        }
                    }
                }
            }
        }
    },
    mounted(){

        //解析路由 先重置，再查找
        for(let i =0 , len=this.navList.length; i < len; i ++){
            let item = this.navList[i];
            for(let j =0 , len1=item.list.length; j < len1; j ++){
                let itemJ = item.list[j];
                itemJ.selected = false;
            }
        }
        let x = 0;
        for(let i =0 , len=this.navList.length; i < len; i ++){
            let item = this.navList[i];
            for(let j =0 , len1=item.list.length; j < len1; j ++){
                if(this.$route.fullPath == item.list[j].toPath){
                    this.navList[i].list[j].selected = true;
                }
            }
        }
        // 当前登录用户权限
        this.getInfo();

        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .leftNav {
        background: #fff;
        border-radius: 3px;
    }
    .leftNav > ul {
        line-height: 30px;
        overflow: hidden;
        width: 100%;
        padding: 15px 15px 15px 0;
        padding-right: 0px;
        font-weight: 600;
    }
    .leftNav > ul > li > ul li{
        padding-left: 44px; 
        line-height: 36px;
        font-weight: 400;
    }
    .nav-active {
        background: #f3f3f3;
        border-right:3px solid #108ee9;
    }
    .leftNav > ul > li > ul li:hover {
        background: #f3f3f3;
        border-right:3px solid #108ee9;
        cursor: pointer;
    }
    
    
</style>
