var serverAddr = "192.168.0.50:8088";

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

	// websocket test
	(function() {
		// test json cmdtype
		var JsonCmdType  = {
			CMD_CAMERA_LOADED: 1000,
			CMD_SWITCH_CAMERA: 1001,
	
			CMD_OBJECT_LOADED: 2001,
			CMD_OBJECT_PICKED: 2002,
			CMD_TOGGLE_OBJECT: 2003,
		};

		var pxyproto = protobuf.roots.default.pxyproto;
		console.log('proto buf', protobuf.Message);
		console.log('websocket channel test');
		// var ws = new WebSocket("ws://192.168.0.18:10006/webConnProxy/123");
		var ws = new WebSocket("ws://192.168.0.50:10006/webConnProxy/123");
		// var ws = new WebSocket("ws://192.168.0.50:10006/webConnProxy/734828136801239040");
		ws.binaryType = 'arraybuffer';

		var helloTimer = 0;
		var keepAliveTimer = 0;
		var lastPingTimestamp = 0;
		var lastPongTimestamp = 0;
		var establishConnection = false;

		// 
		var cameraCount = 0;
		var objectCount = 0;

		ws.onopen = function() {
			console.log('on open', pxyproto);
			// check connection.
			startHelloTimer();
		}
		ws.onclose = function() {
			console.log('on close');
			$('#cameralist').empty();
			$("#objectList").empty();
			establishConnection = false;
			stopHelloTimer();
			stopKeepAlive();
		}
		ws.onerror = function() {
			console.log('on error');
			$('#cameralist').empty();
			$("#objectList").empty();
			establishConnection = false;
			stopHelloTimer();
			stopKeepAlive();
		}
		ws.onmessage = function(event) {
			if (typeof event.data === 'string') { 
				// got string msg
				jsoncmdMessageHandle(event.data);
			} else {
				// got binary msg.
				controlMsgHandle(event.data)
			}
		}

		var controlMsgHandle = function(data) {
			// decode msg.
			try {
				var msg =  pxyproto.Message.decode(new Uint8Array(data));
				console.log('got msg', msg);
				if (msg.controlMsg) {
					switch (msg.controlMsg.type) {
						case pxyproto.CONTROL_MSG_TYPE.MSG_HELLO:
							if (!establishConnection) {
								stopHelloTimer();
								establishConnection = true;
								console.log('got hello control msg establish connection. start keepalive');
								startKeepAlive();
							} else {
								console.log('channel already established');
							}
							break;
						case pxyproto.CONTROL_MSG_TYPE.MSG_PING:
							console.log('got ping control msg send pong.');
							var msg = new pxyproto.Message();
							var controlMsg = new pxyproto.ControlMessage({
								type: 2,
							});
							msg.controlMsg = controlMsg;
							sendMsg(msg);
							break;
						case pxyproto.CONTROL_MSG_TYPE.MSG_PONG:
							console.log('got pong control msg');
							lastPongTimestamp = Date.now();
							break;
					}
				} else {
					console.log('got data msg');
				}
			} catch(e) {
				console.log('decode message failed', e);
			}
		}

		var jsoncmdMessageHandle = function(jsonStr) {
			try {
				var cmd = JSON.parse(jsonStr);
				switch(cmd.type) {
					case JsonCmdType.CMD_CAMERA_LOADED:
						// init camera list.
						// clear old
						$('#cameralist').empty();
						for (var i = 0; i < cmd.data; i++) {
							$("#cameralist").append(
								'<button class="btn btn-default camera"' + 
									'data-index="' + i + '">Switch To Camera ' + i + 
								'</button>'
							);
						}
						// switch object.
						$('.camera').on('click', function(e) {
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
						$("#objectList").empty();
						for (var i = 0; i < cmd.data; i++) {
							$("#objectList").append(
								'<button class="btn btn-default object"' + 
									'data-index="' + i + '">Toggle Object ' + i + 
								'</button>'
							);
						}
						// toggle object.
						$('.object').on('click', function(e) {
							var index = $(this).attr('data-index');
							console.log('toggle ' + index + ' object');
							sendText(JSON.stringify({
								type: JsonCmdType.CMD_TOGGLE_OBJECT,
								data: parseInt(index),
							}))
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
		// test cmd
		// jsoncmdMessageHandle('{"type":2001,"data":3}');
		// jsoncmdMessageHandle('{"type":1000,"data":3}');

		var startHelloTimer = function() {
			helloTimer = window.setInterval(function() {
				var msg = new pxyproto.Message();
				var controlMsg = new pxyproto.ControlMessage({
					type: 0
				});
				msg.controlMsg = controlMsg;
				sendMsg(msg);
				// sendText("1234");
			}, 1000);
		}

		var stopHelloTimer = function() {
			if (helloTimer != 0) {
				window.clearInterval(helloTimer);
			}
			helloTimer = 0;
		}

		var startKeepAlive = function() {
			keepAliveTimer = window.setInterval(function() {
				if (lastPingTimestamp != 0) {
					var interval = Date.now() - lastPongTimestamp;
					console.log("keepalive pong interval", interval);
					if (interval > 15 * 1000) {
						console.log('keepalive timeout. wait for new connect');
						// ws.close();
						establishConnection = false;
						stopKeepAlive();
						startHelloTimer();
						return;
					}
				}

				var msg = new pxyproto.Message();
				var controlMsg = new pxyproto.ControlMessage({
					type: 1,
				});
				msg.controlMsg = controlMsg;
				sendMsg(msg);
				lastPingTimestamp = Date.now();
			}, 5 * 1000);
		}

		var stopKeepAlive = function() {
			if (keepAliveTimer != 0) {
				window.clearInterval(keepAliveTimer);
			}
			lastPingTimestamp = 0;
			lastPongTimestamp = 0;
		}

		var sendMsg = function(msg) {
			sendBinary(pxyproto.Message.encode(msg).finish());
		}

		var sendBinary = function(bitArray) {
			if (ws && ws.readyState == 1) {
				ws.send(bitArray);
			}
		}

		var sendText = function(txt) {
			if (ws && ws.readyState == 1) {
				ws.send(txt);
			}
		}

		$("#test-ws").on("click", function() {
			sendText($("#input").val());
		});

		$("#send-test-binary").on("click", function() {
			var msg = new pxyproto.Message();
			var dataMsg = new pxyproto.DataMessage({
				data: new Uint8Array([0x50, 0x58, 0x59, 0xf0])
			});
			msg.dataMsg = dataMsg;
            sendMsg(msg);
		});
	})(); // test end
});