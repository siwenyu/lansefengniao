<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4" class="c-gap-left-zero c-gap-inner-left-zero"><leftNav></leftNav></Col>
                <Col span="20" class="c-gap-inner-left-large main-content">
                    <Row class="main-content-form c-gap-inner-bottom-large c-gap-inner-left-large">
                        <Col span="24" >
                            <h4 class="c-line-bottom c-gap-inner-bottom">结算详情</h4>
                        </Col>
                        <Col span="24">
                            <Row>
                                <Col span="24">
                                    <div>
                                        账户查询(pid)：
                                        <Input v-model="form.pid" placeholder="用户名" @input="getDataByPid" style="width: 168px;"></Input>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span="24" class="c-gap-top">
                            <Row>
                                <Col span="12" >
                                    <div>
                                        按天查询：
                                        <DatePicker 
                                        :value="value2" 
                                        format="yyyy/MM/dd" 
                                        type="daterange" 
                                        placement="bottom-start" 
                                        placeholder="Select date" 
                                        style="width: 250px" 
                                        @on-change="getDataByDay" 
                                        ></DatePicker>
                                    </div>
                                </Col>
                            </Row>    
                        </Col>
                        <Col span="24" class="c-gap-top">
                            <Row>
                                <Col span="24" >
                                    <div>
                                        按月查询：
                                        <DatePicker 
                                        :value="mounth1" 
                                        format="yyyy/MM" 
                                        type="month" 
                                        placement="bottom-start" 
                                        placeholder="Select date" 
                                        style="width: 200px" 
                                        @on-change="getDataByMounth1" 
                                        ></DatePicker> -- <DatePicker 
                                        :value="mounth2" 
                                        format="yyyy/MM" 
                                        type="month" 
                                        placement="bottom-start" 
                                        placeholder="Select date" 
                                        style="width: 200px" 
                                        @on-change="getDataByMounth2" 
                                        ></DatePicker>
                                    </div>
                                </Col>
                            </Row>    
                        </Col>
                    </Row>
                    
                    <Row class="main-content-table">
                        <tableList
                        :tableList="tableList"></tableList>

                        <Page 
                        placement="top"
                        @on-change="changePage" 
                        @on-page-size-change="changePageRn" 
                        :total="form.total" 
                        :current="form.pn"
                        :page-size="form.rn"
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
import topHeader from '@/components/topHeader'
import leftNav from '@/components/leftNav'
import bottomFooter from '@/components/bottomFooter'
import tableList from '@/components/tableList'
import tool from  '@/assets/js/tool.js'

export default {
    name: 'orderAll',
    data () {
        return {
            showRight: true,
            duration: 33,
            allTrlist:['账户','姓名','时间','订单量','订单金额','结算佣金','是否结算','预估佣金','代理比例'],
            itemTrlist:['账户','姓名','时间','订单量','订单金额','结算佣金','是否结算'],
            tableList: {
                trList:[],
                tdList:[{
                    user_name: '',
                    nick_name:'',
                    insertTime:'',
                    orderNum:'',
                    cosPriceSum:'',
                    commissionSum:'',
                    commission_rate:'',
                    commission_rate_after:'',
                    rn:10,
                    pn:1,
                    total:1
                }]
            },
            isAdmin:false,
            total:1,
            value2:['',''],
            value1:'',
            mounth1:'',
            mounth2:'',
            form:{
                start_time:'',
                end_time:'',
                pid:'',
                degree:'0'
            },
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            },
        }
    },
    components: {
    topHeader, leftNav, bottomFooter, tableList
    },
    methods:{
        fatchData(){
            let self = this;
            let url = self.ajaxUrl + "/commission/queryCountOrders?";
            url += tool.jsonToUrl(self.form);
            console.log(url);
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                if(stories.code == 0) {
                    self.form.total = stories.data.total * 1;
                    self.renderTabList(stories.data.list);
                }else {
                    self.$Message.info({
                        content: '查询失败',
                        duration: 2
                    });
                }
                
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        getDataByPid(){
            this.form.pn = 1;
            this.fatchData();
        },
        getDataByDay(date){
            this.form.pn = 1;
            this.value1 = '';
            this.form.degree = "0";
            this.form.start_time = '';
            this.form.end_time = '';
            this.mounth2 = '';
            this.mounth1 = '';
            if(date) {
                this.form.start_time = tool.getDates(date[0]).numStr;
                this.form.end_time = tool.getDates(date[1]).numStr;
            }
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        clearDay(){
            this.form.pn = 1;
            this.value2 = [];
            this.form.start_time = '';
            this.form.end_time = '';
            this.form =  tool.deepCopy(this.form);
            this.fatchData();
        },
        getDataByMounth1(date){
            this.form.pn = 1;
            this.form.degree = "1";
            this.form.start_time = date.replace('/', '');
            this.mounth1 = date;
            if(this.form.start_time && this.form.end_time && this.mounth2 && this.mounth1) {
                this.form = tool.deepCopy(this.form);
                this.fatchData();
            }
        },
        getDataByMounth2(date){
            this.form.pn = 1;
            this.form.degree = "1";
            this.form.end_time = date.replace('/', '');
            this.mounth2 = date;
            if(this.form.start_time && this.form.end_time && this.mounth2 && this.mounth1) {
                this.form = tool.deepCopy(this.form);
                this.fatchData();
            }
            
        },
        clearMounth(){
            this.form.pn = 1;
            this.value2 = ['', ''];
            this.form.start_time = '';
            this.form.end_time = '';
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        renderTabList(str){
            if(this.isAdmin){
                this.tableList.trList = this.allTrlist;
            } else {
                this.tableList.trList = this.itemTrlist;
            }
            
            str = this.checkList(str);
            this.tableList.tdList = [];
            for(let i=0; i < str.length; i++){
                this.tableList.tdList[i] = [];
                this.tableList.tdList[i].user_name = str[i].user_name;
                this.tableList.tdList[i].mick_name = str[i].nick_name;
                str[i].show_type == 1 ? this.tableList.tdList[i].insertTime = str[i].insertMonth : this.tableList.tdList[i].insertTime = str[i].insertTime;
                this.tableList.tdList[i].orderNum = str[i].orderNum;
                this.tableList.tdList[i].cosPriceSum = tool.toDecimal2(str[i].cosPriceSum);
                this.tableList.tdList[i].real_commission = tool.toDecimal2(str[i].real_commission);
                this.tableList.tdList[i].status =  ((str[i].status == 1) ? '已结算' : '未结算');
                if(this.isAdmin){
                    this.tableList.tdList[i].commissionSum = tool.toDecimal2(str[i].commissionSum);
                    this.tableList.tdList[i].commission_rate = str[i].user_commission_rate;
                } else {
                }
                
            }
            
            this.tableList = tool.deepCopy(this.tableList);
            
        },
        changePage(data){
            this.form.pn = data;
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        changePageRn(data){
            this.form.rn = data;
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
