<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4" class="c-gap-left-zero c-gap-inner-left-zero"><leftNav></leftNav></Col>
                <Col span="20" class="col-md-10 main-content">
                    <Row class="main-content-default">
                        你来到了没有内容的荒原
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

export default {
    name: 'defaultMain',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
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
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            }
        }
    },
    components: {
        topHeader, leftNav, bottomFooter, tableList
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
