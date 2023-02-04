<template>
  <div id="coolClockWrap">
    <canvas
      id="coolClockCanvas"
      :width="coolClockState.canvas.width"
      :height="coolClockState.canvas.height"
    ></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive } from "vue";
const props = defineProps({
  ringcolor: {
    type: String,
    default: "",
  },
});
const coolClockState = reactive({
  canvas: {
    width: 200,
    height: 200,
  },
  L: 0, // 基础半径

  timer: null,
  drawCoolClock: () => {
    let canvas = document.getElementById("coolClockCanvas");
    let ctx = canvas.getContext("2d");
    let [x0, y0] = [
      coolClockState.canvas.width / 2,
      coolClockState.canvas.height / 2,
    ]; //获取圆心x,y
    coolClockState.L = coolClockState.canvas.width / 2 - 10; //设置圆半径
    let [hourMaxL, hourMinL] = [coolClockState.L, coolClockState.L - 50]; //获取时刻度首位距离x0,y0位置
    let [minMaxL, minMinL] = [coolClockState.L - 2, coolClockState.L - 10];
    let centerL = 3;
    let oDate = new Date(); //绑定当前时间
    let oHours = oDate.getHours();
    let oMin = oDate.getMinutes();
    let oSen = oDate.getSeconds();
    let oHoursValue = -90 + oHours * 30 + oMin / 2; //获取小时的角度
    let oMinValue = -90 + oMin * 6;
    let oSenValue = -90 + oSen * 6;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //清除画布
    coolClockState.drawHoursScale(ctx, x0, y0, 0, 1, hourMaxL, hourMinL); //绘制表盘的时钟刻度scale

    coolClockState.drawHoursScale(ctx, x0, y0, 60, 1, minMaxL, minMinL); //绘制表盘分钟刻度

    coolClockState.drawScaleNum(ctx, hourMinL - 110, x0, y0); //绘制12个表盘数字
    coolClockState.drawTimeNeedle(ctx, x0, y0, 4, 45, oHoursValue, "#7a7a7a"); //绘制时针
    coolClockState.drawTimeNeedle(
      ctx,
      x0,
      y0,
      3,
      minMaxL - 30,
      oMinValue,
      "#95cde9"
    ); //绘制分针
    coolClockState.drawTimeNeedle(
      ctx,
      x0,
      y0,
      1,
      minMaxL - 20,
      oSenValue,
      "#f3a829"
    ); //绘制秒针
    coolClockState.drawSenDotted(
      ctx,
      "#60997f",
      x0,
      y0,
      oSenValue - 360,
      centerL
    ); //绘制秒针尾部
    coolClockState.drawCircleCenter(ctx, x0, y0, "#60997f", centerL); //绘制圆心
    coolClockState.drawRing(
      ctx,
      props.ringcolor,
      coolClockState.canvas.width,
      coolClockState.canvas.height,
      100,
      90
    ); //绘制圆心
  },
  // 绘制表盘外环
  drawRing: (ctx, fillColor, w, h, r1, r2) => {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, r1, 0, Math.PI * 2);
    ctx.moveTo(w / 2 + r2, h / 2);
    ctx.arc(w / 2, h / 2, r2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
  },
  //绘制表盘刻度
  drawHoursScale: (ctx, x0, y0, scaleNum, scaleW, maxL, minL) => {
    for (let i = 0; i < scaleNum; i++) {
      let angel = -90 + i * (360 / scaleNum); //角度
      let [x1, y1] = [
        x0 + Math.cos((angel * Math.PI) / 180) * maxL,
        y0 + Math.sin((angel * Math.PI) / 180) * maxL,
      ];
      let [x2, y2] = [
        x0 + Math.cos((angel * Math.PI) / 180) * minL,
        y0 + Math.sin((angel * Math.PI) / 180) * minL,
      ];
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = scaleW;
      ctx.lineCap = "round";
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  },
  //绘制12个表盘数字
  drawScaleNum: (ctx, L, x0, y0) => {
    for (let i = 0; i < 12; i++) {
      let angel = -270 + i * (360 / 12); //角度
      let [x, y] = [
        x0 + Math.cos((angel * Math.PI) / 180) * L,
        y0 + Math.sin((angel * Math.PI) / 180) * L,
      ];
      let num = i == 0 ? 12 : i;
      ctx.save();
      ctx.beginPath();
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(num, x, y);
      ctx.closePath();
      ctx.restore();
    }
  },
  //绘制时针，分针，秒针
  drawTimeNeedle: (ctx, x0, y0, lineW, L, angel, color = "#000") => {
    let [x, y] = [
      x0 + Math.cos((angel * Math.PI) / 180) * L,
      y0 + Math.sin((angel * Math.PI) / 180) * L,
    ];
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineW;
    ctx.lineCap = "round";
    ctx.moveTo(x0, y0);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  },
  //绘制秒针尾部
  drawCircleCenter: (ctx, x0, y0, color, L) => {
    ctx.save();
    ctx.beginPath();
    ctx.shadowBlur = 4;
    ctx.shadowColor = "#000";
    ctx.fillStyle = color;
    ctx.arc(x0, y0, L, 0, (360 * Math.PI) / 180);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  },
  //绘制圆心
  drawSenDotted: (ctx, color, x0, y0, angel, L) => {
    let [x, y] = [
      x0 + Math.cos((angel * Math.PI) / 180) * L,
      y0 + Math.sin((angel * Math.PI) / 180) * L,
    ];
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 7, 0, (360 * Math.PI) / 180);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  },
});
onMounted(() => {
  coolClockState.drawCoolClock();
  coolClockState.timer = setInterval(() => {
    coolClockState.drawCoolClock();
  }, 30);
});
onUnmounted(() => {
  clearInterval(coolClockState.timer);
  coolClockState.timer = null;
});
</script>

<style lang="scss" scoped>
#coolClockWrap {
  width: 100%;
  height: 100%;
  // background: radial-gradient(#f8f6f5, #f7f5f4, #e4e3e2, #b9b8b7);
  display: flex;
  align-items: center;
  justify-content: center;
}

#coolClockCanvas {
}
</style>
