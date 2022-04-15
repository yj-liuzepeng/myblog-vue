<template>
  <div class="mask-layer" v-if="props.show">
    <div class="login-box">
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
        <span style="font-size: 12px;color: red;">推荐登录方式：</span>

        <img src="../assets/qqdl.png" style="cursor: pointer;height: 20px;" @click="loginQq" />
        <!-- <span class="iconfont icon-QQ-circle-fill icon" @click="loginQq"></span> -->
        <!-- <span class="iconfont icon-weixin-copy icon" @click="loginWx"></span> -->
        <span id="testqq"></span>
        <span class="register" @click="toRegister">注册一个账号</span>
      </div>

      <div class="btns">
        <el-button size="small" @click="cancel" v-show="isLogin">取消</el-button>
        <el-button size="small" @click="backLogin" v-show="!isLogin">返回</el-button>
        <el-button type="primary" size="small" @click="hLogin" v-show="isLogin">登录</el-button>
        <el-button type="primary" size="small" @click="hRegister" v-show="!isLogin">注册</el-button>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="QQ登录" width="30%" :before-close="handleClose">
      <el-input v-model="account" placeholder="请输入qq账号" :suffix-icon="Calendar" />
      <div style="height: 30px;"></div>
      <el-input v-model="password" type="password" placeholder="请输入qq密码" show-password />
      <div style="height: 30px;"></div>
      <img style="width: 150px;" src="../assets/qq.png" alt />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="loginByQq">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, watch } from 'vue';
import { Calendar} from '@element-plus/icons-vue'
import ElMessage from '../utils/resetMessage'
import { register, login } from '../apis/user'
import { useMainStore } from "../store/index";

const mainStore = useMainStore();

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
const dialogVisible = ref(false)
const loginByQq = () => {
  dialogVisible.value = false
  ElMessage({
    message: 'qq互联审批中～',
    type: 'warning',
  })
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
const hRegister = async () => {
  if (!account.value || !password.value) {
    ElMessage({
      message: '请输入用户名和密码',
      type: 'warning',
    })
    return
  }
  let params = {
    role: 'user',// 用户权限
    loginway: '账号登录',
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
const hLogin = async () => {
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
const qqLoginData = {
  appid: '102000151',
  redirecturl: 'https://www.liuzepeng.com/qq'
}
const loginQq = () => {
  window.location.href =
    "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=" +
    +qqLoginData.appid +
    "&response_type=token&scope=all&redirect_uri=" +
    qqLoginData.redirecturl

}
const loginWx = () => {
  ElMessage({
    message: '功能正在开发......',
    type: 'warning',
  })
}

watch(() => props.show, (newval) => {
  account.value = ''
  password.value = ''

  if (newval) {
    // 监听点击非登录框事件，关闭弹窗
    document.addEventListener('click', (e: any) => {
      if (e.target.className == 'mask-layer') {
        cancel()
      }
    })
    // 监听按钮ese退出，关闭弹窗
    document.addEventListener('keyup', function (e: any) {
      if (e.keyCode == 27) {
        cancel()
      }
    })
    // 监听回车事件，注册+登录
    // document.addEventListener('keyup', function (e: any) {
    //   if (e.keyCode == 13) {
    //     if (isLogin.value) {
    //       // 登录
    //       hLogin()
    //     } else {
    //       // 注册
    //       hRegister()
    //     }
    //   }
    // })
  }
})
onMounted(() => {


})
</script>

<style lang='scss' scoped>
.mask-layer {
  width: 100%;
  height: 100%;
  // 遮罩层的实现方法
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(36, 36, 36, 0.5);
  z-index: 99;
}
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