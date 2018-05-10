<template>
    <div class="tableList">
        <div class="row">
            <table class="table col-md-12 table-bordered">
                <thead>
                    <tr>
                        <td v-for="(td, index) in tableList.trList" :key="index">
                            {{td}}
                        </td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(trItem, index) in tableList.tdList" :key="index">
                        <td><span>{{trItem.user_name}}</span></td>
                        <td><span>{{trItem.nick_name}}</span></td>
                        <td><span>{{trItem.user_pwd}}</span></td>
                        <td><span>{{trItem.commission_rate}}%</span></td>
                        <td><span>{{trItem.user_status}}</span></td>
                        <td><span>{{trItem.account_day}}</span>
                            <div v-if="trItem.accountDayDone && false" class="btn btn-primary c-gap-left" @click="changeAcount(trItem.newIndex)" v-text="lastMonth"></div>
                            <Button v-else class="c-gap-left" disabled>{{lastMonth1}}</Button>    
                        </td>
                        <td><div class="btn btn-primary" @click="manage(trItem.user_name)" v-text="manageText"></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    name: 'acountTable',
    props:['tableList'],
    methods: {
        manage(td){
            this.$emit("manageAcount", td);
        },
        changeAcount(td){
            this.$emit("changeAcountDay", index);
        }
    },
    data () {
        return {
            manageText : '管理',
            lastMonth: '上月未结算',
            lastMonth1: '上月不可结算'
        }
    },
    components: {
        
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .tableList .row{
        margin: -1px;

    }
	.tableList {
		overflow: scroll;
	}
	.tableList .row {
		overflow: scroll;
	}
</style>