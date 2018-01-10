(function (window) {
    var RS = function (id) {
        return new RS.Lib.init(id);
    };
    RS.ajaxProcess = {
        maskProcessDiv: null,
        maskDiv:null,
        init: function () {
            //以下为进度控制
            this.maskProcessDiv = $("<div class=\"Absolute-Center\" style=\"position:fixed;top:0px;bottom:0px;overflow:hidden;\"></div>");
            this.maskProcessDiv.css("width", "100%");
            this.maskProcessDiv.css("height", "100%");
            this.maskProcessDiv.css("z-index", 2900);
            
            this.maskDiv = $("<div></div>");
            this.maskDiv.css("position", "absolute");

            this.maskDiv.append($("<img src ='" + RS.pageInfo.rootvpath +RS.pageInfo.contentPath+ "/RSJLibrary/TabFrame/Images/Loading1.gif'/>"));
           
            this.maskProcessDiv.append(this.maskDiv);
            $("body").append(this.maskProcessDiv);

            this.closeMask();
        },
        setCenter:function(){
            //居中显示
            try {
                var h = this.maskProcessDiv.height();
                var ch = this.maskDiv.height();
                if (h > ch) {
                    var t = (h - ch) / 2;
                    this.maskDiv.css("top", t + "px");
                }

                var w = this.maskProcessDiv.width();
                var cw = this.maskDiv.width();
                if (w > cw) {
                    var l = (w - cw) / 2;
                    this.maskDiv.css("left", l + "px");
                }
            }
            catch (e) { }
        },
        showMask: function () {            
            if (this.maskProcessDiv == null) this.init();
            this.maskProcessDiv.show();
            this.setCenter();
        },
        closeMask: function () {
            if (this.maskProcessDiv == null) this.init();
            this.maskProcessDiv.hide();
        }
    };
    RS.pageInfo = RS.prototype = {
        rootvpath: "/",
        sitevpath: "/",
        contentPath:"Content"
    };
    RS.gridTablePopupMax = function (url, w, h) {
        openModelNormalMax(RS.pageInfo.rootvpath + url, w, h, null, null);
    },
    RS.gridTablePopup = function (url, w, h) {
        openModelNormal(RS.pageInfo.rootvpath + url, w, h, null, null);
    },
    RS.toExcel = function (url, params) {
        var p = $.param(params);
        if ((url.length + p.length + 2) > 250) //参数过长，则采用POST方式
            toExcelForPost(url, params);
        else
            toExcelForGet(url, params);
    };
    RS.execFunByRow = function (url, grid) {
        var row = grid.selectedItem;
        if (row == null) {
            alert("请选择您要操作的记录");
            return;
        }

        RS.exec(url, JSON.stringify({ EntityString: JSON.stringify(row) }), function (result) {
            if (result.IsSuccess) {
                showNotice("操作成功！");
                grid.reflash();
            }
            else
                showNotice(result.Message);
        }, function (errMsg) {
            showNotice(errMsg);
        });
    },
    RS.getVirtualPath = function (VPath) {
        if (RS.Lib.isEmpty(VPath)) return "";
        var vp = VPath.toLowerCase();
        if (vp.indexOf("file://") == 0 ||
            vp.indexOf("ftp://") == 0 ||
            vp.indexOf("gopher://") == 0 ||
            vp.indexOf("http://") == 0 ||
            vp.indexOf("https://") == 0 ||
            vp.indexOf("mailto://") == 0 ||
            vp.indexOf("net.pipe://") == 0 ||
            vp.indexOf("net.tcp://") == 0 ||
            vp.indexOf("news://") == 0 ||
            vp.indexOf("nntp://") == 0 ||
            vp.indexOf("/") == 0) {
            return VPath;
        }
        else {
            return RS.pageInfo.rootvpath + VPath;
        }
    },

    RS.execBatch = function (url, grid) //批量执行相应操作，一般里层代码有一个参数List<string> ids
    {
        var ids = grid.getValues();
        if (ids == null || ids.length == 0) {
            alert("请选择您要操作的记录");
            return;
        }

        RS.exec(url, JSON.stringify({ ids: ids }), function (result) {
            if (result.IsSuccess) {
                showNotice("操作成功！");
                grid.reflash();
            }
            else
                showNotice(result.Message);
        }, function (errMsg) {
            showNotice(errMsg);
        });
    },
    RS.execFun = function (url, grid, para) { //设置操作，一般有一个参数为string id,或者是自定义的参数
        var id = grid.value;
        if (RS.Lib.isEmpty(id)) {
            alert("请选择您要操作的记录");
            return;
        }
        if (para == null || para == undefined)
            para = JSON.stringify({ id: id });

        RS.exec(url, para, function (result) {
            if (result.IsSuccess) {
                showNotice("操作成功！");
                grid.reflash();
            }
            else
                showNotice(result.Message);
        }, function (errMsg) {
            showNotice(errMsg);
        });
    },
    RS.bindSelect = function (cb, data, hasEmpty, tf, vf) {
        cb.get(0).options.length = 0;//empty the option
        var jsondata = data; // convert json data
        if (hasEmpty)
            cb.append('<option value=\'\'></option>');
        $.each(jsondata, function (index, optiondata) {
            var v = optiondata[vf];
            var n = optiondata[tf];
            var op = $("<option value=" + v + ">" + n + "</option>");
            op.data("dataItem", optiondata);
            cb.append(op);
        });
        cb.data("dataSource", jsondata);
    }
    RS.ajax=function(url,paramJson,onSuccess,onError,onComplete)
    {
        var isObj = false;
        if (typeof (paramJson) == "object")
            isObj = true;
        var json = {
            type: "Post",
            url: url,
            dataType: "json",
            data: paramJson,
            async: true,
            cache: false,
            success: function (result) {
                try {
                    if (onSuccess != null && onSuccess != undefined) {
                        if (result == null)
                            onSuccess(result);
                        else if (result.d != undefined && result.d != null) {
                            onSuccess(result.d);
                        }
                        else
                            onSuccess(result);
                    }
                }
                catch (e) {}
            }, error: function (a, x, e) {
                try {
                    if (a.responseText != "") {
                        try {
                            var jobj = JSON.parse(a.responseText);
                            if (jobj != null) {
                                if (onError != null && onError != undefined) {
                                    onError(jobj.Message + (RS.Lib.isNotEmpty(jobj.Error) ? ":" + jobj.Error : ""));
                                    return;
                                }
                            }
                        }
                        catch (e) {

                        }
                    }

                    if (a != null && a.responseJSON != null && a.responseJSON != undefined && typeof (a.responseJSON) == "object") {
                        try {
                            var err = a.responseJSON;
                            if (err.Message != null) {
                                if (onError != null && onError != undefined) onError(err.Message);
                            }
                            else
                                if (onError != null && onError != undefined) onError(e);
                        }
                        catch (ex) { if (onError != null && onError != undefined) onError(e); }
                    }
                    else {
                        if (RS.Lib.isNotEmpty(a.responseText)) {
                            if (onError != null && onError != undefined) onError(a.responseText);
                        }
                        else {
                            if (onError != null && onError != undefined) onError(e);
                        }
                    }
                } catch (e1) { }
            }, complete: function (x) {
                try {
                    if (onComplete != null && onComplete != undefined) onComplete(x);
                }
                catch (e) { }
            }
        };
        if (!isObj) {
            json.contentType = "application/json; charset=utf-8";
        }
        $.ajax(json);
    }

    RS.exec = function (url, paramJson, onSuccess, onError, onComplete) {
        var isObj = false;
        if (typeof (paramJson) == "object")
            isObj = true;
        var json = {
            type: "Post",
            url: url,
            dataType: "json",
            data: paramJson,
            async: true,
            cache: false,
            success: function (result) {                
                try {
                    if (onSuccess != null && onSuccess != undefined) {
                        if (result == null)
                            onSuccess(result);
                        else if (result.d != undefined && result.d != null) {
                            onSuccess(result.d);
                        }
                        else
                            onSuccess(result);
                    }
                }
                catch (e) {
                    showNotice("Error:" + e.message);
                }
                RS.ajaxProcess.closeMask();
            }, error: function (a, x, e) {
                try {
                    if (a.responseText != "") {
                        try {
                            var jobj = JSON.parse(a.responseText);
                            if (jobj != null) {
                                if (onError != null && onError != undefined) {
                                    onError(jobj.Message + (RS.Lib.isNotEmpty(jobj.Error) ? ":" + jobj.Error : ""));
                                    return;
                                }
                            }
                        }
                        catch (e) {

                        }
                    }

                    if (a != null && a.responseJSON != null && a.responseJSON != undefined && typeof (a.responseJSON) == "object") {
                        try {
                            var err = a.responseJSON;
                            if (err.Message != null) {
                                if (onError != null && onError != undefined) onError(err.Message);
                            }
                            else
                                if (onError != null && onError != undefined) onError(e);
                        }
                        catch (ex) { if (onError != null && onError != undefined) onError(e); }
                    }
                    else {
                        if (RS.Lib.isNotEmpty(a.responseText)) {
                            if (onError != null && onError != undefined) onError(a.responseText);
                        }
                        else {
                            if (onError != null && onError != undefined) onError(e);
                        }
                    }
                } catch (e1) { }
                RS.ajaxProcess.closeMask();
            }, complete: function (x) {                
                try {
                    if (onComplete != null && onComplete != undefined) onComplete(x);
                }
                catch (e) { }
                RS.ajaxProcess.closeMask();
            }
        };
        if (!isObj) {
            json.contentType = "application/json; charset=utf-8";
        }
        RS.ajaxProcess.showMask();
        $.ajax(json);
    };



    RS.Lib = RS.prototype = {        
        init: function (id) {
            return document.getElementById(id);
        },
        round: function (digit, length) {
            length = length ? parseInt(length) : 0; 
            if (length <= 0) return Math.round(digit);
            digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length); 
            return digit; 
        },
        clone: function (obj) {
            if (obj == null || obj == undefined)
                return null;
            var rtn = {};
            for (var key in obj)
                rtn[key] = obj[key];
            return rtn;
        },
        hasProperty: function (obj, name) {
            if (obj == null)
                return false;
            else if (RS.Lib.isEmpty(name))
                return false;
            else
                return (name in obj);
        },
        getAttr: function (obj, attr) {
            try {
                if (obj == null || obj == undefined)
                    return null;
                else if (attr == null || attr == "") //未设置主键值
                    return null;
                else if (!RS.Lib.hasProperty(obj, attr))
                    return null;
                else {
                    var id = obj[attr];
                    if (id == null)
                        return null;
                    else
                        return id;
                }
            }
            catch (e) { return null; }
        },
        setAttr: function (obj, attr, v) {
            try {
                if (obj == null || obj == undefined)
                    return false;
                else if (attr == null || attr == "") //未设置主键值
                    return false;
                else if (!RS.Lib.hasProperty(obj, attr))
                    return false;
                else {
                    obj[attr] = v;
                    return true;
                }
            }
            catch (e) { return false; }
        },
        isEmpty: function (v) {
            if (v == null || v == undefined)
                return true;
            else if (typeof v == "string") {
                try {
                    var str = v.replace(/(^\s*)|(\s*$)/g, '')
                    return str == "";
                }
                catch (e) {
                    return false;
                }
            }
            else
                return false;
        },
        isNotEmpty: function (v) {
            return !RS.Lib.isEmpty(v);
        },
        isEquals: function (str1, str2) {
            if (str1 == str2) return true;
            var isE1 = RS.Lib.isEmpty(str1);
            var isE2 = RS.Lib.isEmpty(str2);

            if (isE1 || isE2) {
                if (isE1 && isE2)
                    return true;
                else
                    return false;
            }
            else if ((typeof str1 == "String") && typeof str2 == "String") {
                if (str1.toLowerCase() == str2.toLowerCase())
                    return true;
                else
                    return false;
            }
            else
                return false;
        },
        parseFun: function (data) //将指定值转成function 对象
        {
            if (data == null || data == "" || data == undefined) return null;
            var methodStr = data;
            if (typeof methodStr == "string") {
                methodStr = $.trim(methodStr);
                if (methodStr.indexOf("function ") == 0 || methodStr.indexOf("function(") == 0 || methodStr.indexOf("(") < 0) {
                    var entity = null;
                    try {
                        entity = eval("({method:" + methodStr + "})");
                    }
                    catch (e)
                    { }
                    if (entity == null || entity == undefined) {
                        return null;
                    }
                    if (typeof entity.method == "function") {
                        return entity.method;
                    }
                    else
                        return null;
                }
                else {
                    return new Function(methodStr);
                }
            }
            else if (typeof methodStr == "function") {
                return methodStr;
            }
            else
                return null;
        },
        addDay: function (date, day) {
            var sz = date.getDate() + day;
            date.setDate(sz);
            return date;
        },
        addMonth: function (date, month) {
            var sz = date.getMonth() + month;
            date.setMonth(sz);
            return date;
        },
        addYear: function (date, month) {
            var sz = date.getFullYear() + month;
            date.setFullYear(sz);
            return date;
        },
        parseVExp: function (Vexp) {
            var dv = "";
            var y = 0, m = 0, d = 0;
            if (RS.Lib.isEmpty(Vexp)) return dv;
            var td = new Date();
            try {
                var dvstr = Vexp.toLowerCase();
                if (dvstr == "getdate()") {
                    y = td.getFullYear();
                    m = td.getMonth() + 1;
                    d = td.getDate();
                    dv = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
                }
                else if (dvstr.indexOf(",") > 0) {
                    var vs = dvstr.split(",");
                    if (vs.length == 2 && vs[1].length > 1 && vs[1] != "") {
                        var numstr = vs[1].substring(0, vs[1].length - 1);
                        var n = parseInt(numstr);
                        if (!isNaN(n)) {
                            if (vs[0] == "addyear(getdate()") {
                                td = RS.Lib.addYear(td, n);
                                y = td.getFullYear();
                                m = td.getMonth() + 1;
                                d = td.getDate();
                                dv = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
                            }
                            else if (vs[0] == "addmonth(getdate()") {
                                td = RS.Lib.addMonth(td, n);
                                y = td.getFullYear();
                                m = td.getMonth() + 1;
                                d = td.getDate();
                                dv = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
                            }
                            else if (vs[0] == "addday(getdate()") {
                                td = RS.Lib.addDay(td, n);
                                y = td.getFullYear();
                                m = td.getMonth() + 1;
                                d = td.getDate();
                                dv = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
                            }
                        }
                    }
                }
                else if (dvstr.indexOf("+") > 0) {
                    var vs = dvstr.split('+');
                    if (vs.length == 2 && vs[0] == "getdate()") {
                        var numstr = vs[1];
                        var n = parseInt(numstr);
                         
                        if (!isNaN(n)) {
                            td = RS.Lib.addDay(td, n);
                            y = td.getFullYear();
                            m = td.getMonth() + 1;
                            d = td.getDate();
                            dv = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
                        }
                    }
                }
                else if (dvstr.indexOf("-") > 0) {
                    var vs = dvstr.split('-');
                    if (vs.length == 2 && vs[0] == "getdate()") {
                        var numstr = vs[1];
                        var n = parseInt(numstr);

                        if (!isNaN(n)) {
                            td = RS.Lib.addDay(td, 0 - n);
                            y = td.getFullYear();
                            m = td.getMonth() + 1;
                            d = td.getDate();
                            dv = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
                        }
                    }
                }
            }
            catch (e) { }
            return dv;
        },
        getX: function (el) {
            var row = this.getTrByElement(el);  //el.parentElement.parentElement
            var cell = this.getTdByElement(el);  //el.parentElement;
            if (row == null) return -1;
            for (var i = 0; i < row.cells.length; i++) {
                if (row.cells[i] == cell) {
                    return i;
                }
            }
            return -1;
        },
        getTrByElement: function (editor) {
            el = $(editor).parent();
            while (el != null && !el.is("tr")) {
                el = el.parent();
            }
            if (el != null && el.length > 0)
                return el.get(0);
            else
                return null;
        },
        //获取指定元素所属列
        getTdByElement: function (editor) {
            el = $(editor).parent();
            while (el != null && !el.is("td")) {
                el = el.parent();
            }
            if (el != null && el.length > 0)
                return el.get(0);
            else
                return null;
        },
        //获取指元素所属表格
        getTableByElement: function (editor) {
            el = $(editor).parent();
            while (el != null && !el.is("table")) {
                el = el.parent();
            }
            if (el != null && el.length > 0)
                return el.get(0);
            else
                return null;
        },
        getY: function (el) {
            var row = this.getTrByElement(el);
            if (row == null) return -1;

            var y = row.rowIndex;
            return y;
        },
        getscroll: function (obj) {
            var t = obj.scrollTop;
            var l = obj.scrollLeft;
            while (obj == obj.offsetParent) {
                t += obj.scrollTop;
                l += obj.scrollLeft;
            }
            var rec = new Array(1);
            rec[0] = t;
            rec[1] = l;
            return rec
        },
        getoffset: function (obj) {
            var t = obj.offsetTop;
            var l = obj.offsetLeft;
            while (obj == obj.offsetParent) {
                t += (obj.offsetTop - obj.scrollTop);
                l += (obj.offsetLeft - obj.scrollLeft);
            }
            var rec = new Array(1);
            rec[0] = t;
            rec[1] = l;
            return rec
        },
        getSrcElement: function (evt) {
            var ev = evt;
            if (ev == null) ev = window.event;
            return ev.srcElement ? ev.srcElement : ev.target;
        },
        X: function (evt) {
            var ev = evt;
            if (ev == null) ev = window.event;
            return ev.x ? ev.x : ev.pageX;
        },
        Y: function (evt) {
            var ev = evt;
            if (ev == null) ev = window.event;
            return ev.y ? ev.y : ev.pageY;
        },
        TS: function (msg) {
            alert(msg);
        },
        addEventHandler: function (oTarget, sEventType, fnHandler) {
            if (oTarget.addEventListener) { //DOM方法
                oTarget.addEventListener(sEventType, fnHandler, false);
            } else if (oTarget.attachEvent) { //IE方法
                oTarget.attachEvent("on" + sEventType, fnHandler);
            } else { //其他未知浏览器
                oTarget["on" + sEventType] = fnHandler;
            }
        },
        firstChild: function (oTarget) {
            if (oTarget.hasChildNodes()) {
                for (var i = 0; i < oTarget.childNodes.length; i++) {
                    if (oTarget.childNodes[i].nodeName != '#text' && oTarget.childNodes[i].nodeName != undefined)
                        return oTarget.childNodes[i];
                }
            }
            return null;
        },
        forceNoCache: function (url) {
            if (url == null) {
                return null;
            }
            if (url.indexOf("?") == -1) {
                return url + "?" + "noCacheToken=" + Math.random();
            }
            else {
                return url + "&" + "noCacheToken=" + Math.random();
            }
        },
        childNodes: function (oTarget) {
            var arr = new Array();
            if (oTarget.hasChildNodes()) {
                for (var i = 0; i < oTarget.childNodes.length; i++) {
                    if (oTarget.childNodes[i].nodeName != '#text' && oTarget.childNodes[i].nodeName != undefined)
                        arr.push(oTarget.childNodes[i]);
                }
            }
            return arr;
        },
        HTMLEncode: function (html) {
            if (html == "") return html;
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
        },
        HTMLDecode: function (text) {
            if (text == "") return text;

            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },
        getXmlDom: function () {
            if (window.ActiveXObject) { // IE 
                var arrSignatures = ["MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0",
                "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument",
                "Microsoft.XmlDom"];
                for (var i = 0; i < arrSignatures.length; i++) {
                    try {
                        var oXmlDom = new ActiveXObject(arrSignatures[i]);
                        return oXmlDom;
                    }
                    catch (oError) {
                    }
                }
                throw new Error("你的系统没有安装MSXML");
            }
            else if (document.implementation.createDocument) { // Firefox 
                var oXmlDom = document.implementation.createDocument("", "", null);
                return oXmlDom;
            }
            else {
                throw new Error("浏览器不支持 XML DOM object.");
            }
        },
        cancelEvent: function (e) {
            if (window.event) {
                window.event.returnValue = false;
            }
            else {
                e.preventDefault();
            }
        },
        caseWhen: function (CaseWhenList, ElseValue, IsEmptyElseShowSelf, v) {
            if (v == null) return "";
            if (CaseWhenList == null && CaseWhenList == undefined) return v;
            var lists = icase.CaseWhenList.split(',');
            if (lists.length == 0) return v;
            for (var i = 0; i < lists.length; i++) {
                var s = lists[i];
                var items = s.split(':');
                if (items.length <= 1) continue;
                if (items[0] == v.toString())
                    return items[1];
            }
            if (IsEmptyElseShowSelf && icase.ElseValue == "")
                return v;
            else
                return icase.ElseValue;
        },
        formatString: function (fc, v) {
            if (fc.length > 4 && fc.indexOf("{0:") == 0 && "".lastIndexOf("}") == fc.length - 1) {
                var farmat = "".substring(3, length - 1);
                if (farmat == "")
                    return v;
                else if (farmat == "c" || farmat == "C")
                    return "&" + v;
                else if (farmat == "n" || format == "N")
                    return v;
                else //日期 
                    return v;
            }
        },
        BASEformatLong:function(objDest) //格式化整数
        {
            if (isNaN(objDest)) return "0";
            return Math.round(parseFloat(objDest)).toString();
        },
        //格式化金额，精确到小数点后两位
        BASEformatNumber: function (objDest) {	//格式化金额，精确到小数点后两位
            if (isNaN(objDest)) return "0.00"
            var strDestObj = (0.01 * Math.round(100 * parseFloat(objDest))).toString()
            var Return_Str = "";
            var strDotRight = "";
            var intDestObjLen = strDestObj.length;
            var intDotIdx = strDestObj.indexOf(".");

            switch (intDestObjLen) {
                case 0:
                    Return_Str = "0.00";
                    break;
                default:
                    switch (intDotIdx) {
                        case -1:
                            Return_Str = strDestObj + ".00"
                            break;
                        case (intDestObjLen - 1):
                            Return_Str = strDestObj + "00"
                            break;
                        case (intDestObjLen - 2):
                            Return_Str = strDestObj + "0"
                            break;
                        case (intDestObjLen - 3):
                            Return_Str = strDestObj
                            break;
                        default:
                            Return_Str = strDestObj.substring(0, intDotIdx + 3)
                            break;
        }
                    break;
            }
            //alert(Return_Str);
            //return Return_Str.substring(0,Return_Str.length-1);
            return Return_Str;
        },
        setPageParam:function(param)
        {
            try {
                if (parent != null)                    
                    parent.toChildWinPageToPageParam = param; //上级窗口传递过来的参数
            }
            catch (e) {
            }
        },
        getPageParam:function()
        {
            var param = null;
            try {
                if (parent != null) {
                    param = parent.toChildWinPageToPageParam; //上级窗口传递过来的参数
                    parent.toChildWinPageToPageParam = null;
                }
            }
            catch (e) {
            }
            return param;
        }
    };

    //以下为按钮事件
    //#设置各编辑控件的按键事件
    RS.editor = RS.prototype = {
        keyDown: function (event) {
            if (event == null) event = window.event;
            var el = RS.Lib.getSrcElement(event);
            var element = el;
            var tr1, tr2, colIndex1, colIndex2, table, td;
            switch (event.keyCode) {
                case 37: //←
                    if ((el.nodeName.toLowerCase() == "input" && (el.type == "text" || el.type == "passwork")) || el.nodeName.toLowerCase() == "textarea") {
                        s = getCursorPosition(el);
                        if (s.start > 0)
                            return true;
                    }
                    var tmpObj = getpreviousSiblingEditor(el);
                    if (tmpObj != null) {
                        tmpObj.focus();
                    }
                    break;
                case 38: //↑
                    //如果是多行文本框，则检测当前光标是否在第一行
                    if (el.nodeName.toLowerCase() == "textarea") {
                        try {
                            s = getCursorPosition(el);
                            var index = s.end;
                            var txt = el.value;
                            if (s.start > 0 || s.length > 0) {
                                event.returnvalue = true;
                                return true;
                            }
                        }
                        catch (e) { }
                    }
                    tr1 = RS.Lib.getTrByElement(element);
                    if (tr1 == null) {
                        var tmpObj = getpreviousSiblingEditor(el);
                        if (tmpObj != null) {
                            tmpObj.focus();
                        }
                        break;
                    }

                    if (tr1 == null || tr1.rowIndex <= 0) //为同一行
                    {
                        var tmpObj = getpreviousSiblingEditor(el);
                        if (tmpObj != null) {
                            tmpObj.focus();
                        }
                        break;
                    }
                    else if (tr1.rowIndex <= 0) {
                        var tmpObj = getpreviousSiblingEditor(el);
                        if (tmpObj != null) {
                            tmpObj.focus();
                        }
                        break;
                    }
                    else {
                        table = RS.Lib.getTableByElement(element);
                        colIndex1 = RS.Lib.getX(element);
                        try {
                            tr1 = table.rows[tr1.rowIndex - 1];
                            if (colIndex1 >= 0 && colIndex1 < tr1.cells.length) {
                                td = tr1.cells[colIndex1];
                                var to = getcellsEditor(td);
                                if (to != null) {
                                    to.focus();
                                    break;
                                }
                            }
                        } catch (e) {
                        }
                        var tmpObj = getpreviousSiblingEditor(el);
                        if (tmpObj != null) {
                            tmpObj.focus();
                        }
                        break;
                    }
                case 39:
                    if ((el.nodeName.toLowerCase() == "input" && (el.type == "text" || el.type == "passwork"))) {
                        //var s = document.selection.createRange();
                        //s.setEndPoint("StartToStart", el.createTextRange())
                        //if (s.text.length < el.value.length)
                        //    return true;
                        var s = getCursorPosition(el);
                        if (s.end < el.value.length)
                            return true;
                    }
                    else if (el.nodeName.toLowerCase() == "textarea") {
                        try {
                            s = getCursorPosition(el);
                            var index = s.end;
                            var txt = el.value;
                            if (s.start < txt.length - 1) {
                                event.returnvalue = true;
                                return true;
                            }
                        }
                        catch (e) { }
                    }
                    var tmpObj = getnextSiblingEditor(el);
                    if (tmpObj != null) {
                        tmpObj.focus();
                    }
                    break;
                case 13:
                case 40:
                    //如果是多行文本框，则检测当前光标是否在第一行
                    if (el.nodeName.toLowerCase() == "textarea") {
                        try {
                            s = getCursorPosition(el);
                            var index = s.end;
                            var txt = el.value;
                            if ((s.start < txt.length - 1) || (s.start >= txt.length - 1 && s.start == s.end)) {
                                event.returnvalue = true;
                                return true;
                            }
                        }
                        catch (e) { }
                    }
                    tr1 = RS.Lib.getTrByElement(element);
                    if (tr1 == null) {
                        var tmpObj = getnextSiblingEditor(el);
                        if (tmpObj != null) {
                            tmpObj.focus();
                        }
                        break;
                    }
                    table = RS.Lib.getTableByElement(element);

                    if (tr1 == null || table == null || tr1.rowIndex == table.rows.length - 1) //为同一行
                    {
                        var tmpObj = getnextSiblingEditor(el);
                        if (tmpObj != null) {
                            tmpObj.focus();
                        }
                        break;
                    }
                    else if (tr1.rowIndex <= 0) {
                        var tmpObj = getnextSiblingEditor(el);
                        if (tmpObj != null) {
                            tmpObj.focus();
                        }
                        break;
                    }
                    else {
                        colIndex1 = RS.Lib.getX(element);
                        try {
                            tr1 = table.rows[tr1.rowIndex + 1];
                            if (colIndex1 >= 0 && colIndex1 < tr1.cells.length) {
                                td = tr1.cells[colIndex1];
                                var to = getcellsEditor(td);
                                if (to != null) {
                                    to.focus();
                                    break;
                                }
                            }
                        } catch (e) {
                        }
                        var tmpObj = getnextSiblingEditor(el);
                        if (tmpObj != null) {
                            tmpObj.focus();
                        }
                        break;
                    }
                case 27:
                    break;
            }
        }
    };


    /**
* getCursorPosition Method
*
* Created by Blank Zheng on 2010/11/12.
* Copyright (c) 2010 PlanABC.net. All rights reserved.
*
* The copyrights embodied in the content of this file are licensed under the BSD (revised) open source license.
*/
    function getCursorPosition(textarea) {
        var rangeData = { text: "", start: 0, end: 0, length: 0 };
        textarea.focus();
        if (textarea.setSelectionRange) { // W3C
            rangeData.start = textarea.selectionStart;
            rangeData.end = textarea.selectionEnd;
            rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
        } else if (document.selection) { // IE
            var i,
                oS = document.selection.createRange(),
                // Don't: oR = textarea.createTextRange()
                oR = document.body.createTextRange();
            oR.moveToElementText(textarea);

            rangeData.text = oS.text;
            rangeData.bookmark = oS.getBookmark();

            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
                if (textarea.value.charAt(i) == '\n') {
                    i++;
                }
            }
            rangeData.start = i;
            rangeData.end = rangeData.text.length + rangeData.start;
        }

        return rangeData;
    }

    //获取前一节点可用的编辑器:INPUT,SELECT,BUTTON
    function getpreviousSiblingEditor(el) {
        var obj = $(el);
        var editor = null;
        var pnode = obj.prev();//
        if (pnode.length > 0) {
            pnode = pnode[0];

            //确定该项是否有效
            editor = getChildEditor(pnode);
            if (editor != null) return editor;
            //获取同一层是否有可编辑的控件
            while (editor == null) {
                if (pnode == null) break;
                pnode = $(pnode).prev();
                if (pnode.length == 0) break;

                pnode = pnode[0];
                editor = getChildEditor(pnode);
                if (editor != null) return editor;
            }
        }
        //获取其上层是否有编辑控件
        if (el.parentNode != null) {
            editor = getpreviousSiblingEditor(el.parentNode);
        }
        return editor;
    }
    function getnextSiblingEditor(el) {
        var obj = $(el);
        var editor = null;
        var pnode = obj.next();
        if (pnode.length > 0) {
            pnode = pnode[0];
            //确定该项是否有效
            editor = getChildEditorByNext(pnode);
            if (editor != null) return editor;
            //获取同一层是否有可编辑的控件
            while (editor == null) {
                if (pnode == null) break;
                pnode = $(pnode).next();
                if (pnode.length == 0) break;
                pnode = pnode[0];
                editor = getChildEditorByNext(pnode);
                if (editor != null) return editor;
            }
        }
        //获取其上层是否有编辑控件
        if (el.parentNode != null) {
            editor = getnextSiblingEditor(el.parentNode);
        }
        return editor;
    }


    function getcellsEditor(cell) {
        var c = null;
        var objs = RS.Lib.childNodes(cell);
        for (var i = 0; i < objs.length; i++) {
            c = objs[i];
            if (checkValidEditor(c))
                return c;
            else {
                c = getcellsEditor(c);
                if (c != null) return c;
            }
        }
        return c;
    }


    function getChildEditorByNext(el) {
        if (el == null) return null;

        if (el.nodeName.toLowerCase() == "#text") return null;
        if (el.isDisabled || el.hideFocus || el.style.display == "none") {
            return null;
        }

        if (checkValidEditor(el)) return el;
        var nodes = RS.Lib.childNodes(el);
        for (var i = 0; i < el.childNodes.length ; i++) {
            var c = getChildEditorByNext(el.childNodes[i]);
            if (c != null) return c;
        }
        return null;
    }

    function getChildEditor(el) {
        if (el == null) return null;

        if (el.nodeName.toLowerCase() == "#text") return null;
        if (el.isDisabled || el.hideFocus || el.style.display == "none") {
            return null;
        }

        if (checkValidEditor(el)) return el;
        var nodes = RS.Lib.childNodes(el);
        for (var i = el.childNodes.length - 1; i >= 0; i--) {
            var c = getChildEditor(el.childNodes[i]);
            if (c != null) return c;
        }
        return null;
    }

    

    function toExcelForPost(url, params) {
        try {
            var form = $("<form accept-charset=\"UTF-8\" action='" + url + "' method='post' target='GridToExcelByFrame' contentType='application/x-www-form-urlencoded; charset=utf-8'></form>");
            
            for (var key in params) {
                try {
                    var obj = params[key];
                    if (typeof (obj) == "function")
                        continue;

                    var hpbox = $("<input type='hidden'/>");
                    hpbox.attr("id", key);
                    hpbox.attr("name", key);
                    hpbox.val(obj);
                    form.append(hpbox);
                }
                catch (e) { }
            }

            form.css('display', 'none');
            
            $(document.body).append(form);

            var frm = $("<iframe width=\"0\" height=\"0\" scrolling=\"no\" frameborder=\"0\"></iframe>");
            frm.attr("id", "GridToExcelByFrame");
            frm.attr("name", "GridToExcelByFrame");
            var isShow = false;
            frm.load(function () {
                
                if (isShow) hideProcess();
                $(this).remove();
                form.remove();
            });
            $(document.body).append(frm);
            showProcess("正在导出数据...", 10000);
            
            form.get(0).submit();
            isShow = true;
        }
        catch (e) {
            hideProcess();
        }
    }


    function toExcelForGet(url, params)
    {
        toExcelForPost(url, params);
    }

    //检测当前元素是否为有效的编辑控件：SELECT，BUTTON，TEXTAREA，INPUT
    function checkValidEditor(el) {
        if (el == null) return false;
        var d = "";
        var tagName = el.nodeName.toLowerCase();
        if (tagName == "select" || tagName == "input" || tagName == "button" || tagName == "textarea") {
            if (!el.isDisabled && !el.hideFocus) {
                if (tagName == "input" && el.type == "hidden")
                    return false;
                else
                    return true;
            }
        }
        else if (tagName == "iframe" && el.isDisabled && !el.hideFocus && el.isContentEditable) {
            return true;
        }
        return false;
    }
    window.RS = window.get = RS;

})(window);


