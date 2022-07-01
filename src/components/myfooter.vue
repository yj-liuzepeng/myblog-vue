<!--
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: file content
-->
<template>
  <el-row>
    <div class="footer">
      <div>本网站由Vue3+Node+Element-plus联合驱动</div>
      <div>
        <el-tag class="tag-item" type="danger">对象存储kodo</el-tag>
        <span class="beian">京ICP备2021039823号-1</span>
        <el-tag class="tag-item">腾讯云</el-tag>
      </div>
      <div>
        本站已经苟且偷生
        <span style="color: #6be9b0;font-size: 12px;">{{ showTime }}</span>
      </div>
      <div>Liuzepeng's blog</div>
    </div>
  </el-row>
</template>

<script lang='ts' setup>
import {ref, onMounted, onUnmounted } from 'vue';
let startDate = new Date('2021/11/24 18:00')
let s1 = startDate.getTime()
let timer, s2, total, day, afterDay, hour, afterHour, min, afterMin
let showTime = ref('')
const lifeTime = () => {
  timer = setInterval(() => {
    s2 = Date.now()
    total = (s2 - s1) / 1000
    day = parseInt(String(total / (24 * 60 * 60)))//计算整数天数
    afterDay = total - day * 24 * 60 * 60//取得算出天数后剩余的秒数
    hour = parseInt(String(afterDay / (60 * 60)))//计算整数小时数
    afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60//取得算出小时数后剩余的秒数
    min = parseInt(String(afterHour / 60))//计算整数分
    afterMin = parseInt(String(total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60))//取得算出分后剩余的秒数
    showTime.value = day + '天' + hour + '小时' + min + '分钟' + afterMin + '秒'
  }, 1000)
  
}
onMounted(() => {
  lifeTime()
})
onUnmounted(() => {
  if (timer != null) { //对定时器进行销毁
    clearInterval(timer);
  }
})

</script>

<style lang='scss' scoped>
.footer {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  color: #949393;
  font-size: 14px;
  .beian {
    margin: 0 10px;
    color: rgb(63, 63, 206);
  }
}
</style>