<template>
  <el-container>
    <my-header></my-header>
    <el-main>
      <div class="content">
        <router-view />
      </div>
    </el-main>
    <my-footer></my-footer>
  </el-container>
  <el-dialog v-model="dialogFormVisible" width="40%">
    <template #title>
      <span class="dialog-title">
        欢迎 <span class="iconfont icon-xihuan"></span>
      </span>
      <el-divider />
    </template>

    <div class="weather">

      <div class="left">
        <div class="weather-today">
          <div class="city">{{ weatherState.city }}</div>
          <div class="weather-now">
            <img v-if="todayImgbg" v-lazy="todayImgbg" />
            <div class="info">
              <div class="info-tmp">
                <span>{{ weatherState.now.tmp }}</span>
                <span class="tmp-sign">℃</span>
                <span style="font-size: 12px;"> （实时）</span>
              </div>
              <div class="info-cond-air">
                {{ weatherState.cond }} |
                <span>{{ weatherState.air }}</span>
              </div>
            </div>
            <div class="wind">
              <div class="wind-txt">{{ weatherState.now?.wind?.dir }}{{ weatherState.now?.wind?.sc }}级</div>
              <div class="sug">舒适度：{{ weatherState.sugcomf }}</div>
            </div>
          </div>
        </div>
        <div class="weather-forecast">
          <div class="today">
            <div class="day-txt">今天</div>
            <div class="day-img">
              <img v-if="todayImgbg" v-lazy="todayImgbg" />
            </div>
            <div class="day-tmp">{{ weatherState.dailyForecast[0]?.tmp.min }}-{{
                weatherState.dailyForecast[0]?.tmp.max
            }}
              ℃</div>
          </div>
          <div class="tomorrow">
            <div class="day-txt">明天</div>
            <div class="day-img">
              <img v-if="tomorrowImgbg" v-lazy="tomorrowImgbg" />
            </div>
            <div class="day-tmp">{{ weatherState.dailyForecast[1]?.tmp.min }}-{{
                weatherState.dailyForecast[1]?.tmp.max
            }}
              ℃</div>
          </div>
          <div class="after-tomorrow">
            <div class="day-txt">后天</div>
            <div class="day-img">
              <img v-if="aTomorrowImgbg" v-lazy="aTomorrowImgbg" />
            </div>
            <div class="day-tmp">
              {{ weatherState.dailyForecast[2]?.tmp.min }}-{{ weatherState.dailyForecast[2]?.tmp.max }}
              ℃
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <span class="iconfont icon-jindianzijianyifabushenqingliucheng-03"></span> {{ weatherState.suggestion }}
      </div>

    </div>

    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">略过</el-button> -->
        <el-button type="primary" size="small" @click="dialogFormVisible = false">加油
          <span style="padding-left: 5px;" class="iconfont icon-xiaolian3"></span>
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-backtop :bottom="100">
    <span class="iconfont icon-icon-test" style="color: red;"></span>
  </el-backtop>
  <!--音乐播放器-->
  <div v-if="isMobile" ref="target">
    <Player style="z-index: 100000" @boxshow="boxShow" :closeBox='emitBoxShow'></Player>
  </div>
</template>

<script lang='ts' setup>
import MyHeader from '../components/myheader.vue'
import MyFooter from '../components/myfooter.vue'
import { ref, reactive, onMounted, watch } from 'vue';
import { getWeatherData } from '../apis/weather'
import MapLoader from '../utils/mapimg'
import Player from "../components/zw-player/player.vue";
import { onClickOutside } from '@vueuse/core'

import { useRoute } from 'vue-router'

const route = useRoute()
const dialogFormVisible = ref(false)

let todayImgbg = ref()
let tomorrowImgbg = ref()
let aTomorrowImgbg = ref()

