var layoutGridAreaID = 0;//用于标识当前Grid之唯一标识
(function ($) {
    $.fn.extend({
        layoutArea: function (options, form) {
            var editors = new Array();//用于存储各编辑项            
            var items = new Array();
            var defaults = {
                id: '',
                areaName: '',
                layoutType: 0,
                items: null,
                childArea: [],
                showMode: 0,
                data: {}
            };

            var op = $.extend(defaults, options);

            var rtnObj = {
                areaName: op.areaName,
                getItems: function () {
                    return editors;
                },
                getItemValue: function (itemName) {
                    var v = "";
                    var obj = this.getEditor(itemName);
                    if (obj != null) {
                        v = obj.getValue();
                        if (v == undefined || v == null) v = "";
                        return v;
                    }
                    else
                        return "";
                },
                getAreaData: function () {
                    var datas = {};
                    for (var key in editors) {
                        var editor = editors[key];
                        if (editor == null || editor == undefined)
                            datas[key] = "";
                        else
                            datas[key] = editors[key].getValue();
                    }
                    return datas;
                },
                getEditor: function (itemName) {
                    var editor = editors[itemName];
                    if (editor == null || editor == undefined)
                        return null;
                    else
                        return editor;
                },
                getData: function () {
                    return this.getAreaData();
                },
                setData: function (data) {
                    $(items).each(function (i, item) {
                        //首先判断该项是否在该对象中存在
                        if (!RS.Lib.hasProperty(data, item)) return; //未有该属性，则不设置

                        var v = RS.Lib.getAttr(data, item);
                        if (v == null)
                        {
                            rtnObj.setItemValue(item, "");
                        }   
                        else
                            rtnObj.setItemValue(item, v);
                    });
                },
                setItemValue: function (itemName, v) {
                    var obj = this.getEditor(itemName);
                    if (obj != null)
                        obj.setValue(v);
                },
                setEnabled: function (itemName, IsEnabled) {
                    var editor = editors[itemName];
                    if (editor != null && editor != undefined) editor.setEnabled(IsEnabled);

                    var cell = $("#" + op.areaName + "_" + itemName + "_label");
                    if (cell.length > 0) {
                        if (IsEnabled)
                            cell.removeAttr("disabled");
                        else
                            cell.attr("disabled", "disabled");
                    }
                    cell = $("#" + op.areaName + "_" + itemName + "_editor");
                    if (cell.length > 0) {
                        if (IsEnabled)
                            cell.removeAttr("disabled");
                        else
                            cell.attr("disabled", "disabled");
                    }
                },
                setVisible: function (itemName, IsVisible) {
                    var editor = editors[itemName];
                    if (editor != null && editor != undefined) editor.setVisible(IsVisible);
                    var row = $("#" + op.areaName + "_" + itemName + "_row");
                    if (row.length > 0) {
                        if (IsVisible)
                            row.show();
                        else
                            row.hide();
                        return;
                    }

                    var cell = $("#" + op.areaName + "_" + itemName + "_label");
                    if (cell.length > 0) {
                        if (IsVisible)
                            cell.show();
                        else
                            cell.hide();
                    }
                    cell = $("#" + op.areaName + "_" + itemName + "_editor");
                    if (cell.length > 0) {
                        if (IsVisible)
                            cell.show();
                        else
                            cell.hide();
                    }
                },
                updataObj: function (obj) {
                    $(items).each(function (i, itemName) {
                        var editor = editors[itemName];
                        if (editor == null || editor == undefined) return;
                        var v = editor.getValue();
                        if (typeof (v) == "Array")
                            v = v.join(",");

                        RS.Lib.setAttr(obj, itemName, v);
                    });
                },
                isValid: function () {
                    for (var i = 0; i < items.length; i++) {
                        var editor = editors[items[i]];
                        if (editor == null || editor == undefined) continue;
                        if (!editor.isValid()) return false;
                    }
                    return true;
                }
            };



            //进行各编辑项初始化
            $.each(op.items, function (z, item) {
                if (item.IsTemplate) return;

                if (RS.Lib.isNotEmpty(item.ItemName))
                    items.push(item.ItemName);


                item.DefaultValue = getItemValue(op.data, item.ItemName);
                var editor = $("#" + op.areaName + "_" + item.ItemName).layoutEditor(item);
                editor.area = rtnObj;
                editor.form = form;

                var VCmethod = editor.onValueChange;
                editor.onValueChange = function (newValue,objEdit) {
                    try {
                        if (VCmethod != null) VCmethod(newValue,objEdit);
                    }
                    catch (e) { }
                    itemOnChange(editor, newValue);
                }

                var SLmethod = editor.onSelChange;
                editor.onSelChange = function (newValue) {
                    try {
                        if (SLmethod != null) SLmethod(newValue);
                    }
                    catch (e) { }
                    itemOnChange(editor, newValue);
                }
                editors[item.ItemName] = editor;
            });

            function getItemValue(data, name) {
                if (data == null) return "";
                var v = data[name];
                if (v == null)
                    return "";
                else
                    return v;
            }


            initLDFun();

            //设置各编辑项联动表达式计算
            function initLDFun() {
                $.each(op.items, function (z, item) {
                    try {
                        if (RS.Lib.isNotEmpty(item.Expression)) {
                            var editor = rtnObj.getEditor(item.ItemName);
                            if (editor == null) return;
                            var arr = ExpressParser(item.Expression);
                            $(arr).each(function (i, n) {
                                var box = rtnObj.getEditor(n);
                                if (box == null) return; //有一项为空，则表示该表达式无效
                                box.ldexpressArr.push({ editor: editor, exp: item.Expression, exparr: arr });
                                box.ldchange = LDChangeValue;
                            });
                        }
                    }
                    catch (e) { }
                });
            }

            function LDChangeValue() {
                var editor = this;
                var v = editor.getValue();
                if (editor.ldexpressArr == null) return;
                $(editor.ldexpressArr).each(function (i, expobj) {
                    try {
                        var box = expobj.editor;
                        var exp = expobj.exp;
                        var arr = expobj.exparr;
                        for (var j = 0; j < arr.length; j++) {
                            var cbox = rtnObj.getEditor(arr[i]);
                            if (cbox == null) return;
                            var tz = parseFloat(cbox.getValue());
                            if (isNaN(tz)) tz = 0;

                            exp = exp.replace(cn, tz.toString());
                        }
                        var v = eval(exp);
                        if (!isNaN(v))
                            box.setValue(v);
                    }
                    catch (e) { }
                });
            }

            //当前编辑区值编辑项值改变时激活的事件
            function itemOnChange(editor, newValue) {
                if (editor.ldchange != null)
                    editor.ldchange(editor);
            }

            //以下为运算表达式解析器
            function ExpressParser(exp) {
                var carrColName = new Array();
                var z = "";
                var qzf = "";
                for (var i = 0; i < exp.length; i++) {
                    z = exp.charAt(i);
                    if (z == "(" || z == ")" || z == "+" || z == "-" || z == "/" || z == "*" || z == "%") {
                        if (qzf != "") {
                            carrColName.push(qzf);
                            qzf = "";
                        }
                    }
                    else {
                        qzf += z;
                    }
                }
                if (qzf != "") carrColName.push(qzf);
                return carrColName
            }

            return rtnObj;
        },
        layoutGrid: function (options, form) {
            var div = $(this);
            var currentRow = null;
            var grid = $("<table></table>");
            var parentForm = form;
            div.append(grid);
            var hasOpCol = false;//是否有操作列
            var rowID = 0;//用于标识行ID，以保证唯一
            var items = new Array();//存储各项的名称
            layoutGridAreaID++;
            var areaOnlyID = layoutGridAreaID;
            var defaults = {
                id: '',
                areaName: '',
                layoutType: 1,
                items: null,
                childArea: [],
                showMode: 0,
                data: {}
            };
            var op = $.extend(defaults, options);

            var columns = new Array();
            var editorRows = new Array();//存储所有编辑项，按行列来计算

            //进行各编辑项初始化
            $.each(op.items, function (z, item) {
                if (item.IsTemplate) return;

                if (RS.Lib.isNotEmpty(item.ItemName))
                    items.push(item.ItemName);

                var column = {
                    title: item.Caption,
                    width: item.Width + 6,
                    field: item.ItemName,
                    formatter: initEditor
                };
                if (item.hidden) {
                    if (item.hidden.isHidden) {
                        column.hidden = true;
                    }
                }
                columns.push(column);
            });

            var gjson = {
                fit: true,
                columns: [columns],
                border: false,
                idField: "id",
                striped: false,
                nowrap:false,
                singleSelect: true,
                pagination: false,
                rownumbers: true,//是否要显示数字行列
                showFooter: true,//是否显示页脚                
                fitColumns: false,
                cache: false,
                onSelect: selectRow,
                onUnselect: unselectRow,
                toolbar: getToolFuns()
            }

            grid.datagrid(gjson);


            function getRowID()
            {
                rowID++;
                return "row" + rowID;
            }
            function getToolFuns() {
                var funs = [];
                if (op.showMode != 0) return funs;
                if (op.showMode == 0 && op.mutilDefine != null) {
                    funs.push({
                        id: op.mutilDefine.id,
                        text: op.mutilDefine.text,
                        iconCls: op.mutilDefine.icon,
                        handler: function (e) {
                            try {
                                var popupConfirmFun = RS.Lib.parseFun(op.mutilDefine.popup.PopupConfimFun);
                                if (popupConfirmFun != null) {
                                    if (!popupConfirmFun()) return;
                                }
                            }
                            catch (e) { }
                            if (!confirm("本项操作将会自动清空当前选中的项，并以新选中项填充明细列表，是否继续？")) return;
                            popupWindow(op.mutilDefine.popup);
                        }
                    });
                }
                if (op.selfFuns != null && op.selfFuns.length > 0) {
                    $(op.selfFuns).each(function (i, fun) {
                        funs.push({
                            id:fun.id,
                            text:fun.text,
                            iconCls:fun.iconCls,
                            handler:RS.Lib.parseFun(fun.clickFun)
                        });
                    });                    
                }
                if (op.allowAddRow) {
                    funs.push({
                        id: "btnAdd",
                        text: "添加一行",
                        iconCls: "icon-add",
                        handler: function (e) {
                            addRow();
                        }
                    });
                }
                if (op.allowRemoveRow) {
                    funs.push({
                        id: "btnRemove",
                        text: "移除一行",
                        iconCls: "icon-remove",
                        handler: function (e) {
                            delRow();
                        }
                    });
                    funs.push({
                        id: "btnAllRemove",
                        text: "全部移除",
                        iconCls: "icon-no",
                        handler: function (e) {
                            if (editorRows.length == 0) return;
                            if (!confirm("您是否真要移除所有明细")) return;
                            clearMX();
                        }
                    });
                }
                return funs;
            }

            //获取当前已选中的项
            function getSelected() {
                var arr = null;
                var datas = rtnObj.getData();
                if (op.mutilDefine != null) {
                    var key = op.mutilDefine.keyItemName;
                    if (RS.Lib.isNotEmpty(key)) {
                        var hasItem = false;
                        for (var i = 0; i < items.length; i++) {
                            if (key == items[i]) {
                                hasItem = true;
                                break;
                            }
                        }
                        if (hasItem)//如果已存在
                        {
                            //取到现有项
                            var values = [];
                            $(datas).each(function (i, obj) {
                                var v = RS.Lib.getAttr(obj, key);
                                if (v != null)
                                    values.push(v);
                            });
                            arr = values;
                        }
                    }
                }
                return arr;
            }


            //以下为弹出窗口选择明细
            function popupWindow(popupJson) {
                var jsonBoj = { gridJson: toGridTableJson(popupJson), ValueField: popupJson.ValueField, TextField: popupJson.TextField, MutilValues: popupJson.MutilValues, values: null };
                jsonBoj.values = getSelected();

                var w = 600, h = 400;
                var html = RS.pageInfo.rootvpath +RS.pageInfo.contentPath+ "/RSJLibrary/LayoutForm/CommonHtml/SelectGridWin.html";
                if (popupJson.MutilValues || popupJson.WindowMode == 1) { //复杂选择
                    html = RS.pageInfo.rootvpath +RS.pageInfo.contentPath+ "/RSJLibrary/LayoutForm/CommonHtml/MutilSelectWin.html";
                    w = 800;
                }
                openModelNormal(html, w, h, function (data) {
                    if (data != null && data != undefined && data.dataItems != null && data.dataItems.length > 0) {
                        //如果有联动，则要设置相关联动信息
                        var KeyValues = getSelected();
                        //先清空明细
                        clearMX();
                        $(data.dataItems).each(function (i, obj) {
                            //再添加
                            var row = addRow();
                            setSelLD(obj, row.rowArea);
                        });
                    }
                }, { options: jsonBoj, pageInfo: RS.pageInfo });
            }
            //设置选择联动
            function setSelLD(data, rowArea) {
                if (op.mutilDefine.popup.LDChangeItems != null && op.mutilDefine.popup.LDChangeItems != undefined) {
                    $(op.mutilDefine.popup.LDChangeItems).each(function (i, item) {
                        var v = RS.Lib.getAttr(data, item.Field);
                        if (v != null) {
                            if (RS.Lib.isNotEmpty(item.AreaName)) {
                                if (parentForm != null) parentForm.setItemValue(item.AreaName, item.ItemName, v);
                            }
                            else {
                                rowArea.setItemValue(item.ItemName, v);
                            }
                        }
                    });
                }
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
                    InitFun: RS.Lib.isNotEmpty(popup.InitFun) ? RS.Lib.parseFun(popup.InitFun) : null
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

            //初始化列编辑项
            function getItemValue(data, name) {
                if (data == null) return "";
                var v = data[name];
                if (v == null)
                    return "";
                else
                    return v;
            }
            function selectRow(rowIndex, rowData) {
                currentRow = rowData;
                rtnObj.currentRow = rowData;
            }
            function unselectRow(rowIndex, rowData) {
                currentRow = null;
                rtnObj.currentRow = null;
            }
            //当前编辑区值编辑项值改变时激活的事件
            function itemOnChange(editor, newValue) {

            }

            function clearMX() {
                editorRows = [];
                grid.datagrid("loadData", { total: 0, rows: [] });
            }
            var colIndex = -1;
            var curRowIndex = -1;

            //初始设置各行列呈现内容
            function initEditor(value, rowData, rowIndex) {
                if (curRowIndex != rowIndex)//开启新行
                {
                    colEditors = new Array();//存储本行各编辑项
                    colIndex = 0;
                    curRowIndex = rowIndex;
                }
                else
                    colIndex++;

                var r = rowIndex + 1, c = colIndex + 1;
                var item = op.items[c - 1];
                item.IsCellEditor = false;

                var id ="area"+areaOnlyID+"_"+ item.ItemName + "_" + r + "_" + c;
                return item.html.replace("{0}", "id='" + id + "'");
            }

            function getRowLength() {
                var rows = grid.datagrid("getRows");
                return rows.length;
            }



            //复制添加(前提必须要选中一行)，且在选中行后面插入
            function copyInsert()
            {
                var selRow = grid.datagrid("getSelected");
                var selIndex = grid.datagrid("getRowIndex",selRow);
                //获取当前选中的行
                if (selRow == null||selIndex<0)
                {
                    alert("请先选择一行");
                    return;
                }
                
                //初始化行列，以便新增时初始
                colIndex = -1;
                curRowIndex = -1;

                var dataItem = selRow.editors.rowArea.getData();
                var row = { id: getRowID(), editors: null };
               
                grid.datagrid("insertRow", { index: selIndex + 1, row: row });
                //初始化这行
                var editors= initRowEditor(row, selIndex + 1);

                //复制值
                editors.rowArea.setData(dataItem);
                return editors;
            }

            //增加一行
            function addRow() {
                //初始化行列，以便新增时初始
                colIndex = -1;
                curRowIndex = -1;
                
                var row = {id:getRowID(), editors: null };
                grid.datagrid("appendRow", row);
                var rows = grid.datagrid("getRows");
                return initRowEditor(row, rows.length - 1);
            }
            function insertRow(index)
            {
                colIndex = -1;
                curRowIndex = -1;
                var row = { id: getRowID(), editors: null };
                grid.datagrid("insertRow", { index: index, row: row });

                var editors = initRowEditor(row,index);
                return editors;
            }


            function delRow() {
                if (currentRow == null) {
                    alert("请选择您要移除的行");
                    return;
                }

                if (!confirm("您是否直要移除选中的明细行")) return;
                var roweditor = currentRow.editors;
                if (roweditor != null) {
                    removeEditorRow(roweditor);
                    try {
                        var rowindex = grid.datagrid("getRowIndex", currentRow);
                        grid.datagrid("deleteRow", rowindex);
                        currentRow = null;
                        if (rowindex < editorRows.length && rowindex >= 0)
                            grid.datagrid("selectRow", rowindex);
                    }
                    catch (e) { }
                }
                else {
                    alert("请选择您要移除的行");
                }
            }


            //删除指定行
            function removeEditorRow(editorRow) {
                var arr = new Array();
                var index = 0;
                $(editorRows).each(function (i, row) {
                    if (row != editorRow) {
                        arr.push(row);
                        row.index = index;
                        index++;
                    }
                });
                editorRows = arr;
            }
            //初始化指定行各编辑项
            function initRowEditor(row, rowIndex) {
                var r = rowIndex + 1;
                var editorRow = { editors: new Array(), dataItem: {}, rowArea: null };
                row.editors = editorRow;
                var rowArea=
                {
                    row: editorRow,
                    areaName: op.areaName,
                    getItems: function () {
                        return this.row.editors;
                    },
                    getItemValue: function (itemName) {
                        var v = "";
                        var obj = this.getEditor(itemName);
                        if (obj != null) {
                            v = obj.getValue();
                            if (v == undefined || v == null) v = "";
                            return v;
                        }
                        else
                            return "";
                    },
                    getAreaData: function () {
                        var datas = this.row.dataItem;
                        for (var key in this.row.editors) {
                            var editor = this.row.editors[key];
                            if (editor == null || editor == undefined)
                                datas[key] = "";
                            else
                                datas[key] = this.row.editors[key].getValue();
                        }
                        return datas;
                    },
                    getEditor: function (itemName) {
                        var editor = this.row.editors[itemName];
                        if (editor == null || editor == undefined)
                            return null;
                        else
                            return editor;
                    },
                    getData: function () {
                        return rowArea.getAreaData();
                    },
                    setData: function (data) {
                        $(items).each(function (i, item) {
                            var v = RS.Lib.getAttr(data, item);
                            if (v == null)
                                rowArea.setItemValue(item, "");
                            else
                                rowArea.setItemValue(item, v);
                        });
                    },
                    setItemValue: function (itemName, v) {
                        var obj = this.getEditor(itemName);
                        if (obj != null)
                            obj.setValue(v);
                    },
                    setEnabled: function (itemName, IsEnabled) {
                        var editor = this.row.editors[itemName];
                        if (editor != null && editor != undefined) editor.setEnabled(IsEnabled);

                        var cell = $("#" +  op.areaName + "_" + itemName + "_label");
                        if (cell.length > 0) {
                            if (IsEnabled)
                                cell.removeAttr("disabled");
                            else
                                cell.attr("disabled", "disabled");
                        }
                        cell = $("#" + op.areaName + "_" + itemName + "_editor");
                        if (cell.length > 0) {
                            if (IsEnabled)
                                cell.removeAttr("disabled");
                            else
                                cell.attr("disabled", "disabled");
                        }
                    },
                    setVisible: function (itemName, IsVisible) {
                        var editor = this.row.editors[itemName];
                        if (editor != null && editor != undefined) editor.setVisible(IsVisible);
                        var row = $("#" +  op.areaName + "_" + itemName + "_row");
                        if (row.length > 0) {
                            if (IsVisible)
                                row.show();
                            else
                                row.hide();
                            return;
                        }

                        var cell = $("#" +op.areaName + "_" + itemName + "_label");
                        if (cell.length > 0) {
                            if (IsVisible)
                                cell.show();
                            else
                                cell.hide();
                        }
                        cell = $("#" +op.areaName + "_" + itemName + "_editor");
                        if (cell.length > 0) {
                            if (IsVisible)
                                cell.show();
                            else
                                cell.hide();
                        }
                    },
                    updataObj: function (obj) {
                        $(items).each(function (i, itemName) {
                            var editor = this.row.editors[itemName];
                            if (editor == null || editor == undefined) return;
                            var v = editor.getValue();
                            if (typeof (v) == "Array")
                                v = v.join(",");

                            RS.Lib.setAttr(obj, itemName, v);
                        });
                    },
                    isValid: function () {
                        for (var i = 0; i < items.length; i++) {
                            var editor = this.row.editors[items[i]];
                            if (editor == null || editor == undefined) continue;
                            if (!editor.isValid()) return false;
                        }
                        return true;
                    }
                };
                editorRow.rowArea = rowArea;

                for (var c = 1; c <= op.items.length; c++) {
                    var item = op.items[c - 1];
                    var id = "area" + areaOnlyID + "_" + item.ItemName + "_" + r + "_" + c;
                    var box = $("#" + id);

                    var editor = $("#" + id).layoutEditor(item);
                    editor.form = form;
                    editor.area = editorRow.rowArea;
                    editor.tag = {vcfun:RS.Lib.parseFun(item.OnValueChange),sefun:RS.Lib.parseFun(item.OnSeledItemFun)};
                    
                    editor.onValueChange = function (newValue,objEdit) {
                        var VCmethod = this.tag.vcfun;
                        try {
                            if (VCmethod != null) VCmethod(newValue,this,objEdit);
                        }
                        catch (e) { }
                        itemOnChange(editor, newValue);//主要用于表达式联动
                    }

                    editor.onSelChange = function (newValue) {
                        var SLmethod = this.tag.sefun;
                        try {
                            if (SLmethod != null) SLmethod(newValue,this);
                        }
                        catch (e) { }
                    }
                    editorRow.editors[item.ItemName] = editor;
                }
                editorRows.push(editorRow);
                return editorRow;
            }

            var rtnObj = {
                currentRow:currentRow,
                areaName: op.areaName,
                getItems: function () {
                    return editorRows;
                },
                getItemValue: function (itemName, rowIndex) {
                    var v = "";
                    var obj = this.getEditor(itemName, rowIndex);
                    if (obj != null) {
                        v = obj.getValue();
                        if (v == undefined || v == null) v = "";
                        return v;
                    }
                    else
                        return "";
                },
                getAreaData: function () {
                    var datas = new Array();
                    for (var i = 0; i < editorRows.length; i++) {
                        var row = editorRows[i];
                        var data = row.rowArea.getAreaData();
                        datas.push(data);
                    }
                    return datas;
                },
                getEditor: function (itemName, rowIndex) {
                    if (rowIndex >= 0 && rowIndex < editorRows.length) {
                        var row = editorRows[rowIndex];
                        return row.rowArea.getEditor(itemName);
                    }
                    else
                        return null;
                },
                getData: function () {
                    return this.getAreaData();
                },
                setData: function (datas) {
                    //先进行清空
                    clearMX();
                    try {
                        if (datas == null || datas.length == undefined) return;
                        for (var i = 0; i < datas.length; i++) {
                            var data = datas[i];
                            var row;
                            //初始化当前行项
                            if (i < editorRows.length) {
                                row = editorRows[i];
                                row.dataItem = $.extend({},data);
                            }
                            else {
                                row = addRow();
                                row.dataItem = $.extend({},data);
                            }

                            //设置当前行各编辑值
                            $(items).each(function (i, item) {
                                var v = RS.Lib.getAttr(data, item);
                                if (v == null)
                                    row.rowArea.setItemValue(item, "");
                                else
                                    row.rowArea.setItemValue(item, v);
                            });
                        }
                    }
                    catch (e) { }
                },
                setItemValue: function (itemName, v, rowIndex) {
                    var obj = this.getEditor(itemName, rowIndex);
                    if (obj != null)
                        obj.setValue(v);
                },
                setEnabled: function (itemName, IsEnabled) {
                    for (var r = 0; r < editorRows.length; r++) {
                        var editor = this.getEditor(itemName, r);
                        if (editor != null)
                            editor.setEnabled(IsEnabled);
                    }
                },
                setVisible: function (itemName, IsVisible) {
                    if (IsVisible)
                        grid.datagrid("showColumn", itemName);
                    else
                        grid.datagrid("hideColumn", itemName);
                },
                updataObj: function (obj) {
                    //对于Grid,此方法无效
                },
                isValid: function () {
                    for (var r = 0; r < editorRows.length; r++) {
                        for (var i = 0; i < items.length; i++) {
                            var editor = editorRows[items[i]];
                            if (editor == null || editor == undefined) continue;
                            if (!editor.isValid()) return false;
                        }
                    }
                    return true;
                },
                addRow:function(){
                    return addRow().rowArea;
                },
                deleteRow: function () {
                    return delRow().rowArea;
                },
                copyAdd: function () {
                    return copyInsert().rowArea;
                },
                insertRow:function(index){
                    return insertRow(index).rowArea;
                },
                selectedIndex:function()
                {
                    var selRow = grid.datagrid("getSelected");
                    var selIndex = grid.datagrid("getRowIndex", selRow);
                    return selIndex;
                },
                getSelected: function () {
                    var selRow = grid.datagrid("getSelected");
                    var selIndex = grid.datagrid("getRowIndex", selRow);
                    //获取当前选中的行
                    if (selRow != null && selIndex >= 0) {
                        return selRow.editors.rowArea;
                    }
                    else
                        return null;
                }
            };

            return rtnObj;
        }
    });
})($);