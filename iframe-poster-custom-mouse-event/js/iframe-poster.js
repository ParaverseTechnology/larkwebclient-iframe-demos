var serverAddr = "192.168.0.50:8181";

var config = {
	userLocalIP: true,
	server: "http://" + serverAddr + "/", // server
    webclient: "http://" + serverAddr + "/webclient", // client
    // webclient: "http://192.168.0.122:8080/", // debug client
    testAppId: "755479303826702336",
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
        var poster = new lark.iframePoster($("#iframe").get(0), {
            onMessage: onMessage,
            listenKeyboard: true,
        })
        
        var iframeSize = {
            appSize: {width: 0, height: 0},
            container: {marginTop: 0, marginLeft: 0, width: 0, height: 0},
            scale: {scaleX: 1, scaleY: 1},
            viewPort: {width: 0, height: 0},
        };

        function onMessage(e) {
            console.log("receive message." + e.data.prex, e.data.type, e.data.message, e.data.data);
            switch(e.data.type) {
                case 930:
                    console.log("receive iframe size.", e.data.data);
                    iframeSize = e.data.data;
                    break;
                default:
                    console.log("receive message." + e.data.prex, e.data.type, e.data.message, e.data.data);
                    break;
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

        var lastAppPosition = {
            x: 0,
            y: 0,
        }
        // mugging mouse event
        function handleMouseEvent(e) {
            e.preventDefault();
            e.stopPropagation();

            var clientPosition = getMousePositon(e, e.target);
            var videoPoistion = {
                x: clientPosition.x - iframeSize.container.marginLeft,
                y: clientPosition.y - iframeSize.container.marginTop,
            };
            if (videoPoistion.x < 0 || videoPoistion.y < 0 ||
                videoPoistion.x > iframeSize.container.marginLeft + iframeSize.container.width || 
                videoPoistion.y > iframeSize.container.marginTop + iframeSize.container.height) {
                     console.log('outside window');
                     return;
            }
            var appX = Math.round(videoPoistion.x * iframeSize.scale.scaleX);
            var appY = Math.round(videoPoistion.y * iframeSize.scale.scaleY);
            console.log('handleMouseEvent', e);

            var mouseKey = "";
            switch (e.which) {
                case 1:
                    mouseKey = 'left';
                    break;
                case 2:
                    mouseKey = 'right';
                    break;
                case 3:
                    mouseKey = 'mid';
                    break;
            }
            switch (e.type) {
                case 'mousedown':
                    poster.sendMouseDown(mouseKey, appX, appY);
                    break;
                case 'mouseup':
                    poster.sendMouseUp(mouseKey, appX, appY);
                    break;
                case 'mousemove':
                    poster.sendMouseMove(appX, appY, 
                        lastAppPosition.x == 0 ? 0 : appX - lastAppPosition.x, 
                        lastAppPosition.y == 0 ? 0 : appY - lastAppPosition.y);

                    lastAppPosition = {
                        x: appX,
                        y: appY,
                    }
                    break;
                default:
                    // skip other event. not emit
                    return;
            }
        }
        $(".iframe-mouse-mug").on('mousedown', handleMouseEvent);

        $(".iframe-mouse-mug").on('mouseup', handleMouseEvent);

        $(".iframe-mouse-mug").on('mousemove', handleMouseEvent);


        // utils
        /**
         * 获取某元素距离文档的距离
         * @param element 元素对象
         * @returns 高度
         */
        function getElementTop(element) {
            let actualTop = element.offsetTop;
            let current = element.offsetParent;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop;
        }
        /**
         * 获取元素距离文档左侧的距离
         * @param element 元素对象
         * @returns 左侧距离
         */
        function getElementLeft(element) {
            let actualLeft = element.offsetLeft;
            let current = element.offsetParent;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        }
        /**
         * 获取元素相对文档位置
         * @param element 元素对象
         * @returns { offsetX:X, offsetY:Y }
         */
        function getOffsetViewport(element) {
            // x
            const x = getElementLeft(element);
            // y
            const y = getElementTop(element);
            
            const offsetX = x - window.pageXOffset;
            
            const offsetY = y - window.pageYOffset;

            return {
                offsetX: offsetX,
                offsetY: offsetY
            };
        }
        /**
         * 获取鼠标相对元素的坐标
         * @param {*} e 鼠标回调事件 
         * @param element dom 元素
         */
        function getMousePositon(e, element) {
            const offset  = getOffsetViewport(element);
            const clientX = e.clientX - offset.offsetX;
            const clientY = e.clientY - offset.offsetY;
            return {
                x: clientX,
                y: clientY,
            };
        }
	})();
});