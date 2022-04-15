/*
 * @Author: lzp
 * @Date: 2022-03-26 08:52:03
 * @Description: 天气组件图片
 */
import weather01 from "../assets/weather01.png";
import weather02 from "../assets/weather02.png";
import weather03 from "../assets/weather03.png";
import weather04 from "../assets/weather04.png";
import weather05 from "../assets/weather05.png";
import weather06 from "../assets/weather06.png";
import weather07 from "../assets/weather07.png";
import weather08 from "../assets/weather08.png";
import weather09 from "../assets/weather09.png";
import weather10 from "../assets/weather10.png";
import weather11 from "../assets/weather11.png";
import weather12 from "../assets/weather12.png";
import weather13 from "../assets/weather13.png";
import weather14 from "../assets/weather14.png";
import weather15 from "../assets/weather15.png";
import weather16 from "../assets/weather16.png";
import weather17 from "../assets/weather17.png";
import weather18 from "../assets/weather18.png";
import weather19 from "../assets/weather19.png";
import weather20 from "../assets/weather20.png";
import weather21 from "../assets/weather21.png";
import weather22 from "../assets/weather22.png";
import weather23 from "../assets/weather23.png";
import weather24 from "../assets/weather24.png";
import weather25 from "../assets/weather25.png";
import weather26 from "../assets/weather26.png";
import weather27 from "../assets/weather27.png";
import weather28 from "../assets/weather28.png";
import weather29 from "../assets/weather29.png";
import weather30 from "../assets/weather30.png";
import weather31 from "../assets/weather31.png";
import weather32 from "../assets/weather32.png";
import weather33 from "../assets/weather33.png";
import weather34 from "../assets/weather34.png";
import weather35 from "../assets/weather35.png";
import weather36 from "../assets/weather36.png";
import weather37 from "../assets/weather37.png";
import weather38 from "../assets/weather38.png";
import weather39 from "../assets/weather39.png";
import weather40 from "../assets/weather40.png";
import weather41 from "../assets/weather41.png";
import weather42 from "../assets/weather42.png";
import weather43 from "../assets/weather43.png";
import weather44 from "../assets/weather44.png";
import weather45 from "../assets/weather45.png";
import weather46 from "../assets/weather46.png";
import weather47 from "../assets/weather47.png";
import weather48 from "../assets/weather48.png";
import weather49 from "../assets/weather49.png";
import weather50 from "../assets/weather50.png";
import weather51 from "../assets/weather51.png";
import weather52 from "../assets/weather52.png";
import weather53 from "../assets/weather53.png";
import weather54 from "../assets/weather54.png";
import weather55 from "../assets/weather55.png";
import weather56 from "../assets/weather56.png";
import weather57 from "../assets/weather57.png";
import weather58 from "../assets/weather58.png";
import weather59 from "../assets/weather59.png";
import weather60 from "../assets/weather60.png";
import weather61 from "../assets/weather61.png";
import weather62 from "../assets/weather62.png";
import weather63 from "../assets/weather63.png";
import weather64 from "../assets/weather64.png";
import weather65 from "../assets/weather65.png";
import weather66 from "../assets/weather66.png";
import weather67 from "../assets/weather67.png";
import weather68 from "../assets/weather68.png";

