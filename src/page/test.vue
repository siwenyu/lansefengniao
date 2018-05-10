<template>
    <div class="page">
        <!-- 头部组件 -->
        <topHeader></topHeader>
        <div class="container main-body">
            <Row>
                <Col span="4" class="c-gap-left-zero c-gap-inner-left-zero"><leftNav></leftNav></Col>
                <Col span="20" class="c-gap-inner-left-large main-content">
                    <Row class="c-gap-inner-left-large main-content-default">
                        <i class="ivu-icon ivu-icon-checkmark"></i>
                        <Alert type="warning" closable>
                            Custom closing content
                            <span slot="close">No longer prompt</span>
                        </Alert>
                        <Dropdown>
                            <a href="javascript:void(0)">
                                下拉菜单
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem disabled>豆汁儿</DropdownItem>
                                <DropdownItem>冰糖葫芦</DropdownItem>
                                <DropdownItem divided>北京烤鸭</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                        <Select v-model="model1" style="width:200px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>

                        <Row>
                            <Tree :data="data4" :current="current" show-checkbox multiple></Tree>
                        </Row>

                    <Page :current="current"  :total="40" size="small" show-total show-elevator show-sizer></Page>


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

export default {
    name: 'test',
    data () {
        return {
            showRight: true,
            duration: 33,
            cityList: [
                {
                    value: '0',
                    label: '这是'
                },
                {
                    value: '1',
                    label: '那是'
                }
            ],
            jsonData:{
                credentials: 'include',
                dataType: 'JSONP'
            },
            current: 4,
            model1: '0',
            data4: [
                {
                    title: 'parent 1',
                    expand: true,
                    selected: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1',
                                    checked: true
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    components: {
        topHeader, leftNav, bottomFooter
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>
