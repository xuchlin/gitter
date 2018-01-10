RS.message = function () {
    this.showError = function (info) {
        if (bodyIsLoaded)
            $.messager.alert('错误提示',info,'error');
        else
            $(function () { $.messager.alert('错误提示', info, 'error'); });
    };
    this.showInfo = function (info) {
        if (bodyIsLoaded)
            showMessage(0, "消息提示", info);
        else
            $(function () { showMessage(0, "消息提示", info); });
    };
    this.showWain = function (info) {
        if (bodyIsLoaded)
            $.messager.alert('警示信息',info,'warning');
        else
            $(function () { $.messager.alert('警示信息', info, 'warning'); });
    };
    this.askQuestion = function (info, okCallBack, cancleCallBack) {
        if (bodyIsLoaded)
            showQuestion(info, okCallBack, cancleCallBack);
        else
            $(function () { showQuestion(info, okCallBack, cancleCallBack); });
    };
    this.showProcess=function(info,timeout)
    {
        if (bodyIsLoaded)
            progress(info,timeout);
        else
            $(function () { progress(info,timeout); });
    };
    this.hideProcess=function()
    {
        if (bodyIsLoaded)
            $.messager.progress('close');
        else
            $(function () { $.messager.progress('close'); });
    };    
    this.showNotice = function (info) {
        if (bodyIsLoaded)
            showNotice(info);
        else
            $(function () { showNotice(info); });
    }

    ///显示详细内容
    this.showMoreInfo= function(obj)
    {   
        var div = $(obj);
        var win = div.parent().parent().next();
        if (win == undefined) return;
        var html = win.html();

        var bw = $(window).width();
        var bh = $(window).height();

        win=$("<div></div>");
        win.html(html);
        win.window({
            title: "详细提示信息",
            collapsible: false,
            minimizable: false,
            maximizable: false,
            maximized:false,
            modal: true,
            width: bw - 50,
            height: bh - 50
        });

    }

    function showNotice(info) {
        $.messager.show({
            title: '信息提示:<span style="cursor:pointer; color:#ffffff;" onclick="messageBox.showMoreInfo(this)">【详情】</a>',
            msg: info,
            showType: 'show',
            width:350,
            height: 150
        });
    }

    function progress(info, timeout) {
        var win = $.messager.progress({
            title: '进度信息',
            msg: info
        });
        var time = parseInt(timeout);
        if (isNaN(time)) time = 30000;

        setTimeout(function () {
            $.messager.progress('close');
        }, time);
    }
    function showQuestion(info, okCallBack, cancelCallBack) {
        $.messager.confirm('系统提示', info, function (r) {
            if (r) {
                if (okCallBack != null) {
                    try {
                        okCallBack();
                    }
                    catch (e) { }
                }
            }
            else {
                if (cancelCallBack != null) {
                    try {
                        cancelCallBack();
                    }
                    catch (e) { }
                }
            }
        });        
    }
};
var messageBox = new RS.message();
window.messageBox = messageBox;


window.showError = function (message) {
    messageBox.showError(message);
};
window.showWain = function (message) {
    messageBox.showWain(message);
};
window.showInfo = function (message) {
    messageBox.showInfo(message);
};
window.showNotice = function (info) {
    messageBox.showNotice(info);
};
window.showProcess = function (info, timeout) {
    messageBox.showProcess(info, timeout);
};
window.hideProcess = function () {
    messageBox.hideProcess();
};