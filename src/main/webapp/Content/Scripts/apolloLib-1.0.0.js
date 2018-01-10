var ApolloYGApi = function () { };//初始一个空api函数对象，具体API由另一脚本重写

/*Apollo JS Api*/
var ApolloYG = function () {
    return {
        sessionKey: "ApolloMB_Session_UserToken",
        urlGetKey: "apolloMBSessionToken",
        userToken: "",
        pageInfo: {
            rootvpath: "/",//当前访问页面根访问路径
            webapipath: "/"//api接口访问目录
        },
        init: function (sessionID, rootvpath, webapipath) {
            this.userToken = sessionID;
            this.pageInfo.rootvpath = rootvpath;
            if (webapipath == null || webapipath == undefined || webapipath == "")
                this.pageInfo.webapipath = rootvpath;
            else
                this.pageInfo.webapipath = webapipath;
            
            ApolloYGApi();
        },
        login: function (sessionid) {
            this.userToken = sessionid;
        },
        logout: function () {
            this.userToken = "";
        },
        ajax: function (url, param, onSuccess, onError) {
            apollo.exec(url, param, onSuccess, onError);
        },
        getApiUrl: function (controller, action) {
            var url = apollo.pageInfo.webapipath;
            if (!apollo.util.endsWith(url, "/")) url += "/";
            url += "api/" + controller + "/" + action;
            return url;
        },
        api: function (controllerName, actionName, param, successFun, errorFun) {
            if (this.ajax == null) return;
            //如果方法是不需要传参数，则可以不传param这个值 ，这样，successFun和errorFun实际上位置向前移一位，类似于C#中的多态方法
            //ajax(controllerName, actionName, successFun, errorFun)
            //为实现上面这情现象，所以对参数要做判断
            var _param = param, _successFun = successFun, _errorFun = errorFun;
            if (typeof param == "function") {
                //则表示没传参数,则参数都向前移一位
                param = {};
                successFun = _param;
                if (typeof _successFun != "function")
                    errorFun = null;
                else
                    errorFun = _successFun;
            }

            var url = this.getApiUrl(controllerName, actionName)

            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            this.ajax(url, param, successFun, errorFun);
        }
    };
};

var apollo = new ApolloYG();


