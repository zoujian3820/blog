const orginalProto = Array.prototype;
// 备份一份，并修改备份
const arrayProto = Object.create(orginalProto);
["push", "pop", "shift", "unshift", "splice", "reverse", "sort"].forEach(
  (method) => {
    arrayProto[method] = function () {
      // 原始操作
      orginalProto[method].apply(this, arguments);
      // 覆盖操作，通知更新
      console.log("数组操作:" + method + " -- 通知Vue更新....");
      const ob = this.__ob__;
      ob.dep.notify();
    };
  }
);

class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data || {};
    observe(this.$data);
    proxy(this);
    new Compile(options.el, this);
  }
}

function proxy(vm) {
  if (typeof vm !== "object") return;
  const keys = Object.keys(vm.$data);
  keys.forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(v) {
        vm.$data[key] = v;
      },
    });
  });
}

function getV(vm, exp) {
  if (exp.includes(".") || exp.includes("[")) {
    return ((vm, key) => {
      const run = new Function("vm", "return vm." + key);
      return run(vm);
    })(vm, exp);
  } else {
    return vm[exp];
  }
}

class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    this.compile(this.$el);
    console.log("Compile init");
  }

  update(node, dir, exp) {
    const fn = this[dir + "Update"];

    fn && fn(node, getV(this.$vm, exp));

    new Watcher(this.$vm, exp, (value) => {
      fn && fn(node, getV(this.$vm, exp));
    });
  }

  text(node, val) {
    this.update(node, "text", val);
  }

  textUpdate(node, val) {
    node.textContent = val;
  }

  html(node, val) {
    this.update(node, "html", val);
  }

  htmlUpdate(node, val) {
    node.innerHTML = val;
  }

  model(node, val) {
    this.update(node, "model", val);
    node.addEventListener("input", (e) => {
      this.$vm[val] = e.target.value;
    });
  }

  modelUpdate(node, val) {
    node.value = val;
  }

  eventHandler(node, dir, val) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[val];
    node.addEventListener(dir, fn.bind(this.$vm, node));
  }

  compile(el) {
    Array.from(el.childNodes).forEach((node) => {
      if (this.isElement(node)) {
        this.compileElement(node);
      }
      if (this.isText(node)) {
        this.compileText(node);
      }
    });
  }

  compileElement(node) {
    Array.from(node.attributes).forEach((attr) => {
      const name = attr.name;
      const val = attr.value;
      if (this.isDir(name)) {
        const dir = name.substring(2); // v-text="name"
        this[dir] && this[dir](node, val);
      }
      if (this.isEvent(attr.name)) {
        const dir = name.substring(1); // @click="onclick"
        this.eventHandler(node, dir, val);
        // this[dir] && this[dir](node, val)
      }
    });
    this.compile(node);
  }

  compileText(node) {
    this.update(node, "text", RegExp.$1);
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  isEvent(attrName) {
    return attrName.startsWith("@");
  }

  isDir(attrName) {
    return attrName.startsWith("v-");
  }

  isInter(str) {
    return /\{\{(.*)\}\}/gim.test(str);
  }

  isText(node) {
    return node.nodeType === 3 && this.isInter(node.textContent);
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function observe(value) {
  if (typeof value != "object" || value == null) {
    return;
  }
  // 获取ob实例
  let ob;
  // 如果有 __ob__属性，则表示此数据，已经是响应式了
  if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    // 则直接使用
    ob = value.__ob__;
  } else {
    // 初始创建一次
    ob = new Observer(value);
  }

  return ob;
}

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}

class Observer {
  constructor(data) {
    this.data = data;
    this.dep = new Dep();
    def(data, "__ob__", this);

    if (Array.isArray(data)) {
      data.__proto__ = arrayProto;
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }

  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      defineReactive(items, i, items[i]);
    }
  }
}

class Watcher {
  constructor(vm, exp, fn) {
    this.$vm = vm;
    this.exp = exp;
    this.fn = fn;
    this.newDeps = []; //new Set()

    Dep.target = this;
    getV(this.$vm, exp);
    Dep.target = null;
  }

  update() {
    const val = this.$vm[this.exp];
    this.fn.call(this.$vm, val);
  }

  addDep(dep) {
    this.newDeps.push(dep);
    dep.addDep(this);
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach((dep) => {
      dep.update && dep.update();
    });
  }

  depend() {
    if (Dep.target) {
      // 执行的是watcher的addDep
      Dep.target.addDep(this);
    }
  }
}

function defineReactive(obj, key, val) {
  let childOb = observe(val);

  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend(Dep.target);
        if (childOb) {
          // 如果有子ob，子ob也要做依赖收集
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(v) {
      if (v !== val) {
        observe(v);
        val = v;
        // 通知更新
        dep.notify();
      }
    },
  });
}
