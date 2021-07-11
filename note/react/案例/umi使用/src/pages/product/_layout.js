/*
 * @Author: mrzou
 * @Date: 2021-07-10 19:33:00
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-11 00:44:48
 * @Description: file content
 */
import React from 'react';
import styles from './_layout.css';
import { useLocation, useHistory, useParams, useRouteMatch, withRouter } from 'umi'
export const Ar = withRouter((props) => {
  const location = useLocation()
  console.log(props, 'hhhhhhhhhhhh', location, useParams(), useHistory(), useRouteMatch())
  return <div>
    5555555555
  </div>
})


export default function Page({ children, ...props }) {
  console.log('props-layout', props); //sy-log

  return (
    <div>
      <h1 className={styles.title}>Page product/_layout</h1>
      <Ar />
      {children}
    </div>
  );
}