/**
apollo框架库
*/
//apollo.util
(function () {
    apollo.util = apollo.prototype = {
        toInt: function (v) {
            if (v == null || v == undefined)
                return 0;
            if (typeof v == "number") return v;
            var rtn = parseInt(v);
            if (isNaN(rtn))
                return 0;
            else
                return rtn;
        },
        toFloat: function (v) {
            if (v == null || v == undefined)
                return 0;
            if (typeof v == "number") return v;

            var rtn = parseFloat(v);
            if (isNaN(rtn))
                return 0;
            else
                return rtn;
        },
        /**将指定对像转为guid值，注意，这里并不是实际转换*/
        toGuid: function (v) {
            if (v == null || v == undefined)
                return 0;
            if (typeof v != "string")
                return apollo.Guid.empty;
            else if (apollo.Lib.isEmpty(v))
                return apollo.Guid.empty;
            else
                return v;
        },
        toDateTimeString: function (v) {
            if (apollo.Lib.isEmpty(v))
                return "00000000-0000-0000-0000-000000000000";
            else if (typeof v == "string") {
                v = v.replace(/\//g, "-");
                var date = Date.parse(v);
                if (isNaN(date))
                    return "00000000-0000-0000-0000-000000000000";
                else
                    return v;
            }
            else if (v instanceof Date) {
                return apollo.Lib.dateFormat(v, "yyyy-MM-dd HH:mm:ss");
            }
            else
                return "00000000-0000-0000-0000-000000000000";
        },
        toBoolean: function (v) {
            if (v == null || v == undefined)
                return 0;
            if (typeof v == "boolean") return v;
            if (typeof v == "string" || typeof v == "number") {
                if (v == 1)
                    return true;
                else if (v == true)
                    return true;
                else if (v.toString().toLowerCase() == "true")
                    return true;
                else if (v == "1")
                    return true;
                else if (v == 0)
                    return false;
                else if (v == false)
                    return false;
                else if (v.toString().toLowerCase() == "false")
                    return false;
                else if (v == "0")
                    return false;
                else if (v.toString() == "是" || v.toString() == "真")
                    return true;
                else if (v.toString() == "否" || v.toString() == "假")
                    return false;
                else
                    return v == true;
            }
            else
                return false;
        },
        endsWith: function (str1, str2) {
            if (str1 == null || str2 == null) return false;
            if (typeof str1 != "string" || typeof str2 != "string") return false;
            try {
                if (str1.length < str2.length)
                    return false;
                else if (str1.toLowerCase().lastIndexOf(str2.toLowerCase()) == str1.length - str2.length)
                    return true;
                else
                    return false;
            }
            catch (e) {
                return false;
            }
        },
        startsWith: function (str1, str2) {
            if (str1 == null || str2 == null) return false;
            if (typeof str1 != "string" || typeof str2 != "string") return false;
            try {
                if (str1.length < str2.length)
                    return false;
                else if (str1.toLowerCase().index(str2.toLowerCase()) == 0)
                    return true;
                else
                    return false;
            }
            catch (e) {
                return false;
            }
        }
    };
})();

apollo.request = function (paras) {
    var doc = document;
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
};
apollo.bindSelect = function (cb, data, hasEmpty, tf, vf) {
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
};

apollo.Lib = apollo.prototype = {
    RedirctWithNewUrlParameters: function (fromUrl, params) {
        //Add by liu.xc(2017-4-11)
        fromUrl = unescape(fromUrl);

        var paramUrl = "";
        for (var p in params) {
            if (paramUrl.length > 0) {
                paramUrl += "&";
            }
            paramUrl += (p + "=" + params[p]);
        }

        if (fromUrl.indexOf('?') > -1) {
            fromUrl += "&" + paramUrl;
        } else {
            fromUrl += "?" + paramUrl;
        }

        return fromUrl;
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
        else if (apollo.Lib.isEmpty(name))
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
            else if (!apollo.Lib.hasProperty(obj, attr))
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
            else if (!apollo.Lib.hasProperty(obj, attr))
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
        return !apollo.Lib.isEmpty(v);
    },
    isEquals: function (str1, str2) {
        if (str1 == str2) return true;
        var isE1 = apollo.Lib.isEmpty(str1);
        var isE2 = apollo.Lib.isEmpty(str2);

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
    showDate: function (datastr) {
        if (apollo.Lib.isEmpty(datastr)) return "";
        var date = apollo.Lib.toDate(datastr);
        var y, m, d;
        y = date.getFullYear();
        m = date.getMonth() + 1;
        d = date.getDate();

        var yy, mm, dd;
        yy = y.toString();
        if (m < 10)
            mm = '0' + m;
        else
            mm = m.toString();

        if (d < 10)
            dd = '0' + d;
        else
            dd = d.toString();

        return yy + "-" + mm + "-" + dd;
    },
    showTime: function (datastr, format) {
        if (apollo.Lib.isEmpty(datastr)) return "";
        var date = apollo.Lib.toDate(datastr);
        var hour, minute, second;
        hour = date.getHours();
        minute = date.getMinutes();
        second = date.getSeconds();

        var hh, mm, ss;
        hh = hour < 10 ? '0' + hour.toString() : hour.toString();
        mm = minute < 10 ? '0' + minute.toString() : minute.toString();
        ss = second < 10 ? '0' + second.toString() : second.toString();

        if (format != null && format != "") {
            format = format.replace('HH', hh);
            format = format.replace('hh', hh);
            format = format.replace('mm', mm);
            format = format.replace('ss', ss);

            return format;
        }

        return hh + ':' + mm + ':' + ss;
    },
    dateFormat: function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month 
            "d+": this.getDate(), //day 
            "h+": this.getHours(), //hour 
            "m+": this.getMinutes(), //minute 
            "s+": this.getSeconds(), //second 
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
            "S": this.getMilliseconds() //millisecond 
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    toDate: function (str) {
        if (apollo.Lib.isEmpty(str)) return null;
        str = str.replace(/-/g, "/"); var date = new Date(str);
        return date;
    },
    endsWith:function (str1, str2) {
        if (str1 == null || str2 == null) return false;
        try {
            if (str1.length < str2.length)
                return false;
            else if (str1.toLowerCase().lastIndexOf(str2.toLowerCase()) == str1.length - str2.length)
                return true;
            else
                return false;
        }
        catch (e) {
            return false;
        }
    },
    BASEformatLong: function (objDest) //格式化整数
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
    }    
};

apollo.getVirtualPath = function (VPath) {
    if (RS.Lib.isEmpty(VPath)) return "";
    var vp = VPath.toLowerCase();

    if (vp == "javascript:;" || vp == "#" || vp == "") return "";


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
        return apollo.pageInfo.rootvpath + VPath;
    }
}
apollo.onError = function (errMsg) {
    showNotice(errMsg);
};
apollo.refUserToken = function (xhr) {
    try {
        var sessionid = xhr.getResponseHeader("ApolloMB_Session_UserToken");
        if (sessionid != null) apollo.userToken = sessionid;
    }
    catch (e) { }
};

