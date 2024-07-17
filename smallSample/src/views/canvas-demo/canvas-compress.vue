<template>
  <div class="page">
    <h2 class="header">canvas画布图片压缩</h2>
    <div class="content" ref="contentRef">
      <input type="file" @change="handleFileChange" accept="image/*" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
const contentRef = ref<HTMLDivElement>()

// 把图片文件转为base64
function convertImageToBase64(file_: File) {
  // function convertImageToBase64(file_: File, callBack: (base64Image: string) => void) {
  return new Promise<string>((resolve) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      // reader.result 和 e.target?.result 是同一个值
      const base64Image = e.target?.result as string;
      // callBack && callBack(base64Image)
      // 触发垃圾回收
      reader = null as any
      resolve(base64Image)
    }
    reader.onerror = function () {
      resolve('')
    }
    reader.readAsDataURL(file_);
  })
}

// 压缩图片
function compress(base64Image: string, callBack: (_base64Image: string) => void) {
  /** 压缩图片
   * 1. 得到一个base64的图片
   * 2. 创建一个Image对象，获取到base64图片的宽高，并对它的宽高压缩
   * 3. 创建一个canvas绘制这个压缩后的图片，然后也输出base64的图片
   * 3.1 设置canvas的宽高为Image的宽高(压缩后的宽高)
   * 3.2 调用canvas的drawImage方法，将Image绘制到canvas上
   * 3.3 调用canvas的toDataURL方法，修改图片的分辨率，并将canvas转为base64Image
   * 3.4 然后返回压缩后的base64图片
   */

  // console.log(base64Image);
  let maxW = 1000
  let maxH = 1000
  const image = new Image()
  image.onload = function () {
    // console.log(image.naturalWidth, image.naturalHeight);
    let ratio = 1 // 图片的压缩比
    let needCompress = false // 是否需要压缩
    if (maxW < image.naturalWidth) {
      needCompress = true
      ratio = image.naturalWidth / maxW
      maxH = Math.floor(image.naturalHeight / ratio)
    }
    if (maxH < image.naturalHeight) {
      needCompress = true
      ratio = image.naturalHeight / maxH
      maxW = Math.floor(image.naturalWidth / ratio)
    }
    if (!needCompress) {
      // 如果不需要压缩，则使用图片的原始尺寸
      maxW = image.naturalWidth
      maxH = image.naturalHeight
    }

    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', '__compress_canvas__')
    canvas.width = maxW
    canvas.height = maxH
    canvas.style.visibility = 'hidden' // visible
    contentRef.value?.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    // 清除一个矩形空间内的内容
    ctx?.clearRect(0, 0, maxW, maxH)
    // 绘制图片到canvas上
    ctx?.drawImage(image, 0, 0, maxW, maxH)
    // 压缩后的base64图片
    const compressImage = canvas.toDataURL('image/jpeg', 0.8)
    canvas.remove()
    image.remove()
    // console.log(compressImage);

    callBack && callBack(compressImage)

    // const _image = new Image()
    // _image.src = compressImage
    // contentRef.value?.appendChild(_image)

    console.log(`压缩比：${base64Image.length / compressImage.length}`)

  }
  image.src = base64Image
  image.style.display = 'none'
  // image.width = 100
  // document.body.appendChild(image)
  contentRef.value?.appendChild(image)
}

const ACCEPTS = ['image/png', 'image/jpeg', 'image/jpg']
// 1M = 1024 KB千字节  1KB = 1024 B字节
const MAXSIZE_NUM = 3
const MAXSIZE = 1024 * 1024 * MAXSIZE_NUM // 3M
const MAXSIZE_STR = `${MAXSIZE_NUM}M`
const handleFileChange = async (evt: Event) => {
  const inputEl = evt.target as HTMLInputElement
  const [file] = inputEl.files!
  if (!file) return
  console.log('未压缩', file)
  const { type: fileType, size: fileSize, name: fileName } = file
  // 图片类型检查，不支持的类型处理
  if (!ACCEPTS.includes(fileType)) {
    inputEl.value = ''
    return alert(`不支持[${fileType}]文件类型`)
  }
  // 图片大小检查，超出限制处理
  if (fileSize > MAXSIZE) {
    inputEl.value = ''
    return alert(`文件大小不能超过${MAXSIZE_STR}`)
  }
  // 压缩图片, 先将图片文件转为base64
  const base64Image = await convertImageToBase64(file)
  compress(base64Image, (_base64Image) => {
    const imageStream = new Blob([_base64Image], { type: 'image/jpeg' })
    const formData = new FormData()
    formData.append('file', imageStream, fileName)
    console.log('已压缩', formData.get('file'))


    // 下载压缩后的图片
    // const downA = document.createElement('a')
    // downA.href = _base64Image
    // downA.download = `压缩后的_${fileName.split('.')[0]}.jpg`
    // downA.click()

    // 发送请求上传压缩后的图片
    fetch('http://127.0.0.1:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

  })
}
</script>
<style lang="scss" scoped>
.page {
  background-color: #fff;
  font-size: 16px;

  .content {
    height: calc(100vh - 0.8rem);
    padding-top: 20px;
    overflow: hidden;
  }
}
</style>
