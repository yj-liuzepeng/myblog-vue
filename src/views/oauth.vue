<template>
  <div class="oauth-background">
    <div id="preloader_1">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { qqLogin } from '../apis/user'
import ElMessage from '../utils/resetMessage'
import { useMainStore } from "../store/index";
const mainStore = useMainStore();
const router = useRouter()
onMounted(() => {
  if (QC.Login.check()) {
    QC.Login.getMe(function (openId, accessToken) {
      qqLogin({
        accessToken,
        openId,
        role: 'user',
        loginip: returnCitySN["cip"],
        logincity: returnCitySN["cname"],
      }).then((res: any) => {
        if (res.code == 200) {
          router.push('/home')
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          mainStore.saveUserInfo(res.data.userData)
          mainStore.saveToken(res.data.token)
        
        }
      })
    })
  }
})
</script>

<style lang='scss' scoped>
</style>