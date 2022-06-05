<template>
  <div>
    <transition name="dis_list">
      <!-- 音乐列表 -->
      <div class="list_box" v-if="allMusicState.showAllBox">
        <transition name="music_alert">
          <span class="music_alert" v-if="allMusicState.showMusicAlert">{{
              allMusicState.musicAlertVal
          }}</span>
        </transition>
        <div class="list_close" @click="allMusicState.hShowAllBox">x</div>
        <div class="music_list">
          <div class="list_l">
            <ul class="music_type">
              <li v-for="(item, index) in allMusicState.musicTypeList" :key="index" @click="getMusicType(item.id)"
                :class="{ type_active: item.id === thisMusicType }">
                {{ item.name }}
              </li>
            </ul>
            <div class="list_title">
              <span style="font-size: 14px;">歌曲列表</span>
              <img :src="allMusicState.musicStateButton" alt="" class="music_state"
                @click="allMusicState.MusicStateChange" />
              <div class="music_search_box">
                <input type="text" class="music_search" v-model="allMusicState.musicSearchVal" placeholder="搜索歌曲" />
                <transition name="music_search">
                  <ul class="search_list" v-if="allMusicState.musicSearchVal !== ''">
                    <li v-for="(item, index) in allMusicState.musicSearchList" :key="index" @click="ListAdd(item)">
                      <span class="music_search_name">{{ item.name }}</span>
                      <span class="music_search_ar">{{
                          item.artists[0].name
                      }}</span>
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
            <div class="music_ul_title">
              <span>歌曲</span><span>歌手</span><span>专辑</span>
            </div>
            <ul class="list">
              <li v-for="(item, index) in thisMusicList" :key="index" @mouseover="allMusicState.buttonActive(index)"
                @dblclick="musicPlay((allMusicState.thisListPage - 1) * 10 + index)">
                <div class="this_music_shlter" v-if="(allMusicState.thisListPage - 1) * 10 + index === thisMusicIndex">
                </div>
                <span>{{ item.name }}</span><span>{{ item.ar[0].name }}</span><span>{{ item.al.name }}</span>
                <transition name="list_button">
                  <div class="music_button" v-if="allMusicState.listButtonActiveIndex === index">
                    <div class="list_play" title="播放这首歌" :style="{ backgroundImage: 'url(' + listPlay + ')' }"
                      @click="musicPlay((allMusicState.thisListPage - 1) * 10 + index)"></div>
                    <div class="list_play" title="添加到 My Songs" :style="{ backgroundImage: 'url(' + add + ')' }"
                      @click="ListAdd(item)" v-if="thisMusicType !== -1"></div>
                  </div>
                </transition>
              </li>
            </ul>
            <div class="list_page">
              <div class="page_last" v-if="allMusicState.thisListPage !== 1" @click="pageChange(true)">
                &lt;
              </div>
              <div class="page_next"
                v-if="allMusicState.thisListPage !== Math.ceil(allMusicState.musicList.length / 10)"
                @click="pageChange(false)">
                >
              </div>
            </div>
          </div>
          <div class="list_r">
            <img class="music_list_bg" :src="curPlayMusic.musicImg" />
            <div class="music_list_shlter" :style="{ backgroundImage: 'url(' + shlter + ')' }"></div>
            <ul class="music_talk_list">
              <li v-for="(item, index) in allMusicState.hotTalkList" :key="index">
                <div class="talk_head">
                  <img :src="item.user.avatarUrl" alt="" class="talk_head_img" />
                  <span class="talk_head_name">{{ item.user.nickname }}</span>
                </div>
                <p class="talk_content">
                  <img class="talk_icon_l" :src="talkicon1" />
                  {{ item.content }}
                  <img class="talk_icon_r" :src="talkicon2" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <!-- 音乐盒子 -->
    <div class="bbox" :class="{ bbox_active: curPlayMusic.showBox }">
      <div class="pan" :style="{ backgroundImage: 'url(' + pan + ')' }" :class="{ pan_active: curPlayMusic.showBox }"
        @click="curPlayMusic.hShowBox">
        <img :src="curPlayMusic.musicImg" alt="" class="pan_c" />
      </div>
      <div class="box" :style="{ backgroundImage: 'url(' + curPlayMusic.musicImg + ')' }"
        :class="{ box_active: curPlayMusic.showBox }" @dblclick="allMusicState.hShowAllBox">
        <div class="music_shlter_2" :style="{ backgroundImage: 'url(' + curPlayMusic.musicImg + ')' }"
          :class="{ shlter_active: curPlayMusic.showBox }"></div>
        <div class="music_shlter" :style="{ backgroundImage: 'url(' + curPlayMusic.musicImg + ')' }"
          :class="{ shlter_active: curPlayMusic.showBox }"></div>
        <div class="music_shlter_3"></div>
        <div class="music_dis">
          <div class="dis_list" @click="allMusicState.hShowAllBox">···</div>
          <p class="music_title">{{ curPlayMusic.musicTitle }}</p>
          <p class="music_intro">歌手: {{ curPlayMusic.musicName }}</p>
          <ul class="music_words">
            <div class="music_words_box" :style="{ top: wordsTop + 'px' }">
              <li v-for="(item, index) in curPlayMusic.musicWords" :key="index" class="music_word"
                :class="{ word_highlight: wordIndex === index }">
                {{ item }}
              </li>
            </div>
          </ul>
        </div>
        <div class="control_box">
          <div class="control_button">
            <img :src="curPlayMusic.playIcon" alt="" class="control_icon" />
          </div>
          <div class="progress">
            <div class="progress_c" :style="{ width: curPlayMusic.currentProgress }">
              <div class="progress_circle">
                <div class="progress_circle_c"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <video id="music" :autoplay='curPlayMusic.autoplay' :src="curPlayMusic.musicUrl" name="media"></video>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, computed, watch, ref, reactive } from 'vue';
