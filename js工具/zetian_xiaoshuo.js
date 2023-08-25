// https://www.bookcheng58.com/16_16403/

let db;
const openRequest = indexedDB.open('books', 1);
openRequest.onupgradeneeded = function () {
  // 如果客户端没有数据库则触发
  // ...执行初始化...
}

openRequest.onerror = function () {
  console.error("Error", openRequest.error);
}

openRequest.onsuccess = function () {
  db = openRequest.result
  // 继续使用 db 对象处理数据库
}
openRequest.onupgradeneeded = function (event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains('zetian')) {
    const objectStore = db.createObjectStore('zetian', {autoIncrement: true});
    objectStore.createIndex('name', 'name', {unique: true});
  }
}

function addSql({name, text}) {
  const openRequest = db.transaction(['zetian'], 'readwrite')
    .objectStore('zetian')
    .add({name, text});

  openRequest.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  openRequest.onerror = function (event) {
    console.log('数据写入失败');
  }
}

// 通过主键的值来找
function readOfIndex(index) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction(['zetian']);
    var objectStore = transaction.objectStore('zetian');
    var request = objectStore.get(index);
    request.onerror = function (event) {
      console.log('事务失败', event);
      reject()
    };
    request.onsuccess = function (event) {
      if (request.result) {
        // 数据库已经存在
        resolve(request.result)
      } else {
        // console.log('未获得数据记录');
        resolve(false)
      }
    };
  })
}

// 通过name索引来找
function readOfName(name) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction(['zetian'], 'readonly');
    var store = transaction.objectStore('zetian');
    var index = store.index('name');
    var request = index.get(name);
    request.onerror = function (event) {
      console.log('readOfName', event)
      reject()
    };
    request.onsuccess = function (e) {
      var result = e.target.result;
      if (result) {
        // 已存在数据
        resolve(result)
      } else {
        // 没有
        resolve(false)
      }
    }
  })
}
// 遍历读取所有数据
function readAllSql() {
  const arr = []
  var objectStore = db.transaction('zetian').objectStore('zetian');
  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      // console.log(cursor.value);
      arr.push(cursor.value)
      cursor.continue();
    } else {
      console.log('没有更多数据了！');
      download("遮天.json", JSON.stringify(arr))
      download("遮天.txt", JSON.stringify(arr.map(t => t.text.join('    ')).join('    ')))
    }
  };
}

async function setSql(name, text) {
  try {
    const haveData = await readOfName(name)
    !haveData && addSql({name, text})
  } catch (e) {
    console.log(e, 'aaaa')
    addSql({name, text})
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const global_num = 1822
// const pageNum = Math.ceil(1822 / global_num)
const pageNum = 1

// const pageNum = Math.ceil(500 / global_num)

// [...document.querySelector('#list dl').children].slice(225, 225 + 1)[0].innerText
function getBook(startNum = 1070) { // 初始值 11
  const endStrReg = /本章未完，请翻下一页继续阅读........./gim
  const dataObj = {}
  for (const i in new Array(pageNum).fill(0)) {
    dataObj['texts' + (Number(i) + 1)] = []
  }
  const books = [...document.querySelector('#list dl').children].slice(startNum, startNum + 1)
  const mu_lu = books.map(t => ({name: t.textContent, url: t.children[0].getAttribute('href')}))
  for (const i in new Array(pageNum).fill(0)) {
    dataObj['mls' + (Number(i) + 1)] = mu_lu.slice(global_num * i, global_num * (Number(i) + 1))
  }
  for (const i in new Array(pageNum).fill(0)) {
    $('body').append(`<iframe id="cb${i + 1}" src=""></iframe>`)
  }

  function deep(index, mls, cbx) {
    if (!index) {
      for (const i in new Array(pageNum).fill(0)) {
        const url = 'https://www.bookcheng58.com'
        const src = url + dataObj['mls' + (Number(i) + 1)].shift().url
        document.querySelector(`#cb${i + 1}`).src = src
      }
    } else {
      const delItem = mls.shift()
      if (delItem) {
        cbx.src = 'https://www.bookcheng58.com' + delItem.url
      } else {
        console.log(`%c第${index}部分书籍获取完毕👌👌👌🎉🎉🎉`, 'color:#fff;font-weight:bold;line-height:16px;background:green;padding:2px 6px;border-radius:10px;')
      }
    }

  }

  function bind(texts, cb, index, mls) {
    cb.onload = async () => {
      const win = cb.contentWindow
      const doc = cb.contentDocument
      const name = doc.querySelector('.bookname h1').innerText
      const url = win.location.href
      const text = doc.querySelector('#content').textContent.split(/(\s){4}/).filter(t => t.replace(/\s/gim, ''))
        .map(t => t.replace(endStrReg, ''));
      // texts.push({text, name, url})
      await setSql(name, text)
      // if (endStrReg.test(document.body.textContent))
      const nextPageUrl = doc.querySelectorAll('.bookname .bottem1 a')[3].getAttribute('href')
      console.log(name, nextPageUrl)
      if (nextPageUrl) {
        setTimeout(() => {
          win.location.href = nextPageUrl
        }, 100)
      }
      // setTimeout(() => deep(index, mls, cb), 200)
    }
  }

  for (const i in new Array(pageNum).fill(0)) {
    bind(dataObj['texts' + (Number(i) + 1)], document.querySelector(`#cb${i + 1}`), i + 1, dataObj['mls' + (Number(i) + 1)])
  }
  deep()
  return dataObj
}

const dataObj = getBook()


// 最合并结果
// const bookTexts = []
// for (const i in new Array(pageNum).fill(0)) {
//     bookTexts.push(dataObj['texts' + (Number(i) + 1)])
// }
//
// download("遮天_0-500.json.txt", JSON.stringify(bookTexts))
//
// download("遮天_0-500.txt", bookTexts.flat().map(t => t.name + '    ' + t.text.join('    ')).join('    '))

