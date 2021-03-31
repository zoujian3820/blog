
const orginalProto = Array.prototype;
// 备份一份，并修改备份
const arrayProto = Object.create(orginalProto);
["push", "pop", "shift", "unshift"].forEach((method) => {
  arrayProto[method] = function () {
    // 原始操作
    orginalProto[method].apply(this, arguments);
    // 覆盖操作，通知更新
    console.log('数组操作:' + method + ' -- 通知Vue更新....')
  };
});

class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data || {}
    observe(this.$data)
    proxy(this)
    new Compile(options.el, this)
  }
}

function proxy(vm) {
  if(typeof vm !== 'object') return;
  const keys = Object.keys(vm.$data)
  keys.forEach(key => {
    Object.defineProperty(vm, key, {
      get(){
        return vm.$data[key]
      },
      set(v){
        vm.$data[key] = v
      }
    })
  })
}

class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm
    this.compile(this.$el)
    console.log('Compile init')
  }

  update(node, dir, exp) {
    this[dir+'Update'] && this[dir + 'Update'](node, this.$vm[exp])
    new Watcher(this.$vm, exp, (value) => {
      this[dir + 'Update'](node, value)
    })
  }

  text(node, val) {
    this.update(node, 'text', val)
  }

  textUpdate(node, val) {
    node.textContent = val
  }

  html(node, val) {
    this.update(node, 'html', val)
  }

  htmlUpdate(node, val) {
    node.innerHTML = val
  }

  model(node, val) {
    this.update(node, 'model', val)
    node.addEventListener('input', (e) => {
      this.$vm[val] = e.target.value
    })
  }

  modelUpdate(node, val){
    node.value = val
  }

  eventHandler(node, dir, val) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[val]
    node.addEventListener(dir, fn.bind(this.$vm, node))
  }

  getTextVal(obj, exp){
    let val = ''
    exp.split('.').forEach(a => {
      val = val ? val[a] : obj[a]
    })
    return val
  }
  compile(el) {
    Array.from(el.childNodes).forEach(node => {
      if (this.isElement(node)) {
        this.compileElement(node)
      }
      if (this.isText(node)) {
        // xxxx{{name}}mmmmmm{{age}}pppp{{user.info.phone}}oopopp
        // const val = node.textContent.replace(/\{\{((?:.|\r?\n)+?)\}\}/g, (exp)=>{
        //   if(this.isInter(exp)) {
        //     // 解决链式调用获取值
        //     return this.getTextVal(this.$vm.$data, RegExp.$1)// this.$vm.$data[RegExp.$1]
        //   } else {
        //     return exp
        //   }
        // })
        this.compileText(node)
      }
    })
  }

  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      const name = attr.name
      const val = attr.value
      if (this.isDir(name)) {
        const dir = name.substring(2) // v-text="name"
        this[dir] && this[dir](node, val)
      }
      if (this.isEvent(attr.name)) {
        const dir = name.substring(1) // @click="onclick"
        this.eventHandler(node, dir, val)
        // this[dir] && this[dir](node, val)
      }
    })
    this.compile(node)
  }

  compileText(node) {
    this.update(node, 'text', RegExp.$1)
  }

  isElement(node) {
    return node.nodeType === 1
  }

  isEvent(attrName) {
    return attrName.startsWith('@')
  }

  isDir(attrName) {
    return attrName.startsWith('v-')
  }

  isInter(str){
    return /\{\{(.*)\}\}/gim.test(str)
  }

  isText(node){
    return node.nodeType === 3 && this.isInter(node.textContent)
  }
}

function observe(data) {
  if (typeof data != 'object' || data == null) {
    return
  }

  new Observer(data)
}

class Observer {
  constructor(data) {
    this.data = data
    if (Array.isArray(data)) {
      data.__proto__ = arrayProto
      data.forEach(item => {
        this.walk(item)
      })
    } else {
      this.walk(data)
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      definedReactive(obj, key, obj[key])
    })
  }
}

class Watcher {
  constructor(vm, exp, fn) {
    this.$vm = vm
    this.exp = exp
    this.fn = fn
    Dep.target = this
    this.$vm[exp]
    Dep.target = null
  }

  update() {
    this.fn.call(this.$vm, this.$vm[this.exp])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => {
      dep.update && dep.update()
    })
  }
}

function definedReactive(obj, key, val) {
  observe(val)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.addDep(Dep.target)
      }
      return val
    },
    set(v) {
      if (v !== val) {
        val = v
        dep.notify()
      }
    }
  })
}
