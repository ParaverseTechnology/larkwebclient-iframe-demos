var serverAddr = "192.168.0.50:8181";

var config = {
	server: "http://" + serverAddr + "/", // server
    webclient: "http://" + serverAddr + "/webclient", // client
    // webclient: "http://192.168.0.122:8080/", // debug client
    testAppId: "745609250029436928",
}

$(document).ready(function() {
    // 进入应用应用列表中获取的第一个应用。
    $("#enter").on("click", function(e) {
        if (!config.server) {
            alert("请设置 config.server");
            return;
        }
        if (config.testAppId) {
            enterApp(config.testAppId);
        } else {
            $.get(config.server + "getAppliList", function(res) {
                if (res && res.code === 1000) {
                    console.log("load list success", res.result.list);
                    if (res.result.list && res.result.list.length > 0) {
                        enterApp(res.result.list[0].appliId);
                    } else {
                        console.log("empty list. please use create server ip.");
                    }
                } else {
                    console.warn("load list failed", res);
                }
            });
        }
    })
    // 关闭应用
    $("#close").on("click", function(){
		$("#iframe").attr("src", "");
    });
    function enterApp(appliId) {
		console.log("enter appli:", config.server + "getEnterAppliInfo?appliId=" + appliId);
		$.get(config.server + "getEnterAppliInfo?appliId=" + appliId, function(res){
			console.log("enter appli res:", res, joinParam(res.result));
			if (res && res.code == 1000) {
                // res.result.playerMode = 1;
				// res.result.userType = 1;
				// res.result.nickname = "Test";
				// res.result.roomCode = 0;
                
				$("#iframe").attr("src", config.webclient + "?" + joinParam(res.result));
			}
		})
    }
    
    function joinParam(params){
	    var res = '';
	    for (const i in params) {
	        if (i) {
	            res += i + '=' + params[i] + '&';
	        }
	    }
	    return res;
    };

    // iframe websocket test
	(function() {
        var poster = new lark.iframePoster($("#iframe").get(0), {
            onMessage: onMessage,
            listenKeyboard: true,
        })
        
        function onBridgeReady() {
            // tell client bridge ready.
            poster.wxJsBridgeReady();
        }

        function onMessage(e) {
            console.log("receive message." + e.data.prex, e.data.type, e.data.message, e.data.data);
            if (e.data.type == lark.EventTypes.LK_WEB_CLIENT_LOAD_SUCCESS) {
                // listen wx js bridge ready.
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            }
        }
    
        $(".test-key").on("mousedown", function() {
            var key = $(this).attr('data');
            poster.sendKeyDown(key, false);
        });
        $(".test-key").on("mouseup", function() {
            var key = $(this).attr('data');
            poster.sendKeyUp(key);
        });
        $("#mouse-wheel-up").on('click', function() {
            poster.sendWheelUp(500, 500);
        });
        $("#mouse-wheel-down").on('click', function() {
            poster.sendWheelDown(500, 500);
        });
        $("#mouse-move").on('click', function() {
            poster.sendMouseMove(500, 500, 10, 10);
        });
        $("#mouse-left").on('mousedown', function() {
            poster.sendMouseDown('left', 500, 500);
        });
        $("#mouse-left").on('mouseup', function() {
            poster.sendMouseUp('left', 500, 500);
        });
        $("#mouse-right").on('mousedown', function() {
            poster.sendMouseDown('right', 500, 500);
        });
        $("#mouse-right").on('mouseup', function() {
            poster.sendMouseUp('right', 500, 500);
        });
        $("#mouse-mid").on('mousedown', function() {
            poster.sendMouseDown('mid', 500, 500);
        });
        $("#mouse-mid").on('mouseup', function() {
            poster.sendMouseUp('mid', 500, 500);
        });
        $(".test-scale-mode").on("click", function() {
            // mode 缩放模式值为： fit/cover/contain/fill_stretch
            var mod = $(this).attr('data');
            poster.setScaleMode(mod);
        });
        $(".test-mouse-mode").on("click", function() {
            // mode "true"/"false" 鼠标模式 true 为锁定模式，false 为自动判断模式
            var mod = $(this).attr('data');
            poster.setMouseMode(mod);
        });
        // 控制底部控制栏显示与隐藏
        $(".test-control-bar").on("click", function() {
            // show "true"/"false" 是否显示控制球
            var mod = $(this).attr('data');
            poster.setShowControlBall(mod);
        });
        // 控制玩家列表显示与隐藏
        $(".test-playerlist").on("click", function() {
            // show "true"/"false" 是否显示玩家列表
            var mod = $(this).attr('data');
            poster.setShowPlayerList(mod);
        });
        // 控制玩家列表分享按钮的显示与隐藏
        $(".test-shareurl").on("click", function() {
            // show "true"/"false" 是否显示分享连接
            var mod = $(this).attr('data');
            poster.setShowPlayerListShareUrl(mod);
        });
        // 控制手机端控制球显示与隐藏
        $(".test-mobile-control-ball").on("click", function() {
            // show "true"/"false" 手机端是否显示控制球
            var mod = $(this).attr('data');
            poster.setShowMobileControlBall(mod);
        });
        // 控制手机端摇杆显示与隐藏
        $(".test-mobile-joystick").on("click", function() {
            // show "true"/"false" 手机端是否显示摇杆
            var mod = $(this).attr('data');
            poster.setShowMobileJoystick(mod);
        });
        // 控制手机端虚拟键盘显示与隐藏
        $(".test-mobile-virtualkeyboard").on("click", function() {
            // "true"/"false" 是否显示虚拟键盘
            var mod = $(this).attr('data');
            poster.setShowMobileKeyboard(mod);
        });
        // 控制手机端虚拟鼠标显示与隐藏
        $(".test-mobile-virtualmouse").on("click", function() {
            // show "true"/"false" 是否显示菜单栏
            var mod = $(this).attr('data');
            poster.setShowMobileVritualMouse(mod);
        });
        // 控制手机端菜单显示与隐藏
        $(".test-mobile-menu").on("click", function() {
            // force "true"/"false" 是否强制横屏
            var mod = $(this).attr('data');
            poster.setShowMobileMenu(mod);
        });
        // 控制手机端是否强制横屏
        $(".test-mobile-forcelandscape").on("click", function() {
            // "true"/"false" 是否强制横屏
            var mod = $(this).attr('data');
            poster.setMobileForcelandscape(mod);
        });
        // 控制手机端是否显示触摸点
        $(".test-mobile-touchpoint").on("click", function() {
            var mod = $(this).attr('data');
            // "true"/"false" 是否显示触摸点
            poster.setMobileTouchPoint(mod);
        });
        // 是否启用警告框
        $(".test-alert").on("click", function() {
            var mod = $(this).attr('data');
            poster.setAlertEnable(mod);
        });
        // 是否启用确认框
        $(".test-confirm").on("click", function() {
            var mod = $(this).attr('data');
            poster.setConfirmEnable(mod);
        });
        // 设置 toast level
        $(".test-toast-level").on("click", function() {
            var mod = $(this).attr('data');
            poster.setToastLevel(mod);
        });
        // 通知客户端微信加载完成
        $(".test-wx-jsready").on("click", function() {
            poster.wxJsBridgeReady();
        });
        // 请求播放视频，当视频组件播放失败需要用户触发
        // 但禁用客户端内部alert 时调用
        $(".test-request-playvideo").on("", function() {
            poster.requestPlayVideo();
        });
	})();
});