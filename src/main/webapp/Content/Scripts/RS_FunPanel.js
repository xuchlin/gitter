//普通数据列表框
//对于树型，则需要作如下完善
//1、不需分页的：默认列出所有节点，刷新或过滤时，则直接采用reload方式直接重新加载便可。
//2、对于支持分页的，默认不再列出所有节点，只列出顶层节点，当要列出支节点时，再从服务端获取
//目前暂只支持第1种
(function ($) {
    $.fn.extend({
        funPanel: function (options) {            
            var panel = $(this);
            var funArr = new Array();//用于存储当前组件各按钮对象
            var defaults = {};
            var op = $.extend(defaults, options);
            var getParaMethod = op.CheckParamFun;
            var setFunBtnMethod = op.setFunBtnMethod;
            var curMethod = {
                getParaMethod: RS.Lib.parseFun(op.CheckParamFun),
                setFunBtnMethod: RS.Lib.parseFun(op.setFunBtnMethod)
            };
            var rtn = {
                setEnabled:function(id)
                {
                    var btn = getButton(id);
                    if (btn != null)
                    {
                        btn.data("enabled", true);
                        if (op.buttonStyle == 1) {
                            btn.linkbutton("enable")
                        }
                        else
                            btn.removeAttr("disabled");
                    }
                },
                setDisabled:function(id)
                {
                    var btn = getButton(id);
                    if (btn != null) {
                        btn.data("enabled", false);
                        if (op.buttonStyle == 1) {
                            btn.linkbutton("disable")
                        }
                        else
                            btn.attr("disabled","disabled");
                    }
                },
                setShow:function(id)
                {
                    var btn = getButton(id);
                    if (btn != null) {
                        btn.data("visible", true);
                        btn.show();
                    }
                },
                setHide:function(id)
                {
                    var btn = getButton(id);
                    if (btn != null) {
                        btn.data("visible", false);
                        btn.hide();
                    }
                },
                setText:function(id,text)
                {
                    var btn = getButton(id);
                    if (btn != null) {
                        if (op.buttonStyle == 1)
                        {
                            var option = btn.linkbutton("options");
                            option.text = text;
                            btn.linkbutton(option);
                        }
                        else
                            btn.attr("value",text);
                    }
                },
                getFuns: function () {
                    return op.operateFuns;
                },                
                setFunStatus: setButtonStatus
            };

            for (var i = 0; i < op.operateFuns.length; i++) {
                var fun = op.operateFuns[i];
                var ae = $("#" + fun.id);
                if (ae.length == 0) continue; //无该项
                if (RS.Lib.isNotEmpty(fun.clickFun)) {
                    var method = RS.Lib.parseFun(fun.clickFun);
                    if (method != null)
                        ae.data("method", method);
                }
                ae.data("enabled", true);
                ae.data("fun", fun);
                //设置其样式
                if (op.buttonStyle == 1) {
                    ae.linkbutton({
                        id: fun.id,
                        text: fun.text,
                        iconCls: fun.iconCls,
                        plain: true
                    });
                }

                //各功能按钮执行的方法
                ae.click(function () {
                    var method = $(this).data("method");
                    if (method == null) return;
                    var enabled = $(this).data("enabled");                    
                    if (enabled == false) return;

                    try {
                        method(fun);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                });
                funArr[fun.id] = ae;
            }

            function getButton(id)
            {
                try {
                    if (id == null || id == "") //未设置主键值
                        return null;
                    else
                        return funArr[id];
                }
                catch (e) { return null; }
            }

            function getFieldValue(rowData, field) {
                try {
                    if (rowData == null || rowData == undefined)
                        return "";
                    if (field == null || field == "") //未设置主键值
                        return "";
                    else {
                        var id = rowData[field];
                        if (id == null)
                            return "";
                        else
                            return id;
                    }
                }
                catch (e) { return ""; }
            }



            //检测指定功能是否可用
            //由后台来确定是否有效
            function checkIsValid(fun, entity) {
                if (RS.Lib.isNotEmpty(funUrl)) {
                    var paraMethod = curMethod.getParaMethod; //获取参数的方法
                    var dataItem = "";
                    if (paraMethod == null || typeof (paraMethod) != "function")
                        dataItem = JSON.stringify({ ID: fun.id, DataItem: JSON.stringify(entity) });
                    else
                        dataItem = paraMethod(fun.id, entity);

                    RS.exec(funUrl, dataItem, function (rtn) {
                        var btn = getButton(fun.id);
                        if (btn == null) return;
                        var isvisible = btn.data("visible");
                        if (isvisible != null || !isvisible) return;

                        var method = RS.Lib.parseFun(setFunBtnMethod);
                        if (method != null && typeof method == "function") {
                            try {
                                method($("#" + fun.id), rtn);
                            }
                            catch (e) { }
                        }
                        else {
                            if (typeof (rtn) == "bool") {
                                if (rtn)
                                    btn.show();
                                else
                                    btn.hide();
                            }
                        }
                    }, function (errMsg) { showNotice(errMsg); }, null);
                }
            }

            function isEquas(o1, o2)
            {
                try{
                    if (o1 == null && o2 == null)
                        return true;
                    else if (o1 != null && o2 != null)
                        return o1.toString() == o2.toString();
                    else
                        return false;
                }
                catch(e){
                    return false;
                }
            }

            function reflashPanel()
            {
                
                try {
                    var vcount = funArr.length;
                    $(funArr).each(function (i, fun) {
                        try {
                            var v = fun.data("visible");
                            if (v != null && v != undefined && v == false)
                                vcount--;
                        }
                        catch (e) { }
                    });
                    if (vcount <= 0)
                        panel.hide();
                    else
                        panel.show();
                }
                catch (ex) { }
            }



            function ArrayContains(arr, v) {
                for (var i = 0; i < arr.length; i++) {
                    if (isEquas(arr[i] , v)) return true;
                }
                return false;
            }

            ///根据指定对象来确定各功能按扭是否有效
            function setButtonStatus(entity) {
                try {
                    for (var i = 0; i < op.operateFuns.length; i++) {
                        var fun = op.operateFuns[i];
                        var lnk = getFieldValue(funArr, fun.id);
                        if (lnk == null || lnk == undefined) continue;

                        var isvisible = lnk.data("visible");
                        if (isvisible!=undefined && (isvisible != null || isvisible==false)) continue;

                        if (entity == null || entity == undefined) {
                            if (fun.isNeedRecord)//需要记录
                            {
                                if (fun.noValidStatus == 1)
                                    lnk.hide();
                                else {
                                    if (op.buttonStyle == 1)
                                        lnk.linkbutton("disable");
                                    else
                                        lnk.attr("disabled", "disabled");
                                    lnk.data("enabled", false);
                                }
                            }
                            continue;
                        }
                        else {
                            if (fun.isNeedRecord)//需要记录
                            {
                                if (fun.noValidStatus == 1)
                                    lnk.show();
                                else
                                {
                                    if (op.buttonStyle == 1)
                                        lnk.linkbutton("enable");
                                    else
                                        lnk.removeAttr("disabled");
                                    lnk.data("enabled", true);
                                }   
                            }
                        }

                        if (RS.Lib.isEmpty(fun.fieldName)) continue;
                        var dataItem = entity;

                        var v = getFieldValue(dataItem, fun.fieldName);
                        var hasc = false;


                        var tmp = null;
                        if (RS.Lib.isNotEmpty(fun.valueByShow)){
                            if (ArrayContains(fun.valueByShow.split(','), v)) {
                                lnk.show();
                            }
                            else
                                lnk.hide();
                            hasc = true;
                        }
                        
                        if (RS.Lib.isNotEmpty(fun.valueByHide)) {
                            if (ArrayContains(fun.valueByHide.split(','), v)) {
                                lnk.hide();
                            }
                            else
                                lnk.show();
                            hasc = true;
                        }
                        if (RS.Lib.isNotEmpty(fun.valueByEnabled)) {
                            if (ArrayContains(fun.valueByEnabled.split(','), v)) {
                                if (op.buttonStyle == 1)
                                    lnk.linkbutton("enable");
                                else
                                    lnk.removeAttr("disabled");
                                lnk.data("enabled", true);
                            }
                            else {
                                if (op.buttonStyle == 1)
                                    lnk.linkbutton("disable");
                                else
                                    lnk.attr("disabled", "disabled");
                                lnk.data("enabled", false);
                            }
                            hasc = true;
                        }
                        if (RS.Lib.isNotEmpty(fun.valueByUnEnabled)) {
                            if (ArrayContains(fun.valueByUnEnabled.split(','), v)) {
                                if (op.buttonStyle == 1)
                                    lnk.linkbutton("disable");
                                else
                                    lnk.attr("disabled", "disabled");
                                lnk.data("enabled", false);
                            }
                            else {
                                if (op.buttonStyle == 1)
                                    lnk.linkbutton("enable");
                                else
                                    lnk.removeAttr("disabled");
                                lnk.data("enabled", true);
                            }
                            hasc = true;
                        }
                        if (!hasc && fun.hasCheck) {
                            checkIsValid(fun,entity);
                        }
                    }
                }
                catch (e) { }
            }

            return rtn;
        }
    });
})($);