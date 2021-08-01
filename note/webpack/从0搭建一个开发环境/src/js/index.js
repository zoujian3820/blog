/*
 * @Author: mrzou
 * @Date: 2021-07-31 20:10:08
 * @LastEditors: mrzou
 * @LastEditTime: 2021-08-01 19:18:32
 * @Description: file content
 */
// 引入 iconfont 样式文件
import '../font/iconfont.css';
import '../css/less.less';
import '../css/scss.scss';

function aa(s, x) {
  // 下一行eslint所有规则都失效（下一行不进行eslint检查）
  // eslint-disable-next-line
  console.log(s, x);
  return s + x;
}
aa(6, 6);
