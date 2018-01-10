(function ($) {
    $.fn.extend({
        ajaxSearch: function (options) {
            var defaults = {
                initFun:null,
                normalItems: [],//普通查询
                pendingItems: [],//高级查询项
                shortcutItems: [],//快捷查询项
                sqlCallBack:null //执行查询时的回调方法
            };

            var items = $.extend(defaults, options);

            var normal = null;
            var isShortCutInit = true;//是否处理快捷检索初始化阶段，如果不是，则表示为联动重新加载数据阶段
            var advmal = new Array();
            var shortcutmal = new Array();

            var scItemsFoTemp = {};//临时，用于临时保存
            
            //以下为组件实体
            var divSearch = $(this);


            var allFilterItem = [];//获取当前所有检索项

            var rtnObj = {
                shortCutItems: function ()
                {
                    var items = new Array();
                    if (shortcutmal != null) {
                        for (var i = 0; i < shortcutmal.length; i++) {
                            var fitem = shortcutmal[i].filterItem();
                            items[fitem.FieldName] = { value1: fitem.Value1, value2: fitem.Value2 };
                        }
                    }
                    return items;
                },
                setValue1: function (name,value)
                {
                    if (shortcutmal != null) {
                        for (var i = 0; i < shortcutmal.length; i++) {
                            if (shortcutmal[i].name == name) {
                                var fitem = shortcutmal[i].filterItem();
                                fitem.setValue1(value);
                                break;
                            }
                        }
                    }
                },
                setValue2: function (name,value)
                {
                    if (shortcutmal != null) {
                        for (var i = 0; i < shortcutmal.length; i++) {
                            if (shortcutmal[i].name == name) {
                                var fitem = shortcutmal[i].filterItem();
                                fitem.setValue2(value);
                                break;
                            }
                        }
                    }
                },
                getFilterItems: function ()
                {
                    return allFilterItem;
                },
                getShortcutmal: function (name) {
                    if (shortcutmal != null) {
                        for (var i = 0; i < shortcutmal.length; i++) {
                            if (shortcutmal[i].name == name) {
                                return shortcutmal[i];
                                break;
                            }
                        }
                    }
                }
            };

            if ((items.normalItems==null || items.normalItems.length == 0) && (items.pendingItems!=null && items.pendingItems.length > 0)) {
                items.normalItems = items.pendingItems;
            }

            var isOnlyShort = (items.normalItems == null || items.normalItems.length == 0);//是否仅为快捷查询

            //快捷查询
            var shortItems = items.shortcutItems;

            if (shortItems != null && shortItems.length > 0) {
            
                var divShort = $("<div class=\"datagrid-toolbar\" style=\"padding:3px;border-bottom:0px solid #ccc; height:25px;\"></div>");
                divSearch.append(divShort);
                for (var i = 0; i < shortItems.length; i++) {
                    var sitem = shortItems[i];
                    var ctrl = appendShortcutItem(shortcutmal, divShort, sitem, allShortcutLoaded);
                    if (sitem.isBR)
                    {
                        divShort = $("<div class=\"datagrid-toolbar\" style=\"padding:3px;border-bottom:0px solid #ccc; height:25px;\"></div>");
                        divSearch.append(divShort);
                    }
                    scItemsFoTemp[sitem.FieldName]=ctrl;
                }
                scItemsFoTemp = null;
                if (isOnlyShort)
                {
                    var btnSql = $("<a href=\"javascript:;\">检索</a>");
                    btnSql.linkbutton({
                        iconCls: "icon-search", text: "检索"
                    });
                }
            }

            if (items.normalItems!=null && items.normalItems.length > 0) {

                isOnlyShort = false;
                var divColur = $("<div class=\"datagrid-toolbar\" style=\"padding:3px;border-bottom:0px solid #ccc; height:25px;\"></div>");
                divSearch.append(divColur);
                var span = $("<span></span>");
                divColur.append(span);

                var tb = $("<TABLE cellSpacing='0' cellPadding='0' border='0'></table>");
                var row = $("<tr></tr>");
                tb.append(row);
                span.append(tb);

                var col = $("<td></td>");
                row.append(col);

                //图标
                var img = $("<img src=\"" + RS.pageInfo.rootvpath +RS.pageInfo.contentPath+ "/RSJLibrary/AjaxSearch/images/imgSql.gif\" align=\"middle\"/>");
                col.append(img);
                //普通检索项
                
                normal=setSItem(row,false,items.normalItems);
                
                col = $("<td></td>");
                row.append(col);
                //检索按钮
                var btnSql = $("<a href=\"javascript:;\">检索</a>");

                btnSql.linkbutton({
                    iconCls: "icon-search", text: "检索"
                });
               
                col.append(btnSql);

                btnSql.click(function () {
                    var arr = new Array();
                    if (normal!=null)
                        arr.push(normal.filterItem());
                    if (shortcutmal != null) {
                        for (var i = 0; i < shortcutmal.length; i++) {
                            var fitem = shortcutmal[i];
                            arr.push(fitem.filterItem());
                        }
                    }
                    allFilterItem = arr;
                    if (items.sqlCallBack!=null)
                        items.sqlCallBack(arr);
                });

                if (items.pendingItems!=null && items.pendingItems.length > 0) {
                    //高级检索按钮
                    var btnAdv = $("<a href=\"javascript:;\"></a>");

                    btnAdv.linkbutton({ iconCls: "icon-search", text: "高级..." });                    

                    row.append($("<td>&nbsp;</td>"));
                    col = $("<td></td>");
                    row.append(col);

                    col.append(btnAdv);

                    //var btnAdv = $("<img src=\"" + RS.pageInfo.rootvpath + "RSJLibrary/AjaxSearch/images/search31.gif\" align=\"middle\"/>");
                    //span.append(imgAdv);

                    var frame = $("<iframe style=\"z-index:999;position:absolute;display:none;\" src=\"about:blank\" frameborder=\"0\" scrolling=\"No\"></iframe>");
                    var frameDiv = $("<div style=\"z-index:1000;left:0px;position:absolute;border-color:gray;border-width:2px;border-style:solid;display:none;\"></div>");

                    span.append(frame);
                    span.append(frameDiv);

                    frameDiv.resize(function () {
                        resizeAdvanceSearchIframe(frameDiv, frame);
                    });

                    frameDiv.width(450);

                    btnAdv.click(function () {
                        advanceSearch(frameDiv, frame, img, btnSql, btnAdv);
                    });

                    var AdvContent = $("<div style=\"width:100%;background-color:#cccccc;\"></div>")
                    frameDiv.append(AdvContent);
                    AdvContent.css("display", "black");
                    AdvContent.attr("align", "left");

                    var hv = $("<div></div>");
                    hv.height(30);
                    AdvContent.append(hv);

                    hv.css("lineheight", "30px");

                    var hvc1 = $("<span style='float:left;padding-top:8px;padding-left:8px'><b>高级查询</b></span>");
                    var hvc2 = $("<span style='float:right;padding-right:20px'></span>");
                    hv.append(hvc1);
                    hv.append(hvc2);
                      

                    var btnAdd = $("<a href=\"javascript:;\">添加</a>");// $("<img src=\"" + RS.pageInfo.rootvpath + "RSJLibrary/AjaxSearch/images/imgAdd.gif\" title=\"添加新查询项\" align=\"middle\"/>");
                    btnAdd.css("cursor", "default");
                    btnAdd.linkbutton({ iconCls: "icon-add",plain:true});

                    var btnAdvSql = $("<a href=\"javascript:;\">检索</a>");// $("<img src=\"" + RS.pageInfo.rootvpath + "RSJLibrary/AjaxSearch/images/imgSql.gif\" title='高级查询' align=\"middle\"/>");
                    btnAdvSql.css("cursor", "default");
                    btnAdvSql.linkbutton({ iconCls: "icon-search", plain: true });

                    btnAdvSql.click(function () {
                        frameDiv.css("display", "none");
                        frame.css("display", "none");
                        btnSql.linkbutton("enable");
                        btnAdv.linkbutton({ iconCls: "icon-search", text: "高级..." });

                        var arr = new Array();
                        if (shortcutmal != null) {
                            for (var i = 0; i < shortcutmal.length; i++) {
                                arr.push(shortcutmal[i].filterItem());
                            }
                        }
                        
                        if (advmal != null) {
                            for (var i = 0; i < advmal.length; i++)
                                arr.push(advmal[i].filterItem());
                        }

                        allFilterItem = arr;

                        if (items.sqlCallBack != null)
                            items.sqlCallBack(arr);
                    });

                    hvc2.append(btnAdd);
                    hvc2.append($("<span>&nbsp;&nbsp;&nbsp;</span>"));
                    hvc2.append(btnAdvSql);

                    btnAdd.click(function () {
                        var divitem = $("<div></div>");
                        AdvContent.append(divitem);
                        var item=appendSearchItem(divitem, true, $(this).data("pendingItems"));
                        advmal.push(item);
                        var btnDel = $("<img src=\"" + RS.pageInfo.rootvpath + RS.pageInfo.contentPath+"/RSJLibrary/AjaxSearch/images/delete.gif\" title=\"移除当前行\" align=\"middle\"/>");
                        btnDel.data("SearchItem", item);
                        divitem.append(btnDel);
                        btnDel.click(function () {                            
                            var citem = $(this).data("SearchItem");
                            if (citem != null)
                            {
                                var nv=new Array();
                                for (var i = 0; i < advmal.length; i++)
                                {
                                    if (advmal[i] != citem)
                                        nv.push(advmal[i]);
                                }
                                advmal = nv;
                            }
                            divitem.remove();
                        });

                        var col=$("<td></td>");
                        item.curRow.append(col);
                        col.append(btnDel);
                    });
                    btnAdd.data("pendingItems", items.pendingItems);
                    //AdvContent.append(getSearchItem(true, items.pendingItems));
                    advmal.push(appendSearchItem(AdvContent, true, items.pendingItems));
                }
            }


            
            //以上为组件实体

            //获取当前所有有效查询

            //所有快捷查询全部执行完毕后执行的方法
            function allShortcutLoaded(curItem)
            {
                var amount = 0;
                $(shortcutmal).each(function (i, item) {
                    if (item.isfinish)
                        amount++;
                });
                if (shortItems.length==amount)
                {
                    if (items.initFun != null)
                    {
                        var arr = new Array();
                        if (normal != null)
                            arr.push(normal.filterItem());
                        if (shortcutmal != null) {
                            for (var i = 0; i < shortcutmal.length; i++) {
                                //注意，这里要排除只用于联动功能的检索项
                                var sitem = shortcutmal[i];
                                if (sitem != null && sitem.item != null && sitem.item.IsOnlyForLinkage == true)
                                    continue;
                                arr.push(shortcutmal[i].filterItem());
                            }
                        }
                        //arr.push(curItem.filterItem());
                        allFilterItem = arr;
                        items.initFun(arr);                       
                    }
                    isShortCutInit = false;//已全部初始化完毕
                }
            }

            //以下为公共方法

            //设置高级查询时的弹出层的位置
            function advanceSearch(framediv, frame, firstObj, btnsql, imgadv) {
                if (framediv.css("display") == "none") {
                    framediv.css("display", "block");
                    frame.css("display", "block");
                    //btnsql.attr("disabled", "disabled")//将input元素设置为disabled
                    btnsql.linkbutton("disable");
                    setAdvanceSearchXY(framediv, frame, firstObj);
                    // imgadv.linkbutton("text", "隐藏"); 
                    btnAdv.linkbutton({ iconCls: "icon-search", text: "隐藏" });
                }
                else {
                    framediv.css("display", "none");
                    frame.css("display", "none");
                    btnsql.linkbutton("enable");
                    //btnsql.removeAttr("disabled"); //去除input元素的disabled属性
                    // imgadv.linkbutton("text","高级...");
                    btnAdv.linkbutton({ iconCls: "icon-search", text: "高级..." });
                }
            }
            //设置高级查询时的弹出层的位置
            function setAdvanceSearchXY(myDiv, myFrame, firstOb) {
                var x = firstOb.offset().left;
                var y = firstOb.offset().top + firstOb.height() + 5;

                myDiv.css("left", x + "px");
                myDiv.css("top", y + 'px');
                myFrame.css("left", myDiv.offset().left);
                myFrame.css("top", myDiv.offset().top);
                myFrame.width(myDiv.width());
                myFrame.height(myDiv.height());
            }
            //设置高级查询时的弹出层的位置
            function resizeAdvanceSearchIframe(div, frame) {
                frame.width(div.width());
                frame.height(div.height());
            }

            //设置检索项输入框位置
            function setComboBox(span, item, compareType) {
                span.empty();
                var editor1 = null, editor2 = null;
                var box1 = $("<input type='text'/>");
                var box2 = $("<input type='text'/>");
                var sp = $("<span>-</span>");
                sp.width(10);
                if (compareType == 12) {  //为在之间
                    span.append(box1);
                    box1.width(95);
                    span.append(sp);
                    span.append(box2);
                    box2.width(95);
                    
                    if (item.DataType == 1 || (item.DataType == 0 && item.DateCompareType != 0))  //日期
                    {
                        if (item.DateCompareType == 2) { //日期时间
                            editor1 = box1.layoutEditor({ AllowEmpty: true, datetime: { isDateTime: true, showSecond: true }, DefaultValue: item.Value1 });
                            editor2 = box2.layoutEditor({ AllowEmpty: true, datetime: { isDateTime: true, showSecond: true }, DefaultValue: item.Value2 });
                        }
                        else if (item.DateCompareType == 3) {//年月
                            editor1 = box1.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: true, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value1 });
                            editor2 = box2.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: true, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value2 });
                        }
                        else if (item.DateCompareType == 4) {//年
                            editor1 = box1.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: false, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value1 });
                            editor2 = box2.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: false, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value2 });
                        }
                        else {//日期
                            var v1 = "", v2 = "";
                            if (RS.Lib.isNotEmpty(item.Value1))
                                v1 = RS.Lib.parseVExp(item.Value1);

                            if (RS.Lib.isNotEmpty(item.Value2))
                                v2 = RS.Lib.parseVExp(item.Value2);

                            editor1 = box1.layoutEditor({ AllowEmpty: true, DefaultValue: v1, date: { isDate: true, showDay: true, showMonth: true, minYearSpan: -100, maxYearSpan: 3 } });
                            editor2 = box2.layoutEditor({ AllowEmpty: true, DefaultValue: v2, date: { isDate: true, showDay: true, showMonth: true, minYearSpan: -100, maxYearSpan: 3 } });
                            editor1.setValue(v1);
                            editor2.setValue(v2);
                        }
                    }
                    else if (item.DataType == 2) { //数值
                        editor1 = box1.layoutEditor({ AllowEmpty: true, number: { isNumber: true } });
                        editor2 = box2.layoutEditor({ AllowEmpty: true, number: { isNumber: true } });
                    }
                    else if (item.DataType == 3) {
                        editor1 = box1.layoutEditor({ AllowEmpty: true, spinner: { isSpinner: false, canLessZero: true } });
                        editor2 = box2.layoutEditor({ AllowEmpty: true, spinner: { isSpinner: false, canLessZero: true } });
                    }
                }
                else {
                    span.append(box1);
                    box1.width(200);
                    if (item.DataType == 1 || (item.DataType == 0 && item.DateCompareType != 0))  //日期
                    {
                        if (item.DateCompareType == 2) { //日期时间
                            editor1 = box1.layoutEditor({ AllowEmpty: true, datetime: { isDateTime: true, showSecond: true }, DefaultValue: item.Value1 });
                        }
                        else if (item.DateCompareType == 3) {//年月
                            editor1 = box1.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: true, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value1 });
                        }
                        else if (item.DateCompareType == 4) {//年
                            editor1 = box1.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: false, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value1 });
                        }
                        else {//日期
                            var v1 = "", v2 = "";
                            if (RS.Lib.isNotEmpty(item.Value1))
                                v1 = RS.Lib.parseVExp(item.Value1);

                            editor1 = box1.layoutEditor({ AllowEmpty: true, DefaultValue: v1, date: { isDate: true, showDay: true, showMonth: true, minYearSpan: -100, maxYearSpan: 3 } });
                            editor1.setValue(v1);
                        }
                    }
                    if (item.DataSource != null && item.DataSource.items != null&&item.DataSource.items.length > 0) {
                            var w = item.Width > 10 ? item.Width : 80;
                            var pw = item.PanelWidth > 30 ? item.PanelWidth : 120;
                            
                            var vjson = {
                                AllowEmpty: true,
                                DefaultValue: "",
                                combo: {
                                    IsCombo: true,
                                    Data: item.DataSource.items,
                                    Url: "",
                                    ValueField: "Value",
                                    TextField: "Text",
                                    Editable: false,
                                    MutilValues: false
                                }//专指下拉框
                            };
                            editor1 = box1.layoutEditor(vjson);
                    }
                    else if (item.SourceDefine != null) {
                        var w = item.Width > 10 ? item.Width : 80;
                        var pw = item.PanelWidth > 30 ? item.PanelWidth : 120;
                        editor1 = box1.layoutEditor(item.SourceDefine);
                    }
                    else if (item.DataType == 2) { //数值
                        editor1 = box1.layoutEditor({ AllowEmpty: true, number: { isNumber: true } });
                    }
                    else if (item.DataType == 3) {
                        editor1 = box1.layoutEditor({ AllowEmpty: true, spinner: { isSpinner: false, canLessZero: true } });
                    }
                    else
                        editor1 = box1.layoutEditor({ AllowEmpty: true, input: { isInput: true } });
                }
                return {
                    value1: function () {
                        if (editor1 != null)
                            return editor1.getValue();
                        else
                            return "";
                    },
                    value2: function () {
                        if (editor2 != null)
                            return editor2.getValue();
                        else
                            return "";
                    },
                    setValue1: function (v)
                    {
                        if (editor1 != null) editor1.setValue(v);
                    },
                    setValue2: function (v)
                    {
                        if (editor2 != null) editor2.setValue(v);
                    }
                };
            }
            
            function getCbCompare(item,isInit) {
                var items = new Array();
                var defaultV = 0;
                switch (item.DataType) {
                    case 7:
                    case 0: //字符    
                        if ((item.DataSource != null && item.DataSource.items != null) || (item.SourceDefine != null)) {
                            items.push({ value: 0, text: '等于' });
                            items.push({ value: 1, text: '不等于' });
                            items.push({ value: 14, text: '为空值' });
                            items.push({ value: 15, text: '不为空值' });

                            defaultV = 0;
                        }
                        else {
                            items.push({ value: 2, text: '包含' });
                            items.push({ value: 3, text: '左包含' });
                            items.push({ value: 4, text: '右包含' });
                            items.push({ value: 5, text: '不包含' });
                            items.push({ value: 6, text: '左不包含' });
                            items.push({ value: 7, text: '右不包含' });
                            items.push({ value: 0, text: '等于' });
                            items.push({ value: 1, text: '不等于' });
                            items.push({ value: 14, text: '为空值' });
                            items.push({ value: 15, text: '不为空值' });
                            defaultV = 2;
                        }
                        break;
                    case 8:
                    case 4: //Guid
                        items.push({ value: 0, text: '等于' });
                        items.push({ value: 1, text: '不等于' });
                        items.push({ value: 14, text: '为空值' });
                        items.push({ value: 15, text: '不为空值' });
                        defaultV = 0;
                        break;
                    case 5:
                        items.push({ value: 0, text: '等于' });
                        items.push({ value: 1, text: '不等于' });
                        defaultV = 0;
                        break;
                    case 2:
                    case 3:
                    case 1: //为数字
                        if ((item.DataSource != null && item.DataSource.items != null) || (item.SourceDefine != null)) {
                            items.push({ value: 0, text: '等于' });
                            items.push({ value: 1, text: '不等于' });
                            items.push({ value: 14, text: '为空值' });
                            items.push({ value: 15, text: '不为空值' });
                            defaultV = 0;
                        }
                        else {
                            items.push({ value: 12, text: '在之间' });
                            items.push({ value: 0, text: '等于' });
                            items.push({ value: 1, text: '不等于' });
                            items.push({ value: 10, text: '大于' });
                            items.push({ value: 11, text: '小于' });
                            items.push({ value: 8, text: '大于等于' });
                            items.push({ value: 9, text: '小于等于' });
                            items.push({ value: 14, text: '为空值' });
                            items.push({ value: 15, text: '不为空值' });
                            defaultV = 12;
                        }
                        break;
                    default:
                        items.push({ value: 0, text: '等于' });
                        items.push({ value: 1, text: '不等于' });
                        defaultV = 0;
                        break;
                }
                
                var hasV = false;
                if (!isInit) {
                    for (var i = 0; i < items.length; i++) {
                        if (item.CompareType == items[i].value) {
                            hasV = true;
                            break;
                        }
                    }
                }
                if (!hasV)
                    item.CompareType = defaultV;
                return items;
            }

            function getCbSqlPrefix() {
                var items = new Array();
                items.push({ value:0, text: '且' });
                items.push({ value:1, text: '或' });
                items.push({ value:2, text: '且(' });
                items.push({ value:3, text: '或(' });
                items.push({ value:4, text: ')且 ' });
                items.push({ value:5, text: ')或 ' });
                items.push({ value:6, text: ')' });
                return items;
            }
            //快捷检索
            function shortcutSQL()
            {
                if (!isOnlyShort) return;
                var arr = new Array();
                if (normal!=null)
                    arr.push(normal.filterItem());
                if (shortcutmal != null) {
                    for (var i = 0; i < shortcutmal.length; i++) {
                        //注意，这里要排除只用于联动功能的检索项
                        var sitem=shortcutmal[i];
                        if (sitem!=null && sitem.item != null && sitem.item.IsOnlyForLinkage == true)
                            continue;
                        arr.push(shortcutmal[i].filterItem());
                    }
                }
                allFilterItem = arr;
                if (items.sqlCallBack!=null)
                    items.sqlCallBack(arr);
            }

            function appendShortcutItem(arr,owner, item,finishCallBack) {
                var editor1 = null, editor2 = null;
                var curItem = item;
                var getValueFun = null;
                var myrtn = {
                    onSelChange: null,//当值改变时激活的事件
                    linkageItems:[],//需要联动执行的方法
                    item:curItem,
                    isfinish: false,//是否已初始化
                    name: curItem.FieldName,
                    nxtEditor: null,
                    getEditor: function () { return editor1;},
                    getLinkageValue: function () {
                        var v1 = null;
                        if (getValueFun != null) {
                            var vobj = getValueFun();
                            v1 = RS.Lib.getAttr(vobj, "value1");
                        }
                        else {
                            if (editor1 != null) {
                                v1 = editor1.getValue();
                            }
                            else
                                v1 = null;
                        }
                        return v1;
                    },
                   
                    filterItem: function () {
                        var v1 = null;
                        var v2 = null;
                        if (getValueFun != null) {
                            var vobj = getValueFun();
                            v1 = RS.Lib.getAttr(vobj, "value1");
                            v2 = RS.Lib.getAttr(vobj, "value2");
                        }
                        else {
                            if (editor1 != null) {
                                if (curItem.ValueIsFromText)
                                    v1 = editor1.getText();
                                else
                                    v1 = editor1.getValue();
                            }

                            if (editor2 != null) {
                                if (curItem.ValueIsFromText)
                                    v2 = editor2.getText();
                                else
                                    v2 = editor2.getValue();
                            }
                        }

                        return {
                            SqlPrefix:this.item.SqlPrefix,
                            FieldName: this.item.FieldName,
                            DataType: this.item.DataType,
                            DateCompareType: this.item.DateCompareType,
                            CompareType: this.item.CompareType,
                            Value1:v1 ,
                            Value2:v2 ,
                            DateFormat: this.item.DateFormat,
                            setValue1: function (v)
                            {
                                if (editor1 != null)
                                    editor1.setValue(v);
                            },
                            setValue2: function (v) {
                                if (editor2 != null)
                                    editor2.setValue(v);
                            }
                        }
                    }
                };

                if (RS.Lib.isNotEmpty(item.CustomPanelID) && RS.ib.isNotEmpty(item.CustomGetValueFun))
                {
                    var obj = $(item.CustomPanelID);
                    if (obj.length > 0) //确认有对象
                    {
                        var fun = RS.Lib.parseFun(item.CustomGetValueFun);
                        if (fun != null)
                        {
                            getValueFun = fun;
                            //先从原来位置上移除
                            obj.remove();
                            //再重新加入到本区域
                            owner.append(span);

                            myrtn.isfinish = true;

                            arr.push(myrtn);
                            if (finishCallBack != null) finishCallBack(myrtn);

                            return;
                        }
                    }
                }
                if (item.DataType == 1 || (item.DataType == 0 && item.DateCompareType != 0)||(item.DateCompareType==4)) { //日期
                    curItem.CompareType = 12;//自动变为在之间
                    var span = $("<span></span>");
                    owner.append(span);
                    if (RS.Lib.isNotEmpty(item.Title)) span.text(item.Title + "：");
                    var box1 = $("<input type='text'/>");
                    var box2 = $("<input type='text'/>");
                    var sp = $("<span>-</span>");
                    span.append(box1);
                    box1.width(95);
                    span.append(sp);
                    span.append(box2);
                    box2.width(95);

                    if (item.DateCompareType == 2) { //日期时间
                        editor1 = box1.layoutEditor({ AllowEmpty: true, datetime: { isDateTime: true, showSecond: true },DefaultValue:item.Value1 });
                        editor2 = box2.layoutEditor({ AllowEmpty: true, datetime: { isDateTime: true, showSecond: true }, DefaultValue: item.Value2 });
                    }
                    else if (item.DateCompareType == 3) {//年月
                        editor1 = box1.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: true, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value1 });
                        editor2 = box2.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: true, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value2 });
                    }
                    else if (item.DateCompareType == 4) {//年
                        editor1 = box1.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: false, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value1 });
                        editor2 = box2.layoutEditor({ AllowEmpty: true, date: { isDate: true, showDay: false, showMonth: false, minYearSpan: item.minYearSpan, maxYearSpan: item.maxYearSpan }, DefaultValue: item.Value2 });
                    }
                    else {//日期
                        var v1 = "", v2 = "";
                        if (RS.Lib.isNotEmpty(item.Value1))
                            v1 = RS.Lib.parseVExp(item.Value1);

                        if (RS.Lib.isNotEmpty(item.Value2))
                            v2 = RS.Lib.parseVExp(item.Value2);

                        editor1 = box1.layoutEditor({ AllowEmpty: true, DefaultValue:v1, date: { isDate: true ,showDay:true,showMonth:true,minYearSpan:-100,maxYearSpan:3 } });
                        editor2 = box2.layoutEditor({ AllowEmpty: true, DefaultValue:v2, date: { isDate: true, showDay: true, showMonth: true, minYearSpan: -100, maxYearSpan: 3 } });
                        editor1.setValue(v1);
                        editor2.setValue(v2);
                    }
                    editor1.onSelChange = function (data) {
                        shortcutSQL();
                    };
                    editor2.onSelChange = function (data) {
                        shortcutSQL();
                    }
                    myrtn.isfinish = true;

                    arr.push(myrtn);
                    if (finishCallBack!=null) finishCallBack(myrtn);
                }
                else {                    
                    if (item.DataSource != null && item.DataSource.items != null) {
                        if (item.DataSource.items.length > 0) {//已设置下拉列表
                            var span = $("<span></span>");
                            owner.append(span);
                            if (RS.Lib.isNotEmpty(item.Title)) span.text(item.Title + "：");

                            var box = $("<input type='text'/>");
                            var w = item.Width > 10 ? item.Width : 80;
                            if (item.Width > 10)
                                box.width(item.Width);


                            var pw = item.PanelWidth > 30 ? item.PanelWidth : 120;
                            span.append(box);

                            var vjson = {
                                AllowEmpty: true,
                                DefaultValue: "",
                                combo: {
                                    IsCombo: true,
                                    Data: item.DataSource.items,
                                    Url: "",
                                    ValueField: "Value",
                                    TextField: "Text",
                                    Editable: false,
                                    MutilValues: false
                                }//专指下拉框
                            };

                            editor1 = box.layoutEditor(vjson);
                            editor1.onSelChange = function (data) {
                                if (curItem.IsOnlyForLinkage != true) {
                                    shortcutSQL();
                                }

                                if (myrtn.onSelChange != null) {
                                    try {
                                        myrtn.onSelChange(null, myrtn.nxtEditor, myrtn.linkageItems);
                                    }
                                    catch (e) { }
                                }
                            }
                            span.append("&nbsp;&nbsp;");                            
                            curItem.CompareType = 0;
                        }
                        myrtn.isfinish = true;
                        arr.push(myrtn);
                        if (finishCallBack != null) finishCallBack(myrtn);
                    }
                    else if (item.SourceDefine != null) {
                        var span = $("<span></span>");
                        owner.append(span);
                        if (RS.Lib.isNotEmpty(item.Title)) span.text(item.Title + "：");
                        var box;
                        if (item.SourceDefine.linkagecombo != null && item.SourceDefine.linkagecombo.IsLinkageCombo)
                            box = $("<span></span>");
                        else
                            box = $("<input type='text'/>");

                        var w = item.Width > 10 ? item.Width : 80;
                        box.width(w);
                        var pw = item.PanelWidth > 30 ? item.PanelWidth : 120;
                        span.append(box);                        

                        if (item.SourceDefine.linkagecombo != null && item.SourceDefine.linkagecombo.IsLinkageCombo)
                            item.SourceDefine.linkagecombo.IsSelEmpty = item.SourceDefine.AllowEmpty;

                        //设置联动
                        if (RS.Lib.isNotEmpty(item.LinkageItemName) && RS.Lib.isNotEmpty(item.LinkageFilterField)) {
                            var sfilter = scItemsFoTemp == null ? null : scItemsFoTemp[item.LinkageItemName]; //找其前缀联动字段
                            sfilter.nxtEditor = editor1;
                            var curfilter = myrtn;
                            var nxtitem = item;
                            while (sfilter != null && sfilter != undefined) {
                                if (nxtitem.SourceDefine.combo != null && nxtitem.SourceDefine.combo.IsCombo) {
                                    if (nxtitem.SourceDefine.combo.GetLinkageValueFun != null) {
                                        var cfun = sfilter.getLinkageValue;
                                        nxtitem.SourceDefine.combo.GetLinkageValueFun = cfun;
                                    }

                                    sfilter.onSelChange = function (callBack, curEditor,linkageArr) //设置其上层改变时激活的项
                                    {
                                        //进行联动加载
                                        if (curEditor != null && curEditor.reload != null) {
                                            curEditor.setValue("");//将值置空
                                            curEditor.reload(callBack);
                                        }

                                        if (linkageArr!=null&&linkageArr.length>0)
                                        {
                                            $(linkageArr).each(function (i, filter) {
                                                var cb = filter.getEditor();
                                                if (cb != null) {
                                                    cb.setValue("");
                                                    cb.reload();
                                                }
                                            });
                                        }
                                    }


                                    //再设置其上上层
                                    nxtitem = sfilter.item;
                                    var pfilter = sfilter;
                                    if (nxtitem != null) {
                                        if (RS.Lib.isNotEmpty(nxtitem.LinkageItemName) && RS.Lib.isNotEmpty(nxtitem.LinkageFilterField))
                                            sfilter = scItemsFoTemp == null ? null : scItemsFoTemp[nxtitem.LinkageItemName]; //找其前缀联动字段
                                        else
                                            sfilter = null;
                                    }
                                    else
                                        sfilter = null;
                                    if (sfilter != null)
                                    {
                                        sfilter.linkageItems.push(curfilter);
                                        curfilter = pfilter;
                                    }
                                }
                            }
                        }

                        arr.push(myrtn);
                        curItem.SourceDefine.initCallback = function () {
                            if (isShortCutInit) {
                                myrtn.isfinish = true;
                                if (finishCallBack != null) finishCallBack(myrtn);
                                if (myrtn.onSelChange != null) {
                                    myrtn.onSelChange(null,myrtn.nxtEditor,myrtn.linkageItems);
                                }
                            }
                            else {
                                shortcutSQL();
                            }
                        };  //初始加载完毕后执行的方法，主要用于combobox和popupedit

                        editor1 = box.layoutEditor(curItem.SourceDefine);

                        editor1.onSelChange = function (data) {
                            if (curItem.IsOnlyForLinkage != true) {
                                shortcutSQL();
                            }

                            if (myrtn.onSelChange != null) {
                                try {
                                    myrtn.onSelChange(null, myrtn.nxtEditor, myrtn.linkageItems);
                                }
                                catch (e) { }
                            }
                        }

                        if (RS.Lib.isNotEmpty(item.LinkageItemName) && RS.Lib.isNotEmpty(item.LinkageFilterField)) {
                            var sfilter = scItemsFoTemp == null ? null : scItemsFoTemp[item.LinkageItemName]; //找其前缀联动字段
                            sfilter.nxtEditor = editor1;
                        }
                        curItem.CompareType = 0;
                        span.append("&nbsp;&nbsp;");
                    }
                    else {
                        myrtn.isfinish = true;

                        arr.push(myrtn);
                        if (finishCallBack != null) finishCallBack(myrtn);
                    }
                }
                return myrtn;
            }

            function appendSearchItem(div, isAdv, items)
            {
                var item = $("<div></div>");
                div.append(item);

                var tb = $("<TABLE cellSpacing='0' cellPadding='0' border='0'></table>");
                item.append(tb);

                var row = $("<tr></tr>");
                tb.append(row);
                return setSItem(row, isAdv, items);
            }

            function setSItem(row, isAdv, items) {
                var divItem ;
                var fitem=items[0];
                var curSearchItem = {
                    SqlPrefix : fitem.SqlPrefix,
                    FieldName : fitem.FieldName,
                    Title: fitem.Title,
                    DataType: fitem.DataType,
                    DateFormat:fitem.DateFormat,
                    DateCompareType : fitem.DateCompareType,
                    CompareType : fitem.CompareType,
                    Width : fitem.Width,
                    PanelWidth : fitem.PanelWidth,
                    DataSource: fitem.DataSource,
                    SourceDefine :fitem.SourceDefine,
                    isBR : fitem.isBR,
                    Value1:fitem.Value1,
                    Value2:fitem.Value2
                };

                var tdBox = $("<td></td>");
                
                var boxUtil = null;

                var cbprefix = $("<select></select>");
                cbprefix.width(50);
                if (isAdv) {
                    divItem = $("<td></td>");
                    row.append(divItem);

                    divItem.append(cbprefix);

                    cbprefix.combobox({
                        editable: false, required: false,data:getCbSqlPrefix(),valueField:"value",textField:"text", onSelect: function (record) {
                            var v = record.value;
                            curSearchItem.SqlPrefix = v;
                        }
                    });
                }

                //字段
                var cbField = $("<select></select>");
               // cbField.height(21);
                cbField.width(70);
                divItem = $("<td></td>");
                row.append(divItem);

                divItem.append(cbField);
                cbField.combobox({
                    editable: false, required: false, panelWidth: 120, data: items, valueField: "FieldName", textField: "Title", onSelect: function (record) {
                        curSearchItem.DataType = record.DataType;
                        curSearchItem.DateCompareType = record.DateCompareType;
                        curSearchItem.Title = record.Title;
                        curSearchItem.FieldName = record.FieldName;
                        curSearchItem.Width = record.width;
                        curSearchItem.PanelWidth = record.PanelWidth;
                        curSearchItem.DateFormat=record.DateFormat,
                        curSearchItem.DataSource = record.DataSource;
                        curSearchItem.SourceDefine = record.SourceDefine;
                        curSearchItem.DateFormat = record.DateFormat;
                        curSearchItem.isBR = true;
                        curSearchItem.Value1 = record.Value1;
                        curSearchItem.Value2 = record.Value2;

                        cbCType.combobox("loadData", getCbCompare(curSearchItem,false));
                        cbCType.combobox("setValue", curSearchItem.CompareType);

                        boxUtil = setComboBox(tdBox, curSearchItem,curSearchItem.CompareType);
                    },value:curSearchItem.FieldName
                });

                //比较类型
                var cbCType = $("<select></select>");
               // cbCType.height(21);
                cbCType.width(80);
                
                divItem = $("<td></td>");
                row.append(divItem);

                divItem.append(cbCType);
                cbCType.combobox({
                    editable: false, required: false, data: getCbCompare(curSearchItem,true), valueField: 'value', textField: 'text', onSelect:
                    function (record) {
                        var oldV=curSearchItem.CompareType;
                        var newV=record.value;
                        if ((oldV == 12 && newV != 12) || (oldV != 12 && newV == 12)) {
                            boxUtil = setComboBox(tdBox, curSearchItem, record.value);
                        }
                        curSearchItem.CompareType = record.value;
                    }, value: curSearchItem.CompareType
                });

                row.append(tdBox);
                tdBox.width(205);
                boxUtil = setComboBox(tdBox,curSearchItem);
                var csp = isAdv ? cbprefix : null;

                var rtn = {
                    curRow: row,
                    filterItem: function () {
                        return {
                            SqlPrefix:curSearchItem.SqlPrefix,
                            FieldName: curSearchItem.FieldName,
                            DataType: curSearchItem.DataType,
                            DateCompareType: curSearchItem.DateCompareType,
                            CompareType: curSearchItem.CompareType,
                            DateFormat: curSearchItem.DateFormat,
                            Value1:boxUtil.value1(),
                            Value2: boxUtil.value2(),
                            setValue1: function (v) { boxUtil.setValue1(v); },
                            setValue2: function (v) { boxUtil.setValue2(v); }
                        };
                    }
                };
                return rtn;
            }

            //以上为公共方法
            function setBox(box1,dataSource)
            {
                var define = {
                    AllowEmpty: false,
                    combo: {
                        IsCombo: true,
                        Data: dataSource.items,
                        ValueField: "Value",
                        TextField: "Text",
                        Editable: false
                    }
                }
                return box1.layoutEditor(define);
            }
            return rtnObj;
        },

        filterPanel: function (options,grid) {            
        var panel = $(this);

        var defaults = { gridFilter: null, SearchFun: null };

        var op = $.extend(defaults, options);

        op.SearchFun = RS.Lib.parseFun(op.SearchFun);

        var allGrid = [];//当前所有使用本检索项的Grid或其它组件，这些组件必须要有两个方法:execFilter,initFilter
        if (grid != null && grid != undefined)
            allGrid.push(grid);

        var filterJson = {
            initFun:null,
            normalItems: op.gridFilter.normalItems,//普通查询
            pendingItems: op.gridFilter.pendingItems,//高级查询项
            shortcutItems: op.gridFilter.shortcutItems,//快捷查询项
            sqlCallBack: function (items) {//这里是点击检索后重新加载，所以要清空之前选中数据

                try {
                    if (op.SearchFun != null)
                    {
                        op.SearchFun(items);
                    }
                }
                catch (e) { }


                $(allGrid).each(function (i, grid) {
                    try {
                        if (grid.execFilter != null && grid.execFilter != undefined)
                            grid.execFilter(items);
                    }
                    catch(e){}
                });
            }
        };

        if (op.gridFilter != null && op.gridFilter != undefined) {
            if (op.gridFilter.shortcutItems != null && op.gridFilter.shortcutItems != undefined) {
                $(allGrid).each(function (i, grid) {
                    try {
                        if (grid.initFilter != null && grid.initFilter != undefined)
                            grid.initFilter(filterJson);
                    }
                    catch (e) { }
                });
            }
        }

        var filter = panel.ajaxSearch(filterJson);

        var rtn = {
            shortCutItems: function () {
                if (filter != null)
                    return filter.shortCutItems();
                else
                    return {};
            },
            getShortcutmal:function(name){
                return filter.getShortcutmal(name);
            },
            getFilterValue1: function (name) {
                var para = RS.Lib.getAttr(this.shortCutItems(), name);
                return RS.Lib.getAttr(para, "value1");
            },
            getFilterValue2: function (name) {
                var para = RS.Lib.getAttr(this.shortCutItems(), name);
                return RS.Lib.getAttr(para, "value2");
            },
            setFilterValue1:function(name,value)
            {
                filter.setValue1(name,value);
            },
            setFilterValue2:function(name,value)
            {
                filter.setValue2(name,value);
            },
            getFilterItems:function()
            {
                return filter.getFilterItems();
            },
            afterFilter: null,
            regGrid: function (grid)
            {
                allGrid.push(grid);
            }
        };
        return rtn;
    }
    });
})(jQuery);