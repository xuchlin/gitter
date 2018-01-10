RS.wincls = function () {
    var rtn = {
        frame:null,
        openDialog: null,
        openNormal: null,
        openModelDialog: null,
        openModelNormal: null,
        openDialogMax: null,
        openNormalMax: null,
        openModelDialogMax: null,
        openModelNormalMax: null,
        showConfirm:null
    };
    //普通对话框打开，非模式窗口，且不可改动大小
    rtn.openDialog = function (url, width, height, closeCallBack, Wparams) {
        if (bodyIsLoaded)
            showWindow(url, width, height, false, false, closeCallBack, Wparams, false);
        else
            $(function () { showWindow(url, width, height, false, false, closeCallBack, Wparams, false); });
    };
    //普通打开，非模式窗口，可以改动大小
    rtn.openNormal = function (url, width, height, closeCallBack, Wparams) {
        if (bodyIsLoaded)
            showWindow(url, width, height, true, false, closeCallBack, Wparams, false);
        else
            $(function () { showWindow(url, width, height, false, false, closeCallBack, Wparams, false); });
    };
    //模式对话模打开，模式窗口，不可改动大小
    rtn.openModelDialog = function (url, width, height, closeCallBack, Wparams) {
        if (bodyIsLoaded)
            showWindow(url, width, height, false, true, closeCallBack, Wparams, false);
        else
            $(function () { showWindow(url, width, height, false, true, closeCallBack, Wparams, false); });
    };
    //模式普通打开，模式窗口，可改动大小
    rtn.openModelNormal = function (url, width, height, closeCallBack, Wparams) {
        if (bodyIsLoaded)
            showWindow(url, width, height, false, true, closeCallBack, Wparams, false);
        else
            $(function () { showWindow(url, width, height, false, true, closeCallBack, Wparams, false); });
    };

    //以下默认为最大化打开
    rtn.openDialogMax = function (url, width, height, closeCallBack, Wparams) {
        if (bodyIsLoaded)
            showWindow(url, width, height, false, false, closeCallBack, Wparams,true);
        else
            $(function () { showWindow(url, width, height, false, false, closeCallBack, Wparams, true); });
    };

    rtn.openNormalMax = function (url, width, height, closeCallBack, Wparams) {
        if (bodyIsLoaded)
            showWindow(url, width, height, true, false, closeCallBack, Wparams, true);
        else
            $(function () { showWindow(url, width, height, false, false, closeCallBack, Wparams, true); });
    };

    rtn.openModelDialogMax = function (url, width, height, closeCallBack, Wparams) {
        if (bodyIsLoaded)
            showWindow(url, width, height, false, true, closeCallBack, Wparams, true);
        else
            $(function () { showWindow(url, width, height, false, true, closeCallBack, Wparams, true); });
    };
    rtn.openModelNormalMax = function (url, width, height, closeCallBack, Wparams) {
        if (bodyIsLoaded)
            showWindow(url, width, height, false, true, closeCallBack, Wparams, true);
        else
            $(function () { showWindow(url, width, height, false, true, closeCallBack, Wparams, true); });
    };

    rtn.showConfirm = function (caption, callMethod,_size,defaultValue) {
        if (caption == null || caption == undefined) caption = "请输入信息";
        var size=200;
        if (_size == null || _size == undefined)
            size = 200;
        else if (isNaN(_size))
            size = 200;
        else
            size = parseInt(_size);
        if (isNaN(size)) size = 200;
        var url = RS.pageInfo.rootvpath +RS.pageInfo.contentPath+ "/RSJLibrary/Windows/WebInput.htm";
        rtn.openModelNormal(url, 400, 250, function (info) {
            try {
                if (info != null && callMethod != null)
                    callMethod(info);
            }
            catch (e) { }
        }, { title: "输入对话框", caption: caption, size: size, pageInfo: RS.pageInfo,value:defaultValue });
    };

    function showWindow(url, width, height, allowSize, showMask, closeCallBack, Wparams, isMax)
    {
        if (isNaN(width) || width < 10) width = 600;
        if (isNaN(height) || height < 10) height = 300;
        
        var bw = $(window).width();
        var bh = $(window).height();



        if (height > bh - 50) height = bh - 50;
        if (width > bw - 50) width = bw - 50;


        url = forceNoCache(url);
        var isExecCallback = false;
        var winPanel = $("<div></div>");
        var frame = $("<iframe class=\"windowFrame\" width=\"100%\" height=\"100%\" scrolling=\"auto\" frameborder=\"0\"></iframe>");
        frame.load(function (e) {
            try{
                this.contentWindow.currentWindow = curWin;
                winPanel.window("setTitle", this.contentWindow.document.title);
            }
            catch(e){}
        });
        toChildWinTempParams = Wparams;

        var callBackParam = null;//回调时返回的值

        winPanel.window({
            width: width, height: height,shadow:false,modal:showMask,collapsible:false,title:'功能窗口',resizable:allowSize,maximized:isMax,maximizable:false,minimizable:false,
            onResize: function (w, h) {
                setFrameSize(winPanel, frame);
            }
            , onClose: function () {
                if (closeCallBack != undefined && closeCallBack != null) {
                    try {
                        closeCallBack(callBackParam);
                    }
                    catch (e) { }
                }
                window.setTimeout(function() //真实清空当前组件
                {
                    try {
                        frame.attr("src", "");
                        frame.remove();
                        frame = null;
                    }
                    catch (e) { }
                    try {
                        winPanel.window("destroy");
                    }
                    catch (e) { }
                }, 2000);//设定3秒之后清空当前组件
            }, onOpen: function () {
                var w = winPanel.window("window");
                var b = winPanel.window("body");
                b.css("overflow", "hidden");
                b.append(frame);
                frame.width(b.width());
                frame.height(b.height());
                frame.attr("src",url);
            }
        });
        var curWin = {
            winPanel:winPanel,
            frame: frame,
            ok: function (params) {
                callBackParam = params;
                closeWin(this.winPanel);
            },
            cancel: function () {
                callBackParam = null;//无返回值
                closeWin(this.winPanel);
            }
        };
        return curWin;
    }
    function setFrameSize(winPanel, frame)
    {
        var b = winPanel.window("body");
        b.append(frame);
        frame.width(b.width());
        frame.height(b.height());
    }
    function closeWin(winPanel) {
        try {
            winPanel.window("close"); //这个会激活回滚事件
        }
        catch (e) { }
    }
    function forceNoCache(url) {
        if (url == null) {
            return null;
        }
        if (url.indexOf("?") == -1) {
            return url + "?" + "noCacheToken=" + Math.random();
        }
        else {
            return url + "&" + "noCacheToken=" + Math.random();
        }
    }    
    return rtn;
};

var win = new RS.wincls();
window.openDialog =win.openDialog;
window.openModelDialog =win.openModelDialog;
window.openNormal =win.openNormal;
window.openModelNormal = win.openModelNormal;

window.openDialogMax = win.openDialogMax;
window.openModelDialogMax = win.openModelDialogMax;
window.openNormalMax = win.openNormalMax;
window.openModelNormalMax = win.openModelNormalMax;

window.showConfirm = win.showConfirm;