const weatherState = reactive({
  data: {} as any, // 保存全部天气信息
  dailyForecast: [], // 天气预测
  now: {} as any, // 现在天气信息总
  city: '',
  cond: '', // 现在天气
  air: '', // 空气状况
  sugcomf: '',// 舒适度指数
  suggestion: '' // 建议
})
const getWeather = () => {
  let params = {
    city: returnCitySN["cip"]
  }
  getWeatherData(params).then((res: any) => {
    if (res.code == 200) {
      weatherState.data = JSON.parse(res.data).result.HeWeather5[0]
      weatherState.city = weatherState.data.basic.city
      weatherState.cond = weatherState.data.now.cond.txt
      weatherState.air = weatherState.data.aqi.city.qlty
      weatherState.sugcomf = weatherState.data.suggestion.drsg.brf
      weatherState.suggestion = weatherState.data.suggestion.drsg.txt
      weatherState.dailyForecast = weatherState.data.daily_forecast.slice(0, 3)
      weatherState.now = weatherState.data.now

      todayImgbg.value = MapLoader(weatherState.now.cond.txt)
      tomorrowImgbg.value = MapLoader(weatherState.dailyForecast[1].cond.txt_d)
      aTomorrowImgbg.value = MapLoader(weatherState.dailyForecast[2].cond.txt_d)
      dialogFormVisible.value = true
    }
  })

}
const isMobile = ref(false)
// const hMobile = () => {
//  return /(iPhone|iPad|iPod|iOS|Android|Linux armv8l|Linux armv7l|Linux aarch64)/i.test(navigator.platform);
// }
const hMobile = () => {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    // 移动端页面
    isMobile.value = false

  } else {
    // pc端页面
    isMobile.value = true
  }
}
// 点击其他位置隐藏
const target = ref(null)
// 鼠标在目标之外点击
onClickOutside(target, () => {
  closeMusicBox()
})
const closeMusicBox = () => {
  if (emitBoxShow.value) {
    emitBoxShow.value = false
  } else {
    emitBoxShow.value = true
  }
}
let emitBoxShow = ref(false)
const boxShow = (show) => {
  emitBoxShow.value = show
}
watch(() => dialogFormVisible.value, (nw) => {
  if (!nw) {
    // console.log(route.name)
  }
})
onMounted(() => {
  hMobile()
  getWeather()


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

  @media not screen and (min-width: 60em) {
    .content {
      width: 73%;
    }
  }

  @media not screen and (min-width: 50em) {
    .content {
      width: 100%;
    }
  }
}

.dialog-title {
  color: red;
}
</style>
<style>
@media not screen and (min-width: 60em) {
  .el-dialog {
    --el-dialog-width: '40%' !important;
  }

}

@media not screen and (min-width: 50em) {
  .el-dialog {
    --el-dialog-width: '100%' !important;
  }


}
</style>
<style  scoped>
.weather {
  width: 100%;
  display: flex;
  /* padding: 15px; */
  /* border: 1px solid #ccc; */
  margin-top: -40px;
  border-radius: 10px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.weather .left {
  width: 69%;
}

.weather .right {
  width: 28%;
  border: 1px solid #ccc;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
  color: #937170;
  background-color: #cae7dc;
}

.weather-today {
  width: 100%;
}

.weather-today {}

.weather-today .city {
  font-size: 12px;
  margin-left: 5px;
}

.weather-now {
  display: flex;
  width: 100%;
}

.weather-now .wind {
  font-size: 14px;
  margin-left: 20%;
}

.weather-now .wind-txt {
  font-size: 12px;
  margin-bottom: 10%;
  color: rgb(88, 94, 99);
}

.weather-now .sug {
  font-size: 12px;
  color: rgb(104, 173, 233);
}

.weather-now img {
  width: 50px;
  height: 50px;
}

.weather-now .info {
  margin-left: 5px;
}

.weather-now .info .info-tmp {
  font-size: 20px;
}

.weather-now .info .info-cond-air {
  font-size: 10px;
}

.weather-now .info .tmp-sign {
  font-size: 6px;
  margin-left: 2px;
  vertical-align: top;
}

.weather-forecast {
  width: 100%;
  display: flex;
  /* padding: 15px; */
  margin-top: 3%;
  justify-content: space-around;
  text-align: center;
}

.weather-forecast img {
  width: 40px;
  height: 40px;
}

.weather-forecast .day-txt {
  font-size: 12px;
}

.weather-forecast .day-img {}

.weather-forecast .day-tmp {
  font-size: 12px;
  font-weight: 500;
}

.weather-forecast .day-tmp .tmp-sign {
  font-size: 1px;
}
</style>
<style>
.el-dialog {
  border-radius: 10px !important;
}

.el-backtop {
  /* opacity: 0.8;
  background-color: #51555d !important;
  color: rgb(145, 49, 49); */
}
</style>
