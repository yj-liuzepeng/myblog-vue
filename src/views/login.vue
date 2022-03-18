<template>
  <div class="login-box" v-if="props.show">
    <div class="title">欢迎登录本网站</div>
    <div class="input">
      <div class="ipt">
        <el-input v-model="account" placeholder="请输入账号" :suffix-icon="Calendar" />
      </div>
      <div class="ipt">
        <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
      </div>
    </div>
    <div class="ways" v-show="isLogin">
      <span style="font-size: 12px;">其他登录方式：</span>
      <span class="iconfont icon-QQ-circle-fill icon" @click="loginQq"></span>
      <span class="iconfont icon-weixin-copy icon" @click="loginWx"></span>
      <span class="register" @click="toRegister">注册一个账号</span>
    </div>

    <div class="btns">
      <el-button size="small" @click="cancel" v-show="isLogin">取消</el-button>
      <el-button size="small" @click="backLogin" v-show="!isLogin">返回</el-button>
      <el-button type="primary" size="small" @click="hLogin" v-show="isLogin">登录</el-button>
      <el-button type="primary" size="small" @click="hRegister" v-show="!isLogin">注册</el-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue';
import { Calendar, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { register, login } from '../apis/user'
// import { storeToRefs } from 'pinia'
import { useMainStore } from "../store/index";
const mainStore = useMainStore();
// const { authorstyle } = storeToRefs(mainStore)

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close'])
// 账号
let account = ref('')
// 密码
let password = ref('')
const cancel = () => {
  emit('close')
}
const backLogin = () => {
  isLogin.value = true
  account.value = ''
  password.value = ''
}
const isLogin = ref(true)
const toRegister = () => {
  isLogin.value = false
  account.value = ''
  password.value = ''
}
// 注册账号
const hRegister = async() => {
  if (!account.value || !password.value) {
    ElMessage({
      message: '请输入用户名和密码',
      type: 'warning',
    })
    return
  }
  let params = {
    username: account.value,
    password: password.value,
    loginip: returnCitySN["cip"],
    logincity: returnCitySN["cname"],
  }
 await register(params).then((res: any) => {
    if (res.code == 200) {
      isLogin.value = true
      ElMessage({
        message: '注册成功！',
        type: 'success',
      })
    } else {
      ElMessage({
        message: res.msg,
        type: 'error',
      })
    }
  })
}
// 登录网站
const hLogin = async() => {
   if (!account.value || !password.value) {
    ElMessage({
      message: '请输入用户名和密码',
      type: 'warning',
    })
    return
  }
  let params = {
    username: account.value,
    password: password.value
  }
 await login(params).then((res: any) => {
    if (res.code == 200) {
      emit('close')
      mainStore.saveUserInfo(res.data.userData)
      mainStore.saveToken(res.data.token)
      ElMessage({
        message: '登录成功！',
        type: 'success',
      })
    } else {
      ElMessage({
        message: res.msg,
        type: 'error',
      })
    }
  })
}
const loginQq = () => {
  ElMessage({
    message: '功能正在开发......',
    type: 'warning',
  })
}
const loginWx = () => {
  ElMessage({
    message: '功能正在开发......',
    type: 'warning',
  })
}

watch(() => props.show, () => {
  account.value = ''
  password.value = ''
})
</script>

<style lang='scss' scoped>
.login-box {
  width: 35%;
  height: 40%;
  position: fixed;
  top: -15%;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  // border: 1px solid #ccc;
  color: #fff;
  border-radius: 10px;
  background-color: rgba(42, 31, 21, 0.8);
  animation: fullscreenOpen 1.5s forwards;
  -moz-animation: fullscreenOpen 1.5s forwards;
  /* Firefox */
  -webkit-animation: fullscreenOpen 1.5s forwards;
  /* Safari and Chrome */
  -o-animation: fullscreenOpen 1.5s forwards;
  .title {
    width: 100%;
    text-align: center;
    padding-top: 30px;
    font-size: 20px;
  }
  .input {
    width: 70%;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .ipt {
      width: 100%;
      &:nth-child(1) {
        margin-bottom: 40px;
      }
    }
  }
  .ways {
    margin-left: 15%;
    margin-bottom: 30px;
    .icon {
      margin-right: 8px;
      font-size: 20px;
      cursor: pointer;
    }
    .register {
      margin-left: 32%;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .btns {
    text-align: center;
  }
}

@keyframes fullscreenOpen {
  0% {
    transform: rotateY(180deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: rotateY(0deg) scale(1);
    opacity: 1;
  }
}
</style>