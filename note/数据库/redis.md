### redis 数据库
> redis是一个用C语言开发的内存上的高速缓存数据库，读写数据远远高于mysql，因为mysql是存储的硬盘上的，而redis是存储在内存中的高性能的key-value数据库。

> redis存储数据安全，支持数据灾难恢复，使用RDB、AOF两种持久化防止断电数据丢失。
> RDB全称Redis Database是Redis当中默认的持久化方案。当触发持久化条件时，Redis默认会生成一个dump.rdp文件，Redis在重启的时候就会能过解析dump.rdb文件进行数据恢复

> AOF全称 Append Only File采用日志的形式将每个写操作追加到文件中。开启AOF机制后，只要执行更改Redis数据的命令时，命令就会被写入到AOF文件中

> redis还支持集群或分布式+集群架构。

有五大数据类型 字符串 Hash set zset list

安装使用参考 https://www.runoob.com/redis/redis-install.html

安装包地址 https://github.com/tporadowski/redis/releases

下载下来后解压完，在CMD中cd进入当前文件夹路径下，执行以下命令：

`redis-server`

```
[10648] 23 Apr 21:43:23.344 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
[10648] 23 Apr 21:43:23.345 # Redis version=5.0.14.1, bits=64, commit=ec77f72d, modified=0, pid=10648, just started
[10648] 23 Apr 21:43:23.345 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 5.0.14.1 (ec77f72d/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 10648
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

[10648] 23 Apr 21:43:23.351 # Server initialized
[10648] 23 Apr 21:43:23.352 * Ready to accept connections
```
上面这个窗口不能关，表示redis在运行中，接着再打开一个CMD窗口，进入当前文件夹路径下后，执行：

`redis-cli`
```
127.0.0.1:6379>

# 然后你就可以在当前窗口中，执行get set等命令了
```


- 字符串数据类型，使用上的一些命令

  添加单个key-value数据
  ```
  # set 你的key  你的value值
  set username mrzou

  127.0.0.1:6379> set username marzou
  OK
  ```

  获取某个key的值
  ```
  # get 你的key
  get username # 返回 "mrzou"

  127.0.0.1:6379> get username
  "marzou"
  ```

  防止已设置过的key数据被覆盖 setnx 命令
  ```
  setnx username pppp

  # 由于上面已经设置过 username了，所以这次设置没有成功
  127.0.0.1:6379> setnx username pppp
  (integer) 0
  ```

  一次性设置多个key value值
  ```
  msetnx key1 value1 key2 value2 ...

  127.0.0.1:6379> msetnx age 18 address GuangZhou sex man
  (integer) 1
  ```

  获取当前所有的key
  ```
  keys *

  127.0.0.1:6379> keys *
  1) "age"
  2) "address"
  3) "sex"
  4) "username"
  ```

  是否存在某个key的key-value对数据
  ```
  exists key1 key2 ...

  # 有一个数据
  127.0.0.1:6379> exists username
  (integer) 1

  # 有两个数据
  127.0.0.1:6379> exists username age
  (integer) 2

  # 不存在 kkk的key value对数据，所以返回 0
  127.0.0.1:6379> exists kkk
  (integer) 0
  ```

  删除某个key的key value对数据
  ```
  del 你的key值

  127.0.0.1:6379> del sex
  (integer) 1
  ```

  人工发出的数据库持久化操作 save 命令
  ```
  127.0.0.1:6379> save
  OK

  # 执行完 save 命令后，redis文件夹中立即会生成一个 dump.rdb 持久化文件
  # 保存了当前所有key value对数据
  ```
 

