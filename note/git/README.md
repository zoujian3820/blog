<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

  - [git笔记](#git%E7%AC%94%E8%AE%B0)
    - [git ssh](#git-ssh)
    - [SourceTree回滚版本到某次提交](#sourcetree%E5%9B%9E%E6%BB%9A%E7%89%88%E6%9C%AC%E5%88%B0%E6%9F%90%E6%AC%A1%E6%8F%90%E4%BA%A4)
    - [stash 贮藏 改动](#stash-%E8%B4%AE%E8%97%8F-%E6%94%B9%E5%8A%A8)
    - [查看所有贮藏](#%E6%9F%A5%E7%9C%8B%E6%89%80%E6%9C%89%E8%B4%AE%E8%97%8F)
    - [stash 恢复 贮藏 改动](#stash-%E6%81%A2%E5%A4%8D-%E8%B4%AE%E8%97%8F-%E6%94%B9%E5%8A%A8)
    - [暂存(add) 与 取消暂存(reset)](#%E6%9A%82%E5%AD%98add-%E4%B8%8E-%E5%8F%96%E6%B6%88%E6%9A%82%E5%AD%98reset)
    - [丢弃改动](#%E4%B8%A2%E5%BC%83%E6%94%B9%E5%8A%A8)
- [丢弃所有文件](#%E4%B8%A2%E5%BC%83%E6%89%80%E6%9C%89%E6%96%87%E4%BB%B6)
- [移除相当于 删除了文件 并做了一次 git add xxx](#%E7%A7%BB%E9%99%A4%E7%9B%B8%E5%BD%93%E4%BA%8E-%E5%88%A0%E9%99%A4%E4%BA%86%E6%96%87%E4%BB%B6-%E5%B9%B6%E5%81%9A%E4%BA%86%E4%B8%80%E6%AC%A1-git-add-xxx)
- [所以要还原回来的话 要先取消暂存 git reset -q HEAD -- xxx](#%E6%89%80%E4%BB%A5%E8%A6%81%E8%BF%98%E5%8E%9F%E5%9B%9E%E6%9D%A5%E7%9A%84%E8%AF%9D-%E8%A6%81%E5%85%88%E5%8F%96%E6%B6%88%E6%9A%82%E5%AD%98-git-reset--q-head----xxx)
- [再做一次 丢弃 操作 git checkout HEAD -- xxx](#%E5%86%8D%E5%81%9A%E4%B8%80%E6%AC%A1-%E4%B8%A2%E5%BC%83-%E6%93%8D%E4%BD%9C-git-checkout-head----xxx)
- [取消暂存](#%E5%8F%96%E6%B6%88%E6%9A%82%E5%AD%98)
- [丢弃操作](#%E4%B8%A2%E5%BC%83%E6%93%8D%E4%BD%9C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##  git笔记

### git ssh
  ```
   git config --global user.name "mrzou"
   
   git config --global user.email "3xxxxxx8@qq.com"
  
   ssh-keygen -t rsa -C "3xxxxxx8@qq.com"
   
   # 查看刚刚生成的公钥
   cat ~/.ssh/id_rsa.pub
   
   # 复制公钥 然后粘贴到你的git仓库 settings SSH 中
   
  ```

- windows
> window 做完以上步骤 就可以正常使用了

- mac os
[参考资料](https://www.jianshu.com/p/c0d5e649411f)
  ```
  # 将sshkey添加到sourceTree
  ssh-add ~/.ssh/id_rsa
  
  # 将sshkey添加到钥匙串
  ssh-add -K ~/.ssh/id_rsa
  
  # cd 到 .ssh目录下
  cd .ssh
  
  # 用touch .config命令创建.config文件
  touch .config
  
  # 编辑.config文件
  vi .config
  
  #输入下面的配置内容, 保存·config文件
  Host *
     UseKeychain yes
     AddKeysToAgent yes
     IdentityFile ~/.ssh/id_rsa
     IdentityFile ~/.ssh/github_rsa
     
  ```

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
> 丢弃的文件会回到没 git add 前
```
# 丢弃单个文件
git checkout note/git/SourceTree回滚版本到某次提交.md

# 丢弃所有文件
git checkout .
```

### 移除文件
```
git rm -q -f note/git/SourceTree回滚版本到某次提交.md

# 移除相当于 删除了文件 并做了一次 git add xxx
# 所以要还原回来的话 要先取消暂存 git reset -q HEAD -- xxx
# 再做一次 丢弃 操作 git checkout HEAD -- xxx

# 取消暂存
git reset -q HEAD -- note/git/SourceTree回滚版本到某次提交.md
# 丢弃操作
git checkout HEAD -- note/git/SourceTree回滚版本到某次提交.md
```

### 合并分支

```
git checkout 要被合并的分支
git merge 要合并的分支

例如:
 
开发分支: feat-order-list-20200820

需发版到正式环境（生产线）上 master 分支

则切换 git checkout master

再合并 git merge feat-order-list-20200820

```
