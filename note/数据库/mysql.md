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
pass  x_G@967=Iuy # 示例
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

修改mysql密码策略，允许设简单密码
```
# 查看当前的密码策略
show variables like 'validate_password%';

mysql> show variables like 'validate_password%';
+-------------------------------------------------+--------+
| Variable_name                                   | Value  |
+-------------------------------------------------+--------+
| validate_password.changed_characters_percentage | 0      |
| validate_password.check_user_name               | ON     |
| validate_password.dictionary_file               |        |
| validate_password.length                        | 8      |
| validate_password.mixed_case_count              | 1      |
| validate_password.number_count                  | 1      |
| validate_password.policy                        | MEDIUM |
| validate_password.special_char_count            | 1      |
+-------------------------------------------------+--------+
8 rows in set (0.01 sec)

# 修改密码策略

# 修改密码策略为低
set global validate_password.policy=LOW;
# 修改密码长度最低4位
set global validate_password.length=4;

# 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

# 创建用户
CREATE USER 'admin' IDENTIFIED WITH mysql_native_password BY '1234';
# 给新用户赋权限
# 把所有增删改查的数据库权限，赋予给admin用户，@'%'指密码可以是任意的
grant all privileges ON *.* TO admin@'%';
```



## 安装mysql
- 1.下载下来安装完成后
- 2.配置环境变量，在安装完的目录中找到bin文件夹，复制地址配置到变量中
```
D:\extract\MySQL\MySQL_Server_8.0\bin // 示例
```
- 3.配置my.ini文件，配置如下
```
[mysql]
#设置mysql客户端默认字符集, utf8mb4是utf8的超集并完全兼容utf8, 能够用4个字节存储更多的字符，如表情符等
default-character-set=UTF8MB4

[mysqld]
#设置mysql的安装目录
basedir=D:\extract\MySQL\MySQL_Server_8.0
#设置mysql数据库的数据存储目录，必须是data，或者是\\xxx\\data
datadir=D:\extract\MySQL\MySQL_Server_8.0\data
#服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=UTF8MB4
#设置端口
port = 3306
#允许最大连接数，默认200
max_connections=400
#创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

[client]
port=3306
default-character-set=UTF8MB4

```
- 4.初始化data目录, 保存一些创建服务和启动服务需要的初始数据
```
mysqld --initialize-insecure
```
- 5.以管理员身份安装mysql服务
```
// mysqld --install 当前mysql服务名 --defaults-file="mysql安装目标中my.ini的目录地址"
mysqld --install mysql2024 --defaults-file="D:\extract\MySQL\MySQL_Server_8.0\my.ini"

// 启动mysql2024服务的命令: net start 服务名
net start mysql2024
// 停止mysql2024服务的命令: net stop 服务名
net stop mysql2024

// 开启服务后，登录mysql命令
# -h是mysql的服务器地址，本地就是localhost或者直接省略
# -P是mysql的端口号默认是3306，没改动的话可省略
# -u后面是用户名 root为mysql安装后默认的用户名
# -p 指输入密码，安装后root用户默认没密码，所以提示输密码时，直接回车就好，如果你安装时设置了密码，则输入你的密码即可，如此时我配置的是1234
mysql -h localhost -P 3306 -u root -p 1234
mysql -uroot -p1234
mysql -h192.168.0.106 -P3306 -uroot -p1234

// mysql创建一个新用户 admin 密码 1234
# 早期版本mysql旧的写法 create user 'admin' identified by '1234'; // 创建一个用户admin  identified:确定密码为1234
# 后期版本mysql新的写法 create user 'admin' identified with mysql_native_password by '1234'; // 创建一个用户admin  identified:确定密码为1234

// 退出mysql命令行 quit;

// 在root用户下为新用户admin分配权限, 不然admin无权限创建修改数据库
# 把所有增删改查的数据库权限，赋予给admin用户，@'%'指密码可以是任意的
grant all privileges ON *.* TO admin@'%';

// 切换到admin用户
mysql -uadmin -p1234

```
- 6.mysql之增删改查表，增删改字段
    - 关于mysql的操作命令说要大写，是为了区分变量和数据库语句。
