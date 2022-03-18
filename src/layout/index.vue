<template>
  <el-container>
    <my-header></my-header>
    <el-main>
      <div class="content" >
        <router-view />
      </div>
    </el-main>
    <my-footer></my-footer>
  </el-container>
</template>

<script lang='ts' setup>
import MyHeader from '../components/header.vue'
import MyFooter from '../components/footer.vue'
import {onMounted } from 'vue';
onMounted(()=> {

 

})
</script>

<style lang='scss' scoped>
.el-container {
  display: block;
}
.el-main {
  display: flex;
  justify-content: center;
  padding: 0;
  margin-top: 1%;
  .content {
    width: 73%;
  }
}
</style>