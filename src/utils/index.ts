/*
 * @Author: lzp
 * @Date: 2022-12-23 22:45:35
 * @Description: file content
 */
export function randomColor() {
  var color = "#";
  var randomArr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ]; //这是颜色构成的所有情况
  for (var i = 0; i < 6; i++) {
    color += randomArr[parseInt(Math.random() * 15)];
  }
  return color;
}
//获取min和max之间的一个随机整数[5,100];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//打乱数组
export function shuffle(arr) {
  let _arr = arr.slice(); //slice不会影响原来的数组，但是splice就会影响原来的arr数组
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}
