# Data Channel Demo

DataChannelDemo 演示通过嵌入 iframe 的 lark webclient 与后端打开数据通道并进行通信的并演示基础指令的双向控制。

## 监听消息

webclient 在 iframe 内部通过浏览器 postMessage 方法向外抛出事件。

可以通过如下方法监听。

```javascript
// 监听消息
window.addEventListener("message", function(e) {
    // 根据 type 字段判断消息类型
    switch(e.data.type) {
        // 数据通道建立完成
        case 20000:
            console.log("LK_DATA_CHANNEL_ESTABLISHED");
            break;
        // 数据通道重连中
        case 20001:
            console.log("LK_DATA_CHANNEL_RETYING");
            break;
        // 数据通道关闭
        case 20002:
            console.log("LK_DATA_CHANNEL_CLOSE");
            break;
        // 数据通道出错
        case 20003:
            console.log("LK_DATA_CHANNEL_ERROR");
            break;
        // 接收到字节消息
        case 20004:
            console.log("LK_DATA_CHANNEL_BINARYMESSAGE");
            break;
        // 接收到文本消息
        case 20005:
            console.log("LK_DATA_CHANNEL_TEXT_MESSAGE");
            jsoncmdMessageHandle(e.data.data);
            break;
        default:
            console.log("receive message." + e.data.prex, e.data.type, e.data.message, e.data.data);
            break;
    }
}, false);
```

## 发送消息

通过调用包含 lark webclient 的 iframe 的 window 对象的 postMessage 方法向 iframe 内部传递数据。

数据类型如下

```javascript
function sendToIframe(type, data, message) {
    if ($("#iframe").get(0).contentWindow) {
        // 获取 iframe 的 window 对象
        var win = $("#iframe").get(0).contentWindow;
        win.postMessage({
            prex: "pxymessage", // 约定的消息头部
            type: type,         // 消息类型
            data: data,         // 具体数据
            message: message,   // 附加信息
        },'*');
    } else {
        console.warn('content window not find.');
    }
}
```

发送字符消息到 datachannel，发送指令为 20102

```javascript
function sendText(jsonStr) {
    sendToIframe(20102, jsonStr, "");
}
```

发送字节消息到 datachannel， 消息类型为 20103， data 的类型为 Uint8Array

```javascript
function sendBinary(binary){
    sendToIframe(20103, binary, "");
}
```

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

> 整体流程和具体用法参考 datachannel.js
> 数据通道中的具体数据格式化方式可以自由同云端应用协商。