```
// 创建数据库
# 如果不存在test数据库，则创建
# character 指定数据库字符集为utf8mb4 避免在数据库中存的数据出现乱码或有些字符不支持的情况
# collate 指定字符集的默认校对规则
create database if not exists 数据库名 character set utf8mb4 collate utf8mb4_general_ci;

// 查看数据库命令 show databases;
// 选择数据库命令 use 数据库名;
// 删除数据库命令 drop database if exists 数据库名; 
drop database if exists test2; // 假如存在test2数据库就删除

//【数据库备份】使用mysqldump导出数据：不能切到mysql控制台再使用以下命令，打开cmd就可以直接跑了
mysqldump -u用户名 -p密码 --set-gtid-purged=OFF 旧数据库名 > /导出地址/xxx.sql

mysqldump -uadmin -p1234 --set-gtid-purged=OFF test > D:\test.sql

mysqldump -u admin -p1234 test > d:\test2.sql 
// linux上
mysqldump -u admin -p1234 test > /tmp/tset_db.sql


仅是做普通的本机备份恢复时,可以添加
--set-gtid-purged=OFF
作用是在备份时候不出现GTID信息

// 导入数据到新库：
mysql -u用户名 -p密码 数据库名 < /数据库文件地址/xxx.sql
mysql -uadmin -p1234 new_db < d:/test.sql


// 创建数据库表
    // 字符类型
    char(固定长度) 1-255字节   如电话号码 char(11)
    varchar(可变长) 1-255字节  如人的姓名 用varchar(30)
    text(大文本) 65535字节
    // 整数类型
    tinyint(1个字节) 如人的年龄就够用，最大值127
    smallint(2个字节) 最大值 32767
    mediumint(3个字节) 最大值 8388607
    int(4个字节) 最大值 2147483647
    bigint(8个字节) 最大值9223372036854775807
    // 浮动类型
    float(4个字节)   double(8个字节)
    // 日期/时间类型
    date(3个字节)     年月日 1959/07/25
    datetime(8个字节) 年月日时分秒  1959/07/25 10:26:09


create table 表名(
    userid字段 int not null auto_increment, // userid为自增字段
    username字段 varchar(30) not null,
    psw字段 varchar(30) not null,
    address字段 varchar(50) default '没有填写地址',
    valid字段 tinyint default 1,
    birth字段 datetime null,
    primary key(字段userid) // 主键用userid字段，主键是一个可以唯一表示一条记录的字段
);

create table userinfo(
    userid int not null auto_increment,
    username varchar(30) not null,
    psw varchar(30) not null,
    address varchar(50) default '没有填写地址',
    valid tinyint default 1,
    birth datetime null,
    primary key(userid)
);

// 查询出表的列信息，每列字段的数据类型，及有哪些列字段
方法一：desc 表名; 
  desc userinfo;
方法二：show columns from 表名; 
  show columns from userinfo;

// 修改表名
alter table userinfo rename myuserinfo; // 修改表userinfo的表名为myuserinfo

// 修改表字段
alter table 表名 change 旧字段名 新字段名 新数据类型
alter table userinfo change psw password varchar(20);

// 删除表字段
alter table 表名 drop 字段名

// 新增表字段
alter table 表名 add 字段 字段类型 default 默认值;
alter table userinfo add age tinyint default 30;

// 删除数据表
drop table if exists 表名
```

