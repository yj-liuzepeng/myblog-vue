<template>
  <div
    class="weather"
    :style="[{ 'width': width },
    // { 'height': height },
    { 'background': background.charAt(0) == '#' ? background : 'url(' + background + ')' }]"
  >
    <div class="weather-today">
      <div class="city">{{ weatherState.city }}</div>
      <div class="weather-now">
        <img v-if="todayImgbg" :src="todayImgbg" />
        <div class="info">
          <div class="info-tmp">
            <span>{{ weatherState.now.tmp }}</span>
            <span class="tmp-sign">℃</span>
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
    <div class="weather-forecast" v-if="forecast">
      <div class="today">
        <div class="day-txt">今天</div>
        <div class="day-img">
          <img v-if="todayImgbg" :src="todayImgbg" />
        </div>
        <div
          class="day-tmp"
        >{{ weatherState.dailyForecast[0]?.tmp.min }}-{{ weatherState.dailyForecast[0]?.tmp.max }} ℃</div>
      </div>
      <div class="tomorrow">
        <div class="day-txt">明天</div>
        <div class="day-img">
          <img v-if="tomorrowImgbg" :src="tomorrowImgbg" />
        </div>
        <div
          class="day-tmp"
        >{{ weatherState.dailyForecast[1]?.tmp.min }}-{{ weatherState.dailyForecast[1]?.tmp.max }} ℃</div>
      </div>
      <div class="after-tomorrow">
        <div class="day-txt">后天</div>
        <div class="day-img">
          <img v-if="aTomorrowImgbg" :src="aTomorrowImgbg" />
        </div>
        <div class="day-tmp">
          {{ weatherState.dailyForecast[2]?.tmp.min }}-{{ weatherState.dailyForecast[2]?.tmp.max }}
          ℃
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios'

import MapLoader from '../utils/mapimg'
const props = defineProps({
  width: {
    type: String,
    default: '300px'
  },
  height: {
    type: String,
    default: '100px'
  },
  background: {
    type: String,
    default: '#fcf7ec'
  },
  forecast: {
    type: Boolean,
    default: false
  }
})

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
  getWeatherData: async () => {


    // let fetchurl = 'https://way.jd.com/he/freeweather/?city=' + returnCitySN["cip"] +'&appkey=da39dce4f8aa52155677ed8cd23a6470'


    await axios.get('getweather/he/freeweather', {
      params: {
        city: returnCitySN["cip"],
        appkey: 'da39dce4f8aa52155677ed8cd23a6470'
      }
    })
      .then((res: any) => {

        if (res.data.code == 10000) {
          weatherState.data = res.data.result.HeWeather5[0]
          weatherState.city = weatherState.data.basic.city
          weatherState.cond = weatherState.data.now.cond.txt
          weatherState.air = weatherState.data.aqi.city.qlty
          weatherState.sugcomf = weatherState.data.suggestion.comf.brf
          weatherState.dailyForecast = weatherState.data.daily_forecast.slice(0, 3)
          weatherState.now = weatherState.data.now
          // console.log('天气信息总', weatherState.data)
          // console.log('天气信息预测', weatherState.dailyForecast)
          // console.log('天气信息当前', weatherState.now)
          todayImgbg.value = MapLoader(weatherState.now.cond.txt)
          tomorrowImgbg.value = MapLoader(weatherState.dailyForecast[1].cond.txt_d)
          aTomorrowImgbg.value = MapLoader(weatherState.dailyForecast[2].cond.txt_d)
        }
      })
  }
})

onMounted(() => {
  weatherState.getWeatherData()
})

</script>

<style  scoped>
.weather {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.weather-today {
  width: 100%;
}
.weather-today {
}
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
  height: 30px;
}
.weather-forecast .day-txt {
  font-size: 12px;
}
.weather-forecast .day-img {
}
.weather-forecast .day-tmp {
  font-size: 12px;
  font-weight: 500;
}
.weather-forecast .day-tmp .tmp-sign {
  font-size: 1px;
}
</style>