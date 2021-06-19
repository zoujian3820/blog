/*
 * @Author: mrzou
 * @Date: 2021-04-22 20:50:02
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-22 21:09:14
 * @Description: file content
 */
const msg = 'typescript'
function syHello(msg: string) {
    return  'aaa' + msg
}

document.body.textContent = syHello(msg)