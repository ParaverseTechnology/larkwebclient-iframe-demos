# About

---

[English](./README.md) [中文](./README.zh_CN.md)

---

[LarkXR](https://www.paraverse.cc/) WebClient support send iframe poster event for developer trans data between WebClient in iframe and outside webpage. Demo shows how to use webclient iframe poster events and accetpt data.

1.DataChannelDemo shows how to use iframe to open datachannel and send/recive data with cloud app.

2.DataChannelDemo Extra Task show how to connect to a extra websocket datachannel and send/receive data.

3.PostMessage Demo show LarkSR Webclient inside iframe event and receive data with outside webpage.

4.DataChannel RenderServer Demo show how to open renderserver default datachannel and send/recive data with cloud app.

#### 3.1.8.1

##### Event

* Add event type LK_WEB_CLIENT_LOAD_SUCCESS = 1, throw event when webclient load success.
* Add event type LK_TASK_SYNC_APP_FAILED = 21, throw event when sync task failed.
* Add event type LK_NO_OPERATION_TIMEOUT = 901, throw event when user not operate after timout limit.
* Add event type LK_WEBCLIENT_NOTIFY_ALERT = 1100, throw event when alert box in webclient show, use for disable default alert box and make a new ui.
* Add event type LK_WEBCLIENT_NOTIFY_CONFIRM = 1101, throw event when confirm box show. use for diable default confirm box and make a new ui.
* Add event type LK_IFRAME_POSTER_FUNC_RESTART_CLOUD_APP = 10102, throw event when cloudapp closed and request restart or quit.

#### Message to WebClient

* Add message type LK_IFRAME_POSTER_FUNC_WX_JS_BRIDGE_READY = 10103, notice LarkSR loaded success in wechat. WebClient cant get wechat loaded event inside iframe.
* Add message type LK_IFRAME_POSTER_UI_TOAST_LEVEL = 10210, set WebClient toast level. toastLevel = 0 show all, toastLevel > 2 || toastLevel < 0  close all toast
* Add message type LK_IFRAME_POSTER_UI_ALERT = 10211, set WebClient show defalut alert box. When closed use LK_WEBCLIENT_NOTIFY_ALERT event get alert message.
* Add message type LK_IFRAME_POSTER_UI_CONFIRM = 10212, set WebClient show defalut confirm box. When close use LK_WEBCLIENT_NOTIFY_CONFIRM  event get confirm message.

if close defalut alert box, event code LK_APP_PROCESS_NOTIFI_APP_QUIT cloud app close, if want restart cloudapp, send  LK_IFRAME_POSTER_FUNC_RESTART_CLOUD_APP to WebClient.

#### 3.1.8.8

* Add message type LK_REQUEST_CAPTURE_FRAME_WITH_EXTRA_DATA = 3001, request capture a frame with data.
* Add event type LK_USER_CAPTURE_FRAME_WITH_EXTRA_DATA = 2001, return capture base64 and request data.