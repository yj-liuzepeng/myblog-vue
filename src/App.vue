<!--
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: file content
-->
<template>
  <router-view />
</template>

<script lang="ts" setup>
import { getCurStyle } from './apis/style'
import { styleone, styletwo } from './styles/skinstyles/styles'
// const styleone = {
//   headerstyle: {
//     bgc: "#2b3645",
//     textcolor: "#fff",
//     activetextcolor: "#4c9b7d",
//   },
//   authorstyle: {
//     namecolor: '#4c9b7d',
//     textcolor: "#837d7d"
//   },
//   otherstyle: {
//     scrollbarbgc: '#283646'
//   }
// };

const getStyle = () => {
  getCurStyle().then((res: any) => {
    if (res.code == 200) {
      let styleData = res.data
      styleone.headerstyle.bgc = styleData[0].header_background
      styleone.headerstyle.textcolor = styleData[0].header_color
      styleone.headerstyle.activetextcolor = styleData[0].header_click_color
      styleone.otherstyle.scrollbarbgc = styleData[0].header_background
      styletwo.headerstyle.bgc = styleData[1].header_background
      styletwo.headerstyle.textcolor = styleData[1].header_color
      styletwo.headerstyle.activetextcolor = styleData[1].header_click_color
      styletwo.otherstyle.scrollbarbgc = styleData[0].header_background
    } else {
      styleone.headerstyle.bgc = '#2b3645'
      styleone.headerstyle.textcolor = '#fff'
      styleone.headerstyle.activetextcolor = '#4c9b7d'
      styleone.otherstyle.scrollbarbgc = '#2b3645'
      styletwo.headerstyle.bgc = '#813744'
      styletwo.headerstyle.textcolor = "#fff"
      styletwo.headerstyle.activetextcolor = "#548c96"
      styletwo.otherstyle.scrollbarbgc = '#813744'


    }
  })
}
getStyle()
</script>
<style>
</style>