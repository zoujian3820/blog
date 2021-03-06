<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [查看提交的历史记录 可查看 commit id](#%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E7%9A%84%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95-%E5%8F%AF%E6%9F%A5%E7%9C%8B-commit-id)
- [SourceTree回滚版本到某次提交](#sourcetree%E5%9B%9E%E6%BB%9A%E7%89%88%E6%9C%AC%E5%88%B0%E6%9F%90%E6%AC%A1%E6%8F%90%E4%BA%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 查看提交的历史记录 可查看 commit id

```
# 可查看详情信息，commit 注释 提交日期 完整的commit id  提交作者
git log

# 查看简版的信息 左边的 commit id 为完整版的前7位
git reflog

```


## SourceTree回滚版本到某次提交

- [参考学习资料](https://jingyan.baidu.com/article/ab0b563057387ac15afa7dca.html)

1. 打开sourceTree,切换到要回滚的分支master
2. 切换到sourceTree界面，打开master分支的 **日志/历史**，鼠标选中将要回退到的那个历史提交记录
3. 右键   ->   **重置当前分支到此次提交**
4. 在弹窗中 使用模式选择 **强行合并--丢弃所有改动过的工作副本**，点击确定 **--hard**
```
# 这次的 commit id 是你要重置的版本的id
git -c diff.mnemonicprefix=false -c core.quotepath=false --no-optional-locks reset -q --hard 592b8380e329398ee75f727ecabdbb4b9ae07e51
```

5. 等待重置完，可以看到本地仓库的master分支已经回退到选定的那次提交版本。而且本地仓库落后远程仓库 很多个 提交记录。
6. 依然是同样的操作 **选中最新的** 提交历史记录，右键  ->  **重置当前分支到此次提交**
7. 这次选的使用模式是  **软合并 – 保持所有本地改动**，点击确定  **--soft**
```
# 这次的 commit id 切记要是 最新 的一次提交的 commit id
git -c diff.mnemonicprefix=false -c core.quotepath=false --no-optional-locks reset -q --soft 40837d11bb78ba4719c939c92a43e4ae4de93cb3
```

8. 等待重置完。发现本地仓库分支已和远程仓库分支同步。这个结果似乎看起来两次重置抵消了一样，代码版本没有发生任何的变化。实际已经成功了