- 7.mysql表数据的增删改查
```
// 增加一条mysql表数据
insert into userinfo values(1,'zhangsan','1234','广州',1,'1999/09/09 09:09:09');
insert into userinfo(username,password,birth) values('李四','1234','2001/01/01 01:01:01');

// 删除一条mysql表数据
delete from 表名 where 条件;
delete from userinfo where username='王二' and address='广州';
delete from userinfo where username='王二' and birth is null; 

// 更新mysql表里面的数据
update 表名 set 字段名1=值, 字段名2=值, 字段名3=值 ... [where一个可选的子句，用于指定更新的行。如果省略 WHERE 子句，将更新表中的所有行];
update userinfo set username='王二', address='湖南长沙' where userid=3;
update userinfo set username='王二', address='湖南长沙' where userid=3 and password=1234;

// 查询mysql表数据
# 查询表所有行数据
select * from 表名;
select * from userinfo; 

# 投影查询，就是只查询出部分字段数据
select 字段名1, 字段名2 from 表名; 
select userid, address from userinfo; 

# 查询别名设置
select 字段名 as 别名, 字段名2 as 别名2 from 表名; 
select username as 用户名, address as 地址, ... from userinfo; 
或者直接省略as 
select 字段名 别名, 字段名2 别名2, ... from 表名;
select username 用户名, address 地址 from userinfo;

# limit查询
limit查询mysql中的一个特殊关键字，用于指定查询结果从哪条记录开始显示，一共显示多少条，有三种使用方式：
1. limit从哪条(用下标的方式，第一数据为0)记录开始查，查询几条数据
select * from userinfo limit 1,3; // 表示从第二条数据开始查（包括第二条），查3条

2. limit后只写一个记录数，会从第一条记录开始查询
select * from userinfo limit 3; // 表示从第一条开始查（包括第一条），查询3条

3. limit后先写记录数，offset后面写起始位置从哪条开始查，和第一种类似
select * from userinfo limit 3 offset 1; // 表示查3条，从第二条数据开始查（包括第二条），查询结果和第一种方式相同

# 条件查询
and（且）查询 
select * from 表名 where 字段1=值 and 字段2=值;
select * from userinfo where username='李四' and password=1234;

or（或）查询  
select * from 表名 where 字段1=值 or 字段2=值;
select * from userinfo where username='李四' or password=1234;

between（区间）查询  
select * from 表名 where 字段名 between 开始区间值（包含自身） and 结束区间值（包含自身）;
select * from userinfo where age between 18 and 35; // 结果18-35岁的都会查出来

in查询
select * from 表名 where 字段名 in(值1,值2,...);
select * from userinfo where age in(18,21,26); // 结果：只要是18、21、26岁的都会查出来

is null 空值查询
select * from 表名 where 字段名 is null;
select * from userinfo where birth is null; // 只要生日字段birth为NULL的都会查出来

like模糊查询 %表示一个到多个任意字符,但无法匹配null和空格 _下划线表示一个字符 __两个_表示两个字符 以此类推
# mysql4.5以上一个_可以代表一个字母也可代表一个汉字，统一按字符的个数来算，如varchar(20)可以写20个英文字母也可写20个汉字
select * from 表名 where 字段名 like 条件;
# 条件（字母不区分大小写，如：like 'M%'和like 'm%'结果是一样的）;
select * from userinfo where username like '小%';   //查询名字 以小字开头的所有人
select * from userinfo where username like ' 小%';  //查询名字 以空格加小字开头的所有人
select * from userinfo where username like ' 小% '; //查询名字 以空格加小字开头，且结尾为空格的所有人
select * from userinfo where username like '%菲%';  //查询名字 中间包含菲字的所有人
select * from userinfo where username like '_菲%';  //查询名字 第二个字是菲字的的所有人
select * from userinfo where username like '_菲_';  //查询名字 为三个字且中间为菲字的所有人
select * from userinfo where username like '__菲';  //查询名字 为三个字且最后一字为菲字的所有人
# 加binary 实现模糊查询区分大小写
select * from 表名 where 字段名 like binary 条件;
select * from userinfo where username like binary 'L%'; //查询名字 以大写L字母开头的所有人
```

## 安装Navicat工具操作mysql数据库
[navicat破解.zip安装包](../books项目发布云服务器/source/navicat破解.zip)
 

