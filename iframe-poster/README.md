# iframe poster demo

PostMessage Demo 演示嵌入 iframe 内的 lark webclient 与外部进行通信的 postmessage 的基本用法和事件。

## 监听消息

webclient 在 iframe 内部通过浏览器 postMessage 方法向外抛出事件。

可以通过如下方法监听。

```javascript

window.addEventListener("message", function(e) {
    console.log("receive message." + e.data.prex, e.data.type, e.data.message, e.data.data);
}, false);
```

其中 e.data.prex 为固定的字符串 "pxymessage"

其中 e.data.type 为消息类型

```typescript
//
// 连接应用服务器事件。直连渲染服务器时抛出
// 消息来源：websocket 连接事件
//
// 连接渲染服务器成功
LK_RENDER_SERVER_CONNECTED                       = 100,
// 连接渲染服务器失败
LK_RENDER_SERVER_FAILED                          = 101,
// 与渲染服务器连接关闭
LK_RENDER_SERVER_CLOSE                           = 102,
// 与渲染服务器连接出错
LK_RENDER_SERVER_ERROR                           = 103,

//
// 连接 websocket 代理服务器事件
// 消息来源：websocekt proxy 连接事件
//
// 连接代理服务器成功
LK_PROXY_SERVER_CONNECTED                        = 200,
// 连接代理服务器失败
LK_PROXY_SERVER_FAILED                           = 201,
// 与代理服务器连接关闭
LK_PROXY_SERVER_CLOSE                            = 202,
// 与代理服务器连接出错
LK_PROXY_SERVER_ERROR                            = 203,

//
// 版本检测 
// 消息来源：服务端协议返回 ToClientMessage->VersionCheckResponse
//
// 版本检测成功
LK_VERSION_CHECK_SUCCESS                         = 300,
// 版本检测失败
LK_VERSION_CHECK_FAILED                          = 301,

//
// task 检测
// 消息来源： 服务端协议返回 ToClientMessage->TaskResponse
//
// 请求 Task 成功
LK_TASK_SUCCESS                                  = 400,
// 未发现 Task
LK_TASK_NOTFOUND                                 = 401,
// 服务器端错误
LK_TASK_SERVER_ERROR                             = 402,
// 应用参数错误
LK_TASK_APP_WRONGPARAM                           = 403,
// Task 获取成功，但是没有可分配的显卡
LK_TASK_NO_GPU_RESOURCE                          = 404,

//
// 启动流媒体
// 消息来源： 服务端协议返回 ToClientMessage->StartStreamResponse
//
// 启动流媒体成功
LK_START_STREAM_SUCCESS                           = 500,
// 启动流媒体出错
LK_START_STREAM_PROCESS_START_FAILED              = 501,
// 启动流媒体超时
LK_START_STREAM_PROCESS_START_TIMEOUT             = 502,
// 启动流媒体未串流
LK_START_STREAM_NOT_STREAMING                     = 503,
// 启动流媒体编码错误
LK_START_STREAM_ENCODER_ERROR                     = 504,

//
// RTC 事件
// 消息来源：webrtc 连接事件和 ToClientMessage->WebrtcError
//
// RTC 连接成功
LK_RTC_EVENT_PEERCONNECTION_CONNECTED             = 600,
// RTC 连接关闭
LK_RTC_EVENT_PEERCONNECTION_CLOSED                = 601,
// RTC 连接出错
LK_RTC_EVENT_PEERCONNECTION_ERROR                 = 602,
// RTC 状态
// 3.1.1.8 新增
LK_RTC_EVENT_PEERCONNECTION_STATE                 = 610,

//
// 加载视频流
// 消息来源：浏览器或原生组件
//
LK_VIDEO_LOADED                                  = 700,

//
// 服务端主动退出
// 消息来源：后台协议 NotifyClientLogout
//
LK_NOTIFY_CLIENT_LOGOUT_PLAYER_LOGOUT            = 800,
// 一人操作多人看房主退出
LK_NOTIFY_CLIENT_LOGOUT_TASKOWNER_LOGOUT         = 801,

//
// 服务端推送云端应用事件
// 消息来源：后台协议 AppProcessNotification
//
LK_APP_PROCESS_NOTIFI_APP_QUIT                   = 900,
// 云端应用大小变换
// 3.1.1.8 新增
LK_APP_RESIZE                                    = 910,
// 云端应用鼠标模式变化
// 3.1.1.8 新增
LK_APP_MOUSE_MODE                                = 911,
// 3.1.1.10 新增
LK_APP_PLAER_LIST                                = 912,

//
// XR 相关事件
//
// 启动VR流媒体启动成功
LK_STARTVRSTREAM_SUCCESS                            = 1000,
// 启动VR流媒体过程失败
LK_STARTVRSTREAM_START_PROCESS_FAILED               = 1001,
// 启动VR流媒体驱动超时
LK_STARTVRSTREAM_START_DRIVER_RUNTIME_TIMEOUT       = 1002,
// 启动VR流媒体 udp 端口出错
LK_STARTVRSTREAM_START_DRIVER_RUNTIME_UDPPORT_ERROR = 1003,
// 启动VR流媒体 udp 编码出错
LK_STARTVRSTREAM_START_DRIVER_RUNTIME_ENCODER_ERROR = 1004,

// 控制 ui
// 是否显示桌面端控制栏
LK_IFRAME_POSTER_UI_CONTROLLER_BAR                = 10200,
// 是否显示玩家列表
LK_IFRAME_POSTER_UI_PLAYER_LIST                   = 10201,
// 是否显示分享模式下分享 url
LK_IFRAME_POSTER_UI_PLAYER_SHARE_URL              = 10202,
// 是否显示手机端控制球
LK_IFRAME_POSTER_UI_MOBILE_CONTROL_BALL           = 10203,
// 是否显示手机端摇杆
LK_IFRMAE_POSTER_UI_MOBILE_JOYSTICK               = 10204,
// 是否显示手机端虚拟键盘
LK_IFRAME_POSTER_UI_MOBILE_VIRTUAL_KEYBOARD       = 10205,
// 是否显示手机端虚拟鼠标
LK_IFRAME_POSTER_UI_MOBILE_VIRTUAL_MOUSE          = 10206,
// 是否显示手机端菜单
LK_IFRAME_POSTER_UI_MOBILE_MENU                   = 10207,
// 是否手机端强制横屏
LK_IFRAME_POSTER_UI_MOBILE_FORCE_LANDSCAPE        = 10208,
```

