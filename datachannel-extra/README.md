# DataChannelDemo Extra Task

DataChannelDemo Extra Task 演示通过 js 直接打开与 datachannel server 的通道。并演示基础指令的双向传输。

## 基本流程

客户端和服务端都连接同一个task id 的websocket地址，建立数据通道

```javascript
var ws = new WebSocket("ws://[服务器地址]:[服务器端口号]/webConnProxy/[taskId]");
```

websocekt 建立完成之后开始控制协议交换。 Demo 中演示的是默认的控制协议，通过 protobuf 发送字节流建立连接控制。

* 发送 hello 消息，等待云端发送的 hello 应答之后建立连接成功。
* 定时发送 keepalive 消息，如果超时表示云端连接断开连接，重新开始发送 hello 包。
* 如果收到 data 消息，表示收到字节消息，可以自由处理。

## 简单 json 控制指令演示

Demo 中演示通过 json 字符的方式传递控制指令。

具体指令类型如下

```javascript
var JsonCmdType  = {
    // 云端应用摄像机加载完成，并返回摄像机个数
    CMD_CAMERA_LOADED: 1000,
    // 发送给云端应用，切换摄像机
    CMD_SWITCH_CAMERA: 1001,

    // 云端应用物体加载完成，并返回物体个数
    CMD_OBJECT_LOADED: 2001,
    // 云端物体被点选
    CMD_OBJECT_PICKED: 2002,
    // 发送给云端，切换云端物体是否显示。
    CMD_TOGGLE_OBJECT: 2003,
};
```

当网页内收到 CMD_CAMERA_LOADED 指令后初始化摄像机按钮，有几个摄像机就创建几个。
点击该按钮向云端发送 CMD_SWITCH_CAMERA 消息，云端应用接受到之后切换为该摄像机。

当网页内收到 CMD_OBJECT_LOADED 指令后初始化物体切换按钮，有几个物体就创建几个。
点击物体切换按钮后向云端发生弄个 CMD_TOGGLE_OBJECT 消息，云端应用接收到之后切换该物体的显示方式。

> 整体流程和具体用法参考 datachannel-extra.js
> 数据通道中的具体数据格式化方式可以自由同云端应用协商。
