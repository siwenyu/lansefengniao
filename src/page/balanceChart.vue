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
                            <h4 class="c-line-bottom c-gap-inner-bottom">结算图表</h4>
                        </Col>
                        <Col span="24">
                            <Row>
                                <Col span="24">
                                    <div>
                                        账户查询(pid)：
										<Select class="inputSelect" filterable v-model="form.pid" @on-change="getDataByPid" @on-query-change="getDataByPid"  style="width: 268px;">
											<Option v-for="item in pidList" :value="item.pid" :key="item.pid">{{ item.user_name }}--{{ item.nick_name }}</Option>
										</Select>
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
                        <!-- <div class="echard-div c-gap-bottom-large c-gap-inner-bottom-large c-line-bottom">
                            <IEcharts :option="option"></IEcharts>
                        </div> -->
                        <div class="echard-div c-gap-bottom-large c-gap-inner-bottom-large c-line-bottom">
                            <IEcharts :option="option1"></IEcharts>
                        </div>
                        <div v-if="isAdmin" class="echard-div c-gap-bottom-large c-gap-inner-bottom-large c-line-bottom">
                            <IEcharts :option="option2"></IEcharts>
                        </div>
                        <div class="echard-div c-gap-bottom-large c-gap-inner-bottom-large c-line-bottom">
                            <IEcharts :option="option3"></IEcharts>
                        </div>
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
import echarts from 'echarts'
import IEcharts from 'vue-echarts-v3/src/full.js';

