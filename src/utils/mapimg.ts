/*
 * @Author: lzp
 * @Date: 2022-03-26 08:52:03
 * @Description: 天气组件图片
 */


export default function MapLoader(name) {
  let weatherList = [
    {
      id: 1,
      name: "晴",
      url: 'https://liuzepeng.com/weather01.png',
    },
    {
      id: 2,
      name: "少云",
      url: 'https://liuzepeng.com/weather02.png',
    },
    {
      id: 3,
      name: "晴间多云",
      url: 'https://liuzepeng.com/weather03.png',
    },
    {
      id: 4,
      name: "多云",
      url: 'https://liuzepeng.com/weather04.png',
    },
    {
      id: 5,
      name: "阴",
      url: 'https://liuzepeng.com/weather05.png',
    },
    {
      id: 6,
      name: "有风",
      url: 'https://liuzepeng.com/weather06.png',
    },
    {
      id: 7,
      name: "平静",
      url: 'https://liuzepeng.com/weather07.png',
    },
    {
      id: 8,
      name: "微风",
      url: 'https://liuzepeng.com/weather08.png',
    },
    {
      id: 9,
      name: "和风",
      url: 'https://liuzepeng.com/weather09.png',
    },
    {
      id: 10,
      name: "清风",
      url: 'https://liuzepeng.com/weather10.png',
    },
    {
      id: 11,
      name: "强风/劲风",
      url: 'https://liuzepeng.com/weather11.png',
    },
    {
      id: 12,
      name: "疾风",
      url: 'https://liuzepeng.com/weather12.png',
    },
    {
      id: 13,
      name: "大风",
      url: 'https://liuzepeng.com/weather13.png',
    },
    {
      id: 14,
      name: "烈风",
      url: 'https://liuzepeng.com/weather14.png',
    },
    {
      id: 15,
      name: "风暴",
      url: 'https://liuzepeng.com/weather15.png',
    },
    {
      id: 16,
      name: "狂爆风",
      url: 'https://liuzepeng.com/weather16.png',
    },
    {
      id: 17,
      name: "飓风",
      url: 'https://liuzepeng.com/weather17.png',
    },
    {
      id: 18,
      name: "热带风暴",
      url: 'https://liuzepeng.com/weather18.png',
    },
    {
      id: 19,
      name: "霾",
      url: 'https://liuzepeng.com/weather19.png',
    },
    {
      id: 20,
      name: "中度霾",
      url: 'https://liuzepeng.com/weather20.png',
    },
    {
      id: 21,
      name: "重度霾",
      url: 'https://liuzepeng.com/weather21.png',
    },
    {
      id: 22,
      name: "严重霾",
      url: 'https://liuzepeng.com/weather22.png',
    },
    {
      id: 23,
      name: "阵雨",
      url: 'https://liuzepeng.com/weather23.png',
    },
    {
      id: 24,
      name: "雷阵雨",
      url: 'https://liuzepeng.com/weather24.png',
    },
    {
      id: 25,
      name: "雷阵雨并伴有冰雹",
      url: 'https://liuzepeng.com/weather25.png',
    },
    {
      id: 26,
      name: "小雨",
      url: 'https://liuzepeng.com/weather26.png',
    },
    {
      id: 27,
      name: "中雨",
      url: 'https://liuzepeng.com/weather27.png',
    },
    {
      id: 28,
      name: "大雨",
      url: 'https://liuzepeng.com/weather28.png',
    },
    {
      id: 29,
      name: "暴雨",
      url: 'https://liuzepeng.com/weather29.png',
    },
    {
      id: 30,
      name: "大暴雨",
      url: 'https://liuzepeng.com/weather30.png',
    },
    {
      id: 31,
      name: "特大暴雨",
      url: 'https://liuzepeng.com/weather31.png',
    },
    {
      id: 32,
      name: "强阵雨",
      url: 'https://liuzepeng.com/weather32.png',
    },
    {
      id: 33,
      name: "强雷阵雨",
      url: 'https://liuzepeng.com/weather33.png',
    },
    {
      id: 34,
      name: "极端降雨",
      url: 'https://liuzepeng.com/weather34.png',
    },
    {
      id: 35,
      name: "毛毛雨/细雨",
      url: 'https://liuzepeng.com/weather35.png',
    },
    {
      id: 36,
      name: "雨",
      url: 'https://liuzepeng.com/weather36.png',
    },
    {
      id: 37,
      name: "小雨-中雨",
      url: 'https://liuzepeng.com/weather37.png',
    },
    {
      id: 38,
      name: "中雨-大雨",
      url: 'https://liuzepeng.com/weather38.png',
    },
    {
      id: 39,
      name: "大雨-暴雨",
      url: 'https://liuzepeng.com/weather39.png',
    },
    {
      id: 40,
      name: "暴雨-大暴雨",
      url: 'https://liuzepeng.com/weather40.png',
    },
    {
      id: 41,
      name: "大暴雨-特大暴雨",
      url: 'https://liuzepeng.com/weather41.png',
    },
    {
      id: 42,
      name: "雨雪天气",
      url: 'https://liuzepeng.com/weather42.png',
    },
    {
      id: 43,
      name: "雨夹雪",
      url: 'https://liuzepeng.com/weather43.png',
    },
    {
      id: 44,
      name: "阵雨夹雪",
      url: 'https://liuzepeng.com/weather44.png',
    },
    {
      id: 45,
      name: "冻雨",
      url: 'https://liuzepeng.com/weather45.png',
    },
    {
      id: 46,
      name: "雪",
      url: 'https://liuzepeng.com/weather46.png',
    },
    {
      id: 47,
      name: "阵雪",
      url: 'https://liuzepeng.com/weather47.png',
    },
    {
      id: 48,
      name: "小雪",
      url: 'https://liuzepeng.com/weather48.png',
    },
    {
      id: 49,
      name: "中雪",
      url: 'https://liuzepeng.com/weather49.png',
    },
    {
      id: 50,
      name: "大雪",
      url: 'https://liuzepeng.com/weather50.png',
    },
    {
      id: 51,
      name: "暴雪",
      url: 'https://liuzepeng.com/weather51.png',
    },
    {
      id: 52,
      name: "小雪-中雪",
      url: 'https://liuzepeng.com/weather52.png',
    },
    {
      id: 53,
      name: "中雪-大雪",
      url: 'https://liuzepeng.com/weather53.png',
    },
    {
      id: 54,
      name: "大雪-暴雪",
      url: 'https://liuzepeng.com/weather54.png',
    },
    {
      id: 55,
      name: "浮尘",
      url: 'https://liuzepeng.com/weather55.png',
    },
    {
      id: 56,
      name: "扬沙",
      url: 'https://liuzepeng.com/weather56.png',
    },
    {
      id: 57,
      name: "沙尘暴",
      url: 'https://liuzepeng.com/weather57.png',
    },
    {
      id: 58,
      name: "强沙尘暴",
      url: 'https://liuzepeng.com/weather58.png',
    },
    {
      id: 59,
      name: "龙卷风",
      url: 'https://liuzepeng.com/weather59.png',
    },
    {
      id: 60,
      name: "雾",
      url: 'https://liuzepeng.com/weather60.png',
    },
    {
      id: 61,
      name: "浓雾",
      url: 'https://liuzepeng.com/weather61.png',
    },
    {
      id: 62,
      name: "强浓雾",
      url: 'https://liuzepeng.com/weather62.png',
    },
    {
      id: 63,
      name: "轻雾",
      url: 'https://liuzepeng.com/weather63.png',
    },
    {
      id: 64,
      name: "大雾",
      url: 'https://liuzepeng.com/weather64.png',
    },
    {
      id: 65,
      name: "特强浓雾",
      url: 'https://liuzepeng.com/weather65.png',
    },
    {
      id: 66,
      name: "热",
      url: 'https://liuzepeng.com/weather66.png',
    },
    {
      id: 67,
      name: "冷",
      url: 'https://liuzepeng.com/weather67.png',
    },
    {
      id: 68,
      name: "未知",
      url: 'https://liuzepeng.com/weather68.png',
    },
  ];
  return weatherList.filter((item) => item.name == name)[0].url;
}
