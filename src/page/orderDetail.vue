<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader :logInfo="logInfo"></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4" class="c-gap-left-zero c-gap-inner-left-zero"><leftNav></leftNav></Col>
                <Col span="20" class="main-content c-gap-inner-left">
                    <Row class="main-content-form c-gap-inner-left">
                        <Col span="24" >
                            <h4 class="c-line-bottom c-gap-inner-bottom">订单列表</h4>
                        </Col>
                        <Col span="24">
                            <Row>
                                <Col span="8">
                                    <div>
                                        订单号：
                                        <Input v-model="form.order_id" placeholder="订单号" @input="getDataByOrder" style="width: 168px;"></Input>
                                    </div>
                                </Col>
                                <Col span="8">
                                    订单状态：
                                    <Select  class="inputSelect" @on-change="getDataByStatus" v-model="form.balance" style="width: 168px;">
                                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </Col>
                                <Col span="8">
                                        推广渠道：
                                        <Select class="inputSelect" @on-change="getDataByRoad" v-model="form.spreadRoad" style="width: 168px;">
                                        <Option v-for="item in spreadList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>
                        <Col span="24" class="c-gap-top">
                            <Row>
                                <Col span="12" >
                                    <div>
                                        日期查询：
                                        <DatePicker 
                                        :value="[form.start_time, form.end_time]" 
                                        format="yyyy/MM/dd" 
                                        type="daterange" 
                                        placement="bottom-start" 
                                        placeholder="Select date" 
                                        style="width: 250px" 
                                        @on-change="getDataByDate"></DatePicker>
                                    </div>
                                </Col>
                            </Row>    
                        </Col>
                    </Row>
                    
                    <Row class="main-content-table">
                        <tableListImg
                        :tableList="tableList" @openJdLink="openJdLink"></tableListImg>
                        <Page 
                        placement="top"
                        :current="form.pn" 
                        :total="form.total" 
                        :page-size="form.rn"
                        @on-change="changePage" 
                        @on-page-size-change="changePageRn" 
                        
                        show-sizer show-elevator show-total></Page>
                    </Row>
                </Col>
            </Row>
        </div>

        <bottomFooter></bottomFooter>  
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import topHeader from '@/components/topHeader'
import leftNav from '@/components/leftNav'
import bottomFooter from '@/components/bottomFooter'
import tableListImg from '@/components/tableListImg'
import tool from  '@/assets/js/tool.js'


export default {
    name: 'orderDetail',
    props: ['routes'],
    data () {
        return {
            tableList: {
                trList:['姓名','测试数据','测试数据'],
                tdList:[{
                    name: '测试数据',
                    num:'测试数据',
                    other:'测试数据'
                }]
            },
            allTrlist:['订单号', '下单帐号', '姓名', '下单时间', '完成时间','商品图片','状态', '订单金额', '结算佣金', '佣金比例', '京东分成','预估佣金', '代理比例'],
            itemTrlist:['订单号', '下单帐号', '姓名', '下单时间', '完成时间','状态','是否结算','订单金额', '结算佣金'],
            form: {
                order_id:'',
                balance: '',
                spreadRoad:'',
                start_time:'',
                end_time:'',
                pn:1,
                rn:10,
                total:1
            },
            defaultForm: {
                order_id:'',
                balance: '',
                spreadRoad:'',
                start_time:'',
                end_time:'',
                pn:1,
                rn:10,
                total:1
            },
            isAdmin:false,
            logInfo:{
                nick_name: '张三'
            },
            current:1,
            value2: ['2016-01-01', '2016-02-15'],
            value1: ['2016-01-01'],
            statusList: [
                {
                    value: '1',
                    label: '已结算'
                },
                {
                    value: '2',
                    label: '未结算'
                }
            ],
            spreadList: [
                {
                    value: '0',
                    label: '京东联盟'
                },
                {
                    value: '1',
                    label: '其他'
                }
            ],
            model1: '0',
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            },
            linkList:[],
            
            
        }
    },
    components: {
        topHeader, leftNav, bottomFooter, tableListImg
    },
    methods:{
        fatchData(){
            let self = this;
            let url = self.ajaxUrl + "/commission/queryCommissionOrders?";
            url += tool.jsonToUrl(self.form);
            console.log(url);
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                if(stories.code == 0) {
                    self.form.total = stories.data.total * 1;
                    self.linkList = stories.data.list;
                    self.renderTabList(stories.data.list);
                }else {
                    self.$Message.info({
                        content: '获取订单失败',
                        duration: 2
                    });
                }
                
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        getDataByOrder(dateClick){
            this.form.pn = 1;
            this.form.balance = '';
            this.form.start_time = '';
            this.form.end_time = '';

            this.form.order_id = dateClick;
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        getDataByStatus(dateClick){
            this.form.pn = 1;
            this.form.order_id = '';
            this.form.start_time = '';
            this.form.end_time = '';

            this.form.balance = dateClick;
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        getDataByRoad(dateClick){
            this.$Message.info({
                content: '暂无该选项查询',
                duration: 2
            });
        },
        getDataByDate(dateClick){
            this.form.pn = 1;
            this.form = this.defaultForm;
            this.form.start_time = dateClick[0].replace(/\//g,'');
            this.form.end_time = dateClick[1].replace(/\//g,'');
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        renderTabList(str){
            if(this.isAdmin) {
                this.tableList.trList = this.allTrlist;
            } else {
                this.tableList.trList = this.itemTrlist;
            }
            str = this.checkList(str);
            this.tableList.tdList = [];
            for(let i=0; i < str.length; i++){
                this.tableList.tdList[i] = [];
                this.tableList.tdList[i].order_id = str[i].orderId;
                this.tableList.tdList[i].user_name = str[i].user_name;
                this.tableList.tdList[i].nick_name = str[i].nick_name;
                this.tableList.tdList[i].orderTime = str[i].orderTime;
                this.tableList.tdList[i].finishTime = str[i].finishTime;
                this.tableList.tdList[i].imgUrl = str[i].imgUrl;
                this.tableList.tdList[i].balance = str[i].balance;
                this.tableList.tdList[i].cosPrice = str[i].cosPrice;
                this.tableList.tdList[i].real_commission = str[i].real_commission;
                if(this.isAdmin) {
                    this.tableList.tdList[i].commissionRate = str[i].commissionRate;
                    this.tableList.tdList[i].subSideRate = str[i].subSideRate;
                    this.tableList.tdList[i].commission = str[i].commission;
                    this.tableList.tdList[i].user_commission_rate = str[i].user_commission_rate;
                } else {
                }
                
            }
            
            this.tableList = tool.deepCopy(this.tableList);
            
        },
        openJdLink(index){
            window.open(this.linkList[index].url);
        },
        changePage(pn){
            this.form.pn = pn;
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        changePageRn(rn){
            this.form.rn = rn;
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        checkList(list){
            for(let i =0; i < list.length; i++) {
                switch(list[i].balance)
                {
                    case "1":
                    list[i].balance = '已结算';
                    break;
                    case "2":
                    list[i].balance = '未结算';
                    break;
                    default:
                    list[i].balance = '未知';
                };
            }
            return list;
            
        }
    },
    mounted(){
        this.fatchData();
        this.value2 = [tool.getDates().numStr,tool.getDates().numStr];
        this.value1 = tool.getDates().numStr;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .main-content-form {
        padding-bottom: 15px;
    }
    .inputSelect .inputSelect {
        width: 168px;
        height: 28px;
    }
</style>
