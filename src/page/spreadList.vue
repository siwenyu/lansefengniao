<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4"><leftNav></leftNav></Col>
                <Col span="20" class="main-content c-gap-inner-left">
                    <Row class="main-content-form c-gap-inner-left">
                        <Col span="24 c-gap-top c-gap-inner-left-large"><h4>订单推广</h4></Col>
                        <Row class="c-gap-left">
                            <Col span="24 c-gap-top c-gap-inner-left">商品名称：<Input v-model="form.key_word" placeholder="商品名称" @input="getDataBykey" style="width: 168px;"></Input></Col>
                        </Row>
                        <Row class="c-gap-left">
                            <Col span="2 c-gap-top c-gap-inner-left">类目：</Col>
                            <Col span="22 c-gap-top c-gap-inner-left">
                                暂无
                            </Col>
                        </Row>
                        <Row class="c-gap-left">
                            <Col span="2 c-gap-top c-gap-inner-left">推广位：</Col>
                            <Col span="22 c-gap-top">
                                <Select  class="inputSelect"  v-model="form.pid" style="width: 168px;">
                                    <Option v-for="item in pidList" :value="item.pid" :key="item.pid">{{ item.user_name }}--{{ item.nick_name }}</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Row>
                    
                    <Row class="main-content-table">
                        <Col span="24 c-gap-bottom c-gap-left">
                            <Checkbox  @on-change="selectAll">全选</Checkbox> 
                            <Button @click="spreadOne()" type="primary">批量推广</Button>
                        </Col>
                        <Col v-for="(item, index) in list" span="8" :key="index">
                        
                            <div @click.prevent="openJdLink(item.materiaUrl)" class="spreadItem c-gap-bottom c-gap-left c-gap-right">
                                <div :class="['selectBtn', {'selectBtn-select': item.isSelected} ]" @click.stop="selectItem(item.skuId, index)">
                                    <Icon type="checkmark-round" ></Icon>
                                </div>
                                <Row>
                                    <img width="100%" height="100%" :src="item.imgUrl">
                                </Row>
                                <Row class="c-gap-inner-left-small c-gap-inner-right-small c-line-clamp2">
                                    {{item.skuName}}
                                </Row>
                                

                                <Row c-gap-inner-left-small c-gap-inner-right-small>
                                    原价价格：{{item.price}} |
                                    佣金比例：{{item.commissionRate}}
                                </Row>
                                <Row c-gap-inner-left-small c-gap-inner-right-small>
                                    
                                </Row>
                                <Row>
                                    <Button @click.stop="spreadOne(item.skuId, index)" type="primary" long>我要推广</Button>
                                </Row>
                            </div>
                        </Col>
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
                    

                </Col>
                
            </Row>
                
        </div>
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
        <bottomFooter></bottomFooter>  
    </div>
</template>


<script>
/* eslint-disable */
import topHeader from '@/components/topHeader'
import leftNav from '@/components/leftNav'
import bottomFooter from '@/components/bottomFooter'
import tool from  '@/assets/js/tool.js'