apollo.ajaxProcess = {
    maskProcessDiv: null,
    maskDiv: null,
    init: function () {
        //以下为进度控制
        this.maskProcessDiv = $("<div id=\"maskProcessDiv\" class=\"Absolute-Center\" style=\"position:fixed;top:0px;bottom:0px;overflow:hidden;\"></div>");
        this.maskProcessDiv.css("width", "100%");
        this.maskProcessDiv.css("height", "100%");
        this.maskProcessDiv.css("z-index", 29000);

        this.maskDiv = $("<div></div>");
        this.maskDiv.css("position", "absolute");

        this.maskDiv.append($("<img src ='" + apollo.pageInfo.rootvpath + "Content/Images/Loading1.gif'/>"));

        this.maskProcessDiv.append(this.maskDiv);
        $("body").append(this.maskProcessDiv);

        this.closeMask();
    },
    setCenter: function () {
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
        if (this.maskProcessDiv == null)
        { this.init(); }
        else {
            if ($("#maskProcessDiv").length == 0) {
                try{
                    $("body").append(this.maskProcessDiv);
                }
                catch(e){}
            }
        }
        this.maskProcessDiv.show();
        this.setCenter();
    },
    closeMask: function () {
        if (this.maskProcessDiv == null) this.init();
        this.maskProcessDiv.hide();
    }
};
apollo.exec = function (url, param, onSuccess, onError) {
    if (typeof param == "string")
        param = JSON.parse(param);

    var json;

    
    var sucFun = function (data, status, xhr) {
        //取会话信息
        apollo.refUserToken(xhr);//刷新会话
        var result = data;
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
            if (onError != null && onError != undefined) {
                onError("Error:" + e.message);
                return;
            }
        }
        apollo.ajaxProcess.closeMask();
    }
    var errFun = function (a, x, e) {
        try {
            if (a.responseText != "") {
                try {
                    var jobj = JSON.parse(a.responseText);
                    if (jobj != null) {

                        //这里要检测是否是因无权限而导致的错误，如果是，则先提示后，再转入到登录页
                        if (jobj.ReturnValue != null) {
                            var rtn = jobj.ReturnValue;
                            if (rtn.gotoLoginPage == true) {
                                alert(jobj.Message);
                                location.href = apollo.pageInfo.rootvpath + "Content/ToLogin.html";
                            }
                        }


                        if (onError != null && onError != undefined) {
                            onError(jobj.Message + (apollo.Lib.isNotEmpty(jobj.Error) ? ":" + jobj.Error : ""));
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

                    //这里要检测是否是因无权限而导致的错误，如果是，则先提示后，再转入到登录页
                    if (err.ReturnValue != null) {
                        var rtn = err.ReturnValue;
                        if (rtn.gotoLoginPage == true) {
                            alert(err.Message);
                            location.href = apollo.pageInfo.rootvpath + "Content/ToLogin.html";
                        }
                    }


                    if (err.Message != null) {
                        if (onError != null && onError != undefined) onError(err.Message);
                    }
                    else
                        errview(a, e, onError);
                }
                catch (ex) { errview(a,e,onError); }
            }
            else {
                if (apollo.Lib.isNotEmpty(a.responseText)) {
                    if (onError != null && onError != undefined) onError(a.responseText);
                }
                else {
                    errview(a, e, onError);
                }
            }
        } catch (e1) { }

        apollo.ajaxProcess.closeMask();
    }

    var errview=function(a,e,onError)
    {
        try{
            var msg="";
            if (a.readyState!=null)
            {
                if (a.readyState=="0"||a.readyState==0)
                {
                    msg="请求出现异常：网络无法链接";
                }
                else if (a.readyState=="1"||a.readyState==1)
                {
                    msg="网络请求中止";
                }
                else if (a.readyState=="2"||a.readyState==2)
                {
                    msg="解析出现异常";
                }
                else if (a.readyState=="3"||a.readyState==3)
                {
                    msg="接口数据出现异常";
                }
                else if (a.readyState=="0"||a.readyState==0)
                {
                    msg="未知异常";
                }
            }
            if (msg == "" && (e != null && e != ""))
                msg = e;
            else if (msg == "")
                msg = "请求时出现未知异常";

            if (onError != null && onError != undefined) onError(msg);
        }
        catch(er){}
    }
    var complete = function (x) {
        try {
            if (onComplete != null && onComplete != undefined) onComplete(x);
        }
        catch (e) { }
        apollo.ajaxProcess.closeMask();
    };

    var defaults = {
        ApolloMB_Session_UserToken: apollo.userToken,
        Account_UserInfo: "",//授权用户信息
        Account_UserInfo_Sign: "",//授权用户验签码
        ApolloMB_OpSourceType: "2"
    };

    var data = $.extend(defaults, param);

    json = {
        type: "POST",
        url: url,
        dataType: "json",
        data: data,
        async: true,
        cache: false,
        success: sucFun,
        error: errFun,
        complete: complete
    };

    apollo.ajaxProcess.showMask();
    $.ajax(json);
};


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