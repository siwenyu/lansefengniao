<template>
    <div class="tableList">
        <div class="row">
            <table class="table col-md-12 table-bordered">
                <thead>
                    <tr>
                        <td v-for="(td, index) in tableList.trList" :key="index">
                            {{td}}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tr, index) in tableList.tdList" :key="index">
                        <td v-for="(td, itemIndex) in tr" :key="itemIndex">
                            {{td}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    name: 'tableList',
    props:['tableList'],
    methods: {
        say(msg) {
            console.log(msg);
        },
        pagechange(currentPage){
            console.log(currentPage);
            // ajax请求, 向后台发送 currentPage, 来获取对应的数据
        }
    },
    data () {
        return {
            total: 150,     // 记录总条数
            display: 10,   // 每页显示条数
            current: 1,   // 当前的页数
        }
    },
    components: {
    },
    mounted(){
        console.log(this.tableList);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
    html body .page .row {
        overflow: scroll;
    }
    .tableList .row{
        margin: -1px;

    }
    thead{
        background: #f3f3f3;
    }
    
    table thead tr td{
        font-size: 16px;
        font-weight: 800;
    }
    .tableList {
		overflow: scroll;
	}
	.tableList .row td {
		min-width: 85px;
	}
</style>