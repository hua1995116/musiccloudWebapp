/**
 * Created by Administrator on 2017/3/26.
 */
export function changeTime(time) {
  var minute = parseInt(time / 60);
  if (minute < 10) {
    minute = '0' + minute;
  }
  var secound = parseInt(time % 60);
  if (secound < 10) {
    secound = '0' + secound;
  }
  return minute + ':' + secound;
}
