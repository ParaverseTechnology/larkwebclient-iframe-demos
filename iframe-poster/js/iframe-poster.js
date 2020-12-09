var serverAddr = "192.168.0.50:8181";

var config = {
	userLocalIP: true,
	server: "http://" + serverAddr + "/", // server
	// webclient: "http://" + serverAddr + "/webclient", // client
    webclient: "http://192.168.0.122:8080/", // debug client
    testAppId: "745612252752642048",
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
				// 设置 datachannel server
				res.result.dcsIp = '192.168.0.50';
				res.result.dcsPort = 10006;
				res.result.disableDcs = false;
                
                res.result.debugTask = true;
                res.result.debugWebServer = serverAddr;

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
        window.addEventListener("message", function(e) {
            console.log("receive message." + e.data.prex, e.data.type, e.data.message, e.data.data);
        }, false);
    
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
    
        $(".test-key").on("mousedown", function() {
            var key = $(this).attr('data');
            sendToIframe(10010, {
                key,
                isRepeat: false,
            }, "");
        });
        $(".test-key").on("mouseup", function() {
            var key = $(this).attr('data');
            sendToIframe(10011, {
                key,
                isRepeat: false,
            }, "");
        });
        $("#mouse-wheel-up").on('click', function() {
            sendToIframe(10003, {
                x: 500,
                y: 500,
                wheel: -100,
            }, "");
        });
        $("#mouse-wheel-down").on('click', function() {
            sendToIframe(10003, {
                x: 500,
                y: 500,
                wheel: -100,
            }, "");
        });
        $("#mouse-move").on('click', function() {
            sendToIframe(10000, {
                x: 500,
                y: 500,
                rx: 10,
                ry: 10,
            }, "");
        });
        $("#mouse-left").on('mousedown', function() {
            sendToIframe(10001, {
                button: 'left',
                x: 500,
                y: 500,
            }, "");
        });
        $("#mouse-left").on('mouseup', function() {
            sendToIframe(10002, {
                button: 'left',
                x: 500,
                y: 500,
            }, "");
        });
        $("#mouse-right").on('mousedown', function() {
            sendToIframe(10001, {
                button: 'right',
                x: 500,
                y: 500,
            }, "");
        });
        $("#mouse-right").on('mouseup', function() {
            sendToIframe(10002, {
                button: 'right',
                x: 500,
                y: 500,
            }, "");
        });
        $("#mouse-mid").on('mousedown', function() {
            sendToIframe(10001, {
                button: 'mid',
                x: 500,
                y: 500,
            }, "");
        });
        $("#mouse-mid").on('mouseup', function() {
            sendToIframe(10002, {
                button: 'mid',
                x: 500,
                y: 500,
            }, "");
        });
        $(".test-scale-mode").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10101, mod, "");
        });
        $(".test-mouse-mode").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10100, mod, "");
        });
        // 控制底部控制栏显示与隐藏
        $(".test-control-bar").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10200, mod, "");
        });
        // 控制玩家列表显示与隐藏
        $(".test-playerlist").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10201, mod, "");
        });
        // 控制玩家列表分享按钮的显示与隐藏
        $(".test-shareurl").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10202, mod, "");
        });
        // 控制手机端控制球显示与隐藏
        $(".test-mobile-control-ball").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10203, mod, "");
        });
        // 控制手机端摇杆显示与隐藏
        $(".test-mobile-joystick").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10204, mod, "");
        });
        // 控制手机端虚拟键盘显示与隐藏
        $(".test-mobile-virtualkeyboard").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10205, mod, "");
        });
        // 控制手机端虚拟鼠标显示与隐藏
        $(".test-mobile-virtualmouse").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10206, mod, "");
        });
        // 控制手机端菜单显示与隐藏
        $(".test-mobile-menu").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10207, mod, "");
        });
        // 控制手机端是否强制横屏
        $(".test-mobile-forcelandscape").on("click", function() {
            var mod = $(this).attr('data');
            sendToIframe(10208, mod, "");
        });
	})();
});