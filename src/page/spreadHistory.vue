<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4"><leftNav></leftNav></Col>
                <Col span="20" class="main-content c-gap-inner-left">
                    <Row class="main-content-form c-gap-inner-left">
                        <Col span="24 c-gap-top c-gap-inner-left-large"><h4>推广历史</h4></Col>
                        <Row class="c-gap-left">
                            <Col span="24 c-gap-top c-gap-inner-left">商品名称：
                            <Input v-model="form.key_word" 
                            placeholder="商品名称" 
                            @input="getDataByKey" 
                            style="width: 168px;"></Input></Col>
                        </Row>
                        <Row class="c-gap-left">
                            <Col span="2 c-gap-top c-gap-inner-left">类目：</Col>
                            <Col span="22 c-gap-top c-gap-inner-left">暂无</Col>
                        </Row>
                        <Row class="c-gap-left-large c-gap-top">
                            <Col span="24" >
                                <div>
                                    按天查询：
                                    <DatePicker 
                                    :value="[form.start_time, form.end_time]"
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
                        
                        <!-- <Row class="c-gap-left">
                            <Col span="24 c-gap-top c-gap-inner-left">排序：
                                <Button type="primary" shape="circle" icon="arrow-down-c">发布时间</Button>
                                <Button type="primary" shape="circle" icon="arrow-down-c">预估佣金金额</Button>
                            </Col>
                        </Row> -->
                    </Row>
                    
                    <Row v-if="hasData" class="main-content-table">

                        <spreadHisTable
                        :tableList="tableList" 
                        @openJdLink="openJdLink"
                        @openModle="openModle"></spreadHisTable>

                        <!-- <Col v-for="(item, index) in list" span="8" :key="index">
                        
                            <div class="spreadItem c-gap-bottom c-gap-left c-gap-right">
                                <pre height="300px" width="100%" type="text" v-html="item.content"></pre>
                                <Button type="primary" 
                                v-clipboard:copy="item.content"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError">复制推广</Button>
                                <img :src="item.imgUrl">
                                <span class="">图片链接：{{item.imgUrl}}</span>
                            </div>
                        </Col> -->
                    
                        <Col span="24 c-gap-top-large">
                        <Page
                        placement="top" 
                        @on-change="changePage" 
                        @on-page-size-change="changePageRn" 
                        :current="form.pn" 
                        :total="form.total" 
                        :page-size="form.rn"
                        show-sizer show-elevator show-total></Page></Col>
                        
                    </Row>
                    <Row v-else class="main-content-table">
                        <Col >暂无数据</Col>
                    </Row>
                </Col>
                
            </Row>
                
        </div>
        <bottomFooter></bottomFooter>  
        <Modal
        v-model="modal1"
        title="请复制推广内容（可修改）"
        @on-ok="ok"
        @on-cancel="cancelCopy">
            <div class="spreadItem c-gap-bottom c-gap-left c-gap-right" :key="index" v-for="(item, index) in copyList">
                <textarea type="text" @input="textInput(index, item.content)" v-model="item.content" v-text="item.content"></textarea>
                <Button type="primary" 
                v-clipboard:copy="item.content"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">复制文本</Button>
                <img :src="item.contentImgUrl">
                <span>图片链接：{{item.contentImgUrl}}</span>
            </div>
        </Modal>
    </div>
    
</template>


<script>
/* eslint-disable */
import topHeader from '@/components/topHeader'
import leftNav from '@/components/leftNav'
import spreadHisTable from '@/components/spreadHisTable'
import bottomFooter from '@/components/bottomFooter'
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
            modal1:false,
            copyList:[],
            allTrlist:['领取时间', '推广内容', '图片', '推广位名称', '领取时佣金比例', '领取时推广链接'],
            hasData:false,
            isAdmin:false,
            total:0,
            form: {
                key_word:'',
                pn:1,
                rn:10,
                user_name:'',
                start_time:'',
                end_time:'',
                total:1
            },
            list:[
                {
                    content:''
                }
            ],
            content:''
        }
    },
    components: {
        topHeader, leftNav, bottomFooter, spreadHisTable
    },
    methods:{
        onCopy: function (e) {
            alert('You just copied: ' + e.text)
        },
        onError: function (e) {
            alert('Failed to copy texts')
        },
        cancelCopy (){
            this.modal1 = false;
        },
        ok(){

        },
        textInput(index, input){
            this.copyList[index].content = input;
            this.copyList = tool.deepCopy(this.copyList);
        },
        renderCopy(i){
            let self = this;
            this.copyList = [];
            this.copyList[0]= {};
            this.copyList[0].content = '';
            this.copyList[0].content += self.list[i].goods;
            this.copyList[0].content += '\n\n';
            this.copyList[0].content += '--------\n' ;
            this.copyList[0].content += '京东价：￥' + self.list[i].price + '\n';
            this.copyList[0].content += '内购价：￥' + self.list[i].discount + '\n';
            this.copyList[0].content += '领券加下单：' + self.list[i].url + '\n';
            this.copyList[0].content += '--------\n' ;
            this.copyList[0].content += '京东商城，品质无忧' ;
            this.copyList[0].contentImgUrl = self.list[i].imgUrl;
        },
        getDataByKey() {
            this.form.pn = 1;
            this.form.start_time = '';
            this.form.end_time = '';
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        getDataByDay(date){
            this.form.pn = 1;
            this.form.start_time = '';
            this.form.end_time = '';
            this.form.key_word = '';
            if(date) {
                this.form.start_time = tool.getDates(date[0]).numStr;
                this.form.end_time = tool.getDates(date[1]).numStr;
            }
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        fatchData(){
            let self = this;

            let url = self.ajaxUrl + "/commission/queryHistory?";
            url += tool.jsonToUrl(self.form);
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                if(stories.data.list.length > 0) {
                    self.form.total = stories.data.total;
                    self.list = stories.data.list;
                    self.renderTabList(stories.data.list);
                    self.hasData = true;
                }else {
                    self.hasData = false;
                }
                
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        renderTabList(str){
            this.tableList.trList = this.allTrlist;

            this.tableList.tdList = [];
            for(let i=0; i < str.length; i++){
                this.tableList.tdList[i] = [];
                this.tableList.tdList[i].time = str[i].time;
                this.tableList.tdList[i].goods = str[i].goods;
                this.tableList.tdList[i].imgUrl = str[i].imgUrl;
                this.tableList.tdList[i].pid = str[i].user_name + '--' + str[i].nick_name;
                this.tableList.tdList[i].commission_rate = str[i].commission_rate;
            }
            
            this.tableList = tool.deepCopy(this.tableList);
            
        },
        openJdLink(index){
            window.open(this.list[index].url);
        },
        openModle(index){
            this.renderCopy(index);
            this.modal1 = true;
        },
        getData(){
            this.fatchData();
        },
        jumpUrl(url){
            window.open(url);
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
    },
    mounted(){
        this.fatchData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>