import {
  getWords,
  getMusicInfo,
  getMusicUrl,
  getHotMusic,
  getSearchSuggest,
  getHotTalk
} from "../../apis/music";
import pan from "./img/pan.png";
import play from "./img/play.png";
import pause from "./img/pause.png";
import add from "./img/add.png";
import shlter from "./img/list_pan.png";
import listPlay from "./img/list_play_hover.png";
import state0 from "./img/state_0.png";
import state1 from "./img/state_1.png";
import talkicon1 from "./img/talkicon1.png";
import talkicon2 from "./img/talkicon2.png";
import $ from "jquery";
const props = defineProps({
  closeBox:{
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['boxshow'])
// 当前正在播放的音乐
let curPlayMusic = reactive({
  autoplay:false,
  musicName: '',
  musicTitle: '',
  musicWords: null,
  musicUrl: '',
  musicImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0137935dd7b203a8012053c08a1cbf.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654270133&t=ef1550f78b339d25b3f46b0716a5163c',
  showBox: false, // 是否显示小box
  hShowBox: () => { // 控制小盒子显示隐藏
    curPlayMusic.showBox = !curPlayMusic.showBox
    emit('boxshow',curPlayMusic.showBox )
  },
  playIcon: play, // 播放暂停按钮
  playState: false, // 播放状态,默认暂停，不播放
  currentProgress: '0%'
})
// 全屏显示的数据
let allMusicState = reactive({
  showAllBox: false,
  hShowAllBox: () => {
    allMusicState.showAllBox = !allMusicState.showAllBox
  },
  musicTypeList: [ // 分类
    { name: "热歌榜", id: 3778678 },
    { name: "新歌榜", id: 3779629 },
    { name: "飙升榜", id: 19723756 },
    // { name: "嘻哈榜", id: 991319590 },
    { name: "原创榜", id: 2884035 },
    { name: "My Songs", id: -1 }
  ],
  hotTalkList: [], // 热评
  musicSearchVal: '', // 搜索内容
  musicSearchList: [], // 搜索结果列表
  musicState: 0, // 0列表循环  1单曲循环
  musicStateButton: state1, // 单曲/循环按钮控制，默认显示单曲循环按钮（歌曲列表循环播放）
  MusicStateChange: () => { // 更改模式
    allMusicState.musicState === 0 ? (allMusicState.musicState = 1,
      allMusicState.musicStateButton = state0,
      MusicAlert("已切换为单曲循环模式")) : (allMusicState.musicState = 0,
        allMusicState.musicStateButton = state1,
        MusicAlert("已切换为列表循环模式"))
  },
  listButtonActiveIndex: -1, // list 鼠标移入显示当前index列按钮
  buttonActive: (id) => { // 鼠标移入当前列
    allMusicState.listButtonActiveIndex = id;
  },
  notPlay: [], // 不能播放的音乐列表
  musicList: [], // 音乐列表
  myMusicList: [], // My Songs
  showMusicAlert: false, // alert
  musicAlertVal: '', // alert内容
  musicAlertTimer: null, // alert计时timer
  thisListPage: 1, // 当前页
})
let o = ref(0)
let top = ref(0)






let wordsTime = ref([])
let wordsTop = ref(0)
let wordIndex = ref(0)

let thisMusicType = ref(-1)
let thisMusicIndex = ref(1)











// console打印
const DisAuthorInfo = () => {
  console.log(
    "%c音乐播放器----博客地址：https://www.liuzepeng.com",
    "background-color:rgb(30,30,30);border-radius:4px;font-size:12px;padding:4px;color:rgb(220,208,129);"
  );
}
// 添加到我的歌曲
const ListAdd = (obj) => {
  getMusicInfo({ id: obj.id }).then((res: any) => {
    let data = JSON.parse(res.data)
    allMusicState.musicSearchVal = "";
    if (allMusicState.myMusicList.length === 0) {
      // 第一次搜索直接播放
      allMusicState.myMusicList = [data.songs[0]];
      getMusicType(-1);
    } else {
      allMusicState.myMusicList.push(data.songs[0]);
      //提示已经添加进去
    }
    MusicAlert("添加成功");
  });
}
// alert弹窗
const MusicAlert = (val) => {
  allMusicState.showMusicAlert = true;
  allMusicState.musicAlertVal = val;
  clearTimeout(allMusicState.musicAlertTimer);
  allMusicState.musicAlertTimer = setTimeout(() => {
    allMusicState.showMusicAlert = false;
    allMusicState.musicAlertVal = "";
  }, 2000);
}
// 切换页
const pageChange = (isLast) => {
  if (isLast) {
    allMusicState.thisListPage--;
  } else {
    allMusicState.thisListPage++;
  }
}

// 获取不同类型歌曲列表
const getMusicType = (id) => {
  if (thisMusicType.value !== id) {
    allMusicState.notPlay = [];
    if (id === -1) {
      if (allMusicState.myMusicList.length !== 0) {
        allMusicState.musicList = allMusicState.myMusicList
        thisMusicType.value = id;
        thisMusicIndex.value = 0;
        allMusicState.thisListPage = 1;
        getInfo();
        top.value = 0;
        o.value = 0;
        wordIndex.value = 0;
        wordsTop.value = 0;
        curPlayMusic.currentProgress = "0%";

        if (!curPlayMusic.playState) {
          $(".control_icon").click();
        }
      } else {
        //自定义库没有歌曲 提示需要搜索才可以添加
        MusicAlert("没有歌曲,需要自己添加");
      }
    } else {
      getHotMusic({ id: id }).then((res: any) => {
        let data = JSON.parse(res.data)
  
   
        allMusicState.musicList = data.playlist.tracks;
        // allMusicState.musicList = data.playlist.tracks.splice(0, 100);
        thisMusicType.value = id;
        thisMusicIndex.value = 0;
        allMusicState.thisListPage = 1;
        getInfo();
        top.value = 0;
        o.value = 0;
        wordIndex.value = 0;
        wordsTop.value = 0;
        curPlayMusic.currentProgress = "0%";
        // if (!curPlayMusic.playState) {
        //   $(".control_icon").click();
        // }
      });
    }
  }
}
// 播放歌曲
const musicPlay = (id) => {

  if (thisMusicIndex.value !== id) {
    thisMusicIndex.value = id > allMusicState.musicList.length - 1 ? 0 : id;

    getInfo();
    top.value = 0;
    o.value = 0;
    wordIndex.value = 0;
    wordsTop.value = 0;
    curPlayMusic.currentProgress = "0%";
    if (!curPlayMusic.playState) {
      $(".control_icon").click();
    }
    curPlayMusic.autoplay = true
  }
}
// 格式调整
const Ltrim = (s) => {
  return s.replace(/(^\s*)/g, "");
}
// 格式调整
const Rtrim = (s) => {
  return s.replace(/(\s*$)/g, "");
}
// 歌词裁剪
const Cut = (str) => {
  let timeArr = [];
  let wordArr = [];
  timeArr = str.split("[");
  timeArr.splice(0, 1);
  for (let i = 0; i < timeArr.length; i++) {
    let cut = timeArr[i].split("]");
    let time = cut[0].split(".")[0].split(":");
    timeArr[i] = Number.parseInt(time[0]) * 60 + Number.parseInt(time[1]);
    timeArr[i] = isNaN(timeArr[i]) ? 0 : timeArr[i]; // 处理NaN
    wordArr[i] = Rtrim(Ltrim(cut[1]));
  }
  return { timeArr: timeArr, wordArr: wordArr };
}
// 获取歌曲信息
const getInfo = () => {

  getMusicUrl({ id: allMusicState.musicList[thisMusicIndex.value].id }).then((res: any) => {

    let data = JSON.parse(res.data)
    if (
      data.data[0].url === null ||
      data.data[0].url === "" ||
      data.data[0].url === undefined
    ) {
      if (allMusicState.notPlay.length !== allMusicState.musicList.length) {
        let nextIndex = thisMusicIndex.value + 1;
        if (allMusicState.notPlay.indexOf(thisMusicIndex.value) === -1) {
          allMusicState.notPlay.push(thisMusicIndex.value);
        }
        MusicAlert(
          `${allMusicState.musicList[thisMusicIndex.value].name}因为一些原因不能播放`
        );
        musicPlay(nextIndex); //寻找下一首歌  直到找到

        //提示这首歌不能放
      } else {
        //遍历完没有找到
        console.log("not");
        MusicAlert("此列表所有歌都不能播放");
      }
    } else {
      curPlayMusic.musicUrl = data.data[0].url.replace("http://", "https://");
    
      curPlayMusic.musicImg =
        allMusicState.musicList[thisMusicIndex.value].al.picUrl.replace(
          "http://",
          "https://"
        ) + "?param=300y300";
      curPlayMusic.musicTitle = allMusicState.musicList[thisMusicIndex.value].name;
      let name_arr = [];
      allMusicState.musicList[thisMusicIndex.value].ar.forEach(i => {
        name_arr.push(i.name);
      });
      curPlayMusic.musicName = name_arr.join("/");
      getWords({ id: allMusicState.musicList[thisMusicIndex.value].id }).then((res: any) => {
        let data = JSON.parse(res.data)
        if (!data.nolyric) {
          let info = Cut(data.lrc.lyric);
          curPlayMusic.musicWords = info.wordArr;
          wordsTime.value = info.timeArr;
        }
      });
      getHotTalk({ id: allMusicState.musicList[thisMusicIndex.value].id }).then((res: any) => {
        let data = JSON.parse(res.data)
        let count = 0;
        allMusicState.hotTalkList = data.hotComments.splice(0, 3);
        allMusicState.hotTalkList.forEach(e => {
          count += e.content.length;
          e.user.avatarUrl = e.user.avatarUrl + "?param=50y50";
        });
        if (count >= 200) {
          allMusicState.hotTalkList = allMusicState.hotTalkList.slice(0, 2);
        }
      });
    }
  });
}
// 初始化播放
const Player = () => {
  let player = $("#music")[0];
  let playerTimer = setInterval(timer, 1000);
  // $(".control_icon").click();
  // 定时器函数
  // $("body").on("click", () => {
  // player.play();
  //   $("body").unbind("click");
  // });

  function timer() {
    curPlayMusic.currentProgress = `${(player.currentTime / player.duration) *
      100}%`;
    // 接着这里写歌词滚动
    if (player.currentTime >= wordsTime.value[o.value + 1]) {
      top.value += Number.parseInt(
        $(".music_word")
          .eq(o.value)
          .height() +
        Number.parseInt(
          $(".music_word")
            .eq(o.value)
            .css("marginTop")
        )
      );
      if (top.value >= $(".music_words").height() / 2 - 11) {
        // 开始滚动的高度
        wordsTop.value += -Number.parseInt(
          $(".music_word")
            .eq(o.value)
            .height() +
          Number.parseInt(
            $(".music_word")
              .eq(o.value)
              .css("marginTop")
          )
        );
      }
      wordIndex.value = o.value + 1;
      o.value++;
    }
    if (player.currentTime >= player.duration) {
      // 切歌
      if (allMusicState.musicList.length !== 1) {
        // 只有一首歌  重复播放
        if (allMusicState.musicState === 0) {
          thisMusicIndex.value =
            thisMusicIndex.value >= allMusicState.musicList.length - 1
              ? 0
              : thisMusicIndex.value + 1;
          getInfo();
        }
      }
      player.play();
      top.value = 0;
      o.value = 0;
      wordIndex.value = 0;
      wordsTop.value = 0;
      curPlayMusic.currentProgress = "0%";
    }
  }

  // 进度条控制
  $(".progress").on("mousedown", ev => {
    let e = ev || event;
    let pro =
      (e.clientX - $(".progress").offset().left) / $(".progress").width();
    clearInterval(playerTimer);
    curPlayMusic.currentProgress = `${pro * 100}%`;
    $(document).on("mousemove", ev => {
      let e = ev || event;
      pro =
        (e.clientX - $(".progress").offset().left) / $(".progress").width();
      curPlayMusic.currentProgress = `${pro * 100}%`;
    });
    $(document).on("mouseup", () => {
      player.currentTime = player.duration * pro;
      let c_arr = [...wordsTime.value];
      c_arr.push(player.currentTime);
      c_arr.sort((l, r) => {
        return l - r;
      });
      let now_o = c_arr.indexOf(player.currentTime) - 1;
      let diff_h = 0;
      if (o.value < now_o) {
        for (let i = o.value; i < now_o; i++) {
          diff_h += -Number.parseInt(
            $(".music_word")
              .eq(i)
              .height() +
            Number.parseInt(
              $(".music_word")
                .eq(i)
                .css("marginTop")
            )
          );
        }
      } else {
        for (let i = now_o; i < o.value; i++) {
          diff_h += Number.parseInt(
            $(".music_word")
              .eq(i)
              .height() +
            Number.parseInt(
              $(".music_word")
                .eq(i)
                .css("marginTop")
            )
          );
        }
      }
      wordsTop.value += diff_h;
      wordIndex.value = o.value = now_o;
      clearInterval(playerTimer);
      playerTimer = setInterval(timer, 1000);
      curPlayMusic.playState = true;
      curPlayMusic.playIcon = pause;
      if (player.currentTime >= player.duration) {
        top.value = 0;
        o.value = 0;
        wordIndex.value = 0;
        wordsTop.value = 0;
        curPlayMusic.currentProgress = "0%";
      }
      player.play();
      $(document).unbind("mousemove");
      $(document).unbind("mouseup");
    });
  });
  // 播放暂停按钮控制
  $(".control_icon").on("click", () => {

    if (curPlayMusic.playState) {
      player.pause();
      curPlayMusic.playState = false;
      curPlayMusic.playIcon = play;
      clearInterval(playerTimer);
    } else {
      player.play();
      curPlayMusic.playState = true;
      curPlayMusic.playIcon = pause;
      clearInterval(playerTimer);
      playerTimer = setInterval(timer, 1000);
    }
  });
}
const Contorl = () => {
  let player = $("#music")[0];
  player.currentTime = 100;
}
// 计算属性 分页
const thisMusicList = computed(() => {
  return [...allMusicState.musicList].splice((allMusicState.thisListPage - 1) * 10, 10) //分页
}
)
// 监听搜索
watch(() => allMusicState.musicSearchVal, () => {
  if (allMusicState.musicSearchVal === "") {
    allMusicState.musicSearchList = [];
  } else {
    getSearchSuggest({ key: allMusicState.musicSearchVal }).then((res: any) => {
      let data = JSON.parse(res.data)
      if (data.result.songs === undefined) {
        allMusicState.musicSearchList = [];
      } else {
        allMusicState.musicSearchList = data.result.songs;
      }
    });
  }
})
getMusicType(3779629); // 新歌榜
// DisAuthorInfo();
watch(()=> props.closeBox,(nw)=> {
  if(nw==false) {
    curPlayMusic.showBox = false
  }
})
onMounted(() => {
  Player()
})
</script>

<style scoped>
@import url("./player.css");
</style>