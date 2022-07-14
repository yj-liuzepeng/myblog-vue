<template>
  <el-header id="scrolldisplay" :style="{'background-color':headerstyle.bgc}">
    <div class="header">
      <el-row :gutter="20">
        <el-col :xs="3" :sm="0">
          <div class="phone-drawer">
            <span
              :class="['iconfont', { 'icon-cebianshouqi': drawer == false }, { 'icon-cebianshouqi1': drawer == true }]"
              @click="drawer = true"></span>
          </div>
        </el-col>
        <el-col :xs="16" :sm="10">
          <span class="header-logo" @click="hClickLogo">Liuzepeng</span>
          <span class="header-slogan">{{ headerState.slogan }}</span>
        </el-col>
        <el-col :xs="0" :sm="14">
          <el-menu :default-active="headerState.activeIndex" class="el-menu-demo" mode="horizontal"
            :background-color="headerstyle.bgc" :text-color="headerstyle.textcolor"
            :active-text-color="headerstyle.activetextcolor">
            <el-menu-item class="tab" v-for="item in headerState.menuList" :key="item.code" :index="item.code"
              @click="headerState.changeTab(item)">
              <span :class="['tab-icon', 'iconfont', item.icon]"></span>
              {{ item.name.length > 15 ? (item.name.substring(0, 8) + '...') : item.name }}
              <span v-if="item.code == 'out'">
                <span v-if="userInfoData?.avator">
                  <el-avatar style="margin-left: 8px; vertical-align: middle" :size="30" :src="userInfoData.avator">
                  </el-avatar>
                </span>
                <span v-else>
                  <el-avatar style="margin-left: 8px; vertical-align: middle" :size="30">
                    {{ item.name.substring(5, 8) || item.name || 'user' }}
                  </el-avatar>
                </span>
              </span>

            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :xs="3" :sm="0">
          <div class="phone-dropdowm" @click="openDropdown">
            <el-dropdown >
              <span class="el-dropdown-link">
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in headerState.menuList" :key="item.code" :index="item.code"
                    @click="headerState.changeTab(item)">
                    <span :class="['tab-icon', 'iconfont', item.icon]"></span>
                    {{ item.name.length > 15 ? (item.name.substring(0, 8) + '...') : item.name }}
                    <span v-if="item.code == 'out'">
                      <span v-if="userInfoData?.avator">
                        <el-avatar style="margin-left: 8px; vertical-align: middle" :size="30"
                          :src="userInfoData.avator">
                        </el-avatar>
                      </span>
                      <span v-else>
                        <el-avatar style="margin-left: 8px; vertical-align: middle" :size="30">
                          {{ item.name.substring(5, 8) || item.name || 'user' }}
                        </el-avatar>
                      </span>
                    </span>
                  </el-dropdown-item>

                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
      <drawer-box :show="drawer" @close="drawer = false" @open-login="showLogin = true"></drawer-box>
    </div>

  </el-header>
  <login :show="showLogin" @close="showLogin = false"></login>

</template>

<script lang='ts' setup>
import { ref, reactive, onBeforeMount, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useMainStore } from "../store";
import { ElMessageBox } from 'element-plus'
import ElMessage from '../utils/resetMessage'
import Login from '../views/login.vue'
import DrawerBox from './drawer.vue'
import { ArrowDown } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
// 移动端抽屉
const drawer = ref(false)

// header皮肤
const mainStore = useMainStore();
const { headerstyle, userInfo } = storeToRefs(mainStore)