window.bodyIsLoaded = false;
window.currentWindow = null;
window.parentParams = null;
window.toChildWinTempParams = null; //用于保存传递给弹出窗口参数的临时变量
window.toChildWinPageToPageParam = null;//用于保存传递弹出窗口各页面切换时的临时变量

try {
    window.parentParams = parent == null ? null : parent.toChildWinTempParams; //上级窗口传递过来的参数
}
catch (e) {
    window.parentParams = null;
}

////一次性获取，取完之后需清空传递的参数
//try{
//    if (parent!=null && parent.toChildWinTempParams!=null) parent.toChildWinTempParams = null;
//}
//catch(e){}

function initMiniJavaScript(rootvpath, easyuithemes, contentPath)
{
    RS.pageInfo.rootvpath = rootvpath;
    RS.pageInfo.sitevpath = getlocalurl(rootvpath); //sitevpath;

    var themes = easyuithemes;
    if (RS.Lib.isEmpty(easyuithemes))
        themes = "metro-blue";

    if (RS.Lib.isEmpty(contentPath))
        contentPath = "Content";

    RS.pageInfo.contentPath = contentPath;

    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/Scripts/json2.js\"></script>");
}

function initJavaScript(rootvpath, easyuithemes,contentPath) {
    RS.pageInfo.rootvpath = rootvpath;
    RS.pageInfo.sitevpath = getlocalurl(rootvpath); //sitevpath;
    
    var themes = easyuithemes;
    if (RS.Lib.isEmpty(easyuithemes))
        themes = "metro-blue";

    if (RS.Lib.isEmpty(contentPath))
        contentPath = "Content";

    RS.pageInfo.contentPath = contentPath;

    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + rootvpath + contentPath + "/Scripts/jeasyui/themes/" + themes + "/easyui.css\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + rootvpath + contentPath + "/Scripts/jeasyui/themes/icon.css\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + rootvpath + contentPath + "/RSJLibrary/Windows/css/AeroWindow.css\" />");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + rootvpath + contentPath + "/RSJLibrary/LayoutForm/default/LayoutForm.css\" />");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/Scripts/jeasyui/jquery.easyui.min.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/Scripts/jeasyui/locale/easyui-lang-zh_CN.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/Scripts/json2.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/Windows/AeroWindow.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/AjaxSearch/ajaxSearch.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/default.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/LayoutForm/RS_LayoutEditor.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/LayoutForm/RS_LayoutArea.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/LayoutForm/RS_LayoutForm.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/FunPanel/RS_FunPanel.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/GridTable/RS_GridTable.js\"></script>");
    document.write("<script type=\"text/javascript\" src=\"" + rootvpath + contentPath + "/RSJLibrary/jquery.shCircleLoader.js\"></script>");
}

