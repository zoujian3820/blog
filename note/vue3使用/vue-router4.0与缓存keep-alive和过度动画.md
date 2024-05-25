<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [路由 vue-router4.0 与 缓存 keep-alive 和 过度动画](#%E8%B7%AF%E7%94%B1-vue-router40-%E4%B8%8E-%E7%BC%93%E5%AD%98-keep-alive-%E5%92%8C-%E8%BF%87%E5%BA%A6%E5%8A%A8%E7%94%BB)
  - [快速起步](#%E5%BF%AB%E9%80%9F%E8%B5%B7%E6%AD%A5)
  - [动态路由匹配](#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8C%B9%E9%85%8D)
  - [嵌套路由](#%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1)
  - [编程导航](#%E7%BC%96%E7%A8%8B%E5%AF%BC%E8%88%AA)
  - [路由守卫](#%E8%B7%AF%E7%94%B1%E5%AE%88%E5%8D%AB)
  - [路由元数据](#%E8%B7%AF%E7%94%B1%E5%85%83%E6%95%B0%E6%8D%AE)
  - [路由懒加载](#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)
  - [composition api](#composition-api)
  - [缓存和过度动画](#%E7%BC%93%E5%AD%98%E5%92%8C%E8%BF%87%E5%BA%A6%E5%8A%A8%E7%94%BB)
  - [动态路由](#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-05-29 23:06:05
 * @LastEditors: mrzou
 * @LastEditTime: 2021-05-30 00:08:53
 * @Description: file content
-->

## 路由 vue-router4.0 与 缓存 keep-alive 和 过度动画

Vue Router 是官⽅路由库，它和 Vue.js 深度整合，能轻易创建单⻚应⽤程序，和 vue3 搭配的版本将是 vue-router 4.x

### 快速起步

在我们的 vue 项⽬中使⽤

```bash
npm i vue-router@next -S
```

下⾯我们做第⼀个使⽤范例：将课程列表修改为多⻚⾯
添加⼊⼝，App.vue

```jsx
<router-view></router-view>
```

配置路由，router/index.js

```js
import { createRouter, createWebHashHistory } from "vue-router";
import CourseList from "/comps/CourseList.vue";
import CourseAdd from "/comps/CourseAdd.vue";
// 1. 配置路由
const routes = [
  { path: "/", component: CourseList },
  { path: "/add", component: CourseAdd },
];
// 2. 创建路由器实例
export default createRouter({
  // 3. 提供⼀个history实现
  history: createWebHashHistory(),
  routes,
});
```

引⼊ vue-router 插件，main.js

```js
import router from "./router/index";
createApp(App).use(router).mount("#app");
```

CourseList 现在需要⾃⼰获取并维护课程数据，并且不再需要传递属性：

```html
<script>
  import { getCourses } from "../api/course";
  export default {
    data() {
      return {
        selectedCourse: "",
      };
    },
    setup() {
      const courses = ref([]);
      getCourses().then((result) => (courses.value = result));
      return { courses };
    },
    // props: {
    // courses: {
    // type: Array,
    // required: true,
    // },
    // },
  };
</script>
```

定义接⼝，api/course.js

```js
const courses = ["xxxxxx", "bbbbbb"];
export function getCourses() {
  return Promise.resolve(courses);
}
```

跳转新增，CourseList.vue

```jsx
<p>
  <router-link to="/add">新增</router-link>
</p>
```

CourseAdd.vue ⾃⼰负责 course 新增逻辑，不需要在传⼊属性

```vue
<template>
  <input type="text" v-model="course" @keydown.enter="addCourse" />
  <button v-on:click="add">新增课程</button>
</template>
<script>
import { ref } from "vue";
import { addCourse } from "../api/course";
import { useRouter } from "vue-router";
export default {
  setup() {
    const course = ref("");
    const router = useRouter();
    const add = () => {
      addCourse(course.value);
      router.push("/");
    };
    return { course, add };
  },
  // props: {
  //   // model-value
  //   course: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // data() {
  //   return {
  //     course: "",
  //   };
  // },
  // emits: ["update:course", "add"],
  // methods: {
  //   addCourse() {
  //     this.$emit("add");
  //     // this.course = ''
  //   },
  // },
};
</script>
```

### 动态路由匹配

下⾯我们想看看课程详情，我们的链接会是这个样⼦ /course/1 ，不同的课程 id 是不⼀样的，vue-router 中解决此类问题使⽤ 动态路由匹配 特性。

基本⽤法

- 路由配置： { path: "/course/:id", component: CourseDetail }
- 参数获取： this.$route.params.id 或 useRoute().params.id

修改路由配置，router/index.j

```js
import CourseDetail from "/comps/CourseDetail.vue";
const routes = [
  { path: "/", component: CourseList },
  { path: "/about", component: CourseAdd },
  { path: "/course/:id", component: CourseDetail },
];
```

顺便修改⼀下数据结构，api/course.js：

```js
const courses = [
  { id: 1, name: "宝马", price: 999 },
  { id: 2, name: "宝骏", price: 99 },
];
```

导航，CourseList.vue

```html
<li
  v-for="c in courses"
  :key="c.id"
  :class="{ active: selectedCourse === c }"
  @click="selectedCourse = c"
>
  <router-link :to="'/course/' + c.id">{{ c.name }}</router-link>
</li>
```

详情⻚，CourseDetail.vue

```vue
<template>
  <div>
    <h3>{{ course.name }}</h3>
    <p>id: {{ $route.params.id }}</p>
    <p>price: {{ course.price }}</p>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getCourseById } from "../api/course";
export default {
  setup() {
    const course = ref({ name: "", price: "" });
    const route = useRoute();
    console.log(route.params.id);
    getCourseById(route.params.id).then((ret) => {
      console.log(ret);
      course.value = ret;
    });
    return { course };
  },
};
</script>
```

api 定义，api/course.js

```js
export function getCourseById(id) {
  return Promise.resolve(courses.find((c) => c.id == id));
}
```

**响应参数变化**
参数变化时，组件实例会复⽤，导致⻚⾯不会响应参数的变化。
如下 id 变为 2，显示内容还是 1 的。

```
localhost:3000/#/course/2

链接已是2  内容仍为1
```

解决⽅案：

- 监听 params： this.$watch(() => this.$route.params, (params, prevParams) => {})
- 利⽤导航钩⼦

```js
async beforeRouteUpdate(to, from) {
  // 响应路由变化
  this.userData = await fetchUser(to.params.id)
},
```

改进我们案例，CourseDetail.vue

```js
watch(
  () => route.params,
  () => {
    getCourseById(route.params.id).then((ret) => {
      course.value = ret;
    });
  }
);
```

通配或 404 处理

```js
const routes = [
  // 下⾯配置会匹配所有path，匹配内容放⼊`$route.params.pathMatch`
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  // 匹配所有以`/user-`开头path，匹配内容放⼊`$route.params.afterUser`
  { path: "/user-:afterUser(.*)", component: UserGeneric },
];
```

范例中的 404 处理

```js
import NotFound from "/comps/NotFound.vue";
const routes = [{ path: "/:pathMatch(.*)*", component: NotFound }];
```

NotFound.vue

```vue
<template>
  <div>
    <h1>404 Not Found!</h1>
    <p>{{ $route.params.pathMatch }}</p>
  </div>
</template>
<script>
export default {};
</script>
```

### 嵌套路由

组件之间的嵌套常常会⽤嵌套路由形式与之对应。

范例：我们修改列表⻚、详情⻚和新增⻚路由配置，使他们产⽣嵌套关系

```js
const routes = [
  {
    path: "/",
    redirect: "/course",
  },
  {
    path: "/course",
    component: CourseList,
    children: [
      { path: "/course/:id", component: CourseDetail },
      { path: "/course/add", component: CourseAdd },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];
```

CourseList 中发⽣两个变化：

- 需要添加⼀个 router-view 显示嵌套路由内容
- 导航也随之变化

```html
<p><router-link to="/course/add">新增</router-link></p>
<router-view></router-view>
```

⼀个功能在⼀个⻚⾯内出现，⽤户体验更好了。

### 编程导航

除了 router-link 导航之外，其实还能使⽤ router 实例提供的⽅法进⾏编程导航。

可⽤⽅法如下：

|              声明式               |       编程式        |
| :-------------------------------: | :-----------------: |
|     <router-link :to="..." \>     |  router.push(...)   |
| <router-link :to="..." replace \> | router.replace(...) |

常⻅⽤法：

```jsx
// 传递path
router.push(`/user/${username}`);
// 或者
router.push({ path: `/user/${username}` });

<button @click="$router.push('/add')">新增</button>
```

导航时传参：

```js
// 使⽤`name`和`params`搭配，以利⽤⾃动的URL编码；不能使⽤`path`和`params`搭配
router.push({ name: "user", params: { username } });
```

范例：修改列表跳转链接为点击导航，CourseList.vue

```vue
<template>
  <ul>
    <li @click="showDetail(c)">
      {{ c.name }}
    </li>
  </ul>
  <template></template>
</template>
<script>
export default createApp({
  setup() {
    const router = useRouter();
    const selectedCourse = ref(null);
    const showDetail = (c) => {
      selectedCourse.value = c;
      router.push({ name: "detail", params: { id: c.id } });
    };
    return { courses, showDetail };
  },
});
</script>
```

路由定义时需要⼀个 name，router/index.js

```js
{ path: "/course/:id", name: "detail", component: CourseDetail }
```

使⽤命名路由有以下好处：

- ⽆需编写复杂 URL
- params ⾃动编码/解码
- 避免 path 之间的排名竞争

router-link 中也可使⽤

```html
<router-link :to="{ name: 'bar', params: { param: 'abc' }}">Bar</router-link>
```

### 路由守卫

路由守卫⽤于守卫路由导航、重定向或取消，有以下⼏种守卫路由的⽅式：

- 全局守卫
- 单个路由守卫
- 组件内路由钩⼦

**全局守卫**
范围最⼤，任何路由导航都会触发回调

```js
router.beforeEach((to, from) => {});
```

范例：守卫新增课程⻚⾯，若未登录不能访问

```js
const router = createRouter({});
router.beforeEach((to, from, next) => {
  if (to.path === "/add") {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  } else {
    next();
  }
});
export default router;
```

**单个路由守卫**
可以在路由配置中定义 beforeEnter 守卫，它仅作⽤于该路由

```js
const routes = [
  {
    path: "/users/:id",
    component: UserDetails,
    beforeEnter: (to, from) => {},
  },
];
```

**组件内路由守卫**
组件可使⽤以下钩⼦定义路由守卫：

- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave

范例：把之前的弹窗提示从 App 中移过来，CourseList.vue：

```vue
<template>
  <message v-if="showMsg" @close="showMsg = false">
    <template v-slot:title> 恭喜 </template>
    <template v-slot:default> 新增课程成功！ </template>
  </message>
</template>
<script>
export default createApp({
  // message显示控制从App.vue中移过来
  beforeRouteEnter(to, from, next) => {
    // 如果从add⻚⾯过来，且操作成功则显示弹窗
    if (from.path === '/course/add' && to.query.action === "success") {
      next(vm => vm.showMsg.value = true)
    }
  },
  setup() {
    const showMsg = ref(false);
    return { showMsg };
  }
});
</script>
```

新增成功传递⼀个 action 参数出去，CourseAdd.vue

```js
const add = () => {
  addCourse(course.value);
  router.push({ path: "/course", query: { action: "success" } });
};
```

### 路由元数据

有时需要在定义路由时附加额外信息，此时可以利⽤路由元数据，这样导航时可以访问这些信息。

```js
{
 path: '/about',
 component: About
 meta: { foo: 'bar' }
}
```

范例：元数据定义路由权限验证要求，提⾼代码通⽤性

```js
{
 path: "/course/add",
 component: CourseAdd,
 meta: { requiresAuth: true }
},

const router = createRouter({});
router.beforeEach((to, from, next) => {
 // 这样就不⽤像之前那样写死了
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  } else {
    next();
  }
});
```

### 路由懒加载

打包时将单个路由组件分⽚打包，访问时才异步加载，可以有效降低 app 尺⼨和加载时间。

定义异步路由

```js
const UserDetails = () => import("./views/UserDetails");
const router = createRouter({
  // ...
  routes: [{ path: "/users/:id", component: UserDetails }],
});
```

### composition api

随着 composition api 诞⽣，我们就有在 setup 中获取 router 或者 route 实例的需求

**setup 中获取 router 或者 route 实例⽅法**

```js
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    //...
  },
};
```

**setup ⾥⾯获取导航钩⼦**
beforeRouteEnter 没有等效⽅法，⽂档没有明确这样做的原因，
猜测是由于 setup 执⾏时已经创建组件实例，此时刻过于靠后，已经失去了守卫的意义

```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
export default {
  setup() {
    // 等效于beforeRouteLeave，但是不能访问`this`
    onBeforeRouteLeave((to, from) => {});
    // 等效于beforeRouteUpdate，但是不能访问`this`
    onBeforeRouteUpdate((to, from) => {});
  },
};
```

### 缓存和过度动画

**缓存**
结合 keep-alive 可以对路由组件做缓存以保存组件状态，优化⽤户体验。
v4 中使⽤⽅式有⽐较⼤的变化，它们必须出现在 router-view 内部结合 v-slot api 使⽤：

```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

**过度动画**
要制作路由导航的过度动画，我们还是要结合 v-slot api：

```html
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>

<!-- 添加 css 测试⼀下 -->
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
```

单个路由动画

```jsx
const routes = [
  {
    path: "/custom-transition",
    component: PanelLeft,
    meta: { transition: "slide-left" },
  },
  {
    path: "/other-transition",
    component: PanelRight,
    meta: { transition: "slide-right" },
  },
];

<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

甚⾄可以根据路由之间关系动态决定动画类型

```jsx
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition">
     <component :is="Component" />
  </transition>
</router-view>

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
});
```

### 动态路由

有时希望在 app 正在运⾏时动态添加路由到 router，vue-router 提供如下 api：

**新增路由**

```js
router.addRoute({ path: "/about", component: About });
```

移除路由

- 通过 name 删除： router.removeRoute('about')
- 通过 addRoute()返回的回调：

  ```js
  const removeRoute = router.addRoute(routeRecord);
  removeRoute(); // 如果路由存在移除之
  ```

- 通过添加⼀个 name 冲突的路由：

  ```js
  router.addRoute({ path: "/about", name: "about", component: About });
  // 下⾯操作将移除之前路由并添加新路由，因为他们name冲突
  router.addRoute({ path: "/other", name: "about", component: Other });
  ```

范例：⽤户登录之后动态添加权限路由

```js
// 权限路由
const authRoutes = [{ path: "/add", component: CourseAdd }];
// 是否添加权限路由
let hasAuth = false;
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    if (hasAuth) {
      // 添加过直接放⾏
      next();
    } else {
      // 动态添加权限路由
      hasAuth = true;
      authRoutes.forEach((route) => router.addRoute(route));
      next({ ...to, replace: true });
    }
  } else {
    next({ path: "/login", query: { redirect: to.path } });
  }
});
```

**添加嵌套路由**
通过参数 1 传递⽗路由 name 即可

```js
router.addRoute('parentRouteName', {...})
```

查找已存在路由

- router.hasRoute(): 判断是否存在某个路由
- router.getRoutes(): 获取所有路由数组