- Hash数据类型，使用上的一些命令
  Hash数据类型示例
  ```
  const user = new Map()
  user.set('name', 'Acho')
  user.set('sex', 'woman')
  user.set('age', 28)
  ```

  hset命令：一次只能添加单个Hash对象key-value数据
  ```
  # hset 对象名 你的key 你的value值
  hset user name Acho
  hset user sex woman
  hset user age 28

  # 此时执行 keys * 的话，user会当作外层key值返回
  127.0.0.1:6379> keys *
  1) "user"
  2) "age"
  3) "address"
  4) "username"
  ```

  hget命令：一次只能获取一个Hash对象数据中的key value值
  ```
  # hget 对象名 你的key

  127.0.0.1:6379> hget user name
  "Acho"
  ```

  hdel命令：一次能删除多个Hash对象数据中的key value值
  ```
  # hdel 对象名 你的key1 你的key2 ...

  127.0.0.1:6379> hdel user age name
  (integer) 1
  ```
    

  hmget命令：一次能获取多个Hash对象数据中的key value值
  ```
  # hmget 对象名 key1 key2 ...

  127.0.0.1:6379> hmget user age name
  1) "28"
  2) "Acho"
  ```

  hmset命令：一次性添加多个Hash对象key-value数据
  ```
  # hmset 对象名 key1 value1 key2 value2

  127.0.0.1:6379> hmset user address GuangZhou height 170cm
  OK
  ```

  hkeys命令：一次性获取Hash对象数据中所有的key
  ```
  hkeys 对象名

  127.0.0.1:6379> hkeys user
  1) "name"
  2) "sex"
  3) "age"
  4) "address"
  5) "height"
  ```
  
  hvals命令：查看Hash对象数据中所有的value
  ```
  hvals 对象名

  127.0.0.1:6379> hvals user
  1) "Acho"
  2) "woman"
  3) "28"
  4) "GuangZhou"
  5) "170cm"
  ```

  hgetall命令：一次性获取Hash对象数据中所有key value值
  ```
  hgetall 对象名

  127.0.0.1:6379> hgetall user
  1) "name"
  2) "Acho"
  3) "sex"
  4) "woman"
  5) "age"
  6) "28"
  7) "address"
  8) "GuangZhou"
  9) "height"
  10) "170cm"
  ```
  


- Set数据类型(不重复元素的集合)，使用上的一些命令
  set数据类型示例
  ```
  const setData = new Set()
  setData.add('A1')
  setData.add('A2')

  # 此次会失效，Set数据不允许重复
  arr.add('A2')
  ```
  存数据 sadd
  ```
  sadd 你的set对象名 value1 value2 ...

  # 22重复了，所以只存了三个value值
  127.0.0.1:6379> sadd stunoSet 11 22 33 22
  (integer) 3

  ```

  取数据 smembers
  ```
  smembers 你的set对象名

  127.0.0.1:6379> smembers stunoSet
  1) "11"
  2) "22"
  3) "33"
  ```

  取出两个diff的差值
  ```
  sdiff set对象名1 set对象名2

  # 新增两个k1 k2作对比
  127.0.0.1:6379> sadd k1 44 55 66
  (integer) 3
  127.0.0.1:6379> sadd k2 11 22 33
  (integer) 3
  
  # 取出两个之间的差值，并以左边多出的差值为准
  127.0.0.1:6379> sdiff k1 k2
  1) "44"
  2) "55"
  3) "66"
  ```


  从 set 移除元素 可一次移除多个
  ```
  srem 你的set对象名 被移除的元素value_1 被移除的元素value_2 ...

  127.0.0.1:6379> srem k2 22 33
  (integer) 2
  ```

  删除set元素 可一次删除多个
  ```
  del 你的set对象名1 你的set对象名2

  127.0.0.1:6379> del k1 k2
  (integer) 2
  ```

  获取两个集合的交集
  ```
  sinter set对象名1 set对象名2

  # 新增 k1 k2作对比
  127.0.0.1:6379> sadd k1 44 55 66
  (integer) 1
  127.0.0.1:6379> sadd k2 11 22 33 44
  (integer) 1

  # k1 k2 交集为 44
  127.0.0.1:6379> sinter k1 k2
  1) "44"

  ```

  合并两集合
  ```
  sunion set对象名1 set对象名2

  127.0.0.1:6379> sunion k1 k2
  1) "11"
  2) "22"
  3) "33"
  4) "44"
  5) "55"
  6) "66"
  ```

- zset数据类型，使用上的一些命令
  >zset数据就是可以排序的set

  >zset通过分数来为集合中的成员进行从小到大的排序，有序集合的成员是唯一的，分数 score 却可以重复

  使用格式
  ```
  zadd [key] [score] [value] [score] [value] ...

  # 举例 单个添加写法
  zadd t1 1980 WangWu
  zadd t1 980 Kate
  zadd t1 1280 ZhangSan
  zadd t1 3457 LiShi

  # 写成合并，一次添加多个
  zadd t1 1980 WangWu 980 Kate 1280 ZhangSan 3457 LiShi

  127.0.0.1:6379>  zadd t1 1980 WangWu 980 Kate 1280 ZhangSan 3457 LiShi
  (integer) 3

  # score可重复
  127.0.0.1:6379> zadd t3 122 mt 122 kaka 23 uu 98 opp
  (integer) 4
  显示所有元素
  
  # 升序
  zrange t1 0 -1 withscores
  
  zrange t1 0 -1 withscores
  1) "Kate"
  2) "980"
  3) "ZhangSan"
  4) "1280"
  5) "WangWu"
  6) "1980"
  7) "LiShi"
  8) "3457"

  # score有重复的升序
  127.0.0.1:6379> zrange t3 0 -1 withscores
  1) "uu"
  2) "23"
  3) "opp"
  4) "98"
  5) "kaka"
  6) "122"
  7) "mt"
  8) "122"
  

  # 降序
  zrevrange t1 0 -1 withscores

  127.0.0.1:6379> zrevrange t1 0 -1 withscores
  1) "LiShi"
  2) "3457"
  3) "WangWu"
  4) "1980"
  5) "ZhangSan"
  6) "1280"
  7) "Kate"
  8) "980"


  # 删除指定的元素
  zrem [key] [value]

  127.0.0.1:6379>  zrem t3 uu
  (integer) 1

  # 再次查看已经没有了 uu 这个元素
  127.0.0.1:6379> zrange t3 0 -1 withscores
  1) "opp"
  2) "98"
  3) "kaka"
  4) "122"
  5) "mt"
  6) "122"
  ```

