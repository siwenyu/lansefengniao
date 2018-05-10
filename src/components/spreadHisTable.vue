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
							<span v-if="itemIndex == 'imgUrl'">
								<img :src="td" width="60px" @click="openJd(index)">
							</span>
							<span v-else>{{td}}</span>
                        </td>
						<td> <Button @click="openModle(index)">获取推广内容成功</Button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    name: 'spreadHisTable',
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
            total: 1,     // 记录总条数
            display: 10,   // 每页显示条数
            current: 1,   // 当前的页数
        }
    },
    components: {
    },
    mounted(){
        console.log(this.tableList);
    },
    methods:{
        openJd(index){
            this.$emit("openJdLink", index);
		},
		openModle(index){
            this.$emit("openModle", index);
        }
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
    table thead tr td{
        font-size: 16px;
        font-weight: 800;
    }
    .tableList {
		overflow: scroll;
	}
    .tableList thead {
        background: #f3f3f3;
    }
	.tableList .row td {
		min-width: 85px;
	}
</style>