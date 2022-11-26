<template>
  <div class="author-box">
    <el-avatar
      id="avatarimg"
      :size="100"
      :src="avatarImg"
      @mouseenter="mouseEnterAvatar"
    ></el-avatar>
    <div class="myname" :style="{ color: authorstyle.namecolor }">
      Liuzepeng
    </div>

    <div class="myintroduction">软件工程</div>
    <div class="myintroduction">2015-2019级</div>
    <div class="myintroduction">
      <span class="iconfont icon-didian"></span>中国-北京
    </div>
    <div class="myintroduction admin" @click="toAdmin">网站后台管理系统</div>
    <div class="myintroduction">后端：Node + Mysql</div>
    <div class="myintroduction">前端：Vue3 + element-plus</div>

    <div class="myintroduction">
      <span class="iconfont icon-youxiang"></span>
      <span>liuzepeng0200@163.com</span>
    </div>
    <div id="mymotto"></div>
    <!-- <el-divider>社交账号</el-divider> -->
    <el-divider content-position="center">
      <span class="divider-span">社交账号</span>
    </el-divider>
    <div class="mycontacts">
      <el-tooltip effect="light" placement="top">
        <template #content>
          <img
            style="width: 5rem"
            src="https://liuzepeng.com/mywx.jpeg"
            alt="我的微信"
          />
        </template>
        <span class="contact iconfont icon-sign_wechat"></span>
      </el-tooltip>
      <el-tooltip effect="light" placement="top">
        <template #content>
          <img
            style="width: 5rem"
            src="https://liuzepeng.com/myqq.jpeg"
            alt="我的qq"
          />
        </template>
        <span class="contact iconfont icon-qq"></span>
      </el-tooltip>

      <el-tooltip effect="light" placement="top">
        <template #content>
          <a href="https://github.com/yj-liuzepeng" target="_blank">GITHUB</a>
        </template>
        <span class="contact iconfont icon-github-fill"></span>
      </el-tooltip>
      <el-tooltip effect="light" placement="top">
        <template #content>
          <a
            href="https://blog.csdn.net/m0_49159526?spm=1000.2115.3001.5343"
            target="_blank"
            >CSDN</a
          >
        </template>
        <span class="contact iconfont icon-lianjie1"></span>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Transition } from "vue";
import { storeToRefs } from "pinia";
// import bdd from "../assets/author/bdd.jpeg";
import { useMainStore } from "../store";
import { styleone, styletwo } from "../styles/skinstyles/styles";
const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore);

// 动态字体
let componentDidMount = () => {
  let str = "逃避永远无法解决问题";
  let i = 0;
  let divTyping = document.getElementById("mymotto");
  console.log(divTyping);
  function reduce() {
    if (i > 0) {
      divTyping.innerHTML = str.slice(0, i--);
      setTimeout(() => {
        reduce();
      }, 300);
    } else {
      i = 1;
      divTyping.innerHTML = "_";
      setTimeout(() => {
        typing();
      }, 300);
    }
  }
  function typing() {
    if (i <= str.length) {
      divTyping.innerHTML = str.slice(0, i++) + "_";
      setTimeout(() => {
        typing();
      }, 300);
    } else {
      i = str.length;
      setTimeout(() => {
        reduce();
      }, 1000);
    }
  }
  typing();
};
let avatarImg = ref(
  "https://img1.baidu.com/it/u=1143518526,1255623724&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
);

// 头像旋转，主题改变
let mouseEnterAvatar = () => {
  let deg = 0;
  let img = document.getElementById("avatarimg");
  if (
    avatarImg.value ===
    "https://img1.baidu.com/it/u=1143518526,1255623724&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
  ) {
    deg -= 360;
    img.style.transform = "rotate(" + deg + "deg)";
    setTimeout(() => {
      avatarImg.value = "https://liuzepeng.com/bdd.jpeg";
      mainStore.changeStyle(styletwo);
      document.querySelector("body").classList.add("red-theme");
    }, 300);
  } else {
    deg += 360;
    img.style.transform = "rotate(" + deg + "deg)";
    setTimeout(() => {
      avatarImg.value =
        "https://img1.baidu.com/it/u=1143518526,1255623724&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
      mainStore.changeStyle(styleone);
      document.querySelector("body").classList.remove("red-theme");
    }, 300);
  }
};
const toAdmin = () => {
  window.open("https://www.liuzepeng.com/admin", "_blank");
};
onMounted(() => {
  // componentDidMount();
});
</script>

<style lang="scss" scoped>
.author-box {
  padding: 1rem;
  text-align: center;
  #avatarimg {
    animation: light 2s linear both infinite;
    transition: all 0.5s;
  }
  @keyframes light {
    from {
      box-shadow: 0 0 1px white, 0 0 5px white, 0 0 10px white, 0 0 20px purple,
        0 0 5px purple, 0 0 11px pink;
    }

    to {
      box-shadow: 0 0 5px white, 0 0 10px yellow, 0 0 15px yellow,
        0 0 8px #bfd1c0, 0 0 10px #bfd1c0, 0 0 12px blue;
    }
  }
  .myname {
    font-size: large;
    font-weight: 600;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  .myintroduction {
    font-size: 0.8rem;
    color: v-bind("authorstyle.textcolor");
    margin-bottom: 0.5rem;
    word-wrap: break-word;
  }
  .admin {
    cursor: pointer;
    color: rgb(124, 124, 197);
  }
  #mymotto {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    // color: #209d7b;
    color: v-bind("authorstyle.namecolor");
  }
  .mycontacts {
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
    .contact {
      font-size: 28px;
      color: v-bind("authorstyle.namecolor");
      cursor: pointer;
    }
  }
}
</style>
<style>
.el-divider__text.is-center {
  background-color: transparent;
}
.divider-span {
  color: rgb(94, 142, 211);
  background: rgb(247 246 246);
  border-radius: 10px;
  padding: 0 2px;
}
</style>
