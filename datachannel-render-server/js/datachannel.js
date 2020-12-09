var serverAddr = "192.168.0.50:8181";

var config = {
	userLocalIP: true,
	server: "http://" + serverAddr + "/", // server
	// webclient: "http://" + serverAddr + "/webclient", // client
    webclient: "http://192.168.0.122:8080/", // debug client
    // testAppId: "745612252752642048",
	testAppId: "745609250029436928",
	// test appurl
	testAppUrl: "http://127.0.0.1:8080/cloudlark/webclient/#/?appServer=192.168.0.223&appPort=10002&taskId=123456&debugTask=true&logLevel=info&",
}


$(document).ready(function() {
    // 进入应用应用列表中获取的第一个应用。
    $("#enter").on("click", function(e) {
        if (!config.server) {
            alert("请设置 config.server");
            return;
		}
		if (config.testAppUrl) {
			$("#iframe").attr("src", config.testAppUrl);
		} else if (config.testAppId) {
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
		// 监听消息
		window.addEventListener("message", function(e) {
			switch(e.data.type) {
				// open
				case 20200:
					console.log("通道开启", e.data.data);
					$("#receive").text("通道开启");
					break;
				case 20201:
					console.log("通道关闭", e.data.data);
					$("#receive").text("通道关闭");
					break;
				// 接收到字节消息
				case 20202:
					console.log("接收到字节消息", e.data.data);
					$("#receive").text(e.data.data);
					break;
				// 接收到文本消息
				case 20203:
					console.log("接收到文本消息", e.data.data);
					$("#receive").text(e.data.data);
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
			sendToIframe(20300, jsonStr, "");
		}

		// 发送字节消息
		function sendBinary(binary) {			
			sendToIframe(20301, binary, "");
		}

		$("#test-ws").on("click", function() {
			sendText($("#input").val());
		});

		$("#send-test-binary").on("click", function() {
            sendBinary(new Uint8Array([0x50, 0x58, 0x59, 0xf0]));
		});
	})();
});