export default {
    name: 'orderAll',
    data () {
        return {
            total:0,
            value2:['',''],
            value1:'',
            mounth1:'',
            mounth2:'',
            isAdmin:false,
            user_type: '1',
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
			chartPoi: {left: '20',right: '50',bottom: '30',containLabel: true},
			charBarPoi: [//给x轴设置滚动条    
					{    
						start: 75,//默认为0    
						end: 100,    
						type: 'slider',    
						show: true,    
						xAxisIndex: [0],    
						handleSize: 0,//滑动条的 左右2个滑动条的大小    
						height: 25,//组件高度    
						left: 45, //左边的距离    
						right: 30,//右边的距离    
						bottom: 0,//右边的距离    
						showDataShadow: false,//是否显示数据阴影 默认auto    
						showDetail: false,//即拖拽时候是否显示详细数值信息 默认true    
						handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',    
						filterMode: 'filter'  
					},    
					//下面这个属性是里面拖到    
					{    
						type: 'inside',    
						show: true,    
						xAxisIndex: [0],    
						start: 0,//默认为1    
						end: 50  
					},    
			],
            option : {animation:true,
                title: {text: '订单数'},
                tooltip: {trigger: 'axis'},
                legend: {data:['订单量']},
                grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
                toolbox: {
                    feature: {saveAsImage: {},restore:{},dataView: {},dataZoom: {},magicType: {},}
                },
                xAxis: {type: 'category',boundaryGap: false,data: ['2018/11','2018/12','2018/12','2018/12','2018/12']},
                yAxis: {type: 'value'},
                series: [{
                        itemStyle:{ normal: {label : {show: true}}},
                        name:'订单数按天查询',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                        // markPoint: {
                        //     data: [{type: 'max', name: '最大值'},{type: 'min', name: '最小值'},]
                        // },
                        markLine: {data: [{type: 'average', name: '平均值'}]}
                    },
                ]
            },
            option1 : {animation:true,
                title: {text: '订单金额'},
                tooltip: {trigger: 'axis'},
                legend: {data:['订单量']},
                grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
                toolbox: {
                    feature: {saveAsImage: {},restore:{},dataView: {},dataZoom: {},magicType: {},}
                },
                xAxis: {type: 'category',boundaryGap: false,data: ['2018/11','2018/12','2018/12','2018/12','2018/12']},
                yAxis: {type: 'value'},
                series: [{
                        itemStyle:{ normal: {label : {show: true}}},
                        name:'订单数按天查询',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                        // markPoint: {
                        //     data: [{type: 'max', name: '最大值'},{type: 'min', name: '最小值'},]
                        // },
                        markLine: {data: [{type: 'average', name: '平均值'}]}
                    },
                ]
            },
            option2 : {animation:true,
                title: {text: '京东佣金'},
                tooltip: {trigger: 'axis'},
                legend: {data:['订单量']},
                grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
                toolbox: {
                    feature: {saveAsImage: {},restore:{},dataView: {},dataZoom: {},magicType: {},}
                },
                xAxis: {type: 'category',boundaryGap: false,data: ['2018/11','2018/12','2018/12','2018/12','2018/12']},
                yAxis: {type: 'value'},
                series: [{
                        itemStyle:{ normal: {label : {show: true}}},
                        name:'数量',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                        // markPoint: {
                        //     data: [{type: 'max', name: '最大值'},{type: 'min', name: '最小值'},]
                        // },
                        markLine: {data: [{type: 'average', name: '平均值'}]}
                    },
                ]
            },
            option3 : {animation:true,
                title: {text: '结算金额'},
                tooltip: {trigger: 'axis'},
                legend: {data:['量']},
                grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
                toolbox: {
                    feature: {saveAsImage: {},restore:{},dataView: {},dataZoom: {},magicType: {},}
                },
                xAxis: {type: 'category',boundaryGap: false,data: ['2018/11','2018/12','2018/12','2018/12','2018/12']},
                yAxis: {type: 'value'},
                series: [{
                        itemStyle:{ normal: {label : {show: true}}},
                        name:'数量',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                        // markPoint: {
                        //     data: [{type: 'max', name: '最大值'},{type: 'min', name: '最小值'},]
                        // },
                        markLine: {data: [{type: 'average', name: '平均值'}]}
                    },
                ]
			},
			pidList:[]
        }
    },
    components: {
    topHeader, leftNav, bottomFooter, tableList, IEcharts
    },
    methods:{
        fatchData(){
            let self = this;
            let url = self.ajaxUrl + "/commission/queryCountOrders?";
            url += tool.jsonToUrl(self.form);
            fetch(url, self.jsonData).then(function(res){
                return res.json();
            }).then(function(stories){
                console.log(stories);
                if(stories.code == 0) {
                    self.total = stories.data.total * 1;
                    self.renderChart(stories.data);
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
            this.fatchData();
        },
        getDataByDay(date){
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
            this.value2 = [];
            this.form.start_time = '';
            this.form.end_time = '';
            this.form =  tool.deepCopy(this.form);
            this.fatchData();
        },
        getDataByMounth1(date){
            this.form.degree = "1";
            this.form.start_time = date.replace('/', '');
            this.mounth1 = date;
            if(this.form.start_time && this.form.end_time && this.mounth2 && this.mounth1) {
                this.form = tool.deepCopy(this.form);
                this.fatchData();
            }
        },
        getDataByMounth2(date){
            this.form.degree = "1";
            this.form.end_time = date.replace('/', '');
            this.mounth2 = date;
            if(this.form.start_time && this.form.end_time && this.mounth2 && this.mounth1) {
                this.form = tool.deepCopy(this.form);
                this.fatchData();
            }
            
        },
        clearMounth(){
            this.value2 = ['', ''];
            this.form.start_time = '';
            this.form.end_time = '';
            this.form = tool.deepCopy(this.form);
            this.fatchData();
        },
        renderChart(data){
            this.option.xAxis.data = [];
            this.option.series[0].data = [];
            this.option1.xAxis.data = [];
            this.option1.series[0].data = [];
            this.option2.xAxis.data = [];
            this.option2.series[0].data = [];
            this.option3.xAxis.data = [];
			this.option3.series[0].data = [];
			
			this.option.dataZoom = this.charBarPoi;
			this.option.grid = this.chartPoi;

			this.option1.dataZoom = this.charBarPoi;
			this.option1.grid = this.chartPoi;

			this.option2.dataZoom = this.charBarPoi;
			this.option2.grid = this.chartPoi;
			
			this.option3.dataZoom = this.charBarPoi;
			this.option3.grid = this.chartPoi;
            for(let i = 0; i < data.list.length; i ++) {
                //订单数量
                this.option.xAxis.data.push(data.list[i].insertTime);
                this.option.series[0].data.push(Number(data.list[i].orderNum));
                
				//订单金额
				if(data.list && data.list[0] && data.list[0].show_type == 0) {
					this.option1.xAxis.data.push(data.list[i].insertTime);
				}else {
					this.option1.xAxis.data.push(data.list[i].insertMonth);
				}
                this.option1.series[0].data.push(tool.toDecimal2(data.list[i].cosPriceSum));

				//京东佣金
				if(data.list && data.list[0] && data.list[0].show_type == 0) {
					this.option2.xAxis.data.push(data.list[i].insertTime);
				}else {
					this.option2.xAxis.data.push(data.list[i].insertMonth);
				}
                this.option2.series[0].data.push(tool.toDecimal2(data.list[i].commissionSum));


				//结算金额
				if(data.list && data.list[0] && data.list[0].show_type == 0) {
					this.option3.xAxis.data.push(data.list[i].insertTime);
				}else {
					this.option3.xAxis.data.push(data.list[i].insertMonth);
				}
                this.option3.series[0].data.push(tool.toDecimal2(data.list[i].real_commission));

			}
			// 按天查询的倒序
			if(data.list && data.list[0] && data.list[0].show_type == 0) {
				this.option.xAxis.data.reverse();
				this.option.series[0].data.reverse();

				this.option1.xAxis.data.reverse();
				this.option1.series[0].data.reverse();

				this.option2.xAxis.data.reverse();
				this.option2.series[0].data.reverse();

				this.option3.xAxis.data.reverse();
				this.option3.series[0].data.reverse();
			}

            
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
            
		},
		getAllAcount() {
			let self = this;
			let url = self.ajaxUrl + "/user/userList?";
			fetch(url, self.jsonData)
				.then(function(res) {
					return res.json();
				})
				.then(function(stories) {
					self.pidList = stories.data.list;
					let allData = {
						pid: "all",
						nick_name: "全部",
						user_name: "全部"
					};
					self.pidList.unshift(allData);
					self.pidList = tool.deepCopy(self.pidList);
                    self.getNowAcount();
				})
			.then(function(err) {
				err ? console.log(err) : "";
			});
		},
		getNowAcount() {
            let self = this;
            let url = self.ajaxUrl + "/user/userInfo?";
            fetch(url, self.jsonData)
            .then(function(res) {
                return res.json();
            })
            .then(function(stories) {
                self.form.pid = stories.data[0].pid;
                console.log(1111, self.pidList);
                console.log('type:' + stories.data[0].user_type);
                if(stories.data[0].user_type == 1) {
                    self.pidList = [stories.data[0]];
                }
                self.pidList = tool.deepCopy(self.pidList);
                console.log(1111, self.pidList);
            })
            .then(function(err) {
                err ? console.log(err) : "";
            });

		}
        
    },
    mounted(){
        this.getAllAcount();
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
    .echard-div {
        height: 300px;
        width: 100%;
    }
</style>
