<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [mysql数据库](#mysql%E6%95%B0%E6%8D%AE%E5%BA%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## mysql数据库
> mysql8.0由于密码加密方式改变，用navicat会登不上

> 密码规则：至少8位，且由小写字母，大写字母，特殊符号，数字组成
```
host  localhost | 127.0.0.1
user  root
pass  38*****178@QQ.com
```
- 登录mysql
    - mysql -u root -p
    
- 重启mysql
    - net start mysql
    
- 更新一下用户的密码
    - 密码规则：至少8位，且由小写字母，大写字母，特殊符号，数字组成
    - ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的新密码'; 
    
- 刷新权限
    - FLUSH PRIVILEGES;

- 增删改查语句
    ```
    use myblog;
    
    -- show tables;
    
    -- insert into users (username, `password`, realname) values ('lisi','123','李四');
    
    -- select * from users;
    -- select id,realname from users;
    -- select * from users where username='zhangsan' and password='123';
    -- select * from users where username='zhangsan' or password='123';
    -- select * from users where username like '%zhang%'; -- 模糊查询
    -- select * from users where password like '%12%' order by id; -- 正序排序
    select * from users where password like '%12%' order by id desc; -- 倒序排序
    
    ```

