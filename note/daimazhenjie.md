<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [如何编写整洁代码？](#%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99%E6%95%B4%E6%B4%81%E4%BB%A3%E7%A0%81)
  - [有意义的命名](#%E6%9C%89%E6%84%8F%E4%B9%89%E7%9A%84%E5%91%BD%E5%90%8D)
  - [函数](#%E5%87%BD%E6%95%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 如何编写整洁代码？

1. 应该是优雅的 —— 整洁的代码读起来令人愉悦。读这种代码，就像见到手工精美的音乐盒或者设计精良的汽车一般，让你会心一笑。
2. 整洁的代码力求集中。每个函数、每个类和每个模块都全神贯注于一件事，完全不受四周细节的干扰和污染。
3. 整洁的代码是有意维护的 —— 有人曾花时间让它保持简单有序。他们适当地关注到了细节。他们在意过。
4. 能通过所有的测试
5. 没有重复代码
6. 包括尽量少的实体，比如类、方法、函数等

## 有意义的命名
**类名** —— 类名和对象名应该是名词或名词短语，如 Customer、WikiPage、Account 和 AddressParser。避免使用 Manager、Processor、Data 或 Info 这样的类名。类名不应当是动词。

**方法名**—— 方法名应当是动词或动词短语，如 postPayment、deletePage 或者 save。属性访问器、修改器和断言应该根据其值命名，并加上 get、set 前缀。

## 函数
> 函数的第一规则就是要短小，第二条规则是还要更短小。这意味着 if 语句、else 语句、while 语句等，其中的代码块应该只有一行。该行大抵应该是一个函数调用语句。这样不仅能保持函数短小，而且，因为块内调用的函数拥有具体说明性的名称，从而增加了文档上的价值。

**函数参数**

- 一个函数不应该有超过 3 个参数，尽可能使其少点。一个函数需要两个或者三个以上参数的时候，就说明这些参数应该封装为类了。通过创建参数对象，从而减少参数数量，看起来像是在作弊，但实则并非如此。

- 现在，当我说要减少函数大小的时候，你肯定在想如何减少 try-catch 的内容，因为，它使你的代码变得越来越臃肿。我的答案是只生成一个仅包含 try-catch-finally 语句的方法。将 try/catch/finally 代码块从主体部分抽离出来，另外形成函数。

```javascript
export class Page {
  constructor ({name, url, query}) {
    this.name = name
    this.url = url
    this.query = query
  }
}

function delete(Page) { 
  try {
     deletePageAndAllReferences(page);
  }
  catch (Exception e) { 
    logError(e);
  } 
}

function deletePageAndAllReferences(page) {
  // ....
}

function logError(err) {
  // ....
}
```
**函数应该只做一件事** —— 函数应该只做一件事。错误处理就是一件事。如果关键字 try 在某个函数中存在，它就该是这个函数的第一个关键字，而且在 catch/finally 代码块后面也不该有其他内容。
