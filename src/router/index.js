/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import rootData from  '../config'

import Promise from "promise-polyfill";



// 路由
import login from '@/page/login'
import orderDetail from '@/page/orderDetail'
import defaultMain from '@/page/defaultMain'
import orderChart from '@/page/orderChart'
import acountList from '@/page/acountList'
import acountUpdate from '@/page/acountUpdate'
import balanceChart from '@/page/balanceChart'
import balanceDetail from '@/page/balanceDetail'
import orderAll from '@/page/orderAll'
import pwdUpdate from '@/page/pwdUpdate'
import spreadHistory from '@/page/spreadHistory'
import spreadList from '@/page/spreadList'
import spreadOne from '@/page/spreadOne'
import test from '@/page/test'

import VueClipboard from 'vue-clipboard2'

Vue.use(Router)

Vue.use(rootData);


Vue.use(VueClipboard);

export default new Router({
    routes: [
        {
            path: '/',
            // 记下来
            redirect: {
                name: 'orderDetail'
            },
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: orderDetail,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/orderChart',
            name: 'orderChart',
            component: orderChart,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/acountUpdate',
            name: 'acountUpdate',
            component: acountUpdate,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/acountList',
            name: 'acountList',
            component: acountList,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/balanceChart',
            name: 'balanceChart',
            component: balanceChart,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/balanceDetail',
            name: 'balanceDetail',
            component: balanceDetail,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/orderAll',
            name: 'orderAll',
            component: orderAll,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/pwdUpdate',
            name: 'pwdUpdate',
            component: pwdUpdate,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/spreadHistory',
            name: 'spreadHistory',
            component: spreadHistory,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/spreadList',
            name: 'spreadList',
            component: spreadList,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/spreadOne',
            name: 'spreadOne',
            component: spreadOne,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/test',
            name: 'test',
            component: test,
            meta:{
                title:'蓝色蜂鸟' 
            }
        },
        {
            path: '/defaultMain',
            name: 'defaultMain',
            component: defaultMain,
            meta:{
                title:'蓝色蜂鸟' 
            }
        }
    ]
})
