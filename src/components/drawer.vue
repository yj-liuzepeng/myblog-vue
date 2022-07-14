<template>
  <el-drawer v-model="show" title="I am the title" :direction="opendrawer" size="60%" :with-header="false"
    @close='closeDrawer'>
    <div class="drawer-content">
      <Author />
      <your-info />
      <div class="drawer-btns">
        <el-button type="success" size="small" @click="jumpInteraction">申请友链</el-button>
        <el-button v-if="!loginBtn" type="primary" size="small" @click="jumpLogin">登录网站</el-button>
        <el-button v-else type="primary" size="small" @click="loginOut">退出</el-button>
      </div>
      <div class="tips" v-if="!loginBtn">提醒：登录后您可进行互动评论</div>
      <div class="tips" v-else>您好{{ userInfoData.nickname || userInfoData.username }} ，欢迎👏</div>
    </div>

  </el-drawer>
</template>

<script lang='ts' setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import Author from './author.vue'
import yourInfo from './your-info.vue'
import { useRouter } from 'vue-router'
import ElMessage from '../utils/resetMessage'
import { storeToRefs } from 'pinia'
import { useMainStore } from "../store";
const router = useRouter()
const mainStore = useMainStore();

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close', 'open-login'])

let loginBtn = ref(false)
const userInfoData = ref()
const opendrawer = ref('rtl')
const closeDrawer = () => {
  emit('close')
}
const jumpInteraction = () => {
  router.push('./interaction')
  emit('close')
}
const jumpLogin = () => {

  emit('close')
  emit('open-login')
}
const loginOut = () => {
  mainStore.clearUserInfo()
  mainStore.clearToken()
  ElMessage({
    type: 'success',
    message: '退出成功',
  })
  emit('close')
}
watch(() => props.show, (newval) => {
  if (newval) {
    loginBtn.value = false
    userInfoData.value = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
    if (userInfoData.value?.id) {
      loginBtn.value = true
    }

  }

})
</script>

<style>
.el-drawer.rtl {
  background: rgb(5, 54, 104) !important;
  line-height: 1.2;
}
</style>
<style lang="scss" scoped>
.drawer-content {
  width: 100%;
  height: 100%;

  .drawer-btns {
    width: 100%;
    margin: 10px;
    // text-align: center;
  }

  .tips {
    font-size: 12px;
    text-align: center;
    color: #ccc;
  }
}
</style>