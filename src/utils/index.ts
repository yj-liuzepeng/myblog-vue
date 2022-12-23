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