export default {
    name: 'defaultMain',
    data () {
        return {
            duration: 0,
            tableList: {
                trList:['姓名','数量','其他'],
                tdList:[{
                    name: '张三',
                    num:'2111',
                    other:'wqeqw'
                }]
            },
            current:1,
            total:0,
            form: {
                key_word:'',
                pn:1,
                rn:10,
                pid:'',
                total:1,
            },
            pidList:[],
            list:[],
            copyList:[],
            idList:[],
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            },
            modal1:false,
            content:'',
            contentImgUrl:'',
        }
    },
    components: {
        topHeader, leftNav, bottomFooter
    },
    methods:{
        // 编辑
        textInput(index, input){
            this.copyList[index].content = input;
            this.copyList = tool.deepCopy(this.copyList);
        },
        getDataBykey(){
            this.form.pn = 1;
            this.fatchData();
        },
        // 获取所有可推广商品
        fatchData(){
            let self = this;
            let url = self.ajaxUrl + "/commission/queryCouponGoods?";
            url += tool.jsonToUrl(self.form);
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                self.list = stories.data.list;
                self.form.total = stories.data.total;
                self.clearSelect(self.list);
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
        // 复制文本框内容
        onCopy: function (e) {
            this.$Message.info({
                content: '推广内容复制成功',
                duration: 2
            });
        },
        // 不支持的话，提示手动
        onError: function (e) {
            this.$Message.info({
                content: '复制失败，请手动',
                duration: 2
            });
        },
        // 点击确定
        ok(){

        },
        // 跳转京东
        openJdLink(index){
            window.open('http://' + index);
        },
        selectItem(id, index){
            let self = this;
            self.list[index].isSelected = !self.list[index].isSelected;
            self.list = tool.deepCopy(self.list);
            self.checkSelect(self.list);
            
        },
        selectAll(all){
            let self = this;
            for(let key in self.list) {
                if(all) {
                    self.list[key].isSelected = true;
                } else {
                    self.list[key].isSelected = false;
                }
            }
            
            self.list = tool.deepCopy(self.list);
            self.checkSelect(self.list);
        },
        clearSelect(list){
            for(let i = 0; i < list.length; i ++) {
                list[i].isSelected = false;
            }
            self.list = tool.deepCopy(self.list);
        },
        checkSelect(list){
            this.idList = [];
            for(let key in list) {
                if(list[key].isSelected) {
                    this.idList.push(list[key].skuId);
                }
            }
        },
        spreadList(idlist){
            let self = this;

            let url = self.ajaxUrl + "/commission/getCodeByUnionId?";
            url += tool.jsonToUrl({'skuIds':idlist});
            url += '&' + tool.jsonToUrl({'pid': self.form.pid});
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                if(stories.code == 0) {
                    self.$Message.info({
                        content: '生成推广内容成功，请复制内容，也到推广历史中查看',
                        duration: 2
                    });
                    self.modal1 = true;
                    self.renderData(stories.data);
                } else {
                    self.$Message.info({
                        content: stories.msg,
                        duration: 2
                    });
                }
                
            }).then(function(err){
                err ? console.log(err) : '';
            })
            
        },
        spreadOne(id, index){
            if(id) {
                let idLsit = id;
                this.spreadList(idLsit);
            } else {
                if(this.idList.length > 0) {
                    let idList = this.idList.join(",");
                    this.spreadList(idList);
                } else {
                    this.$Message.info({
                        content: '请选择要推广的商品',
                        duration: 2
                    });
                }
                
            }
            
        },
        cancelCopy (){
            this.modal1 = false;
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
        renderData(list){
            this.copyList = [];
            for (let i =0 ; i < list.length; i ++) {
                this.copyList[i]= {};
                if(list[i].code == 1) {
                    this.copyList[i].content = '接口有误，此条数据无法获取推广链接';
                }else {
                    this.copyList[i].content = '';
                    this.copyList[i].content += list[i].info;
                    this.copyList[i].content += '\n\n';
                    this.copyList[i].content += '--------\n' ;
                    this.copyList[i].content += '京东价：￥' + list[i].price + '\n';
                    this.copyList[i].content += '内购价：￥' + list[i].disPrice + '\n';
                    this.copyList[i].content += '领券加下单：' + list[i].url + '\n';
                    this.copyList[i].content += '--------\n' ;

                    this.copyList[i].contentImgUrl = list[i].imgUrl;
                }
                
            }
        },
        getAllAcount(){
            let self = this;
            let url = self.ajaxUrl + "/user/userList?";
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                self.pidList = stories.data.list;
                self.pidList = tool.deepCopy(self.pidList);
            }).then(function(err){
                err ? console.log(err) : '';
            })
        },
    },
    mounted(){
        this.fatchData();
        this.getAllAcount();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    

</style>
