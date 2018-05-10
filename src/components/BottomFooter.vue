<template>
    <div class="footer container">
        <!-- <div class="row">
            <div class="col-sm-12 c-text-center">
                <p class="copyright c-gap-bottom-zero">
          © 2009-2018 Aliyun.com 版权所有 ICP证：浙B2-20080101
        </p>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?spm=a3c00.7621338.631162.102.6d7ff3e1Unepu1&amp;recordcode=33010002000099" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;" data-spm-anchor-id="a3c00.7621338.631162.102">
          <img style="float: left; width: 20px;" src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"><span style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">北京网安备 33010002000099号</span>
        </a>
            </div>
            <accordion />   
        </div> -->
    </div>
</template>

<script>
/* eslint-disable */

export default {
    name: 'bottomFooter',
    methods: {
        say(msg) {
            console.log(msg);
            alert(msg);
        }
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            showRight: true,
            duration: 33
        }
    },
    components: {
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .footer {
        
    }
</style>
