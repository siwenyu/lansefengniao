<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4" class="c-gap-left-zero c-gap-inner-left-zero"><leftNav></leftNav></Col>
                <Col span="20" class="main-content c-gap-inner-left-large">
                    <Row v-if="isAdmin" class="main-content-default c-gap-inner-left-large">
                        <Col span="24">
                            <h4 class="c-gap-bottom-large">帐号列表</h4>
                        </Col>
                        <Col span="24">
                            <acountTable
                        :tableList="tableList" @manageAcount="manage" @changeAcountDay="changeAcount"></acountTable>
                        <Page 
                        placement="top" 
                        @on-change="changePage" 
                        @on-page-size-change="changeSize" 
                        :current="form.pn" 
                        :total="form.total" 
                        :page-size="form.rn"
                        show-sizer show-elevator show-total></Page>
                        </Col>
                    </Row>
                    <Row v-else class="main-content-default c-gap-inner-left-large">
                        暂无查看权限
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
import acountTable from '@/components/acountTable'
import tool from  '@/assets/js/tool.js'

export default {
    name: 'defaultMain',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            showRight: true,
            duration: 33,
            isAdmin:false,
            tableList: {
                trList:['用户名','姓名','密码', '代理比例', '状态', '最近结算'],
                tdList:[],
                total:10
            },
            form:{
                pn:1,
                rn:10,
                total:1
            },
            total:0,
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            },
            current:1
        }
    },
    components: {
        topHeader, leftNav, bottomFooter, acountTable
    },
    methods:{
        manage(td){
            this.$router.push({
                path: '/acountUpdate', 
                name: 'acountUpdate',
                query: {
                    user_name:td,
                }
            });
        },
        changeAcount(index){
            let self = this;
            let url = self.ajaxUrl + "/user/settleAccount?" + 'user_name=' + self.tableList[index].user_name;
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                if(stories.code == 0) {
                    self.$Message.info({
                        content: '结算日期设置成功。',
                        duration: 1
                    });
                    self.tableList[index].accountDayDone = 0;
                    self.tableList = tool.deepCopy(self.tableList);
                } else {
                    self.$Message.info({
                        content: stories.msg,
                        duration: 3
                    });
                }
                
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        fatchData(){
            let self = this;
            let url = self.ajaxUrl + "/user/userList?";
            url += tool.jsonToUrl(self.form);
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                self.tableList.tdList = [];
                self.form.total = stories.data.total;
                for(let i = 0; i < stories.data.list.length; i++) {
                    let list = stories.data.list;
                    self.tableList.tdList[i] = [];
                    self.tableList.tdList[i].user_name = list[i].user_name;
                    self.tableList.tdList[i].nick_name = list[i].nick_name;
                    self.tableList.tdList[i].user_pwd = list[i].user_pwd;
                    self.tableList.tdList[i].commission_rate = list[i].commission_rate;
                    if(list[i].user_status == 1) {
                        self.tableList.tdList[i].user_status = '已开通';
                    }else {
                        self.tableList.tdList[i].user_status = '未开通';
                    }

                    self.tableList.tdList[i].accountDayDone = false;
                    self.tableList.tdList[i].nowIndex = i;
                    
                    self.tableList.tdList[i].account_day = list[i].account_day;
                }
                self.tableList = tool.deepCopy(self.tableList);
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        changePage(t){
            this.form.pn = t;
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        changeSize(t){
            this.form.rn = t;
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        }
    },
    mounted(){
        this.fatchData();
        console.log('结算相关');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .main-content-default {
        margin-top: 20px;
        background: #fff;
        border-radius: 3px;
        min-height: 590px;
        padding: 15px;
    }
</style>
