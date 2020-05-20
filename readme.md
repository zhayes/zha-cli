# zha-cli

基于React Antd TypeScript技术栈搭建的初始化项目的脚手架

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

##### 生成后的项目有一套完整的配置，包括网络请求的封装，路由权限判断。显然里面的逻辑处理很难完全适用于用户的项目需求，请根据需要进行修改。但其意义还是很明显的，那就是方便了项目初始化，毕竟跟重头搭建一个项目工程相比，改改相关配置文件总要来得简单的多。

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


`utils/util.js`里有常用的工具方法。比如`dispatchWithPromise`(你也可以用暴露的`store`对象的`dispatch`触发`action`，但不支持链式调用)方法提供`promise`链式调用形式的`dispatch`，比如在触发`Saga`请求的时候可以拿到返回结果，方便逻辑操作。
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

`reducers/*`文件夹里除`index`文件外，其他新建的文件名默认为`reducer`导出对象的`key`，其对应的是全局`Redux state`的`key`。不用重复添加。Sagas文件类似。

此外在`/src/utils/request.ts`文件里有`token`过期刷新的逻辑处理。请根据需要修改。
```
//token最长有效时效两个小时，单位秒
const maxExpiresIn = 2 * 3600;

if (lastFetchedTime && loginInfo) {
    const currentTime = new Date().getTime() / 1000;
    const expiresIn = loginInfo.expiresIn;
    
    if (!specifyApiInOutOfRefreshingCode.includes(req.url)) {
        if (currentTime - (lastFetchedTime / 1000) >= maxExpiresIn) {//超出token保存的最大有效时效就登出
            store.dispatch({ type: INIT_STATE });
            store.dispatch(push('/login'));
        } else if (currentTime - (lastFetchedTime / 1000) >= expiresIn) {//达到过期时效就刷新当前token
            const result = await dispatchWithPromise({ type: FETCH_REFRESH_TOKEN, payload: { refreshToken } });
            const { tokenType, accessToken } = result;
            req.headers.Authorization = `${tokenType} ${accessToken}`;
        }
    }

}
```


我使用了`connected-react-router`库，将路由与`redux`关联。因此你可以在代码里如此如下触发路由：
```
import { push } from 'connected-react-router';
store.dispatch(push('/login'));
```


#### 打包测试环境
```
npm run build:test
```

#### 打包正式环境
```
npm run build:prod
```