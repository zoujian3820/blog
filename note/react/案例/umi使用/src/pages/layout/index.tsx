/*
 * @Author: mrzou
 * @Date: 2021-07-10 19:33:00
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-11 00:29:31
 * @Description: file content
 */
import React from 'react';
import styles from './index.less';

export default function Page({children, ...props}) {
  console.log('out layout', props)
  return (
    <div>
      <h1 className={styles.title}>Page layout/index-全局</h1>
      {children}
    </div>
  );
}
