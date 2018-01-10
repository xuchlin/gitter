var isTopMainPage = false;//是否为顶层页面
var topWin = top;
if (topWin == window)//为顶层
    isTopMainPage = (topWin.messageBox != null && topWin.messageBox != undefined && topWin.win != null && topWin.win != undefined);
else {
    try {//如果是跨域，则就可能出现异常
        isTopMainPage = (topWin.messageBox != null && topWin.messageBox != undefined && topWin.win != null && topWin.win != undefined);
    }
    catch (e) { }
}

if (!isTopMainPage) //不是首页或不是首页的子页，则检查一下上级是否带为是
{
    topWin = parent;
    while (!isTopMainPage && topWin != top) {
        try {//如果是跨域，则就可能出现异常
            isTopMainPage = (topWin.messageBox != null && topWin.messageBox != undefined && topWin.win != null && topWin.win != undefined);
        }
        catch (e) { }
        if (!isTopMainPage &&topWin!=null)
        {
            topWin = topWin.parent;
        }
    }
}
if (!isTopMainPage) {
    document.write('<script language="javascript" src="' + RS.pageInfo.rootvpath + 'Content/RSJLibrary/MessageBox/RS_Message.js" type="text/javascript"><\/script>');
    document.write('<script language="javascript" src="' + RS.pageInfo.rootvpath + 'Content/RSJLibrary/Windows/RS_Window.js" type="text/javascript"><\/script>');
}
else if (window != top) {
    window.messageBox = topWin.messageBox;
    window.win = topWin.win;
    window.showError = topWin.showError;
    window.showInfo = topWin.showInfo;
    window.showWain = topWin.showWain;
    window.showNotice = topWin.showNotice;

    window.showProcess = topWin.showProcess;
    window.hideProcess = topWin.hideProcess;

    window.openDialog = topWin.openDialog;
    window.openModelDialog = topWin.openModelDialog;
    window.openNormal = topWin.openNormal;
    window.openModelNormal = topWin.openModelNormal;

    window.openDialogMax = topWin.openDialogMax;
    window.openModelDialogMax = topWin.openModelDialogMax;
    window.openNormalMax = topWin.openNormalMax;
    window.openModelNormalMax = topWin.openModelNormalMax;
    window.showConfirm = topWin.showConfirm;
}
//contentWindow
function closeWin(params) {
    if (currentWindow != null) {
        currentWindow.ok(params);
    }
}
function cancelWin() {
    if (currentWindow != null) {
        currentWindow.cancel();
    }
}
