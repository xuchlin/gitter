(function ($) {
    function initEditor(opobj, box, isInput, istextarea) {
        if (istextarea == null || istextarea == undefined) istextarea = false;
        //设置初始事件
        if (opobj.IsCellEditor) {
            try {
                if (!opobj.AllowEmpty) {
                    box.css("color", "#0066CC");
                }
            }
            catch (e) { }
        }
        else {
            if (opobj.AllowEmpty) {
                if (isInput) box.css("border", "1px solid #939FBF");
                if (isInput && !istextarea) {
                    box.css("line-height", "18px");
                    box.css("height", "18px");
                }
            }
            else {
                if (isInput) box.css("border", "1px solid #939FBF");
                box.css("color", "#0066CC");
                if (isInput && !istextarea) {
                    box.css("line-height", "18px");
                    box.css("height", "18px");
                }
            }
            if (isInput && istextarea) {
                box.css("margin-top", "2px");
                box.css("margin-bottom", "2px");
            }
        }

        box.focus(function () {
            try {
                if (opobj.IsCellEditor) {
                    box.css("background-color", "#C2EBFC");
                }
                else {
                    box.css("background-color", "#C2EBFC");
                    if (isInput) box.css("border", "1px solid #6DBCEB");
                    if (isInput && !istextarea) {
                        box.css("line-height", "18px");
                        box.css("height", "18px");
                    }
                }
                box.select();
            }
            catch (e) { }
        });
        box.blur(function () {
            try {
                if (opobj.IsCellEditor) {
                    if (!opobj.AllowEmpty) {
                        box.css("background-color", "");
                        box.css("color", "#0066CC");
                    }
                }
                else {
                    if (opobj.AllowEmpty) {
                        box.css("background-color", "");
                        if (isInput) box.css("border", "1px solid #939FBF");
                        if (isInput && !istextarea) {
                            box.css("line-height", "18px");
                            box.css("height", "18px");
                        }
                    }
                    else {
                        box.css("background-color", "");
                        if (isInput) box.css("border", "1px solid #939FBF");
                        box.css("color", "#0066CC");
                        if (isInput && !istextarea) {
                            box.css("line-height", "18px");
                            box.css("height", "18px");
                        }
                    }
                }
            }
            catch (e) { }
        });
    }

    function RegExpPhone(ObjValue) {
        var RtnValue = "", NowValue = "";
        ObjValue = ObjValue.replace(/-/g, "");
        for (var i = 0; i < ObjValue.length; i++) {
            NowValue = ObjValue.substr(i, 1);
            if (NowValue >= 0 && NowValue <= 9) {
                NowValue = "";
            }
            else {
                RtnValue += NowValue;
            }
        }
        if (RtnValue.length > 0) {
            return false;
        }
    }
    function isMobile(value) {
        var length = value.length;
        var mobile = /[0-9]{11}/;
        return length == 11 && mobile.test(value);
    }

    function hasChinese(value) {
        var reg = /[\u4e00-\u9fa5]/;
        return reg.test(value)
    }
    function RegExpIDCard(ObjValue) {
        var reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        if (reg.test(ObjValue) == false) {
            return false;
        }
        else
            return true;
    }
    //邮政编码
    function RegExpZIP(ObjValue) {
        var reg = /^[1-9]\d{5}$/
        if (reg.test(ObjValue) == false) {
            return false;
        }
        else
            return true;
    }
    function RegExpQQ(ObjValue) {
        var reg = /^[1-9]\d{4,9}$/
        if (reg.test(ObjValue) == false) {
            return false;
        }
        else
            return true;
    }
    function getDateExplain(mdv) {
        if (mdv.toString().length >= 2)
            return mdv.toString();
        else
            return "0" + mdv;
    }

    $.extend($.fn.validatebox.defaults.rules, {
        minLength: {
            validator: function (value, param) {
                return value.length >= param[0];
            },
            message: '字符长度不能少于{0}位数'
        },
        maxLength: {
            validator: function (value, param) {
                return value.length <= param[0];
            },
            message: "字符长度不能大于{0}位数"
        },
        tel: {
            validator: function (value) {
                return RegExpPhone(value);
            },
            message: "电话号码格式不正确(示例：020-88888888或88888888)"
        },
        mobile: {
            validator: function (value) {
                return isMobile(value);
            },
            message: "手机号码格式不正确(示例：13388888888)"
        },
        idcard: {
            validator: function (value) {
                return RegExpIDCard(value);
            },
            message: "身份证号格式不正确(15或18位)"
        },
        zipcode: {
            validator: function (value) {
                return RegExpZIP(value);
            },
            message: "邮政编码格式不正确(6位数字)"
        },
        qq: {
            validator: function (value) {
                return RegExpQQ(value);
            },
            message: "QQ号格式不正确"
        }
    });

    $.fn.extend({
        layoutEditor: function (options) {
            var editor = $(this);//当前的编辑项     
            var factValue = "";//只对于Label在视图模式下有效
            //所有编辑项的数据源格式统一如下:input
            var defaults = {
                ItemName: '',
                IsCellEditor: false,
                AllowVerify: false,
                DefaultValue: '',
                DateFormat: "",
                TextType: 0,//说明0-普通文本,1-电子邮箱,2-网址,3-电话,4-手机,5-身份证号,6-邮政编码,7-QQ号
                AllowEmpty: true,
                MessageByEmpty: '',
                MessageByNoValid: '',
                IsReadOnly: false,
                OnSeledItemFun: "",
                OnValueChange: "",
                initCallback: null,  //初始加载完毕后执行的方法，主要用于combobox和popupedit
                VerifyInfo: {
                    ValueField: '',//验证的字段
                    ValueFieldType: 0,//字段值类型：文本、GUID、数字、BOOL
                    TableName: '',
                    CheckIsOnly: false //验证是否唯一,如果为否，则表示验证该值是否存在
                },
                input: {
                    isInput: false,
                    OnBarcodeInput:null //条码输入时激活的事件
                },
                label: {
                    isLabel: false,
                    DisplayField: "",
                    ValueField: "",
                    TableName: "",
                    GetTextUrl: "",
                    CaseWhenList: "",
                    ElseValue: ""
                },
                number: {
                    isNumber: false,
                    precision: 2,//小数位
                    canLessZero: true
                },
                spinner: {
                    isSpinner: false,
                    canLessZero: true
                },
                combo: {
                    IsCombo: false,
                    Data: null,
                    //主要来源于指定数据表
                    DataSource: {
                        Key: "",
                        Table: "",
                        FilterFs: "",
                        ListFs: "",
                        OrderField: "",
                        RecordCount: 0,
                        PageIndex: 0,
                        CusFilter: ""
                    },
                    LinkageFilterField: "",//联动过滤字段
                    GetLinkageValueFun: null,//获取联动值的方法名
                    ValueField: "",
                    TextField: "",
                    Editable: true,//是否可直接编辑输入
                    MutilValues: false,//是否为多个值
                    Columns: []
                },//专指下拉框
                linkagecombo: {
                    IsLinkageCombo: false,
                    IsSelEmpty:false,
                    ValueField: "",
                    TextField: "",
                    IDField: "",
                    ParentIDField: "",
                    OrderFields: "",
                    CurFitler: "",
                    TableName: "",
                    AllowEmptySel: true,
                    LimitLevel: 0,
                    IsLoadAllData: false,
                    LinkageItems: null,
                    IDFieldType: 0
                },//专指下拉框
                popup: {
                    IsPopupEdit: false,
                    popupGrid: null,
                    WindowMode: 0,
                    AllowVerify: false,
                    ValueField: "",
                    TextField: "",
                    FilterFs: "",
                    ListFs: "",
                    LinkageChange: [],
                    Editable: false,
                    MutilValues: false,
                    TableName: "",
                    ClassName: "",
                    MethodName: "",
                    LDChangeItems: null,
                    ItemSourceUrl: null,
                    GetTextUrl: null,
                    GetValueUrl: null,
                    InitFun: null
                },
                //日期输入框，支持年、月、日
                date: {
                    isDate: false,
                    //是否显示日
                    showDay: true,
                    //是否显示月
                    showMonth: true,
                    //日期格式字符
                    formatString: '',
                    maxYearSpan: 3,
                    minMonthSpan: -97
                },
                //日期时间输入框
                datetime: {
                    isDateTime: false,
                    //是否显示秒
                    showSecond: true
                },
                //时间输入框，支持时分，时分秒
                time: {
                    isTime: false,
                    showSecond: true
                },
                //CheckBox输入框
                check: {
                    isCheck: false
                },
                //多行文本输入
                longText: {
                    isLongText: false
                },
                //Html编辑器
                htmlEditor: {
                    isHtmlEditor: false
                },
                //单文件
                file: {
                    isFile: false,
                    uploadPath: ""
                },
                //多文件上传
                mutilFile: {
                    isMutilFile: false,
                    uploadPath: ""
                },
                hidden: {
                    isHidden: false
                }
            };

            var op = $.extend(defaults, options);


            //获取当前项的默认值
            function getDefaultValue(v) {
                if (RS.Lib.isEmpty(v)) {
                    if (op.TextType == 1 || op.TextType == 2 || op.TextType == 3 || op.TextType == 4) //数值
                        return "0";
                    else if (op.TextType == 12 || op.TextType == 15)
                        return "0001-01-01 00:00:00";
                    else if (op.TextType == 21)
                        return "false";
                    else if (op.TextType == 22)
                        return "00000000-0000-0000-0000-000000000000";
                    else
                        return "";
                }
                else
                    return v;
            }



            //默认返回的项
            var rtn = {
                form: null,
                area: null,
                reload: null,//用于重新加载数据的方法，一般只限Combobox
                ldexpressArr: [],
                ldchange: null,//用于表达式联动改变
                enabled: true,
                visible: true,
                itemName: op.ItemName,
                getValue: null,
                setValue: null,
                getText: null,
                //获取当前选中的第一项所有数据
                getData: null,
                //获取当前选中的所有项数据
                getDatas: null,
                //事件
                //选中项改变时激活的事件，有一个参数：返回项目本身
                onSelChange: RS.Lib.parseFun(op.OnSeledItemFun),
                //当前编辑项值改变时
                onValueChange: RS.Lib.parseFun(op.OnValueChange),
                getEditor: null,
                getInput: null,
                filterRfist: null, //为过滤刷新，根据一个过滤条件刷新列表参考数据,主要是应用于下拉组合编辑项                
                setEnabled: null,
                setVisible: null,
                isValid: null,
                tag: null//用于存储临时东西
            }

            function isEquas(str1, str2) {
                if (str1 == str2) return true;
                var isE1 = RS.Lib.isEmpty(str1);
                var isE2 = RS.Lib.isEmpty(str2);

                if (isE1 || isE2) {
                    if (isE1 && isE2)
                        return true;
                    else
                        return false;
                }
                else if ((typeof str1 == "string") && typeof str2 == "string") {
                    if (str1.toLowerCase() == str2.toLowerCase())
                        return true;
                    else
                        return false;
                }
                else {
                    try {
                        var v1 = str1.toString();
                        var v2 = str2.toString();
                        return v1 == v2;
                    }
                    catch (e) { }
                    return false;
                }
            }
            function GetCaseWhe(v) {
                if (v == null) return "";
                if (RS.Lib.isEmpty(op.label.CaseWhenList)) return v;
                var lists = op.label.CaseWhenList.split(',');
                if (lists.length == 0) return "";
                for (var i = 0; i < lists.length; i++) {
                    var items = lists[i].split(':');
                    if (items.length <= 1) return;
                    if (isEquas(items[0], v))
                        return items[1];
                }

                if (op.label.ElseValue != "")
                    return o.label.ElseValue;
                else
                    return "";
            }

            //进行各项初始化
            //初始化文本框
            if (op.label.isLabel)//为普通标签，则不需要进行任何初始设置
            {
                rtn.getValue = function () {
                    if (RS.Lib.isEmpty(factValue)) {
                        if (op.TextType == 1 || op.TextType == 2 || op.TextType == 3 || op.TextType == 4) //数值
                            return 0;
                        else if (op.TextType == 12 || op.TextType == 15)
                            return "0001-01-01 00:00:00";
                        else if (op.TextType == 21)
                            return false;
                        else if (op.TextType == 22)
                            return "00000000-0000-0000-0000-000000000000";
                        else
                            return factValue;
                    }
                    else {
                        return factValue;
                    }
                };
                rtn.setValue = function (v) {
                    factValue = v;
                    v = getDefaultValue(v);
                    if (op.TextType == 17) //多行文本
                    {
                        if (RS.Lib.isEmpty(v)) {
                            editor.text("");
                        }
                        else {
                            if (typeof (v) != "string")
                                editor.text(v);
                            else {
                                v = v.replace(
                               /&/g, "&amp;").replace(
                               /"/g, "&quot;").replace(
                               /</g, "&lt;").replace(
                               />/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
                                editor.html(v);
                            }
                        }
                    }
                    else if (op.TextType == 12) {
                        if (v == "0001-01-01 00:00:00") {
                            editor.text("");
                        }
                        else if (v.indexOf(" ") > 0) {
                            var arr = v.split(" ");
                            editor.text(arr[0]);
                        }
                    }
                    else if (op.TextType == 15 && v == "0001-01-01 00:00:00")
                        editor.text("");
                    else if (RS.Lib.isNotEmpty(op.label.CaseWhenList)) {
                        editor.text(GetCaseWhe(v));
                    }
                    else {
                        if (RS.Lib.isNotEmpty(op.label.GetTextUrl)) {
                            RS.exec(op.label.GetTextUrl, { id: v }, function (t) {
                                editor.text(t);
                            })
                        }
                        else if (RS.Lib.isNotEmpty(op.label.ValueField) && RS.Lib.isNotEmpty(op.label.DisplayField) && op.label.DisplayField != op.label.ValueField && RS.Lib.isNotEmpty(op.label.TableName)) {
                            RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx", {
                                GetValueType: "GetText",
                                Table: op.label.TableName,
                                ValueField: op.label.ValueField,
                                ValueFieldType: op.label.ValueFieldType,
                                value: v,
                                TextField: op.label.DisplayField
                            }, function (result) {
                                if (result != null) //取到值
                                {
                                    editor.text(result);
                                }
                                else {
                                    editor.text("");
                                }
                            }, function () {
                                editor.text("");
                            }, null);
                        }
                        else {
                            editor.text(v);
                        }
                    }
                };
                rtn.getText = function () {
                    return editor.text();
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.removeAttr("disabled");
                    else
                        editor.attr("disabled", "disabled");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.show();
                    else
                        editor.hide();
                };
                rtn.isValid = function () {
                    return true;
                };

                //初始赋值
                if (RS.Lib.isNotEmpty(op.DefaultValue))
                    rtn.setValue(op.DefaultValue);
            }
            else if (op.input.isInput) //普通文本输入框
            {
                if (!op.AllowEmpty || op.TextType > 0) {
                    var vjson = {
                        required: !op.AllowEmpty ? true : false,
                        validType: null
                    };
                    //说明0-普通文本,1-电子邮箱,2-网址,3-电话,4-手机,5-身份证号,6-邮政编码,7-QQ号
                    if (op.TextType == 1)
                        vjson.validType = "email";
                    else if (op.TextType == 2)
                        vjson.validType = "url";
                    else if (op.TextType == 3)
                        vjson.validType = "tel";
                    else if (op.TextType == 4)
                        vjson.validType = "mobile";
                    else if (op.TextType == 5)
                        vjson.validType = "idcard";
                    else if (op.TextType == 6)
                        vjson.validType = "zipcode";
                    else if (op.TextType == 7)
                        vjson.validType = "qq";
                    else if (op.AllowVerify && op.VerifyInfo.TableName != "" && op.VerifyInfo.ValueField != "") //进行远程验证
                    {
                        vjson.validType = "remote['','paramName']";
                    }
                    if (op.MessageByEmpty != null && op.MessageByEmpty != "")
                        vjson.missingMessage = op.MessageByEmpty;
                    if (op.MessageByNoValid != null && op.MessageByNoValid != "")
                        vjson.invalidMessage = op.MessageByNoValid;

                    editor.validatebox(vjson);
                }
                initEditor(op, editor, true);

                editor.keydown(function (e) {
                    RS.editor.keyDown(e);
                });
                editor.change(function (e) {
                    var v = editor.val();
                    try {
                        if (rtn.onSelChange != null)
                            rtn.onSelChange(v, rtn);
                    }
                    catch (e) { }
                    try {
                        if (rtn.onValueChange != null)
                            rtn.onValueChange(v, rtn);
                    }
                    catch (e) { }
                });
                rtn.isValid = function () {
                    if (this.enabled && this.visible) {
                        if (!op.AllowEmpty || op.TextType > 0) {
                            return editor.validatebox("isValid");
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                };
                rtn.getValue = function () {
                    return editor.val();
                };
                rtn.setValue = function (v) {
                    return editor.val(v);
                };
                rtn.getText = function () {
                    return editor.val();
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.removeAttr("disabled");
                    else
                        editor.attr("disabled", "disabled");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.show();
                    else
                        editor.hide();
                };

                //初始赋值
                editor.val(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.combo.IsCombo) //为下拉框
            {
                editor.LayoutComboBox(op, rtn);
                initEditor(op, rtn.getInput(), false);
            }
            else if (op.popup.IsPopupEdit) {//为弹出窗体选择框
                editor.LayoutPopupEdit(op, rtn);
                initEditor(op, rtn.getInput(), false);
            }
            else if (op.linkagecombo.IsLinkageCombo)//联动下拉编辑框
            {
                editor.LinkageCombo(op, rtn);
                initEditor(op, rtn.getInput(), false);
            }
            else if (op.date.isDate) {
                if (!op.date.showDay) {
                    editor.YearMonthEdit(op, rtn);
                }
                else {
                    var vjson = {
                        required: !op.AllowEmpty ? true : false,
                        formatter: function (date) {
                            var year = date.getFullYear();
                            var month = date.getMonth() + 1;
                            var day = date.getDate();
                            if (op.date.showDay) {
                                return year + '-' + getDateExplain(month) + '-' + getDateExplain(day);
                            }
                            else if (op.date.showMonth) {
                                return year + '-' + getDateExplain(month);
                            }
                            else
                                return year.toString();
                        },
                        onSelect: function (date) {
                            try {
                                if (rtn.onSelChange != null)
                                    rtn.onSelChange(date, rtn);
                            }
                            catch (e) { }
                            try {
                                if (rtn.onValueChange != null)
                                    rtn.onValueChange(rtn.getValue(), rtn);
                            }
                            catch (e) { }
                        }
                    };
                    editor.datebox(vjson);

                    rtn.isValid = function () {
                        if (this.enabled && this.visible) {
                            if (!op.AllowEmpty) {
                                return editor.datebox("isValid");
                            }
                            else
                                return true;
                        }
                        else
                            return true;
                    };
                    var box = editor.datebox("textbox");
                    var isshow = false;
                    box.keydown(function (e) {
                        var keycode = e.keyCode;
                        if (keycode == 13) //回车
                        {
                            if (!isshow) //未显示
                            {
                                editor.datebox("showPanel");
                                isshow = true;
                            }
                            else {
                                editor.datebox("hidePanel");
                                isshow = false;
                            }
                        }
                        else if (!isshow)
                            RS.editor.keyDown(e);
                    });
                    box.mousedown(function (e) {
                        if (!isshow) //未显示
                        {
                            editor.datebox("showPanel");
                            isshow = true;
                        }
                        else {
                            editor.datebox("hidePanel");
                            isshow = false;
                        }
                    });


                    rtn.getValue = function () {
                        return editor.datebox("getValue");
                    };
                    rtn.setValue = function (v) {
                        v = getDefaultValue(v);
                        if (v != null && v != "" && v != "0001-01-01 00:00:00") {
                            try {
                                var date;
                                if (v.toLowerCase() == "getdate()") {
                                    date = new Date();
                                    var year = date.getFullYear();
                                    var month = date.getMonth() + 1;
                                    var day = date.getDate();
                                    if (op.date.showDay) {
                                        v = year + '-' + getDateExplain(month) + '-' + getDateExplain(day);
                                    }
                                    else if (op.date.showMonth) {
                                        v = year + '-' + getDateExplain(month);
                                    }
                                    else
                                        v = year.toString();
                                }
                                else if (v.indexOf(" ") > 0) {
                                    v = v.substring(0, v.indexOf(" "));
                                }
                            }
                            catch (e) {
                                v = "";
                            }
                        }
                        else
                            v = "";
                        return editor.datebox("setValue", v);
                    };
                    rtn.getText = function () {
                        return editor.datebox("getText");
                    }
                    rtn.getData = function () {
                        return null;
                    };
                    rtn.getDatas = function () {
                        return [];
                    };
                    rtn.getEditor = function () {
                        return editor;
                    };
                    rtn.getInput = function () {
                        return editor.datebox("textbox");
                    };
                    rtn.setEnabled = function (isEnabled) {
                        this.enabled = isEnabled;
                        if (isEnabled)
                            editor.datebox("enable");
                        else
                            editor.datebox("disable");
                    };
                    rtn.setVisible = function (isVisible) {
                        this.visible = isVisible;

                        if (isVisible)
                            editor.datebox("enable");
                        else
                            editor.datebox("disable");
                    };

                    initEditor(op, rtn.getInput(), false);

                    if (op.DefaultValue != null && op.DefaultValue != "") {

                        try {
                            if (v.toLowerCase() == "getdate()") {
                                var date = op.DefaultValue.toLowerCase() == "getdate()" ? new Date() : new Date(op.DefaultValue);

                                var year = date.getFullYear();
                                var month = date.getMonth() + 1;
                                var day = date.getDate();
                                var v = "";
                                if (op.date.showDay) {
                                    v = year + '-' + getDateExplain(month) + '-' + getDateExplain(day);
                                }
                                else if (op.date.showMonth) {
                                    v = year + '-' + getDateExplain(month);
                                }
                                else
                                    v = year.toString();
                            }
                            else if (v.indexOf(" ") > 0) {
                                v = v.substring(0, v.indexOf(" "));
                            }
                            //初始赋值
                            rtn.setValue(v);
                        }
                        catch (e) { }
                    }
                    else
                        rtn.setValue("");
                }
            }
            else if (op.datetime.isDateTime) {
                var vjson = {
                    required: !op.AllowEmpty ? true : false,
                    showSeconds: op.datetime.showSecond,
                    formatter: function (date) {
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        var hour = date.getHours();
                        var minutes = date.getMinutes();
                        var seconds = date.getSeconds();
                        if (op.datetime.showSecond) {
                            return year + '-' + getDateExplain(month) + '-' + getDateExplain(day) + " " + getDateExplain(hour) +
                                ':' + getDateExplain(minutes) + ":" + getDateExplain(seconds);
                        }
                        else
                            return year + '-' + getDateExplain(month) + '-' + getDateExplain(day) + " " + getDateExplain(hour) +
                                ':' + getDateExplain(minutes) + ":" + getDateExplain(seconds);
                    },
                    onSelect: function (date) {
                        try {
                            if (rtn.onSelChange != null)
                                rtn.onSelChange(date, rtn);
                        }
                        catch (e) { }
                        try {
                            if (rtn.onValueChange != null)
                                rtn.onValueChange(rtn.getValue(), rtn);
                        }
                        catch (e) { }
                    }
                };
                editor.datetimebox(vjson);

                var box = editor.datetimebox("textbox");
                var isshow = false;
                //box.focus(function (e) {
                //    editor.datetimebox("showPanel");
                //    isshow = true;
                //});
                //box.blur(function (e) {
                //    isshow = false;
                //});
                box.keydown(function (e) {
                    var keycode = e.keyCode;
                    if (keycode == 13) //回车
                    {
                        if (!isshow) //未显示
                        {
                            editor.datetimebox("showPanel");
                            isshow = true;
                        }
                        else {
                            editor.datetimebox("hidePanel");
                            isshow = false;
                        }
                    }
                    else if (!isshow)
                        RS.editor.keyDown(e);
                });
                box.mousedown(function (e) {
                    if (!isshow) //未显示
                    {
                        editor.datetimebox("showPanel");
                        isshow = true;
                    }
                    else {
                        editor.datetimebox("hidePanel");
                        isshow = false;
                    }
                });

                rtn.isValid = function () {
                    if (this.enabled && this.visible) {
                        if (!op.AllowEmpty) {
                            return editor.datetimebox("isValid");
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                };
                rtn.getValue = function () {
                    return editor.datetimebox("getValue");
                };
                rtn.setValue = function (v) {
                    v = getDefaultValue(v);
                    if (v != null && v != "" && v != "0001-01-01 00:00:00") {
                        try {
                            var date;
                            if (v.toLowerCase() == "getdate()") {
                                date = new Date();
                                var year = date.getFullYear();
                                var month = date.getMonth() + 1;
                                var day = date.getDate();
                                var hour = date.getHours();
                                var minutes = date.getMinutes();
                                var seconds = date.getSeconds();
                                if (op.datetime.showSecond) {
                                    v = year + '-' + getDateExplain(month) + '-' + getDateExplain(day) + " " + getDateExplain(hour) +
                                        ':' + getDateExplain(minutes) + ":" + getDateExplain(seconds);
                                }
                                else
                                    v = year + '-' + getDateExplain(month) + '-' + getDateExplain(day) + " " + getDateExplain(hour) +
                                        ':' + getDateExplain(minutes) + ":" + getDateExplain(seconds);

                            }
                        }
                        catch (e) {
                            v = "";
                        }
                    }
                    else
                        v = "";

                    return editor.datetimebox("setValue", v);
                };
                rtn.getText = function () {
                    return editor.datetimebox("getText");
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor.datetimebox("textbox");
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.datetimebox("enable");
                    else
                        editor.datetimebox("disable");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.datetimebox("enable");
                    else
                        editor.datetimebox("disable");
                };
                initEditor(op, rtn.getInput(), false);
                //初始赋值
                rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.time.isTime) {
                editor.timespinner({
                    required: !op.AllowEmpty ? true : false,
                    showSeconds: op.time.showSecond
                });

                editor.keydown(function (e) {
                    RS.editor.keyDown(e);
                });

                editor.change(function (e) {
                    var v = editor.val();
                    try {
                        if (rtn.onSelChange != null)
                            rtn.onSelChange(v, rtn);
                    }
                    catch (e) { }
                    try {
                        if (rtn.onValueChange != null)
                            rtn.onValueChange(v, rtn);
                    }
                    catch (e) { }
                });

                rtn.isValid = function () {
                    if (this.enabled && this.visible) {
                        if (!op.AllowEmpty) {
                            return editor.timespinner("isValid");
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                };
                rtn.getValue = function () {
                    return editor.timespinner("getValue");
                };
                rtn.setValue = function (v) {
                    return editor.timespinner("setValue", v);
                };
                rtn.getText = function () {
                    return editor.timespinner("getValue");
                };
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.timespinner("enable");
                    else
                        editor.timespinner("disable");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.timespinner("enable");
                    else
                        editor.timespinner("disable");
                };
                initEditor(op, rtn.getInput(), false);
                //初始赋值
                rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.check.isCheck) {
                editor.click(function (e) {
                    var v = rtn.getValue();
                    try {
                        if (rtn.onSelChange != null)
                            rtn.onSelChange(v, rtn);
                    }
                    catch (e) { }
                    try {
                        if (rtn.onValueChange != null)
                            rtn.onValueChange(v, rtn);
                    }
                    catch (e) { }
                });
                rtn.getValue = function () {
                    return editor.is(':checked');
                };
                rtn.setValue = function (v) {
                    return editor.attr("checked", v);
                };
                rtn.getText = function () {
                    return "";
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor;
                };
                rtn.isValid = function () {
                    return true;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.removeAttr("disabled");
                    else
                        editor.attr("disabled", "disabled");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.show();
                    else
                        editor.hide();
                };
                initEditor(op, rtn.getInput(), false);

                editor.keydown(function (e) {
                    RS.editor.keyDown(e);
                });
                //初始赋值
                rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.longText.isLongText) { //多行文本
                editor.change(function (e) {
                    var v = editor.val();
                    try {
                        if (rtn.onSelChange != null)
                            rtn.onSelChange(v, rtn);
                    }
                    catch (e) { }
                    try {
                        if (rtn.onValueChange != null)
                            rtn.onValueChange(v, rtn);
                    }
                    catch (e) { }
                });
                editor.validatebox({ required: !op.AllowEmpty });
                rtn.getValue = function () {
                    return editor.val();
                };
                rtn.setValue = function (v) {
                    return editor.val(v);
                };
                rtn.getText = function () {
                    return editor.val();
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.removeAttr("disabled");
                    else
                        editor.attr("disabled", "disabled");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.show();
                    else
                        editor.hide();
                };
                rtn.isValid = function () {
                    if (this.enabled && this.visible) {
                        if (!op.AllowEmpty) {
                            return editor.validatebox("isValid");
                        }
                        else
                            return true;
                    }
                    else
                        return true;

                };

                initEditor(op, rtn.getInput(), true, true);

                editor.keydown(function (e) {
                    RS.editor.keyDown(e);
                });
                //初始赋值
                rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.htmlEditor.isHtmlEditor) {
                rtn.getValue = function () {
                    return editor.val();
                };
                rtn.setValue = function (v) {
                    return editor.val(v);
                };
                rtn.getText = function () {
                    return editor.val();
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.removeAttr("disabled");
                    else
                        editor.attr("disabled", "disabled");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.show();
                    else
                        editor.hide();
                };
                rtn.isValid = function () {
                    if (this.enabled && this.visible) {
                        if (!op.AllowEmpty) {
                            return RS.Lib.isNotEmpty(editor.val());
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                };
                initEditor(op, rtn.getInput(), true, true);
                editor.ckeditor();

                editor.keydown(function (e) {
                    RS.editor.keyDown(e);
                });
                //初始赋值
                rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.file.isFile || op.mutilFile.isMutilFile) {

                var upBox = editor.uploadPanel({ siteUrl: RS.pageInfo.sitevpath, isMutilUpload: op.mutilFile.isMutilFile, isChangeFileName: false, savevpath: op.mutilFile.isMutilFile ? op.mutilFile.uploadFile : op.file.uploadFile });

                rtn.getValue = function () {
                    return upBox.getFiles();
                };
                rtn.setValue = function (v) {
                    return upBox.setFiles(v);
                };
                rtn.getText = function () {
                    return this.getValue();
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return upBox;
                };
                rtn.getInput = function () {
                    return upBox;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.removeAttr("disabled");
                    else
                        editor.attr("disabled", "disabled");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.show();
                    else
                        editor.hide();
                };
                rtn.isValid = function () {
                    if (this.enabled && this.visible) {
                        if (!op.AllowEmpty) {
                            return RS.Lib.isNotEmpty(this.getValue());
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                };

                //初始赋值
                rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.hidden.isHidden) {
                rtn.getValue = function () {
                    return editor.val();
                };
                rtn.setValue = function (v) {
                    return editor.val(v);
                };
                rtn.getText = function () {
                    return editor.val();
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = false;
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = false;
                };
                rtn.isValid = function () {
                    return true;
                };
                initEditor(op, rtn.getInput(), true);
                //初始赋值
                rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.number.isNumber) {
                var vjson = {
                    required: !op.AllowEmpty ? true : false,
                    min: op.number.canLessZero ? null : 0,
                    precision: op.number.precision,
                    formatter: function (v) {
                        return v;
                    },
                    onChange: function (nv, ov) {
                        if (nv != ov) {
                            try {
                                if (rtn.onSelChange != null)
                                    rtn.onSelChange(nv, rtn);
                            }
                            catch (e) { }
                            try {
                                if (rtn.onValueChange != null)
                                    rtn.onValueChange(nv, rtn);
                            }
                            catch (e) { }
                        }
                    }
                };

                editor.numberbox(vjson);


                rtn.getValue = function () {
                    var v = parseFloat(editor.numberbox("getValue"));
                    if (isNaN(v))
                        return 0;
                    else
                        return v;
                };
                rtn.setValue = function (v) {
                    v = getDefaultValue(v);
                    editor.numberbox("setValue", v);
                };
                rtn.getText = function () {
                    return editor.val();
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor.numberbox("textbox");
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.numberbox("enable");
                    else
                        editor.numberbox("disable");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.show();
                    else
                        editor.hide();
                };
                rtn.isValid = function () {
                    if (this.enabled && this.visible) {
                        if (!op.AllowEmpty) {
                            return editor.numberbox("isValid");
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                };
                var box = rtn.getInput();

                initEditor(op, box, false);

                box.keydown(function (e) {
                    RS.editor.keyDown(e);
                });
                //初始赋值
                rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            else if (op.spinner.isSpinner) {
                var vjson = {
                    width: op.Width,
                    required: !op.AllowEmpty ? true : false,
                    min: op.spinner.canLessZero ? null : 0,
                    precision: 0,
                    formatter: function (v) {
                        return v;
                    },
                    onChange: function (nv, ov) {
                        if (nv != ov) {
                            try {
                                if (rtn.onSelChange != null)
                                    rtn.onSelChange(nv, rtn);
                            }
                            catch (e) { }
                            try {
                                if (rtn.onValueChange != null)
                                    rtn.onValueChange(nv, rtn);
                            }
                            catch (e) { }
                        }
                    }
                };
                editor.numberspinner(vjson);
                rtn.isValid = function () {
                    if (this.enabled && this.visible) {
                        if (!op.AllowEmpty) {
                            return editor.numberspinner("isValid");
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                };

                editor.change(function (e) {
                    var v = rtn.getValue();
                    try {
                        if (rtn.onSelChange != null)
                            rtn.onSelChange(v, rtn);
                    }
                    catch (e) { }
                    try {
                        if (rtn.onValueChange != null)
                            rtn.onValueChange(v, rtn);
                    }
                    catch (e) { }
                });

                rtn.getValue = function () {
                    var v = parseInt(editor.numberspinner("getValue"));
                    if (isNaN(v))
                        return 0;
                    else
                        return v;
                };
                rtn.setValue = function (v) {
                    v = getDefaultValue(v);
                    return editor.numberspinner("setValue", v);
                };
                rtn.getText = function () {
                    return editor.numberspinner("getValue");
                }
                rtn.getData = function () {
                    return null;
                };
                rtn.getDatas = function () {
                    return [];
                };
                rtn.getEditor = function () {
                    return editor;
                };
                rtn.getInput = function () {
                    return editor;
                };
                rtn.setEnabled = function (isEnabled) {
                    this.enabled = isEnabled;
                    if (isEnabled)
                        editor.removeAttr("disabled");
                    else
                        editor.attr("disabled", "disabled");
                };
                rtn.setVisible = function (isVisible) {
                    this.visible = isVisible;
                    if (isVisible)
                        editor.show();
                    else
                        editor.hide();
                };
                initEditor(op, rtn.getInput(), false);

                editor.keydown(function (e) {
                    RS.editor.keyDown(e);
                });
                //初始赋值
                if (!(op.combo.IsCombo))
                    rtn.setValue(op.DefaultValue == null ? "" : op.DefaultValue);
            }
            return rtn;
        },
        //固定数据源
        LayoutComboBox: function (op, rtnObj) {
            var cbJson = op.combo;
            cbJson.GetLinkageValueFun = RS.Lib.parseFun(cbJson.GetLinkageValueFun);
            var cb = $(this);
            var vjson, box;
            var isInit = false;
            var initValue = null;
            var isbit = false;//是否为BIT值型，即0或1，只限类型为bool

            var onReloadFinied = null;

            function getDefaultValue(v) {
                if (RS.Lib.isEmpty(v)) {
                    if (op.TextType == 1 || op.TextType == 2 || op.TextType == 3 || op.TextType == 4) //数值
                        return "0";
                    else if (op.TextType == 12 || op.TextType == 15)
                        return "0001-01-01 00:00:00";
                    else if (op.TextType == 21)
                        return "false";
                    else if (op.TextType == 22)
                        return "00000000-0000-0000-0000-000000000000";
                    else
                        return "";
                }
                else
                    return v.toString();
            }
            function getArrV(v) {
                var arr = [];
                try {
                    if (v != null && typeof (v) == "string")
                        arr = v.split(",");
                    else if (typeof (v) == "Array")
                        arr = v;
                }
                catch (e) {
                    arr = [];
                }
                return arr;
            }

            //给指定组合框设置值
            function setComboboxValue(cb, v) {
                var isSeted = false;
                try {
                    //先检测有没有值
                    var data = cb.combobox("getData");
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        if (RS.Lib.getAttr(item,cbJson.ValueField) == v) //有值
                        {
                            cb.combobox("setValue",v);
                            isSeted = true;
                        }
                    }
                }
                catch (e) { }
                if (!isSeted) //当前列表项没有该项
                {
                    cb.combobox("setValue", "");
                }
            }

            function loadSuccess() {
                isInit = true;
                if (initValue != null) {
                    if (cbJson.MutilValues)
                        cb.combobox("setValues", getArrV(initValue));
                    else
                        setComboboxValue(cb, initValue);
                        //cb.combobox("setValue", initValue);
                }

                var v = cbJson.MutilValues ? cb.combobox("getValues") : cb.combobox("getValue");
                var items = cb.combobox("getData");
                if (items != null && items.length > 0) //有数据
                {
                    if (v == null || v == "") {
                        v = RS.Lib.getAttr(items[0], cbJson.ValueField);
                        if (v != null) {
                            if (cbJson.MutilValues)
                                cb.combobox("setValues", getArrV(v));
                            else {
                                setComboboxValue(cb,v);
                                cb.combobox("setValue", v);
                            }
                        }
                    }

                    if (op.TextType == 21) {
                        var itemV = RS.Lib.getAttr(items[0], cbJson.ValueField);
                        if (itemV == "" && items.length > 1)
                            itemV = RS.Lib.getAttr(items[1], cbJson.ValueField);

                        if (itemV == "1" || itemV == 1 || itemV == "0" || itemV == 0)
                            isbit = true;
                        else
                            isbit = false;
                    }
                }

                try {
                    if (op.initCallback != null && op.initCallback != undefined)
                        op.initCallback();
                }
                catch (e) { }
                try {
                    if (onReloadFinied != null && onReloadFinied != undefined)
                        onReloadFinied(rtnObj);
                }
                catch (e) { }
                onReloadFinied = null;
            }
            function loadError() {
                isInit = true;
            }
            if (cbJson.Data != null) {
                vjson = {
                    width: op.Width,
                    required: !op.AllowEmpty ? true : false,
                    editable: cbJson.Editable,
                    valueField: cbJson.ValueField,
                    textField: cbJson.TextField,
                    data: cbJson.Data,
                    value: null,
                    onSelect: function (data) {
                        try {
                            if (rtnObj.onSelChange != null)
                                rtnObj.onSelChange(data, rtnObj);
                        }
                        catch (e) { }
                        try {
                            if (rtnObj.onValueChange != null)
                                rtnObj.onValueChange(data.Value, rtnObj);
                        }
                        catch (e) { }
                    },
                    onUnselect: function (data) {
                        if (cbJson.MutilValues) //多选
                        {
                            try {
                                if (rtnObj.onValueChange != null)
                                    rtnObj.onValueChange(data.Value, rtnObj);
                            }
                            catch (e) { }
                        }
                    },
                    multiple: cbJson.MutilValues
                };
                if (RS.Lib.isNotEmpty(op.DefaultValue))
                    vjson.value = op.DefaultValue;

                cb.combobox(vjson);
                isInit = true;
                loadSuccess();
            }
            else if (RS.Lib.isNotEmpty(cbJson.Url)) {
                //增加联动信息
                var url = "";
                if (RS.Lib.isNotEmpty(cbJson.LinkageFilterField) && cbJson.GetLinkageValueFun != null) {
                    if (cbJson.Url.indexOf("?") >= 0) {
                        url = cbJson.Url + "&" + cbJson.LinkageFilterField + "=" + cbJson.GetLinkageValueFun();
                    }
                    else {
                        url = cbJson.Url + "?" + cbJson.LinkageFilterField + "=" + cbJson.GetLinkageValueFun();
                    }

                    rtnObj.reload = function (callBack) {
                        var url = "";
                        if (cbJson.Url.indexOf("?") >= 0) {
                            url = cbJson.Url + "&" + cbJson.LinkageFilterField + "=" + cbJson.GetLinkageValueFun();
                        }
                        else {
                            url = cbJson.Url + "?" + cbJson.LinkageFilterField + "=" + cbJson.GetLinkageValueFun();
                        }
                        onReloadFinied = callBack;
                        cb.combobox("reload", url);
                    };
                }
                else
                    url = cbJson.Url;

                vjson = {
                    url: url,
                    width: op.Width,
                    required: !op.AllowEmpty ? true : false,
                    editable: cbJson.Editable,
                    valueField: cbJson.ValueField,
                    textField: cbJson.TextField,
                    onLoadSuccess: loadSuccess,
                    onLoadError: loadError,
                    onSelect: function (data) {
                        try {
                            if (rtnObj.onSelChange != null)
                                rtnObj.onSelChange(data, rtnObj);
                        }
                        catch (e) { }

                        try {
                            if (rtnObj.onValueChange != null)
                                rtnObj.onValueChange(data, rtnObj);
                        }
                        catch (e) { }
                    },
                    onUnselect: function (data) {
                        if (cbJson.MutilValues) //多选
                        {
                            try {
                                if (rtnObj.onValueChange != null)
                                    rtnObj.onValueChange(data.Value, rtnObj);
                            }
                            catch (e) { }
                        }
                    },
                    multiple: cbJson.MutilValues
                }
                if (RS.Lib.isNotEmpty(op.DefaultValue))
                    vjson.value = op.DefaultValue;
                cb.combobox(vjson);
            }
            else if (cbJson.DataSource != null && RS.Lib.isNotEmpty(cbJson.DataSource.Table)) {
                vjson = {
                    width: op.Width,
                    required: !op.AllowEmpty ? true : false,
                    editable: cbJson.Editable,
                    valueField: cbJson.ValueField,
                    textField: cbJson.TextField,
                    onLoadSuccess: loadSuccess,
                    onLoadError: loadError,
                    onSelect: function (data) {
                        try {
                            if (rtnObj.onSelChange != null)
                                rtnObj.onSelChange(data, rtnObj);
                        }
                        catch (e) { }

                        try {
                            if (rtnObj.onValueChange != null)
                                rtnObj.onValueChange(data, rtnObj);
                        }
                        catch (e) { }
                    },
                    onUnselect: function (data) {
                        if (cbJson.MutilValues) //多选
                        {
                            try {
                                if (rtnObj.onValueChange != null)
                                    rtnObj.onValueChange(data.Value, rtnObj);
                            }
                            catch (e) { }
                        }
                    },
                    multiple: cbJson.MutilValues
                }
                if (RS.Lib.isNotEmpty(op.DefaultValue))
                    vjson.value = op.DefaultValue;

                cb.combobox(vjson);
                //加载数据，这里要增加联动处理
                RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx?GetValueType=GetDataTable", {
                    ValueField: cbJson.ValueField,
                    TextField: cbJson.TextField,
                    TableName: cbJson.DataSource.Table,
                    CurFilter: cbJson.DataSource.CusFilter,
                    OrderFields: cbJson.DataSource.OrderField,
                    LinkageFilterField: cbJson.LinkageFilterField,
                    LinkageFieldValue: cbJson.GetLinkageValueFun != null ? cbJson.GetLinkageValueFun() : "",
                    LinkageFieldValueType: cbJson.LinkageFieldValueType,
                    AllowEmptySel: op.AllowEmpty
                }, function (data) {
                    cb.combobox("loadData", data);
                }, function (errMsg) {
                    showNotice(errMsg);
                });

                rtnObj.reload = function (callBack) {
                    RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx?GetValueType=GetDataTable", {
                        ValueField: cbJson.ValueField,
                        TextField: cbJson.TextField,
                        TableName: cbJson.DataSource.Table,
                        CurFilter: cbJson.DataSource.CusFilter,
                        OrderFields: cbJson.DataSource.OrderField,
                        LinkageFilterField: cbJson.LinkageFilterField,
                        LinkageFieldValue: cbJson.GetLinkageValueFun != null ? cbJson.GetLinkageValueFun() : "",
                        LinkageFieldValueType: cbJson.LinkageFieldValueType,
                        AllowEmptySel: op.AllowEmpty
                    }, function (data) {
                        cb.combobox("loadData", data);
                        if (callBack != null && callBack != undefined) callBack(rtnObj);
                    }, function (errMsg) {
                        showNotice(errMsg);
                    });
                };
            }

            box = cb.combobox("textbox");
            var isshow = false;

            box.blur(function () {
                //如果当前并没有实际选中值，则清空
                var panel = cb.combobox("panel");
                var index = $(panel).find(".combobox-item-selected").index();
                if (index == -1) //未实际选中项
                {
                    if (cbJson.AllowVerify) {
                        cb.combobox("clear");
                    }
                }
                isshow = false;
            });

            box.keydown(function (e) {
                var keycode = e.keyCode;
                if (keycode == 13) //回车
                {
                    if (!isshow) //未显示
                    {
                        cb.combobox("showPanel");
                        isshow = true;
                    }
                    else {
                        cb.combobox("hidePanel");
                        isshow = false;
                    }
                }
                else if (!isshow)
                    RS.editor.keyDown(e);
            });
            box.mousedown(function (e) {
                if (!isshow) //未显示
                {
                    cb.combobox("showPanel");
                    isshow = true;
                }
                else {
                    cb.combobox("hidePanel");
                    isshow = false;
                }
            });

            rtnObj.isValid = function () {
                if (this.enabled && this.visible) {
                    if (!op.AllowEmpty) {
                        return cb.combobox("isValid");
                    }
                    else
                        return true;
                }
                else
                    return true;
            };
            rtnObj.getValue = function () {
                var v = "";
                if (cbJson.MutilValues) { //为多选
                    {
                        var arr = cb.combobox("getValues");
                        try {
                            v = arr.join(",");
                        }
                        catch (e) { }
                    }
                }
                else {
                    v = cb.combobox("getValue");
                    if (RS.Lib.isEmpty(v)) {
                        if (op.TextType == 1 || op.TextType == 2 || op.TextType == 3 || op.TextType == 4)
                            v = 0;
                        else if (op.TextType == 21)
                            v = false;
                        else if (op.TextType == 22)
                            v = "00000000-0000-0000-0000-000000000000";
                    }
                    else {
                        if (op.TextType == 1 || op.TextType == 2) {
                            v = parseFloat(v);
                            if (isNaN(v)) v = 0;
                        }
                        else if (op.TextType == 3 || op.TextType == 4) {
                            v = parseInt(v);
                            if (isNaN(v)) v = 0;
                        }
                        else if (op.TextType == 21) {
                            if (v == "1" || v == 1 || v == true || v == "true" || v == "True" || v == "TRUE" || v == "是" || v == "真")
                                v = true;
                            else
                                v = false;
                        }
                    }
                }
                return v;
            };
            rtnObj.setValue = function (v) {
                v = getDefaultValue(v);
                if (isInit) {
                    initValue = null;
                    if (cbJson.MutilValues) { //为多选
                        //注意，这里是数组，实际上是不能保存为数组
                        if (RS.Lib.isEmpty(v))
                            cb.combobox("setValues", []);
                        else {
                            try {
                                var arr = v.split(",");
                                cb.combobox("setValues", arr);
                            }
                            catch (e) { }
                        }
                    }
                    else if (op.TextType == 21) {
                        if (isbit) {
                            if (v == "1" || v == 1 || v == true || v == "true" || v == "True" || v == "TRUE" || v == "是" || v == "真")
                                setComboboxValue(cb,"1");//cb.combobox("setValue", "1");
                            else if (v == "0" || v == 0 || v == false || v == "false" || v == "False" || v == "FALSE" || v == "否" || v == "假")
                                setComboboxValue(cb,"0"); //b.combobox("setValue", "0");
                            else
                                setComboboxValue(cb, v);//cb.combobox("setValue", v);
                        }
                        else
                            setComboboxValue(cb, v);//cb.combobox("setValue", v);
                    }
                    else
                        setComboboxValue(cb, v);//cb.combobox("setValue", v);
                }
                else {
                    initValue = v;
                }
            };
            rtnObj.getText = function () {
                return cb.combobox("getText");
            }
            rtnObj.getData = function () {
                return cb.combobox("getValue");
            };
            rtnObj.getDatas = function () {
                return cb.combobox("getValues");
            };
            rtnObj.getEditor = function () {
                return cb;
            };
            rtnObj.getInput = function () {
                return box;
            };
            rtnObj.setEnabled = function (isEnabled) {
                this.enabled = isEnabled;
                if (isEnabled)
                    cb.combobox("enable");
                else
                    cb.combobox("disable");
            };
            rtnObj.setVisible = function (isVisible) {
                this.visible = isVisible;
                if (isVisible)
                    cb.combobox("enable");
                else
                    cb.combobox("disable");
            };
        },

        LayoutPopupEdit: function (op, rtnObj) {
            var popupJson = op.popup;
            var input = $(this);
            var gridJson = toGridTableJson(popupJson);
            var popupEdit = initPopupEdit(popupJson, input);
            popupEdit.selDataFun = selectData;//设置选中数据关闭后激活的方法，以便外部自定弹出窗口调用
            var popupConfirmFun = RS.Lib.parseFun(popupJson.PopupConfimFun);

            var popupButtonFun = RS.Lib.parseFun(popupJson.OnPopupButtonFun);

            if (!popupJson.Editable)
                popupEdit.textInput.attr("readonly", "readonly");

            var isLastEdit = false;//最近操作是编辑输入还是选择输入

            //定义点击弹出窗口按钮打开时激活的方法
            if (popupButtonFun != null) {
                popupEdit.btnspan.click(function () {
                    popupButtonFun(popupEdit);
                });
            }
            else {
                popupEdit.btnspan.click(function () {
                    popupWindow(popupEdit.textInput, { gridJson: gridJson, ValueField: popupJson.ValueField, TextField: popupJson.TextField, MutilValues: popupJson.MutilValues });
                });
            }

            //定义当文本框编辑输入时激活的方法
            popupEdit.textInput.keydown(function (e) {
                var dataItem = null;
                var keycode = e.keyCode;
                if (keycode == 13) {
                    var box = $(this);
                    if (box.val() == "")//则弹出窗口
                    {
                        isLastEdit = false;
                        popupWindow(box, gridJson);
                    }
                    else //则对当前数据进行服务器测试，看是否有匹配数据
                    {
                        isLastEdit = false;
                        RemoingCheck(box); //进行远程验证
                    }
                }
                else {
                    if (keycode != 37 && keycode != 38 && keycode != 39 && keycode != 40) isLastEdit = true;
                    RS.editor.keyDown(e);
                }
            });

            popupEdit.textInput.blur(function () {
                //如果当前并没有实际选中值，则清空
                if (!popupJson.Editable) return;
                if (isLastEdit) {
                    var box = $(this);
                    RemoingCheck(box);
                    isLastEdit = false;
                }
            });

            try {
                if (op.initCallback != null && op.initCallback != undefined)
                    op.initCallback();
            }
            catch (e) { }


            function getDefaultValue(v) {
                if (RS.Lib.isEmpty(v)) {
                    if (op.TextType == 1 || op.TextType == 2 || op.TextType == 3 || op.TextType == 4) //数值
                        return "0";
                    else if (op.TextType == 12 || op.TextType == 15)
                        return "0001-01-01 00:00:00";
                    else if (op.TextType == 21)
                        return "false";
                    else if (op.TextType == 22)
                        return "00000000-0000-0000-0000-000000000000";
                    else
                        return "";
                }
                else
                    return v;
            }
            function RemoingCheck(box) {
                if (popupJson.TextField == "" || popupJson.ValueField == "") return false;
                if (popupJson.TextField == popupJson.ValueField) return false;
                if (RS.Lib.isNotEmpty(popupJson.GetValueUrl)) {
                    var text = box.val();
                    RS.exec(RS.pageInfo.rootvpath + popupJson.GetValueUrl, JSON.stringify({ text: box.val() }), function (v) {
                        if (RS.Lib.isNotEmpty(v)) {
                            popupEdit.valueInput.val(v);

                            try {
                                if (rtnObj.onSelChange != null)
                                    rtnObj.onSelChange(v, rtnObj);
                            }
                            catch (e) { }
                            try {
                                if (rtnObj.onValueChange != null)
                                    rtnObj.onValueChange(v, rtnObj);
                            }
                            catch (e) { }
                        }
                        else { //清空
                            if (popupJson.AllowVerify) {
                                showNotice("输入错误,本编辑项自动清空。");
                                popupEdit.textInput.val("");
                            }
                            popupEdit.valueInput.val("");
                            try {
                                if (rtnObj.onSelChange != null)
                                    rtnObj.onSelChange("", rtnObj);
                            }
                            catch (e) { }
                            try {
                                if (rtnObj.onValueChange != null)
                                    rtnObj.onValueChange("", rtnObj);
                            }
                            catch (e) { }
                        }
                    })
                }
                else if (RS.Lib.isNotEmpty(popupJson.ValueField) && RS.Lib.isNotEmpty(popupJson.TextField) && popupJson.TextField != popupJson.ValueField) {
                    RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx", {
                        GetValueType: "GetSearchInputValue",
                        Table: popupJson.TableName,
                        ParaField: popupJson.TextField,
                        value: box.val(),
                        ReturnValueField: popupJson.ValueField,
                        OtherFilterFields: popupJson.DataSource.FilterFs,
                        DataFields: popupJson.DataSource.ListFs
                    }, function (result) {
                        if (result != null) //未取到值
                        {
                            popupEdit.valueInput.val(result.Value);
                            popupEdit.textInput.val(result.Text);
                            dataItem = result.DataItem;

                            try {
                                if (rtnObj.onSelChange != null)
                                    rtnObj.onSelChange(result.Value, rtnObj);
                            }
                            catch (e) { }
                            try {
                                if (rtnObj.onValueChange != null)
                                    rtnObj.onValueChange(result.Value, rtnObj);
                            }
                            catch (e) { }
                        }
                        else {
                            if (popupJson.AllowVerify) {
                                showNotice("输入错误,本编辑项自动清空。");
                                popupEdit.textInput.val("");
                            }
                            popupEdit.valueInput.val("");
                            dataItem = null;

                            try {
                                if (rtnObj.onSelChange != null)
                                    rtnObj.onSelChange("", rtnObj);
                            }
                            catch (e) { }
                            try {
                                if (rtnObj.onValueChange != null)
                                    rtnObj.onValueChange("", rtnObj);
                            }
                            catch (e) { }
                        }
                    }, function () { }, null);
                }
                else {
                    var t = box.val();
                    popupEdit.valueInput.val(t);
                    try {
                        if (rtn.onSelChange != null)
                            rtn.onSelChange(t, rtnObj);
                    }
                    catch (e) { }
                    try {
                        if (rtn.onValueChange != null)
                            rtn.onValueChange(t, rtnObj);
                    }
                    catch (e) { }
                }
            }


            rtnObj.isValid = function () {
                if (this.enabled && this.visible) {
                    if (!op.AllowEmpty) {
                        return RS.Lib.isNotEmpty(popupEdit.valueInput.val());
                    }
                    else
                        return true;
                }
                else
                    return true;
            };
            rtnObj.getValue = function () {
                var v = popupEdit.valueInput.val();

                if (RS.Lib.isEmpty(v)) {
                    if (op.TextType == 1 || op.TextType == 2 || op.TextType == 3 || op.TextType == 4)
                        v = 0;
                    else if (op.TextType == 21)
                        v = false;
                    else if (op.TextType == 22)
                        v = "00000000-0000-0000-0000-000000000000";
                }
                else if (!popupJson.MutilValues) {
                    if (op.TextType == 1 || op.TextType == 2) {
                        v = parseFloat(v);
                        if (isNaN(v)) v = 0;
                    }
                    else if (op.TextType == 3 || op.TextType == 4) {
                        v = parseInt(v);
                        if (isNaN(v)) v = 0;
                    }
                    else if (op.TextType == 21) {
                        if (v == "1" || v == 1 || v == true || v == "true" || v == "True" || v == "TRUE" || v == "是" || v == "真")
                            v = true;
                        else
                            v = false;
                    }
                }
                return v;
            };
            rtnObj.setValue = function (v) {
                v = getDefaultValue(v);
                var t = v;
                if (RS.Lib.isNotEmpty(popupJson.GetTextUrl)) {
                    RS.exec(popupJson.GetTextUrl, { id: v }, function (t) {

                        if (RS.Lib.isNotEmpty(t)) {
                            popupEdit.valueInput.val(v);
                            popupEdit.textInput.val(t);
                        }
                        else {
                            popupEdit.valueInput.val("");
                            popupEdit.textInput.val("");
                        }
                    })
                }
                else if (RS.Lib.isNotEmpty(popupJson.ValueField) && RS.Lib.isNotEmpty(popupJson.TextField) && popupJson.TextField != popupJson.ValueField && RS.Lib.isNotEmpty(popupJson.TableName)) {
                    RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx", {
                        GetValueType: "GetText",
                        Table: popupJson.TableName,
                        ValueField: popupJson.ValueField,
                        ValueFieldType: popupJson.ValueFieldType,
                        value: v,
                        TextField: popupJson.TextField
                    }, function (result) {
                        if (result != null) //取到值
                        {
                            t = result;
                        }
                        else {
                            t = "";
                            v = "";
                        }
                        popupEdit.valueInput.val(v);
                        popupEdit.textInput.val(t);
                    }, function () {
                        popupEdit.valueInput.val("");
                        popupEdit.textInput.val("");
                    }, null);
                }
                else {
                    popupEdit.valueInput.val(v);
                    popupEdit.textInput.val(t);
                }
            };
            rtnObj.getText = function () {
                return popupEdit.textInput.val();
            }
            rtnObj.getData = function () {
                return dataItem;
            };
            rtnObj.getDatas = function () {
                return [];
            };
            rtnObj.getEditor = function () {
                return popupEdit;
            };
            rtnObj.getInput = function () {
                return popupEdit.textInput;
            }
            rtnObj.setEnabled = function (isEnabled) {
                this.enabled = isEnabled;
                popupEdit.setEnabled(isEnabled);
            };
            rtnObj.setVisible = function (isVisible) {
                this.visible = isVisible;
                popupEdit.setVisible(isVisible);
            };
            rtnObj.setUrl = function (url) {
                gridJson.url = url;
            }

            function popupWindow(box, jsonBoj) {
                if (popupConfirmFun != null) {
                    try {
                        if (!popupConfirmFun()) return;
                    }
                    catch (e) { }
                }

                jsonBoj.values = rtnObj.getValue().split(",");
                var w = 600, h = 400;
                var html = RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/CommonHtml/SelectGridWin.html";
                if (popupJson.MutilValues || popupJson.WindowMode == 1) { //复杂选择
                    html = RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/CommonHtml/MutilSelectWin.html";
                    w = 800;
                }
                openModelNormal(html, w, h, selectData, { options: jsonBoj, pageInfo: RS.pageInfo });
            }

            function selectData(data) {
                if (data != null && data != undefined) {
                    popupEdit.valueInput.val(data.value);
                    popupEdit.textInput.val(data.text);
                    //如果有联动，则要设置相关联动信息
                    try {
                        //根据联动定义设置相应项
                        if (op.popup.LDChangeItems != null && op.popup.LDChangeItems != undefined) {
                            if (rtnObj.form != null && rtnObj.area != null) {
                                $(op.popup.LDChangeItems).each(function (i, item) {
                                    var v = RS.Lib.getAttr(data.dataItem, item.Field);
                                    if (v != null) {
                                        if (RS.Lib.isNotEmpty(item.AreaName))
                                            rtnObj.form.setItemValue(item.AreaName, item.ItemName, v);
                                        else
                                            rtnObj.area.setItemValue(item.ItemName, v);
                                    }
                                    else {
                                        if (RS.Lib.isNotEmpty(item.AreaName))
                                            rtnObj.form.setItemValue(item.AreaName, item.ItemName, "");
                                        else
                                            rtnObj.area.setItemValue(item.ItemName, "");
                                    }
                                });
                            }
                        }
                    }
                    catch (e) { }
                    try {
                        if (rtnObj.onSelChange != null)
                            rtnObj.onSelChange(data.value, rtnObj);
                    }
                    catch (e) { }
                    try {
                        if (rtnObj.onValueChange != null)
                            rtnObj.onValueChange(data.value, rtnObj);
                    }
                    catch (e) { }
                }
            }

            function ToRowJson(pjson) {
                var items = [];
                if (pjson.AllowMuilSelect) {
                    items.push(new { field: "ck", checkbox: true, rowspan: 1 });
                }
                for (var i = 0; i < pjson.Columns.length; i++) {
                    items.push(pjson[i]);
                }
                return items;
            }

            function toGridTableJson(popup) {
                var keyfield = "";
                var gjson = popup.popupGrid;

                if (RS.Lib.isNotEmpty(popup.ValueField))
                    keyfield = popup.ValueField;
                else if (RS.Lib.isNotEmpty(popup.TextField))
                    keyfield = popup.TextField;
                else if (gjson.Columns.length > 0)
                    keyfield = gjson.Columns[0].DataField;

                var columns = popup.MutilValues ? [{ field: "ck", checkbox: true, rowspan: 1 }] : [];
                var filterarr = [];
                var co = [];
                var treeField = "";
                var hasKeyField = false;
                if (gjson.Columns.length > 0) {
                    for (var i = 0; i < gjson.Columns.length; i++) {
                        var c = gjson.Columns[i];
                        if (i == 0 && popup.isTree)
                            treeField = c.DataField;

                        columns.push({
                            title: c.Caption,
                            field: c.DataField,
                            width: c.Width,
                            sortable: true,
                            resizable: true
                        });
                        co.push({
                            CaseWhenList: "",
                            DataField: c.DataField,
                            DataFormatString: "",
                            DisplayField: "",
                            ElseValue: "",
                            IsEmptyElseShowSelf: true,
                            MainTableField: c.DataField,
                            RelationField: "",
                            RelationTable: "",
                            TotalField: c.DataField,
                            TotalFormatString: "",
                            TotalType: 0
                        });
                        if (keyfield == c.DataField) hasKeyField = true;
                        if (c.IsCanFilter)
                            filterarr.push({
                                SqlPrefix: 0,
                                FieldName: c.DataField,
                                Title: c.Caption,
                                DataType: c.DataType,
                                DateCompareType: 0,
                                CompareType: 0,
                                Width: 0,
                                PanelWidth: 0,
                                DataSource: null,
                                SourceDefine: null
                            });
                    }
                }
                else if (RS.Lib.isNotEmpty(popup.TextField)) {
                    columns.push({
                        title: "列项",
                        field: popup.TextField,
                        width: 300,
                        sortable: false,
                        resizable: true
                    });

                    co.push({
                        CaseWhenList: "",
                        DataField: popup.TextField,
                        DataFormatString: "",
                        DisplayField: "",
                        ElseValue: "",
                        IsEmptyElseShowSelf: true,
                        MainTableField: "",
                        RelationField: "",
                        RelationTable: "",
                        TotalField: "",
                        TotalFormatString: "",
                        TotalType: 0
                    });
                    if (keyfield == popup.TextField) hasKeyField = true;
                    treeField = popup.TextField;
                }
                if (!hasKeyField) {
                    co.push({
                        CaseWhenList: "",
                        DataField: keyfield,
                        DataFormatString: "",
                        DisplayField: "",
                        ElseValue: "",
                        IsEmptyElseShowSelf: true,
                        MainTableField: "",
                        RelationField: "",
                        RelationTable: "",
                        TotalField: "",
                        TotalFormatString: "",
                        TotalType: 0
                    });
                }

                var filter = { normalItems: filterarr, pendingItems: filterarr };

                var url = gjson.Url;
                if (RS.Lib.isNotEmpty(popup.ItemSourceUrl))
                    url = RS.pageInfo.rootvpath + popup.ItemSourceUrl;


                var rtnJson = {
                    id: "popupGrid",
                    url: url,
                    columns: [columns],//数据列
                    gridFilter: filter,//过滤项
                    values: [],
                    queryParams: {
                        CurrentPageIndex: 0,
                        ItemsPerPage: 20,
                        TotalRecordCount: 0,
                        Data: gjson.Data,
                        AllowPaging: true,
                        ColumnOptions: JSON.stringify(co),
                        ClassName: "",
                        GridViewType: "",
                        ParentIDField: "",
                        IDField: "",
                        XPathField: "",
                        XPathLength: "",
                        SortItems: "",
                        IsSuccess: "",
                        ErrorMessage: "",
                        Filter: "", //客户端产生的过滤值
                        CustomObj: "",//客户端转过来的额外对象，用于对外部进行处理
                        IsExpandAll: true
                    },
                    isTreeGrid: popup.isTree,
                    treeField: treeField,
                    hasFun: true,
                    hasFilter: filterarr.length > 0,
                    operateFuns: [],
                    funCheckUrl: "",
                    checkParamFun: "",
                    setFunBtnMethod: "",
                    striped: false,
                    nowrap: true,
                    idfield: keyfield,
                    pagination: true,
                    rownumbers: true,//是否要显示数字行列
                    singleSelect: !popup.MutilValues,// true,//是否支持单选
                    autoRowHeight: false,//行高是否自动
                    pageSize: 20,//每页的大小
                    remoteSort: true,//是否支持远程数据加载
                    showFooter: false,//是否显示页脚,
                    ClickRowFun: null,
                    DblClickRowFun: "SelectOK",
                    ClickCellFun: null,
                    DblClickCellFun: null,
                    SelectRowFun: null,
                    UnselectRowFun: null,
                    SelectAllFun: null,
                    UnselectAllFun: null,
                    InitFun: function (grid) {
                        var fun = RS.Lib.isNotEmpty(popup.InitFun) ? RS.Lib.parseFun(popup.InitFun) : null;
                        if (fun != null) {
                            fun(grid, rtnObj);
                        }
                    }
                };
                rtnJson.operateFuns.push(
                    {
                        hasCheck: false,
                        id: "btnOK",
                        text: "确认",
                        iconCls: "icon-ok",
                        clickFun: "SelectOK",
                        fieldName: "",
                        valueByShow: "",
                        valueByHide: "",
                        valueByEnabled: "",
                        valueByUnEnabled: ""
                    });
                if (op.AllowEmpty) {
                    rtnJson.operateFuns.push({
                        hasCheck: false,
                        id: "btnEmpty",
                        text: "空行",
                        iconCls: "icon-tip",
                        clickFun: "SelectEmpty",
                        fieldName: "",
                        valueByShow: "",
                        valueByHide: "",
                        valueByEnabled: "",
                        valueByUnEnabled: ""
                    });
                }
                rtnJson.operateFuns.push({
                    hasCheck: false,
                    id: "btnCancel",
                    text: "取消",
                    iconCls: "icon-no",
                    clickFun: "SelectCancel",
                    fieldName: "",
                    valueByShow: "",
                    valueByHide: "",
                    valueByEnabled: "",
                    valueByUnEnabled: ""
                });
                return rtnJson;
            }

            function initPopupEdit(opjson, box) {
                var span = $("<span></span>");

                var wstr = box.css("width");
                if (wstr != null && wstr.indexOf("%")) {

                    span.css("width", wstr);
                }
                else {
                    var w = parseInt(box.width());
                    if (parseInt(w) == NaN)
                        w = 100;

                    span.width(w);
                }
                span.attr("class", "PopupEdit");
                span.css("border-width", "0px");

                //边框
                var spanborder = $("<span></span>");
                spanborder.attr("class", "PopupEdit-border");
                span.append(spanborder);

                //实际呈现的文本框
                var intext = $("<input type=\"input\" />");
                intext.attr("class", "PopupEdit-input");
                intext.attr("placeholder", "");
                intext.attr("autocomplete", "off");

                spanborder.append(intext);

                //文本框中右边的按钮
                var btnspan = $("<span></span>");
                btnspan.attr("class", "PopupEdit-buttons");
                spanborder.append(btnspan);

                //按钮图标
                var iconspan = $("<span></span>");
                iconspan.attr("class", "PopupEdit-button");
                iconspan.mouseover(function () {
                    var css = $(this).attr("class");
                    if (css == "PopupEdit-button")
                        $(this).attr("class", "PopupEdit-button-hover");
                });
                iconspan.mouseout(function () {
                    var css = $(this).attr("class");
                    if (css != "PopupEdit-button")
                        $(this).attr("class", "PopupEdit-button");
                });
                iconspan.mousedown(function () {
                    $(this).attr("class", "PopupEdit-button-pressed");
                });

                iconspan.mouseup(function () {
                    $(this).attr("class", "PopupEdit-button-hover");
                });

                iconspan.append("<span class=\"PopupEdit-icon\"></span>");
                btnspan.append(iconspan);
                span.insertBefore(box);
                box.remove();
                span.append(box);
                box.hide();

                if (popupJson.TextField == "" || popupJson.ValueField == "") {
                    box = intext;
                }
                if (popupJson.TextField == popupJson.ValueField) {
                    box = intext;
                }


                return {
                    selDataFun: null,//选中数据后激活的方法
                    textInput: intext, //用于显示的文本输入框
                    valueInput: box, //用于存储实际值的输入框
                    editor: span,
                    btnspan: iconspan,
                    setEnabled: function (isEnabled) {
                        if (isEnabled) {
                            btnspan.show();
                            intext.removeAttr("disabled");
                            span.removeAttr("disabled");
                        }
                        else {
                            btnspan.hide();
                            btnspan.attr("disabled", "disabled");
                            span.attr("disabled", "disabled");
                        }
                    },
                    setVisible: function (isVisible) {
                        if (isVisible)
                            span.show();
                        else
                            span.hide();
                    },
                    setText: function (t) {
                        intext.val(t);
                    },
                    setValue: function (v) {
                        box.val(v);
                    }
                }
            }
        },
        YearMonthEdit: function (op, rtnObj) {
            var box = $(this);
            var curSelYear = 0, curSelMonth = 0;

            var dv = null;
            var dvstr = "";
            if (RS.Lib.isNotEmpty(op.DefaultValue)) {
                var td = new Date();
                try {
                    dvstr = op.DefaultValue.toString().toLowerCase();
                    if (dvstr == "getdate()") {
                        dv = [td.getFullYear(), td.getMonth() + 1];
                    }
                    else if (dvstr.indexOf(",") > 0) {
                        var vs = dvstr.split(",");
                        if (vs.length == 2 && vs[1].length > 1 && vs[1] != "") {
                            var numstr = vs[1].substring(0, vs[1].length - 1);
                            var n = parseInt(numstr);
                            if (!isNaN(n)) {
                                if (vs[0] == "addyear(getdate()") {
                                    td = RS.Lib.addYear(td, n);
                                }
                                else if (vs[0] == "addmonth(getdate()") {
                                    td = RS.Lib.addMonth(td, n);
                                }
                                else if (vs[0] == "addday(getdate()") {
                                    td = RS.Lib.addDay(td, n);
                                }
                                dv = [td.getFullYear(), td.getMonth() + 1];
                            }
                        }
                    }
                    else if (dvstr.indexOf("+") > 0) {
                        var vs = dvstr.split(',');
                        if (vs.length == 2 && vs[0] == "getdate()") {
                            var numstr = vs[1];
                            var n = parseInt(numstr);

                            if (!isNaN(n)) {
                                td = RS.Lib.addDay(td, n);
                                dv = [td.getFullYear(), td.getMonth() + 1];
                            }
                        }
                    }
                    else if (dvstr.indexOf("-") > 0) {
                        var vs = dvstr.split(',');
                        if (vs.length == 2 && vs[0] == "getdate()") {
                            var numstr = vs[1];
                            var n = parseInt(numstr);

                            if (!isNaN(n)) {
                                td = RS.Lib.addDay(td, 0 - n);
                                dv = [td.getFullYear(), td.getMonth() + 1];
                            }
                        }
                    }
                }
                catch (e) { }
            }
            else
                dv = parseMonth(op.date.showMonth, op.DefaultValue);

            if (dv != null) {
                curSelYear = dv[0];
                curSelMonth = dv[1];
            }

            var plan;
            if (box.is("input") || box.is("select") || box.is("textarea")) {
                plan = $("<span></span>");
                plan.insertAfter(box);
                box.hide();
            }
            else {
                plan = $(this);
                box = null;
            }
            var yspan = $("<span></span>");
            plan.append(yspan);

            var mspan = $("<span></span>");

            var today = new Date();
            var year = parseInt(today.getFullYear());
            var month = today.getMonth() + 1;

            if (!op.AllowEmpty) {
                if (curSelYear == 0) curSelYear = year;
                if (curSelMonth == 0) curSelMonth = month;
            }
            else {
                if (curSelMonth == 0) curSelMonth = month;
            }

            var cbYear = $("<input type='text' />");
            var cbMonth = $("<input type='text' />");

            cbYear.width(70);
            yspan.append(cbYear);

            if (op.date.minYearSpan == null || op.date.minYearSpan == undefined)
                op.date.minYearSpan = -100;

            if (op.date.maxYearSpan == null || op.date.maxYearSpan == undefined)
                op.date.maxYearSpan = 3;



            var arrY = new Array();
            if (op.AllowEmpty)
                arrY.push({ value: 0, text: "" });


            for (var i = op.date.maxYearSpan; i >= op.date.minYearSpan; i--) {
                var y = year + i;
                arrY.push({ value: y, text: y + "年" });
            }
            cbYear.combobox({
                editable: false, data: arrY, valueField: 'value', value: curSelYear, textField: 'text', onSelect: function (rec) {
                    curSelYear = rec.value;
                    if (curSelYear == 0) {//未选择具体月份
                        mspan.hide();
                    }
                    else if (op.date.showMonth) {
                        if (curSelMonth == 0) curSelMonth = month;
                        mspan.show();
                    }

                    if (curSelYear == 0 && box != null)
                        box.val("");
                    else if (op.date.showMonth) {
                        curSelMonth = cbMonth.combobox("getValue");
                        if (box != null) {
                            if (curSelMonth < 10)
                                box.val(curSelYear + "-0" + curSelMonth);
                            else
                                box.val(curSelYear + "-" + curSelMonth);
                        }
                    }
                    else if (box != null)
                        box.val(curSelYear);

                    try {
                        if (rtnObj.onSelChange != null)
                            rtnObj.onSelChange(rtnObj.getValue(), rtnObj);
                    }
                    catch (e) { }

                    try {
                        if (rtnObj.onValueChange != null)
                            rtnObj.onValueChange(rtnObj.getValue(), rtnObj);
                    }
                    catch (e) { }
                }
            });

            cbYear.combobox("textbox").keydown(function (e) { boxkeydown(e, cbYear); });
            cbYear.combobox("textbox").mousedown(function (e) { boxmousedown(e, cbYear); });

            if (op.date.showMonth) {
                plan.append(mspan);

                cbMonth.width(60);

                var arrM = new Array();
                mspan.append(cbMonth);

                for (var i = 1; i <= 12; i++)
                    arrM.push({ value: i, text: i + "月" });

                cbMonth.combobox({
                    editable: false, data: arrM, valueField: 'value', value: curSelMonth, textField: 'text', onSelect: function (rec) {
                        curSelYear = cbYear.combobox("getValue");
                        curSelMonth = rec.value;
                        if (box != null) {
                            if (curSelYear == 0)
                                box.val("");
                            else if (curSelMonth < 10)
                                box.val(curSelYear + "-0" + curSelMonth);
                            else
                                box.val(curSelYear + "-" + curSelMonth);
                        }

                        try {
                            if (rtnObj.onSelChange != null)
                                rtnObj.onSelChange(rtnObj.getValue(), rtnObj);
                        }
                        catch (e) { }

                        try {
                            if (rtnObj.onValueChange != null)
                                rtnObj.onValueChange(rtnObj.getValue(), rtnObj);
                        }
                        catch (e) { }
                    }
                });

                cbMonth.combobox("textbox").keydown(function (e) { boxkeydown(e, cbMonth); });
                cbMonth.combobox("textbox").mousedown(function (e) { boxmousedown(e, cbMonth); });

                if (box != null) {
                    if (curSelYear == 0)
                        box.val("");
                    else if (curSelMonth < 10)
                        box.val(curSelYear + "-0" + curSelMonth);
                    else
                        box.val(curSelYear + "-" + curSelMonth);
                }
            }
            else {
                if (curSelYear <= 0)
                    currentValue = "";
                else
                    currentValue = curSelYear.toString();
            }

            if (curSelYear <= 0 || !op.date.showMonth)
                mspan.hide();


            function parseMonth(showM, v) {
                var rtn = null;
                if (RS.Lib.isNotEmpty(v)) {
                    var arr = v.split("-");
                    if (showM) {
                        if (arr.length > 1) {
                            var y = parseInt(arr[0]);
                            var m = parseInt(arr[1]);
                            if (!isNaN(y) && !isNaN(m)) {
                                if (y > 0 && m > 0 && m < 13) arr = [y, m];
                            }
                        }
                    }
                    else if (arr.length == 1) {
                        var y = parseInt(arr[0]);
                        if (!isNaN(y) && y > 0)
                            arr = [y, 0];
                    }
                }
                return arr;
            }
            var isshow = false;

            function boxkeydown(e, cb) {
                var keycode = e.keyCode;
                if (keycode == 13) //回车
                {
                    if (!isshow) //未显示
                    {
                        cb.combobox("showPanel");
                        isshow = true;
                    }
                    else {
                        cb.combobox("hidePanel");
                        isshow = false;
                    }
                }
                else if (!isshow)
                    RS.editor.keyDown(e);
            }

            function boxmousedown(e, cb) {
                if (!isshow) //未显示
                {
                    cb.combobox("showPanel");
                    isshow = true;
                }
                else {
                    cb.combobox("hidePanel");
                    isshow = false;
                }
            }

            initEditor(op, cbYear.combobox("textbox"), false);
            if (op.date.showMonth)
                initEditor(op, cbMonth.combobox("textbox"), false);

            rtnObj.isValid = function () {
                if (this.enabled && this.visible) {
                    if (curSelYear > 0) {
                        if (op.date.showMonth) {
                            if (curSelMonth > 0 && curSelMonth <= 12)
                                return true;
                            else
                                return false;
                        }
                        else
                            return true;
                    }
                    else if (op.AllowEmpty)
                        return true;
                    else
                        return false;
                }
                else
                    return true;
            };
            rtnObj.getValue = function () {

                if (curSelYear <= 0)
                    return "";
                else if (op.date.showMonth) {
                    if (curSelMonth < 10)
                        return curSelYear + "-0" + curSelMonth;
                    else
                        return curSelYear + "-" + curSelMonth;
                }
                else
                    return curSelYear.toString();
            };
            rtnObj.setValue = function (v) {
                var arr = parseMonth(op.date.showMonth, v);
                if (arr != null) {
                    curSelYear = arr[0];
                    var data = cbYear.combobox("getData");
                    if (curSelYear <= 0) {
                        if (op.AllowEmpty)
                            cbYear.combobox("setValue", 0);
                        else
                            cbYear.combobox("setValue", "");
                        mspan.hide();
                    }
                    else if (op.date.showMonth) {
                        var hasY = false;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].value == curSelYear) {
                                hasY = true;
                                break;
                            }
                        }
                        if (hasY)
                            cbYear.combobox("setValue", curSelYear);
                        else {
                            data.push({ value: curSelYear, text: curSelYear + "年" });
                            cbYear.combobox("loadData", data);
                            cbYear.combobox("setValue", curSelYear);
                        }

                        curSelMonth = arr[1];
                        data = cbMonth.combobox("getData");
                        if (curSelMonth > 0 && curSelMonth <= 12) {
                            cbMonth.combobox("setValue", curSelMonth);
                            mspan.show();
                        }
                        else {
                            curSelYear = 0;
                            curSelMonth = 0;
                            cbYear.combobox("setValue", 0);
                            mspan.hide();
                        }
                    }
                }
                else {
                    if (op.AllowEmpty)
                        cbYear.combobox("setValue", 0);
                    else
                        cbYear.combobox("setValue", "");
                    mspan.hide();
                }
            };
            rtnObj.getText = function () {
                return this.getValue();
            }
            rtnObj.getData = function () {
                return this.getValue();
            };
            rtnObj.getDatas = function () {
                return [this.getValue()];
            };
            rtnObj.getEditor = function () {
                return cbYear;
            };
            rtnObj.getInput = function () {
                return cbYear.combobox("textbox");
            };
            rtnObj.setEnabled = function (isEnabled) {
                this.enabled = isEnabled;
                if (isEnabled) {
                    cbYear.combobox("enable");
                    if (op.date.showMonth)
                        cbMonth.combobox("enable");

                    plan.removeAttr("disabled");
                }
                else {
                    cbYear.combobox("disable");
                    if (op.date.showMonth)
                        cbMonth.combobox("disable");
                    plan.attr("disabled", "disabled");
                }
            };
            rtnObj.setVisible = function (isVisible) {
                this.visible = isVisible;
                if (isVisible)
                    plan.show();
                else
                    plan.hide();
            };
        },

        LinkageCombo: function (op, rtnObj) {
            
            var div = $(this);
            var totalLevel = op.linkagecombo.LimitLevel;
            var curLevel = 1;//当前所处层次

            var currentParent = null; //当前选中项的上一层对象
            var com = $("<select></select>");//基本组件
            com.data("Level", curLevel);//设置该组件所在层次

            var isInit = false; //是否已初始化
            var initSetValue = null;
            div.append(com);
            var hasEmpty = op.AllowEmpty;
            var isshow = false;
            var rtn = {
                editor: com,
                parent: div,
                focus: function () { //得到焦点
                    var box = com.combobox("textbox");
                    box.focus();
                },
                getValue: function () { //获取当前选中项的值
                    var currentRec = getCurrentRec();
                    if (currentRec == null)
                        return "";
                    else if (currentRec == "")
                        return "";
                    else
                        return currentRec.id;
                },
                getText: function () { //获取当前选中项的值
                    var currentRec = getCurrentRec();
                    if (currentRec == null)
                        return "";
                    else if (currentRec == "")
                        return "";
                    else
                        return currentRec.text;
                },
                getItem: function () { //获取当前选中项
                    return getCurrentRec();
                },
                disable: function () { //设置当前编辑项不可用
                    var cb = com;
                    cb.combobox("disable");
                    var nx = cb.data("nextCom");
                    while (nx != null) {
                        nx.combobox("disable");
                        nx = nx.data("nextCom");
                    }
                },
                enable: function () { //设置当前编辑项可用
                    var cb = com;
                    cb.combobox("enable");
                    var nx = cb.data("nextCom");
                    while (nx != null) {
                        nx.combobox("enable");
                        nx = nx.data("nextCom");
                    }
                },
                setValue: function (v, isOutSet, callBack) { //设置当前组件的值
                    try{
                        if (RS.Lib.isEmpty(v))
                            v="";
                        else
                            v=v.toString();
                    }
                    catch(e){}

                    if (!isInit && isOutSet) {//如果还没有初始化完成或者外部设置
                        initSetValue = v;
                        return;
                    } else {
                        if (op.linkagecombo.IsLoadAllData) {
                            var data = com.combobox("getData"); //获取第一层数据,这里可能只有一层数据，也可能有全部数据
                            var arr = new Array();
                            getAllLevelItem(arr, v, data, null);
                            factSetValue(arr, v);
                            if (callBack != null) callBack();
                        }
                        else {
                            var data = com.combobox("getData"); //获取第一层数据,这里可能只有一层数据，也可能有全部数据
                            var arr = new Array();
                            syncGetAllLevelItem(arr, v, data, null,callBack);
                        }
                    }
                },
                onChange: null,
                onLoaded: function () {
                    if (initSetValue != null&&initSetValue!="") { //外部设置了值
                        rtn.setValue(initSetValue, false, execInitCallBack);
                        op.DefaultValue = initSetValue;
                    }
                    else if (RS.Lib.isNotEmpty(op.DefaultValue)) //设置了默认值
                    {
                        rtn.setValue(op.DefaultValue, false, execInitCallBack);
                    }
                }
            };

            ///执行初始化完成后要执行的方法，为保证只执行一次，执行完毕后，要将回调方法置空
            function execInitCallBack()
            {
                if (op.initCallback != null)
                {
                    try{
                        op.initCallback();
                    }
                    catch (e) { }
                    op.initCallback = null;
                }
            }

            function getCurrentRec()
            {
                var currentRec = getItemForCB(com);
                var csp = com.data("nxtEditPanel");
                var nxt =csp==null? null:csp.data("combobox");
                while(nxt!=null)
                {
                    var rec = getItemForCB(nxt);
                    if (rec != null && RS.Lib.isNotEmpty(rec.id))
                        currentRec = rec;

                    csp = nxt.data("nxtEditPanel");
                    nxt = csp == null ? null : csp.data("combobox");                    
                }
                return currentRec;
            }

            function getItemForCB(cb)
            {
                var data = cb.combobox("getData");
                if (data == null || data.length == 0) //未有对象
                    return null;
                else
                {
                    var v = cb.combobox("getValue");
                    for(var i=0;i<data.length;i++)
                    {
                        if (data[i].id==v)
                        {
                            return data[i];
                        }
                    }
                }
                return null;
            }



            function factSetValue(arr,v) {
                var cb = com;
                var curItem = null;
                for (var i = arr.length - 1; i >= 0; i--) {
                    var item = arr[i];
                    var currV = "";
                    if (item != "") {
                        currV = item.id;
                        setComboboxValue(cb, item.id);
                    }
                    else {
                        cb.combobox("setValue", "");
                    }
                    var pcb = cb;
                    cb = setValueFun(item, cb, true);//设置下一层
                    pcb.data("currV", currV);
                    if (item.id == v)
                        curItem = item;
                    if (cb == null) {
                        break;
                    }
                }
            }
            //设置当前项下一个联动编辑区
            var span = $("<span></span>");
            com.parent().append(span);
            com.data("nxtEditPanel", span);//下一编辑区

            //给指定组合框设置值
            function setComboboxValue(cb,v)
            {
                var isSeted = false;
                try{
                    //先检测有没有值
                    var data = cb.combobox("getData");
                    for(var i=0;i<data.length;i++)
                    {
                        var item = data[i];
                        if (item.id==v) //有值
                        {
                            cb.combobox("setValue", item.id);
                            isSeted = true;
                        }
                    }
                }
                catch(e){}
                if (!isSeted) //当前列表项没有该项
                {
                    cb.combobox("setValue", "");
                }
            }

            function getAllLevelItem(vList, v, data, p) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    item.parent = p;
                    if (item.id == v) {
                        vList.push(item);
                        return item;
                    }
                    else {
                        if (item == "" || item == null) continue;
                        if (item.children == null || item.children == undefined) continue;
                        if (item.children.length > 0) {
                            var nitem = getAllLevelItem(vList, v, item.children, item);
                            if (nitem != null) {
                                vList.push(item);
                                return nitem;
                            }
                        }
                    }
                }
                return null;
            }

            function syncGetAllLevelItem(vList, v, data, p,callBack) {
                var successFun = function (arr) {
                    if (arr != null && arr.length > 0) {
                        syncGetItemForSetValue(vList, v, data, arr, arr.length - 1, p, callBack);
                    }
                    else
                    {
                        if (callBack != null) callBack();
                    }
                };
                var errFun = function (errMsg) {
                    showNotice(errMsg);
                };
                RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx?GetValueType=GetLinkageLevelValue", {
                    ValueField: op.linkagecombo.ValueField,
                    TextField: op.linkagecombo.TextField,
                    IDField: op.linkagecombo.IDField,
                    ParentIDField: op.linkagecombo.ParentIDField,
                    OrderFields: op.linkagecombo.OrderFields,
                    CurFitler: op.linkagecombo.CurFitler,
                    TableName: op.linkagecombo.TableName,
                    IDFieldType: op.linkagecombo.IDFieldType,
                    Value: v
                }, successFun, errFun);
            }

            function syncGetItemForSetValue(vList, v, data, ids, idIndex, p, callBack) {
                if (idIndex < 0) {
                    //对vList进行排序，按区、市、省方式存储
                    var newArr = new Array();
                    for (var i = vList.length - 1; i >= 0; i--)
                    {
                        newArr.push(vList[i]);
                    }
                    factSetValue(newArr);
                    if (callBack != null) callBack();
                    return;
                }
                var isSetValue = false;

                var id = ids[idIndex];

                var method = function (vList,item,data,ids,idIndex,p,callBack) {
                    vList.push(item);//第一层
                    if (item.children != null && item.children.length > 0) {
                        syncGetItemForSetValue(vList, v, item.children, ids, idIndex - 1, item, callBack);
                    }
                    else {
                        var successFun = function (items) {
                            if (items != null && items.length > 0) {
                                item.children = items;
                                syncGetItemForSetValue(vList, v, item.children, ids, idIndex - 1, item, callBack);
                            }
                            else {
                                var newArr = new Array();
                                for (var i = vList.length - 1; i >= 0; i--) {
                                    newArr.push(vList[i]);
                                }

                                factSetValue(newArr);

                                if (callBack != null) callBack();
                            }
                        };
                        var errFun = function (errMsg) {
                            var newArr = new Array();
                            for (var i = vList.length - 1; i >= 0; i--) {
                                newArr.push(vList[i]);
                            }

                            factSetValue(newArr);
                            if (callBack != null) callBack();
                        };
                        if (RS.Lib.isEmpty(op.linkagecombo.ItemSourceUrl)) {
                            RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx?GetValueType=GetLinkageChildren", {
                                ValueField: op.linkagecombo.ValueField,
                                TextField: op.linkagecombo.TextField,
                                IDField: op.linkagecombo.IDField,
                                ParentIDField: op.linkagecombo.ParentIDField,
                                OrderFields: op.linkagecombo.OrderFields,
                                CurFitler: op.linkagecombo.CurFitler,
                                TableName: op.linkagecombo.TableName,
                                AllowEmptySel: op.linkagecombo.AllowEmptySel,
                                ListFields: getListFields(),
                                IDFieldType: op.linkagecombo.IDFieldType,
                                PID: item.id
                            }, successFun, errFun);
                        }
                        else {
                            RS.exec(RS.pageInfo.rootvpath + op.linkagecombo.ItemSourceUrl, {
                                type: 1,//取当前项的子级
                                id: item.id
                            }, successFun, errFun);
                        }
                    }
                }


                for (var index = 0; index < data.length; index++) {
                    var item = data[index];
                    item.parent = p;
                    if (item.id == id) {
                        isSetValue = true;
                        method(vList,item,data,ids,idIndex,p,callBack);
                        break;
                    }
                }
                if (!isSetValue) //只有第一个才这样
                {
                    if (data.length > 0)
                        method(vList,data[0],data,ids,-1,p,callBack);
                    else {
                        factSetValue(vList);
                        if (callBack != null) callBack();
                    }
                }
            }

            //移除本层组件后的各层组件
            function clearAllChild(pcb, csp) {
                try {
                    try {
                        csp.remove();
                    }
                    catch (e) { }
                    pcb.data("nxtEditPanel", null); //通知前一层，当前元素不再存在。
                }
                catch (e) { }
            }

            function copyOptions() {
                return {
                    width: json.width,
                    panelWidth: json.panelWidth,
                    valueField: json.valueField,
                    textField: json.textField,
                    editable: json.editable,
                    multiple: json.multiple,
                    onSelect: json.onSelect
                }
            }

            function boxkeydown(e, cb) {
                var keycode = e.keyCode;
                if (keycode == 13) //回车
                {
                    if (!isshow) //未显示
                    {
                        cb.combobox("showPanel");
                        isshow = true;
                    }
                    else {
                        cb.combobox("hidePanel");
                        isshow = false;
                    }
                }
                else if (!isshow)
                    RS.editor.keyDown(e);
            }

            function boxmousedown(e, cb) {
                if (!isshow) //未显示
                {
                    cb.combobox("showPanel");
                    isshow = true;
                }
                else {
                    cb.combobox("hidePanel");
                    isshow = false;
                }
            }

            function getLevel(cb) {
                var level = cb.data("Level");
                if (level == null || level == undefined)
                    return 1;
                level = parseInt(level);
                if (isNaN(level))
                    return 1;
                else
                    return level;
            }

            function setValueFun(record, sender, issv, setV) {
                //issv表示是否进行值设置
                //setV表示要设置的具体值

                try {
                    //进行联动设置
                    if (record == null || record.attributes == null)
                        selectData(null);
                    else
                        selectData(record.attributes);
                }
                catch (e) { }

                var cb = sender == null ? $(this) : sender;

                curLevel = getLevel(cb);//获取当前所在层次

                var currV = cb.data("currV");
                if (currV != null && currV == record.id) return null; //没实际改变值，不再设置下一层

                cb.data("currV", record.id);

                var njson = copyOptions();
                //先根据值设置当前组合框宽度
                var v = cb.combobox("getText");
                var ctrlWidth = v.length * 13 + 30;
                if (ctrlWidth < 60) ctrlWidth = 60;
                cb.combobox("resize", ctrlWidth);

                //获取下一编辑区
                var csp = cb.data("nxtEditPanel"); 

                if (totalLevel > 0 && curLevel >= totalLevel) {

                    if (csp != null)
                        clearAllChild(cb, csp);
                    return;
                }

                var nxt = null;
                try {
                    if (record != null && record.id != "") {
                        if (record.children.length > 0) { //当前层有数据，则直接加载
                            if (csp != null)
                                clearAllChild(cb, csp);

                            var csp = $("<span></span>");
                            nxt = $("<select />");
                            nxt.data("Level", curLevel + 1);
                            csp.data("combobox",nxt);
                            csp.append(nxt);
                            cb.parent().append(csp);
                            cb.data("nxtEditPanel", csp);


                            nxt.combobox(json);

                            try {
                                initEditor(op, nxt.combobox("textbox"), false);
                            }
                            catch (e) { }

                            nxt.combobox("textbox").keydown(function (e) { boxkeydown(e, nxt); });
                            nxt.combobox("textbox").mousedown(function (e) { boxmousedown(e, nxt); });

                            //这里根据情况下载本层列表数据
                            var newItems = new Array();

                            newItems.push({ id: "", text: "", children: [], parent: record, attributes: null });
                            $(record.children).each(function (i, item) {
                                item.parent = record;
                                newItems.push(item);
                            });
                            nxt.combobox("loadData", newItems);
                            nxt.data("currV", "");

                        }
                        else if (csp != null) {
                            clearAllChild(cb, csp);
                            csp = null;
                        }
                    }
                    else if (csp != null) {
                        clearAllChild(cb, csp);
                        csp = null;
                    }
                }
                catch (e) { }
                return nxt;
            }
            var json = {
                width: 50,
                panelWidth: 200,
                valueField: "id",
                textField: "text",
                mode: "local",
                editable: false,
                required: false,
                multiple: false,
                onSelect: function (item) {
                    var cb = $(this);
                    //为防止取到其下级联动组合框的值，这里先进行清空其所有子级联动
                    var csp = cb.data("nxtEditPanel");
                    if (csp != null) {
                        clearAllChild(cb, csp);
                        csp = null;
                    }

                    if (op.linkagecombo.IsLoadAllData)
                        setValueFun(item, cb, false, "");
                    else if (RS.Lib.isNotEmpty(item.id) && item.children.length == 0) {
                        var successFun = function (items) {
                            item.children = items;
                            setValueFun(item, cb, false, "");
                        };
                        var errFun = function (errMsg) {
                            setValueFun(item, cb, false, "");
                        };

                        if (RS.Lib.isEmpty(op.linkagecombo.ItemSourceUrl)) {
                            RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx?GetValueType=GetLinkageChildren", {
                                ValueField: op.linkagecombo.ValueField,
                                TextField: op.linkagecombo.TextField,
                                IDField: op.linkagecombo.IDField,
                                ParentIDField: op.linkagecombo.ParentIDField,
                                OrderFields: op.linkagecombo.OrderFields,
                                CurFitler: op.linkagecombo.CurFitler,
                                TableName: op.linkagecombo.TableName,
                                AllowEmptySel: op.linkagecombo.AllowEmptySel,
                                ListFields: getListFields(),
                                IDFieldType: op.linkagecombo.IDFieldType,
                                PID: item.id
                            },successFun,errFun);
                        }
                        else {
                            RS.exec(RS.pageInfo.rootvpath + op.linkagecombo.ItemSourceUrl, {
                                type: 1,//取当前项的子级
                                id: item.id
                            }, successFun, errFun);
                        }
                    }
                    else {
                        setValueFun(item, cb, false, "");
                    }

                    //进行联动设置
                    selectData(item.attributes);


                    try {
                        if (rtnObj.onSelChange != null)
                            rtnObj.onSelChange(item, rtnObj);
                    }
                    catch (e) { }

                    try {
                        if (rtnObj.onValueChange != null)
                            rtnObj.onValueChange(item, rtnObj);
                    }
                    catch (e) { }
                }
            };
            com.combobox(json);
            com.combobox("textbox").keydown(function (e) { boxkeydown(e, com); });
            com.combobox("textbox").mousedown(function (e) { boxmousedown(e, com); });

            initLoadData();

            function initLoadData() {
                var successFun=function (items) {
                    var newItems = new Array();
                    if (op.linkagecombo.IsSelEmpty) {
                        newItems.push({ id: "", text: "", children: [], parent: null, attributes: null });
                    }

                    $(items).each(function (i, item) {
                        newItems.push(item);
                    });
                    setParent(newItems, null);
                    com.combobox("loadData", newItems);

                    isInit = true;
                    try {
                        rtn.onLoaded();
                    }
                    catch (e) { }
                    
                    if (!hasEmpty && RS.Lib.isEmpty(op.DefaultValue)) { //不能为空，则没有内置值或外部设置值
                        try {
                            if (newItems.length > 0) {
                                rtn.setValue(newItems[0].id, false, execInitCallBack);                                
                            }
                            else
                                execInitCallBack();
                        }
                        catch (e) { }
                    }
                    else if (RS.Lib.isEmpty(op.DefaultValue))
                        execInitCallBack();
                    else
                        execInitCallBack();
                };
                var errFun = function (errMsg) {
                    showNotice(errMsg);
                    isInit = true;
                };

                if (RS.Lib.isEmpty(op.linkagecombo.ItemSourceUrl)) {
                    //获取初始默认数据
                    RS.exec(RS.pageInfo.rootvpath + RS.pageInfo.contentPath + "/RSJLibrary/LayoutForm/LayoutFrame.ashx?GetValueType=GetLinkageTreeData", {
                        ValueField: op.linkagecombo.ValueField,
                        TextField: op.linkagecombo.TextField,
                        IDField: op.linkagecombo.IDField,
                        ParentIDField: op.linkagecombo.ParentIDField,
                        OrderFields: op.linkagecombo.OrderFields,
                        CurFitler: op.linkagecombo.CurFitler,
                        TableName: op.linkagecombo.TableName,
                        AllowEmptySel: op.linkagecombo.AllowEmptySel,
                        ListFields: getListFields(),
                        IsLoadAllData: op.linkagecombo.IsLoadAllData,
                        IDFieldType: op.linkagecombo.IDFieldType
                    }, successFun, errFun);
                }
                else {
                    RS.exec(RS.pageInfo.rootvpath + op.linkagecombo.ItemSourceUrl, {
                        type: 0,//取当前项的子级
                        id: ""
                    }, successFun, errFun);
                }
            }

            function getListFields()
            {
                if (op.linkagecombo.LinkageItems == null) return "";
                var arr = [];

                $(op.linkagecombo.LinkageItems).each(function (i, item) {
                    if (RS.Lib.isNotEmpty(item.FieldName))
                        arr.push(item.FieldName);
                });
                return arr.join(",");
            }


            ///设置各对象的父级对象值
            function setParent(items, parent) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    item.parent = parent;
                    if (item.Children != null && item.Children.length > 0)
                        setParent(item.Children, item);
                }
            }

            //选中数据后联动设置
            function selectData(data) {
                    try {
                        //根据联动定义设置相应项
                        if (op.linkagecombo.LinkageItems != null && op.linkagecombo.LinkageItems != undefined && op.linkagecombo.LinkageItems.length>0) {
                            if (rtnObj.form != null && rtnObj.area != null) {
                                $(op.linkagecombo.LinkageItems).each(function (i, item) {
                                    var v = RS.Lib.getAttr(data, item.FieldName);
                                    if (v != null) {
                                        if (RS.Lib.isNotEmpty(item.AreaName))
                                            rtnObj.form.setItemValue(item.AreaName, item.LayoutItemName, v);
                                        else
                                            rtnObj.area.setItemValue(item.LayoutItemName, v);
                                    }
                                    else {
                                        if (RS.Lib.isNotEmpty(item.AreaName))
                                            rtnObj.form.setItemValue(item.AreaName, item.LayoutItemName, "");
                                        else
                                            rtnObj.area.setItemValue(item.LayoutItemName, "");
                                    }
                                });
                            }
                        }
                    }
                    catch (e) { }

            }

            function getDefaultValue(v) {
                if (RS.Lib.isEmpty(v)) {
                    if (op.TextType == 1 || op.TextType == 2 || op.TextType == 3 || op.TextType == 4) //数值
                        return "0";
                    else if (op.TextType == 12 || op.TextType == 15)
                        return "0001-01-01 00:00:00";
                    else if (op.TextType == 21)
                        return "false";
                    else if (op.TextType == 22)
                        return "00000000-0000-0000-0000-000000000000";
                    else
                        return "";
                }
                else
                    return v.toString();
            }



            rtnObj.isValid = function () {
                if (this.enabled && this.visible) {
                    if (!op.AllowEmpty) {
                        var v = rtn.getValue();
                        if (RS.Lib.isEmpty(v))
                            return false;
                        else
                            return true;
                    }
                    else
                        return true;
                }
                else
                    return true;
            };
            rtnObj.getValue = function () {
                var v = rtn.getValue();
               
                    if (RS.Lib.isEmpty(v)) {
                        if (op.TextType == 1 || op.TextType == 2 || op.TextType == 3 || op.TextType == 4)
                            v = 0;
                        else if (op.TextType == 21)
                            v = false;
                        else if (op.TextType == 22)
                            v = "00000000-0000-0000-0000-000000000000";
                    }
                    else {
                        if (op.TextType == 1 || op.TextType == 2) {
                            v = parseFloat(v);
                            if (isNaN(v)) v = 0;
                        }
                        else if (op.TextType == 3 || op.TextType == 4) {
                            v = parseInt(v);
                            if (isNaN(v)) v = 0;
                        }
                        else if (op.TextType == 21) {
                            if (v == "1" || v == 1 || v == true || v == "true" || v == "True" || v == "TRUE" || v == "是" || v == "真")
                                v = true;
                            else
                                v = false;
                        }
                    }

                return v;
            };
            rtnObj.setValue = function (v) {
                v = getDefaultValue(v);
                rtn.setValue(v,true);
            };
            rtnObj.getText = function () {
                return rtn.getText();
            }
            rtnObj.getData = function () {
                return rtn.getItem();
            };
            rtnObj.getDatas = function () {
                var obj = rtn.getItem();
                if (obj != null)
                    return [obj];
                else
                    return [];
            };
            rtnObj.getEditor = function () {
                return com;
            };
            rtnObj.getInput = function () {
                return com.combobox("textbox");
            };
            rtnObj.setEnabled = function (isEnabled) {
                this.enabled = isEnabled;
                if (isEnabled)
                    rtn.enable();
                else
                    rtn.disable();
            };
            rtnObj.setVisible = function (isVisible) {
                this.visible = isVisible;
                if (isVisible)
                    div.show();
                else
                    div.hide();
            };

        }
    })
})($);