let showLogin = ref(false)
const headerState = reactive({
  menuList: [
    { name: '首页', code: 'home', icon: 'icon-shouye', path: './home', slogan: '唯有热爱，可抵岁月漫长' },
    { name: '实战', code: 'work', icon: 'icon-gongzuotai', path: './work', slogan: '不要为平庸找借口！' },
    { name: '记录', code: 'record', icon: 'icon-bijijilu', path: './record', slogan: '多总结，多归纳，多学习' },
    // { name: '工具', code: 'life', icon: 'icon-xiaolian2', path: './life', slogan: '热爱生活，积极向上每一天' },
    { name: '互动', code: 'interaction', icon: 'icon-hudong', path: './interaction', slogan: '我爱你中国 🇨🇳🇨🇳🇨🇳' },
    { name: '关于', code: 'about', icon: 'icon-guanyuwo', path: './about', slogan: '保持清醒，保持自律' },
    { name: '登录', code: 'login', icon: 'icon-denglu', path: './login', slogan: '不要为平庸找借口！' }
  ],

  slogan: '唯有热爱，可抵岁月漫长',
  activeIndex: '',
  changeTab: (item) => {
    if (item.code == 'login') {
      showLogin.value = true
      return
    }
    if (item.code == 'out') {
      ElMessageBox.confirm(
        '确定退出吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          buttonSize: 'small',
        }
      )
        .then(() => {
          mainStore.clearUserInfo()
          mainStore.clearToken()
          let loginMsg = headerState.menuList[headerState.menuList.length - 1]
          loginMsg.name = '登录'
          loginMsg.code = 'login'
          loginMsg.icon = 'icon-denglu'
          ElMessage({
            type: 'success',
            message: '退出成功',
          })
        })
        .catch(() => {

        })

      return
    }
    router.push(item.path)
    document.title = item.name + ' | Liuzepeng的个人博客'
    headerState.slogan = item.slogan
  }
})
// 页面滚动菜单栏显隐
const scrollBody = () => {
  let scrollheight = 0
  // 监听滚动
  window.onscroll = function () {
    // 页面实际滚动距离t
    let t = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollup = document.getElementById('scrolldisplay');
    if (t >= 300) {
      if (t - scrollheight < 0) {
        scrollup.style.marginTop = '0'
        scrollheight = t
      } else {
        scrollup.style.marginTop = '-3.2rem'
        scrollheight = t
      }
    } else {
      scrollup.style.marginTop = '0'
      scrollheight = t
    }
  }
}
const openDropdown = () => {
  let localUserInfo = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
  if (!!localUserInfo) {
    let loginMsg = headerState.menuList[headerState.menuList.length - 1]
    loginMsg.name = '退出  [' + localUserInfo.username + ']'
    loginMsg.code = 'out'
    loginMsg.icon = 'icon-tuichu'
  } else {
    let loginMsg = headerState.menuList[headerState.menuList.length - 1]
    loginMsg.name = '登录'
    loginMsg.code = 'login'
    loginMsg.icon = 'icon-denglu'
  }
}
// 点击logo
const hClickLogo = () => {
  router.push('./home')
  headerState.activeIndex = 'home'
  // headerState.changeTab({ name: '首页', code: 'home', icon: 'icon-shouye', path: './home', slogan: '唯有热爱，可抵岁月漫长' })
}
const userInfoData = ref()
onBeforeMount(() => {
  scrollBody()

  let localUserInfo = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
  if (!!localUserInfo) {
    let loginMsg = headerState.menuList[headerState.menuList.length - 1]
    loginMsg.name = '退出 ' + localUserInfo.username 
    loginMsg.code = 'out'
    loginMsg.icon = 'icon-tuichu'
  }

})
watch(() => userInfo.value, (newval) => {
  if (newval && newval.username) {
    userInfoData.value = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
    let loginMsg = headerState.menuList[headerState.menuList.length - 1]
    loginMsg.name = '退出 ' + newval.username
    loginMsg.code = 'out'
    loginMsg.icon = 'icon-tuichu'
  }

})
watch(() => route.name, (newval) => {
  headerState.activeIndex = newval as string
})
onMounted(() => {
  headerState.activeIndex = route.name as string
  userInfoData.value = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
})
</script>

<style lang='scss' scoped>
.el-header {
  display: flex;
  justify-content: center;
  // background-color: v-bind("headerstyle.bgc");
  opacity: 0.9;
  padding: 0;
  color: #fff;
  line-height: 3.2rem;
  height: 3.2rem;
  // 滚动收起菜单栏
  overflow: hidden;
  transition: all ease-out 0.3s;
  /* 解决ant固钉报错 */
  z-index: 10 !important;
  position: fixed;
  width: 100%;
  top: 0;

  .header {
    width: 73%;

    .header-logo {
      display: inline-block;
      cursor: pointer;
      color: #fff;
      font-size: 1.4rem;
      text-align: left;
      line-height: 2.5rem;
      background: -webkit-linear-gradient(left,
          #ffffff,
          #ff0000 6.25%,
          #ff7d00 12.5%,
          #ffff00 18.75%,
          #00ff00 25%,
          #00ffff 31.25%,
          #0000ff 37.5%,
          #ff00ff 43.75%,
          #ffff00 50%,
          #ff0000 56.25%,
          #ff7d00 62.5%,
          #ffff00 68.75%,
          #00ff00 75%,
          #00ffff 81.25%,
          #0000ff 87.5%,
          #ff00ff 93.75%,
          #ffff00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% 100%;
      animation: masked-animation 2s infinite linear;
    }

    @keyframes masked-animation {
      0% {
        background-position: 0 0;
      }

      100% {
        background-position: -100%, 0;
      }
    }

    .header-slogan {
      padding-left: 0.5rem;
      font-size: 0.5rem;
      color: rgba(250, 245, 245, 0.65);
    }

    // element菜单menu样式修改
    .el-menu {
      border-bottom: 0;
      background-color: transparent;
      .el-menu-item {
        border-bottom: 0;
      }
    }
  }

  @media not screen and (min-width: 60em) {
    .header {
      width: 73%;
    }
  }

  @media not screen and (min-width: 50em) {
    .header {
      width: 100%;
    }
  }
}

.phone-drawer {
  text-align: center;

  span {
    font-size: 12px;
    cursor: pointer;
    vertical-align: top;
  }
}

.phone-dropdowm {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
}
</style>
<style>
.tab-icon.iconfont {
  margin-right: 0.4rem !important;
}
</style>