## 发送消息

通过调用包含 lark webclient 的 iframe 的 window 对象的 postMessage 方法向 iframe 内部传递数据。

数据类型如下

```javascript
function sendToIframe(type, data, message) {
    if ($("#iframe").get(0).contentWindow) {
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

可发送的消息类型如下

```typescript
// 操作
// 向云端发送鼠标消息，移动鼠标
LK_IFRAME_POSTER_OPERATE_MOUSE_MOVE               = 10000,
// 向云端发送鼠标消息，移动按下
LK_IFRAME_POSTER_OPERATE_MOUSE_DOWN               = 10001,
// 向云端发送鼠标消息，移动抬起
LK_IFRAME_POSTER_OPERATE_MOUSE_UP                 = 10002,
// 向云端发送鼠标消息，移动滚轮
LK_IFRAME_POSTER_OPERATE_MOUSE_WHEEL              = 10003,
// 向云端发送鼠标消息，键盘按下
LK_IFRAME_POSTER_OPERATE_KEY_DOWN                 = 10010,
// 向云端发送鼠标消息，键盘抬起
LK_IFRAME_POSTER_OPERATE_KEY_UP                   = 10011,
// 功能
// 切换鼠标模式
LK_IFRAME_POSTER_FUNC_MOUSE_MODE                  = 10100,
// 切换缩放模式
LK_IFRAME_POSTER_FUNC_SCALE_MODE                  = 10101,
// ui
// 切换底部控制栏是否显示
LK_IFRAME_POSTER_UI_CONTROLLER_BAR                = 10200,
// 多人互动模式时顶部玩家列表单是否显示
LK_IFRAME_POSTER_UI_PLAYER_LIST                   = 10201,
// 多人互动模式时顶部分享按钮是否显示
LK_IFRAME_POSTER_UI_PLAYER_SHARE_URL              = 10202,
```

## 更新

### 3.1.1.8 更新

1. 添加 type 为 610 的点对点连接事件。收到该事件 data 内为点对点连接状态信息。每秒钟上报一次。数值从浏览器种汇总出来，不同浏览器可能有差别。Chrome 浏览器的数据最全面。

data 字段如下:

```javascript
// 平均比特率
avgBitrate: 175
// 评价帧率
avgframerate: 29
// 当前比特率
bitrate: 174
// 所有收到的字节数
bytesReceived: 2846860
// 开始收到的字节数
bytesReceivedStart: 33987
// 当前的RTT
currentRoundTripTime: 0
// 帧的高度
frameHeight: 720
// 开始收到的帧高度
frameHeightStart: 720
// 帧宽度
frameWidth: 1280
// 开始收到的帧宽度
frameWidthStart: 1280
// 帧率
framerate: 29
// 解码的帧数
framesDecoded: 3868
framesDecodedStart: 25
// 丢帧数
framesDropped: 0
// 丢包数
framesDroppedPercentage: 0
// 收到的帧
framesReceived: 3869
// 醉倒比特率
highBitrate: 320
// 最高帧率
highFramerate: 30
// 最低比特率
lowBitrate: 172
// 最低帧率
lowFramerate: 28
// 丢包个数
packetsLost: 0
// 每秒丢包
packetsLostPerc: 0
// 时间戳
timestamp: 1597720792638
timestampStart: 1597720664490
```

2.添加 type 为 910 的云端应用缩放事件。当初始获得云端应用大小或者云端应用大小改变时接收到。收到的 Data 字段如下

```javascript
// 云端应用实际高度
height: 720
// 云端应用实际宽度
width: 1280
```

3.添加 type 为 911 的云端应用鼠标模式事件。当初始获得云端应用鼠标模式或云端应用大小改变时收到。收到的 Data 字段如下：

```javascript
// 鼠标是否是相对模式
mouseRelative: true,
// 是否显示鼠标
mouseShow: true,
// 鼠标是否锁定
mouseLock: false,
// 鼠标的锁定区域
rect: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
}
```

### 3.1.1.10 更新

1. 多人互动模式时收到 type 为 912 的用户列表。Data 为一个用户列表数组，具体字段如下：

```javascript
[
    {
        // 是否是当前用户
        isCurrent: true
        // 是否是 task 拥有者
        isTaskOwner: true
        // 昵称
        nickName: "Test"
        // 用户 ID
        userId: 37
        // 用户类型，1 操作者 0 观看者
        userType: 1
    }
]
```

2.多人互动模式时可发送 type 为 10201 的事件切换顶部玩家列表显示。

3.多人互动模式时可发送 type 为 10202 的事件切换顶部玩家列表分享按钮的显示。
