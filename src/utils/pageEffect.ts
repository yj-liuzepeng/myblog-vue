/*
 * @Author: lzp
 * @Date: 2022-04-17 18:32:18
 * @Description: 页面效果
 */
// 滚动到页面顶部
export function goTop() {
    let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
    let step = distance / 30; //每步的距离
    (function jump() {
      if (distance > 0) {
        distance -= step;
        window.scrollTo(0, distance);
        setTimeout(jump, 10);
      }
    })();
}