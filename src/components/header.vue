<template>
  <el-header id="scrolldisplay">
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="10">
          <span class="header-logo" @click="hClickLogo">Liuzepeng</span>
          <span class="header-slogan">{{ headerState.slogan }}</span>
        </el-col>
        <el-col :span="14">
          <el-menu
            :default-active="headerState.activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :background-color="headerstyle.bgc"
            :text-color="headerstyle.textcolor"
            :active-text-color="headerstyle.activetextcolor"
          >
            <el-menu-item
              class="tab"
              v-for="item in headerState.menuList"
              :key="item.code"
              :index="item.code"
              @click="headerState.changeTab(item)"
            >
              <span :class="['tab-icon', 'iconfont', item.icon]"></span>
              {{ item.name }}
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </el-header>
  <login :show="showLogin" @close="showLogin = false"></login>
</template>

<script lang='ts' setup>
import { ref, reactive, onBeforeMount, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter,useRoute } from 'vue-router'
import { useMainStore } from "../store";
import { ElMessageBox } from 'element-plus'
import  ElMessage  from '../utils/resetMessage'
import Login from '../views/login.vue'

const router = useRouter()
const route = useRoute()
// header皮肤
const mainStore = useMainStore();
const { headerstyle, userInfo } = storeToRefs(mainStore)
let showLogin = ref(false)
const headerState = reactive({
  menuList: [
    { name: '首页', code: 'home', icon: 'icon-shouye', path: './home', slogan: '唯有热爱，可抵岁月漫长' },
    { name: '实战', code: 'work', icon: 'icon-gongzuotai', path: './work', slogan: '不要为平庸找借口！' },
    { name: '记录', code: 'record', icon: 'icon-bijijilu', path: './record', slogan: '多总结，多归纳，多学习' },
    // { name: '生活', code: 'life', icon: 'icon-xiaolian2', path: './life', slogan: '热爱生活，积极向上每一天' },
    { name: '互动', code: 'interaction', icon: 'icon-hudong', path: './interaction', slogan: '我爱你中国 🇨🇳🇨🇳🇨🇳' },
    { name: '关于', code: 'about', icon: 'icon-guanyuwo', path: './about', slogan: '唯有热爱，可抵岁月漫长' },
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
          localStorage.removeItem('BLOGUSERINFO')
          localStorage.removeItem('BLOGTOKEN')
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
// 点击logo
const hClickLogo =()=> {
   router.push('./home')
   headerState.activeIndex = 'home'
  // headerState.changeTab({ name: '首页', code: 'home', icon: 'icon-shouye', path: './home', slogan: '唯有热爱，可抵岁月漫长' })
}
onBeforeMount(() => {
  scrollBody()
  let localUserInfo = JSON.parse(localStorage.getItem('BLOGUSERINFO'))
  if (localUserInfo) {
    let loginMsg = headerState.menuList[headerState.menuList.length - 1]
    loginMsg.name = '退出  [' + localUserInfo.username + ']'
    loginMsg.code = 'out'
    loginMsg.icon = 'icon-tuichu'
  }

})
watch(() => userInfo.value, (newval) => {
  let loginMsg = headerState.menuList[headerState.menuList.length - 1]
  loginMsg.name = '退出  [' + newval.username + ']'
  loginMsg.code = 'out'
  loginMsg.icon = 'icon-tuichu'
})
watch(()=>route.name, (newval)=> {
headerState.activeIndex = newval as string
})
onMounted(()=> {
  headerState.activeIndex = route.name as string
})
</script>

<style lang='scss' scoped>
.el-header {
  display: flex;
  justify-content: center;
  background-color: v-bind("headerstyle.bgc");
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
      background: -webkit-linear-gradient(
        left,
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
        #ffff00 100%
      );
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
      .el-menu-item {
        border-bottom: 0;
      }
    }
  }
}
</style>
<style>
.tab-icon.iconfont {
  margin-right: 0.4rem !important;
}
</style>