## 项目中使用mysql

src\conf\DbConfig.ts 配置文件
```typescript

interface DbConConf {
  host: string
  user: string
  password: string
  port: number
  database: string
}

interface EnvConf {
  dev: DbConConf
  prod: DbConConf
}

class Conf {
  static conf: Conf = new Conf()
  //获取EnvConf所有的key值，成联合类型
  env!: keyof EnvConf
  envConf!: EnvConf
  constructor() {
    this.env = process.env.NODE_ENV?.trim() === 'dev' ? 'dev' : 'prod'
    this.initConf()
  }
  initConf() {
    this.envConf = {
      dev: {
        host: 'localhost',
        user: 'admin',
        password: '1234',
        port: 3306,
        database: 'books'
      },
      prod: {
        host: '192.168.0.198',
        user: 'admin',
        password: '1234',
        port: 3306,
        database: 'books'
      }
    }
  }
  getConf(key: void): DbConConf
  getConf(key: string): string
  getConf(key: any): DbConConf | string | number {
    const dbConf: DbConConf = this.envConf[this.env]
    if (this.isDbConConfKeys(key, dbConf) && key.length > 0) {
      return dbConf[key]
    } else {
      return dbConf
    }
  }
  isDbConConfKeys(key: string, dbConf: DbConConf): key is keyof DbConConf {
    // return key === 'host' || key === 'user' || key === 'password' || key === 'port' || key === 'database'
    return Object.keys(dbConf).includes(key)
  }
}

export default Conf.conf

```

### 直接使用mysql
src\modules\BaseDao.ts 定义的通用基础调用类, 依赖上面的 DbConfig.ts

```typescript
import mysql, { Connection } from 'mysql'
import DbConfig from '../conf/DbConfig'
// 所有Dao的通用Dao
class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  // 数据库的连接
  con!: Connection
  constructor() {
    this.connect()
  }
  async connect() {
    // 获取数据库的连接
    this.con = await mysql.createConnection(DbConfig.getConf())
  }
  async query<T>(sql: string) {
    return new Promise<T>((resolve, reject) => {
      // query增删改查都可以做
      this.con.query(sql, (err: any, result: T) => {
        if (err) {
          reject(err)
        } else {
          // 泛型T会传参resolve
          resolve(result)
        }
      })
    })
  }
}

export default BaseDao.baseDao

```

### 使用 sequelize 调用mysql
src\modules\BaseDao.ts 定义的通用基础调用类, 依赖上面的 DbConfig.ts

```typescript
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import DbConfig from '@/conf/DbConfig'
import path from 'path'

class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    // 创建sequelize对象，参数分别为，数据库名称，数据据库类型，密码, 配置
    let { host, user, password, database, port } = DbConfig.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      // 表示是何种数据库，此时为mysql
      dialect,
      define: { timestamps: false, freezeTableName: true },
      // 数据库连接池配置, Sequelize默认就会使用连接池，只是下面配置用的很低
      pool: {
        // 最大连接对象的个数
        max: 300,
        // 最小连接数，服务一运行起来，就会直接先请求50个数据库连接，等待使用
        min: 50,
        // idle 一个连接在释放前可空闲的时间，单位为毫秒ms，
        // 在连接空闲（未使用）10 秒后从池中删除连接, 回归到未连接状态
        // 只有当连接池中连接数量大于最小连接数量时会生效
        idle: 10000,
        // 表示最大连接超时时间，一条sql查询在获取连接资源之前的最长等待时间，单位毫秒
        acquire: 60000
      }
    })
    // this.addModels()
  }
  addModels() {
    const modelPath = path.join(process.cwd(), '/src/modules/decormodel')
    this.sequelize.addModels([modelPath])
  }
}
const baseDao = BaseDao.baseDao
baseDao.addModels()
// export default BaseDao.baseDao
export const { sequelize } = baseDao

```

