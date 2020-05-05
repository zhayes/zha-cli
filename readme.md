# zha-cli

基于React Antd 搭建的初始化项目的脚手架

[模版仓库地址(https://github.com/zhayes/zha-cli-template)](https://github.com/zhayes/zha-cli-template);

### 全局安装
```
npm install -g zha-cli
```

### 创建项目
```
zha-cli create projectName
```

### 启动项目
```
npm start
```

#### 生成后的项目有一套完整的配置

请在config文件夹里配置后台服务器接口地址变量。`webpack.dev.config.js`、`webpack.test.config.js`、`webpack.prod.config.js`分别对应本地开发环境、测试打包，以及线上生产环境的`webpack`配置。请根据需求做更改。

```javascript
{
    plugins:[
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify('xxx')
        })
    ]
}
```

请在`sagas/common.ts`文件里修改验证码接口，登录接口以及修改密码接口。当前默认用`xxx`代替。因此第一次查看报错并不奇怪。


`utils/util.js`里有常用的工具方法。比如`dispatchWithPromise`方法提供提供`promise`链式调用形式的`dispatch`，方便逻辑操作。虽然可能大部分数据逻辑都写在saga里面。
Exp：
```javascript
    function submitHandle(){
        form.validateFields().then((values)=>{
            setSubmitting(true);
            dispatchWithPromise({type: FETCH_LOGIN_INFO, payload: values}).catch(()=>{
                setSubmitting(false);
                dispatchWithPromise({type: FETCH_CODEURL})
            });
        })
    }
```

`reducers/*`文件夹里除`index`文件外，其他新建的文件名默认为`reducer`导出对象的`key`，其对应的是全局`Redux state`的`key`。不用重复添加。


#### 打包测试环境
```
npm run build:dev
```

#### 打包正式环境
```
npm run build:prod
```