export default function MapLoader(name) {
  let weatherList = [
    {
      id: 1,
      name: "晴",
      url: weather01,
    },
    {
      id: 2,
      name: "少云",
      url: weather02,
    },
    {
      id: 3,
      name: "晴间多云",
      url: weather03,
    },
    {
      id: 4,
      name: "多云",
      url: weather04,
    },
    {
      id: 5,
      name: "阴",
      url: weather05,
    },
    {
      id: 6,
      name: "有风",
      url: weather06,
    },
    {
      id: 7,
      name: "平静",
      url: weather07,
    },
    {
      id: 8,
      name: "微风",
      url: weather08,
    },
    {
      id: 9,
      name: "和风",
      url: weather09,
    },
    {
      id: 10,
      name: "清风",
      url: weather10,
    },
    {
      id: 11,
      name: "强风/劲风",
      url: weather11,
    },
    {
      id: 12,
      name: "疾风",
      url: weather12,
    },
    {
      id: 13,
      name: "大风",
      url: weather13,
    },
    {
      id: 14,
      name: "烈风",
      url: weather14,
    },
    {
      id: 15,
      name: "风暴",
      url: weather15,
    },
    {
      id: 16,
      name: "狂爆风",
      url: weather16,
    },
    {
      id: 17,
      name: "飓风",
      url: weather17,
    },
    {
      id: 18,
      name: "热带风暴",
      url: weather18,
    },
    {
      id: 19,
      name: "霾",
      url: weather19,
    },
    {
      id: 20,
      name: "中度霾",
      url: weather20,
    },
    {
      id: 21,
      name: "重度霾",
      url: weather21,
    },
    {
      id: 22,
      name: "严重霾",
      url: weather22,
    },
    {
      id: 23,
      name: "阵雨",
      url: weather23,
    },
    {
      id: 24,
      name: "雷阵雨",
      url: weather24,
    },
    {
      id: 25,
      name: "雷阵雨并伴有冰雹",
      url: weather25,
    },
    {
      id: 26,
      name: "小雨",
      url: weather26,
    },
    {
      id: 27,
      name: "中雨",
      url: weather27,
    },
    {
      id: 28,
      name: "大雨",
      url: weather28,
    },
    {
      id: 29,
      name: "暴雨",
      url: weather29,
    },
    {
      id: 30,
      name: "大暴雨",
      url: weather30,
    },
    {
      id: 31,
      name: "特大暴雨",
      url: weather31,
    },
    {
      id: 32,
      name: "强阵雨",
      url: weather32,
    },
    {
      id: 33,
      name: "强雷阵雨",
      url: weather33,
    },
    {
      id: 34,
      name: "极端降雨",
      url: weather34,
    },
    {
      id: 35,
      name: "毛毛雨/细雨",
      url: weather35,
    },
    {
      id: 36,
      name: "雨",
      url: weather36,
    },
    {
      id: 37,
      name: "小雨-中雨",
      url: weather37,
    },
    {
      id: 38,
      name: "中雨-大雨",
      url: weather38,
    },
    {
      id: 39,
      name: "大雨-暴雨",
      url: weather39,
    },
    {
      id: 40,
      name: "暴雨-大暴雨",
      url: weather40,
    },
    {
      id: 41,
      name: "大暴雨-特大暴雨",
      url: weather41,
    },
    {
      id: 42,
      name: "雨雪天气",
      url: weather42,
    },
    {
      id: 43,
      name: "雨夹雪",
      url: weather43,
    },
    {
      id: 44,
      name: "阵雨夹雪",
      url: weather44,
    },
    {
      id: 45,
      name: "冻雨",
      url: weather45,
    },
    {
      id: 46,
      name: "雪",
      url: weather46,
    },
    {
      id: 47,
      name: "阵雪",
      url: weather47,
    },
    {
      id: 48,
      name: "小雪",
      url: weather48,
    },
    {
      id: 49,
      name: "中雪",
      url: weather49,
    },
    {
      id: 50,
      name: "大雪",
      url: weather50,
    },
    {
      id: 51,
      name: "暴雪",
      url: weather51,
    },
    {
      id: 52,
      name: "小雪-中雪",
      url: weather52,
    },
    {
      id: 53,
      name: "中雪-大雪",
      url: weather53,
    },
    {
      id: 54,
      name: "大雪-暴雪",
      url: weather54,
    },
    {
      id: 55,
      name: "浮尘",
      url: weather55,
    },
    {
      id: 56,
      name: "扬沙",
      url: weather56,
    },
    {
      id: 57,
      name: "沙尘暴",
      url: weather57,
    },
    {
      id: 58,
      name: "强沙尘暴",
      url: weather58,
    },
    {
      id: 59,
      name: "龙卷风",
      url: weather59,
    },
    {
      id: 60,
      name: "雾",
      url: weather60,
    },
    {
      id: 61,
      name: "浓雾",
      url: weather61,
    },
    {
      id: 62,
      name: "强浓雾",
      url: weather62,
    },
    {
      id: 63,
      name: "轻雾",
      url: weather63,
    },
    {
      id: 64,
      name: "大雾",
      url: weather64,
    },
    {
      id: 65,
      name: "特强浓雾",
      url: weather65,
    },
    {
      id: 66,
      name: "热",
      url: weather66,
    },
    {
      id: 67,
      name: "冷",
      url: weather67,
    },
    {
      id: 68,
      name: "未知",
      url: weather68,
    },
  ];
  return weatherList.filter((item) => item.name == name)[0].url;
}
