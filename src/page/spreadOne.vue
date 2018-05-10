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
							<Col span="2 c-gap-top-large c-gap-inner-left">原始文本:</Col>
                            <Col span="21 c-gap-top c-gap-inner-left c-gap-inner-right-large">
								<Input 
								v-model="formTextarea" 
								type="textarea" 
								:autosize="{minRows: 12,maxRows: 5}" 
								placeholder="Enter something...">
								</Input>
							</Col>
                        </Row>
                        <Row class="c-gap-left">
                            <Col span="2 c-gap-top-large c-gap-inner-left">推广位:</Col>
                            <Col span="21 c-gap-top c-gap-inner-left">
                                <Select class="inputSelect" filterable v-model="form.pid" style="width: 268px;">
                                    <Option v-for="item in pidList" :value="item.pid" :key="item.pid">{{ item.user_name }}--{{ item.nick_name }}</Option>
                                </Select>
                            </Col>
                        </Row>
						<Row class="c-gap-left-large c-gap-top-large">
                            <Col span="24">
                                <Button @click="spreadOne" type="primary">生成推广链接推广</Button>
                            </Col>
                        </Row>
                        <Row class="c-gap-top-large">
                            <Col span="12">
                                原始文本格式要求：<br>
                                <pre>抢购链接类型：

头部内容
---------
京东价：158.00
秒杀价：52.00
下单：14114614340 P25
-------
底部内容
                                </pre>
                            </Col>
                            <Col span="12">
                                原始文本格式要求：<br>
                                <pre>SKU+领券类型：

头部内容
---------
京东价：158.00
券后价：52.00
领券：https://union-click.jd.com/jdc?d=9n3VPu 
下单：1000135212 P20
-------
底部内容
                                </pre>
                            </Col>
                        </Row>
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
				<h5>帐号：{{ item.pid }}---{{item.nick_name}}</h5>
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
import topHeader from "@/components/topHeader";
import leftNav from "@/components/leftNav";
import bottomFooter from "@/components/bottomFooter";
import tool from "@/assets/js/tool.js";

export default {
  name: "defaultMain",
  data() {
    return {
      duration: 0,
      tableList: {
        trList: ["姓名", "数量", "其他"],
        tdList: [
          {
            name: "张三",
            num: "2111",
            other: "wqeqw"
          }
        ]
      },
      form: {
        pid: "all",
        textarea: ""
      },
      formTextarea: "",
      pidList: [],
      list: [],
      copyList: [],
      idList: [],
      modal1: false,
      content: "",
      contentImgUrl: ""
    };
  },
  components: {
    topHeader,
    leftNav,
    bottomFooter
  },
  methods: {
    // 编辑
    textInput(index, input) {
      this.copyList[index].content = input;
      this.copyList = tool.deepCopy(this.copyList);
    },
    // 复制文本框内容
    onCopy: function(e) {
      this.$Message.info({
        content: "推广内容复制成功",
        duration: 2
      });
    },
    // 不支持的话，提示手动
    onError: function(e) {
      this.$Message.info({
        content: "复制失败，请手动",
        duration: 2
      });
    },
    // 点击确定
    ok() {},
    // 跳转京东
    openJdLink(index) {
      window.open("http://" + index);
    },
    checkSelect(list) {
      this.idList = [];
      for (let key in list) {
        if (list[key].isSelected) {
          this.idList.push(list[key].skuId);
        }
      }
    },
    spreadOne() {
      let self = this;
      console.log(self.formTextarea);
      if (self.formTextarea) {
        let url = self.ajaxUrl + "/commission/getBatchCodeByUnionId?";
        self.form.textarea = self.formTextarea.replace(/\n|\r\n/g, "<br>");
        url += tool.jsonToUrl(self.form);
        fetch(url, self.jsonData)
          .then(function(res) {
            return res.json();
          })
          .then(function(stories) {
            if (stories.code == 0) {
              self.$Message.info({
                content: "生成推广内容成功，请复制内容，也到推广历史中查看",
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
          })
          .then(function(err) {
            err ? console.log(err) : "";
          });
      } else {
        self.$Message.info({
          content: "请输入原始文本",
          duration: 2
        });
      }
    },
    cancelCopy() {
      this.modal1 = false;
    },
    jumpUrl(url) {
      window.open(url);
    },
    renderData(list) {
      this.copyList = [];
      for (let i = 0; i < list.length; i++) {
        this.copyList[i] = {};
        if (list[i].code == 1) {
          this.copyList[i].content = "接口有误，此条数据无法获取推广链接";
        } else {
          if (list[i].type == 0) {
            this.copyList[i].content = "";
            this.copyList[i].content += list[i].info;
            this.copyList[i].content += "\n";
            this.copyList[i].content += "--------\n";
            this.copyList[i].content += "京东价：￥" + list[i].price + "\n";
            this.copyList[i].content += "内购价：￥" + list[i].disPrice + "\n";
            this.copyList[i].content += "领券+下单：" + list[i].url + "\n";
            this.copyList[i].content += "--------\n";
            list[i].foot
              ? (this.copyList[i].content += list[i].foot + "\n")
              : "";
            this.copyList[i].content += "京东商城，品质无忧";
          } else {
            this.copyList[i].content = "";
            this.copyList[i].content += list[i].info;
            this.copyList[i].content += "\n";
            this.copyList[i].content += "--------\n";
            this.copyList[i].content += "京东价：￥" + list[i].price + "\n";
            this.copyList[i].content += "内购价：￥" + list[i].disPrice + "\n";
            this.copyList[i].content += "抢购链接：" + list[i].url + "\n";
            this.copyList[i].content += "--------\n";
            list[i].foot
              ? (this.copyList[i].content += list[i].foot + "\n")
              : "";
            this.copyList[i].content += "京东商城，品质无忧";
          }

          this.copyList[i].contentImgUrl = list[i].imgUrl;
          this.copyList[i].pid = list[i].pid;
          this.copyList[i].nick_name = list[i].nick_name;
        }
      }
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
          console.log(self.pidList);
          self.pidList = tool.deepCopy(self.pidList);
        })
        .then(function(err) {
          err ? console.log(err) : "";
        });
    }
  },
  mounted() {
    this.getAllAcount();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
