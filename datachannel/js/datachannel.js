var serverAddr = "192.168.0.50:8181";

var config = {
	userLocalIP: true,
	server: "http://" + serverAddr + "/", // server
	// webclient: "http://" + serverAddr + "/webclient", // client
    webclient: "http://192.168.0.122:8080/", // debug client
    // testAppId: "745612252752642048",
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
				// 设置 datachannel server
				res.result.dcsIp = '192.168.0.50';
				res.result.dcsPort = 10006;
				res.result.disableDcs = false;
                
                res.result.debugTask = true;
                res.result.debugWebServer = serverAddr;
                
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
		// test json cmdtype
		var JsonCmdType  = {
			CMD_CAMERA_LOADED: 1000,
			CMD_SWITCH_CAMERA: 1001,
	
			CMD_OBJECT_LOADED: 2001,
			CMD_OBJECT_PICKED: 2002,
			CMD_TOGGLE_OBJECT: 2003,
		};

		// 监听消息
		window.addEventListener("message", function(e) {
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
					// console.log("receive message." + e.data.prex, e.data.type, e.data.message, e.data.data);
					break;
			}
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

		// 发送字符消息。
		function sendText(jsonStr) {
			sendToIframe(20102, jsonStr, "");
		}

		// 发送字节消息
		function sendBinary(binary) {			
			sendToIframe(20103, binary, "");
		}

		var jsoncmdMessageHandle = function(jsonStr) {
			$("#getText").val(jsonStr);
			try {
				var cmd = JSON.parse(jsonStr);
				switch(cmd.type) {
					case JsonCmdType.CMD_CAMERA_LOADED:
						// init camera list.
						// clear old
						$('#cameralist-iframe').empty();
						for (var i = 0; i < cmd.data; i++) {
							$("#cameralist-iframe").append(
								'<button class="btn btn-default camera"' + 
									'data-index="' + i + '">Switch To Camera ' + i + 
								'</button>'
							);
						}
						// switch object.
						$('#cameralist-iframe .camera').on('click', function(e) {
							var index = $(this).attr('data-index');
							console.log('switch to ' + index + ' camera');
							sendText(JSON.stringify({
								type: JsonCmdType.CMD_SWITCH_CAMERA,
								data: parseInt(index),
							}));
						});
						break;
					case JsonCmdType.CMD_OBJECT_LOADED:
						// init object list.
						// clear old
						$("#objectList-iframe").empty();
						for (var i = 0; i < cmd.data; i++) {
							$("#objectList-iframe").append(
								'<button class="btn btn-default object"' + 
									'data-index="' + i + '">Toggle Object ' + i + 
								'</button>'
							);
						}
						// toggle object.
						$('#objectList-iframe .object').on('click', function(e) {
							var index = $(this).attr('data-index');
							console.log('toggle ' + index + ' object');
							sendText(JSON.stringify({
								type: JsonCmdType.CMD_TOGGLE_OBJECT,
								data: parseInt(index),
							}));
						});
						break;
					default:
						console.log('got json cmd ' + jsonStr);
						break;
				}
			} catch(e) {
				console.warn('cmd parse failed.');
			}
		}

		$("#test-ws").on("click", function() {
			sendText($("#input").val());
		});

		$("#close-channel").on("click", function() {
			sendToIframe(20101, "", "");
		});

		$("#reconn-channel").on("click", function() {
			sendToIframe(20100, "", "");
		});

		$("#send-test-binary").on("click", function() {
            sendBinary(new Uint8Array([0x50, 0x58, 0x59, 0xf0]));
		});
	})();
});