<template>
  <div class="about">
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="left-content">
          <div class="about-header">
            <div class="kb-img">
              <img src="../assets/kb2.png" alt="kb" />
            </div>
            <div class="self-info">
              <div class="avat">
                <img src="../assets/author/bdd.jpeg" />
              </div>
              <div class="info-right">
                <div class="name" :style="{ color: authorstyle.namecolor }">liuzepeng</div>
                <div class="loacl-sex" :style="{ color: authorstyle.textcolor }">
                  <span>
                    <span class="iconfont icon-didian"></span> 山东 |
                  </span>
                  <span>
                    <span class="iconfont icon-icon2"></span> 男
                  </span>
                </div>
                <div class="content">Hi,我叫刘泽鹏,为了学习和日常总结,做了一个小站,初来乍到,多有不足,请谅解！</div>
              </div>
            </div>
          </div>
          <div class="clock">
            <h1>时间不等人</h1>
            <time-clock :ringcolor="authorstyle.namecolor"></time-clock>
          </div>
          <div class="about-self">
            <h1 class="h-title">关于博主</h1>
            <el-divider />
            <p class="self-name">
              <code>Hi there, I'm LiuZePeng</code>
            </p>
            <div
              class="self-msg"
            >An engineer and explorer. From ShanDongJiaoTong University, 26 years old。</div>
            <h1 class="h-title">关于本站</h1>
            <el-divider />
            <ul>
              <li>写此博客的初衷是为了学习一下vue3</li>
              <li>希望此博客能为博主不断积累技术,坚持总结，也希望通过此博客结识各方面的爱好者</li>
              <li>当您看到此处时，博主很开心又多了一位博主成长历程的见证者</li>
              <li>本网站2022年初左右上线， 功能不断完善</li>
              <li>也希望各位大佬，对本博客的完善提出建议</li>
            </ul>
            <h1 class="h-title">技术栈</h1>
            <el-divider />
            <ul>
              <li>client: Vue3 + Element-plus</li>
              <li>admin: React + Element-plus</li>
              <li>server: node +Mysql</li>      
              <li>服务器由腾讯云提供支持</li>      
              <li>本站前后端均为个人书写，个人水平有限，大佬路过还请多多批评指正</li>      
            </ul>
            <h1 class="h-title">联系方式</h1>
            <el-divider />
            <ul>
              <li>QQ: 116117790</li>
              <li>微信: Lzp20190330</li>   
              <li>csdn: <a href="https://blog.csdn.net/m0_49159526?spm=1000.2115.3001.5343">Bwcx_lzp</a></li>   
              <li>GitHub: <a href="https://github.com/yj-liuzepeng">yj-liuzepeng</a>, 点个star吧~~</li>   
            </ul>
            <h1 class="h-title">特别说明</h1>
            <el-divider />
            <ul>
              <li>本站所有内容仅代表个人观点，和任何组织或个人无关</li>
              <li>本站内容仅供学习交流，请勿用于任何形式商业行为</li>   
              <li>本站如无意中侵犯了某些组织或个人的知识产权，请速告之，本站定及时处理</li>   
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-content">
          <Author />
          <your-info />
          <Skills></Skills>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import { } from 'vue';
import Author from '../components/author.vue'
import yourInfo from '../components/your-info.vue'
import Skills from '../components/skills.vue'
import timeClock from '../components/clock.vue';
import { storeToRefs } from 'pinia'
import { useMainStore } from "../store";
const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore)
</script>

<style lang='scss' scoped>
ul {
  padding-left: 25px;
  margin-bottom: 25px;
  li {
    list-style-type: square;
    margin-bottom: 10px;
    color: #24292e;
  }
}

.about {
  padding-top: 3.2rem;
  .left-content {
    border: 1px solid rgb(242, 235, 235);
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    margin-right: 10px;
    .about-header {
      // transform: translateY(-100%);
      animation: 0.6s ease 0s 1 normal forwards running aboutcss;
      border-radius: 5px;
      border-bottom: 1px solid rgb(32, 157, 123);

      .kb-img {
        width: 100%;
        height: 240px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .self-info {
        background-color: white;
        display: flex;
        .avat {
          margin-left: 40px;
          transform: translateY(-40px);
          img {
            width: 100px;
            border-radius: 10px;
          }
        }
        .info-right {
          padding: 0px 5px 0px 10px;
          display: flex;
          flex-direction: column;
          font-size: 17px;
          font-family: 楷体;
          .name {
            // color: rgb(24, 144, 255);
            font-weight: 600;
          }
          .loacl-sex {
            font-size: 14px;
          }
          .content {
            margin-top: 10px;
          }
        }
      }
    }
    .clock {
      margin-bottom: 50px;
      h1 {
        text-align: center;
        color: rgb(122, 122, 122);
        margin: 18px 0;
        font-size: 2rem;
      }
    }
    .about-self {
      .h-title {
        font-size: 1.5rem;
      }
      .self-name {
        margin-bottom: 16px;
        code {
          color: #e82b73;
          padding: 4px;
          margin: 0 4px;
          background-color: rgba(27, 31, 35, 0.05);
        }
      }
      .self-msg {
        display: flex;
        margin-bottom: 16px;
        padding: 1em 1em 1em 1em;
        background-color: #fff5eb;
        border: 1px solid #fed4a4;
      }
    }
  }
  .right-content {
    width: 100%;
  }
}
</style>