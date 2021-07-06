1.DataChannelDemo 演示通过嵌入 iframe 的 lark webclient 与后端打开 datachannel 并进行通信的并演示基础指令的双向控制。

2.DataChannelDemo Extra Task 演示通过 js 直接打开与 datachannel server 的通道。并演示基础指令的双向传输。

3.PostMessage Demo 演示嵌入 iframe 内的 lark webclient 与外部进行通信的 postmessage 的基本用法和事件。

4.DataChannel RenderServer Demo 演示通过嵌入 iframe 的 lark webclient 与后端打开 datachannel 并进行通信的并演示基础指令的双向控制。

#### 3.1.8.1

##### 向外抛出
* 添加事件类型 LK_WEB_CLIENT_LOAD_SUCCESS = 1， 当页面加载成功是时抛出
* 添加事件类型 LK_TASK_SYNC_APP_FAILED = 21， 当同步task请求失败时抛出
* 添加事件类型 LK_NO_OPERATION_TIMEOUT = 901, 当用户超出设定时限没有操作过时抛出，应关闭当前页面
* 添加事件类型 LK_WEBCLIENT_NOTIFY_ALERT = 1100， 当出现警告框时抛出，当设定不显示警告框时，可根据其中内容判断并提示用户。如果不是已知的事件比如浏览器或后台抛出的错误，错误码将为 -1， 已知的事件将包含错误码。
* 添加事件类型 LK_WEBCLIENT_NOTIFY_CONFIRM = 1101， 当出现需要用户选择的框时抛出，当设定不显示选择框时，可根据其中内容判断并提示用户。如果不是已知的事件比如浏览器或后台抛出的错误，错误码将为 -1， 已知的事件将包含错误码。
* 添加事件类型 LK_IFRAME_POSTER_FUNC_RESTART_CLOUD_APP = 10102， 当收到云端应用关闭事件可通过该事件通知客户端重新走启动应用的流程。但不保证云端应用能启动成功。

#### 通知客户端的事件

* 添加事件类型 LK_IFRAME_POSTER_FUNC_WX_JS_BRIDGE_READY = 10103， 通知客户端在微信中加载完成。由于iframe内部捕获不到微信的事件，兼容ios微信浏览器时应及时发送该事件。
* 添加事件类型 LK_IFRAME_POSTER_UI_TOAST_LEVEL = 10210，通知客户端设置toast的级别，例如: toastLevel = 0, 显示所有toast， toastLevel > 2 || toastLevel < 0, 关闭所有 toast
* 添加事件类型 LK_IFRAME_POSTER_UI_ALERT = 10211， 通知客户端是否显示警告框。当关闭时将不显示默认警告框，警告的内容和code通过 LK_WEBCLIENT_NOTIFY_ALERT 事件向外抛出
* 添加事件类型 LK_IFRAME_POSTER_UI_CONFIRM = 10212， 通知客户端是否显示确认框。当关闭时将不显示默认确认框，需要用户确认的内容和code通过 LK_WEBCLIENT_NOTIFY_CONFIRM 事件抛出。

比如关闭确认框的情况下，收到了 code 为 LK_APP_PROCESS_NOTIFI_APP_QUIT 的消息，表示云端应用退出了，根据实际的业务需要来提示用户，如果需要重新启动云端应用，再通过发送 LK_IFRAME_POSTER_FUNC_RESTART_CLOUD_APP 事件来通知客户端启动。