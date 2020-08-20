<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [git笔记](#git%E7%AC%94%E8%AE%B0)
  - [SourceTree回滚版本到某次提交](#sourcetree%E5%9B%9E%E6%BB%9A%E7%89%88%E6%9C%AC%E5%88%B0%E6%9F%90%E6%AC%A1%E6%8F%90%E4%BA%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##  git笔记

### [SourceTree回滚版本到某次提交](SourceTree回滚版本到某次提交.md)

### stash 贮藏 改动
```
git stash save tttggg
```

### 查看所有贮藏
```
git stash list

# 查看贮藏列表
$ git stash list
stash@{0}: WIP on master: ee80f12 no message
stash@{1}: On master: tttggg

# 恢复贮藏改动时 在 apply 后加上前缀即可
# git stash apply stash@{0}

```

### stash 恢复 贮藏 改动
```
git stash apply stash@{0}
```

### 暂存(add) 与 取消暂存(reset)
```
// 暂存所有
git add .

// 暂存单个文件
git add xx/xxx/fileName

// 取消所有暂存
git reset .

// 取消所有暂存单个文件
git reset xx/xxx/fileName
```

### 丢弃改动
```
# 丢弃单个文件
git checkout note/git/SourceTree回滚版本到某次提交.md

# 丢弃所有文件
git checkout .
```

### 移除文件
```
git -c diff.mnemonicprefix=false -c core.quotepath=false --no-optional-locks rm -q -f -- note/git/SourceTree回滚版本到某次提交.md
```