- list数据类型
  

### 安装koa-redis
```
# 项目用了TS 所以还需要安装 @types/koa-redis
npm install koa-redis @types/koa-redis --save

# 如果不是用的koa框架，用的express，直接安装 redis 就好了
npm install redis --save

```

#### redis配置 RedisConfig.ts
```typescript
import redis from 'koa-redis'

interface DbConConf {
  host: string
  port: number
  password: string
}

interface EnvConf {
  dev: DbConConf
  prod: DbConConf
}

export interface RedisClient {
  set(key: string, value: string): any
  get(key: string): any
  hset(obj: string, key: string, value: any): any
  hmset(obj: string, ...keyvalues: any[]): any
  hget(obj: string, key: string): any
  hgetall(obj: string): any
  hdel(obj: string, ...keys: string[]): any
}

class RedsConfig {
  static conf: RedsConfig = new RedsConfig()
  env!: keyof EnvConf
  envConf!: EnvConf

  constructor() {
    this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
    this.initConf()
  }
  initConf() {
    this.envConf = {
      dev: {
        host: 'localhost',
        port: 6379,
        password: ''
      },
      prod: {
        host: '192.168.0.198',
        port: 6379,
        password: '123456'
      }
    }
  }

  getConf(key: void): DbConConf
  getConf(key: string): string
  getConf(key: any): DbConConf | string | number {
    const dbConf = this.envConf[this.env]
    if (this.isDbConConfKeys(key, dbConf)) {
      return dbConf[key]
    } else {
      return dbConf
    }
  }

  isDbConConfKeys(key: string, dbConf: DbConConf): key is keyof DbConConf {
    return Object.getOwnPropertyNames(dbConf).includes(key)
  }

  redisServerConf() {
    return redis(this.getConf()).client
  }
}

export default RedsConfig.conf

```

#### redis调用 RedisUtil.ts
```typescript
// 引入上面的 RedisConfig.ts
import RedisConfig, { RedisClient } from '@/conf/RedisConfig'

function getDataType(str: any): string {
  return Object.prototype.toString.call(str).slice(8, -1).toLocaleLowerCase()
}

// 使用 implements 继承接口 interface RedisClient
// 继承接口，必须要实现接口中所有的方法
class RedisUtil implements RedisClient {
  static redisUtil: RedisUtil = new RedisUtil()
  redis!: RedisClient
  constructor() {
    this.init()
  }

  init() {
    this.redis = RedisConfig.redisServerConf()
  }

  async set(key: string, value: string): Promise<any> {
    await this.redis.set(key, value)
  }
  async hset(obj: string, key: string, value: any): Promise<any> {
    await this.redis.hset(obj, key, JSON.stringify(value))
  }
  async hmset(obj: string, ...keyvalues: any[]): Promise<any> {
    await this.redis.hmset(
      obj,
      ...[...keyvalues].map((kOrv) => {
        return getDataType(kOrv) !== 'string' ? JSON.stringify(kOrv) : kOrv
      })
    )
  }

  async get(key: string): Promise<any> {
    return await this.redis.get(key)
  }
  async hget(obj: string, key: string): Promise<any> {
    const value = await this.redis.hget(obj, key)
    return value ? JSON.parse(value) : undefined
  }
  async hgetall(obj: string): Promise<any> {
    const _obj: Record<string, string> = await this.redis.hgetall(obj)
    if (_obj) {
      const rt0bj: Record<string, any> = {}
      Object.getOwnPropertyNames(_obj).forEach((key) => {
        rt0bj[key] = JSON.parse(_obj[key])
      })
      return rt0bj
    } else {
      return undefined
    }
  }
  async hdel(obj: string, ...keys: string[]) {
    await this.redis.hdel(obj, ...keys)
  }
}

export default RedisUtil.redisUtil

```
