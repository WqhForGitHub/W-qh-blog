## 接口设计
### 登录
* 登录接口  POST  /loginIn
```
Request
{
    userName: 'wangqihao' // String 用户名
    passWord: '123456' // String 密码
}

Response
{
    code: 0 // Integer 
    message: '' // String 
    token: '' // String token名称
}
```

* 注册接口 POST /login/register
```
Request
{
    userName: 'wangqihao' // String 用户名
    passWord: '123456' // String 密码
}

Response
{
    code: 0 // Integer 
    message: '' // String 
    token: '' // String token名称
}
```

* 退出登录 POST /loginOut
```
Request
{
    userName: 'wangqihao' // String 用户名
}

Response
{
    code: 0 // Integer 
    message: '' // String 
}
```

### 博客
* 博客列表 GET /blogList
```
Request
{
    pageIndex: 1, // Integer 当前页
    pageSize: 10 // Integer 每页条数
}

Response
{
    code: 0 // Integer 
    message: '' // String 
    blogList: [] // Array 博客数组
}

```

* 添加博客 POST /blogAdd
```
Request 
{
    blogTitle: '' // String 博客标题
    motto: '', // String 博客简介
    blogType: '', // 
    markdownStr: '', // String markdown字符串
    author: '' // String 作者
}

Response
{
    code: 0 // Integer 
    message: '添加成功' // String 
}

```