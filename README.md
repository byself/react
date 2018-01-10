# react 框架

项目分为两部分：client和server

client中包含用于客户端显示的静态开发资源

server中为用于提供API的node服务


## client 内容介绍

### 开发

```bash
npm start
或
yarn start
```

访问[http://localhost:8080](http://localhost:8080])

### 编译打包

无压缩混淆

```bash
npm run build:dev
或
yarn build:dev
```

压缩混淆

```bash
npm run build:prod
或
yarn build:prod
```


## server 内容介绍

server使用koa1.4.0作为核心框架

配置文件统一放在config目录下

配置文件分为以下几种

config.json   默认配置文件

config-dev.json  开发环境配置，会覆盖config.json中的同名配置项

config-qa.json  测试环境配置，会覆盖config.json中的同名配置项

### 配置内容说明

```json
{
  "app": {
    "name": "api-server-dev",
    "useCache": true,
    "cacheType": "memory"
  },
  "logger": {
    "console": true,
    "file": true
  },
  "service": {
    "merchant": {
      "baseURI": "http://localhost:9580"
    }
  }
}
```

app

- name  应用名称
- useCache 是否使用缓存
- cacheType  缓存类型，memory


logger

- console 是否输出到控制台
- file  是否输出到文件

service

各个需要调用的服务的地址信息