function getlocalurl(rootvpath) {
    var siteUrl = rootvpath;
    try {
        var fullurl = window.location.href;

        var curl = window.location.pathname + window.location.search;

        var qzLen = RS.pageInfo.rootvpath.length;
        curl = curl.substr(qzLen, curl.length - qzLen);
        var index = fullurl.lastIndexOf(curl);
       
        siteUrl = fullurl.substring(0, index);
    }
    catch (e) {

    }
    return siteUrl;
}

$(function () {
    bodyIsLoaded = true;
    $("form").css("width", "100%");
    $("form").css("height", "100%");
});

/** 
× JQUERY 模拟淘宝控件银行帐号输入 
* 
**/
(function ($) {
    // 输入框格式化 
    $.fn.bankInput = function (options) {
        var defaults = {
            min: 10, // 最少输入字数 
            max: 25, // 最多输入字数 
            deimiter: ' ', // 账号分隔符 
            onlyNumber: true, // 只能输入数字 
            copy: true // 允许复制 
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.css({ imeMode: 'Disabled', borderWidth: '1px', color: '#000', fontFamly: 'Times New Roman' }).attr('maxlength', opts.max);
        if (obj.val() != '') obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        obj.bind('keyup', function (event) {
            if (opts.onlyNumber) {
                if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
                    this.value = this.value.replace(/\D/g, '');
                }
            }
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
        }).bind('dragenter', function () {
            return false;
        }).bind('onpaste', function () {
            return !clipboardData.getData('text').match(/\D/);
        }).bind('blur', function () {
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
        })
    }
    // 列表显示格式化 
    $.fn.bankList = function (options) {
        var defaults = {
            deimiter: ' ' // 分隔符 
        };
        var opts = $.extend({}, defaults, options);
        return this.each(function () {
            $(this).text($(this).text().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        })
    }
})(jQuery);

