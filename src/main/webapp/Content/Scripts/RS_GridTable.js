var appendMethod = $.fn.treegrid.methods.append;
var loadDataMethod = $.fn.treegrid.methods.loadData;
function pagerFilter(data) {
    if ($.isArray(data)) {    // is array  
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var state = dg.data('treegrid');
    var opts = dg.treegrid('options');
    var pager = dg.treegrid('getPager');
    pager.pagination({
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.treegrid('loadData', state.originalRows);
        }
    });
    if (!state.originalRows) {
        state.originalRows = data.rows;
    }
    var topRows = [];
    var childRows = [];
    $.map(state.originalRows, function (row) {
        row._parentId ? childRows.push(row) : topRows.push(row);
    });
    data.total = topRows.length;
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = $.extend(true, [], topRows.slice(start, end).concat(childRows));
    return data;
}
$.extend($.fn.treegrid.methods, {
    clientPaging: function (jq) {
        return jq.each(function () {
            var state = $(this).data('treegrid');
            var opts = state.options;
            opts.loadFilter = pagerFilter;
            var onBeforeLoad = opts.onBeforeLoad;
            opts.onBeforeLoad = function (row, param) {
                state.originalRows = null;
                onBeforeLoad.call(this, row, param);
            }
            $(this).treegrid('loadData', state.data);
            $(this).treegrid('reload');
        });
    },
    loadData: function (jq, data) {
        jq.each(function () {
            $(this).data('treegrid').originalRows = null;
        });
        return loadDataMethod.call($.fn.treegrid.methods, jq, data);
    },
    append: function (jq, param) {
        return jq.each(function () {
            var state = $(this).data('treegrid');
            if (state.options.loadFilter == pagerFilter) {
                $.map(param.data, function (row) {
                    row._parentId = row._parentId || param.parent;
                    state.originalRows.push(row);
                });
                $(this).treegrid('loadData', state.originalRows);
            } else {
                appendMethod.call($.fn.treegrid.methods, jq, param);
            }
        })
    }
});
//普通数据列表框
//对于树型，则需要作如下完善
//1、不需分页的：默认列出所有节点，刷新或过滤时，则直接采用reload方式直接重新加载便可。
//2、对于支持分页的，默认不再列出所有节点，只列出顶层节点，当要列出支节点时，再从服务端获取
//目前暂只支持第1种
(function ($) {
    $.fn.extend({
        gridTable: function (options) {
            var grid = $(this);
            var cmenu, hmenu;
            var mergeColArr = [];//要进行分组呈现处理的列,对树型数据无效
            var curFilterItems = [];
            var defaults = {
                canExport: true,//是否可以导出
                filterPanel: null,
                funPanel: null,
                getFilterFun: function () {
                    var obj = null;
                    if (RS.Lib.isNotEmpty(this.filterPanel)) {
                        try {
                            obj = eval(this.filterPanel);
                        }
                        catch (e) { }
                    }
                    return obj;
                },
                getFunPanelFun: function () {
                    var obj = null;
                    if (RS.Lib.isNotEmpty(this.funPanel)) {
                        try {
                            obj = eval(this.funPanel);
                        }
                        catch (e) { }
                    }
                    return obj;
                }
            };
            var mutilCkBoxs = null;//用于设置复选框
            var op = $.extend(defaults, options);
            var reloadFun = null;//当是重新加载时执行的方法，主要用于多选中保存各页的选中项
            var json;
            var selValues = [];//已选中的值，主要用于初始加载
            var isRunInit = false;
            var isrunselectRow = false;
            function c2Co(c)
            {
                return { "HeaderText": c.title, "CaseWhenList": null, "DisplayField": null, "ElseValue": null, "IsEmptyElseShowSelf": false, "RelationField": null, "RelationTable": null, "DataField": c.field, "DataFormatString": null, "TotalFormatString": null, "TotalType": 0, "MainTableField": null, "ShowMode": 0, "OnLinkClick": null, "IsPopupWinForHyperLink": false, "IsPopupMax": false, "PopupWidth": 0, "PopupHeight": 0, "DataNavigateUrlField": null, "DataNavigateUrlFormatString": null, "DataTextField": null, "DataTextFormatString": null, "NavigateUrl": null, "Target": null, "Text": null };
            }
            var rtn = {
                selectedIndex: -1,//当前操作行的索引
                selectedItem: null,//当前操作行的值,当前光标选中位置
                value: "",//当前操作行的主键值，
                selectedItems: [],//当前选中行的实际值
                fun: null,
                grid: grid,
                getOptions: function () {
                    return execGridMethod("options");
                },
                getQueryParams: function () {
                    var myop = execGridMethod("options");
                    return myop.queryParams;
                },
                setInitValue:function(values)
                {
                    this.clearSel();
                    selValues = values;
                },
                init: function (values) {
                    selValues = values;
                    var fun = curGridMethod.init;
                    if (fun != null) {
                        try {
                            fun(this);
                        }
                        catch (e) {
                            showNotice("Error:" + e.message);
                        }
                    }
                },
                toExcel: function () {
                    if (RS.Lib.isEmpty(op.url)) {
                        showNotice("未设置数据来源，暂时不能导出。");
                        return;
                    }

                    var webUrl = "";

                    var url = op.url;
                    var method = "";
                    var index = url.lastIndexOf("/");
                    if (index >= 0) {
                        method = index == url.length - 1 ? "" : "".substr(index, url.length);
                    }
                    else
                        method = url;

                    if (index > 0) {
                        webUrl = url.substr(0, index);
                        if (url.substr(-1) != "/") webUrl += "/";
                    }

                    url = webUrl + "ToExcel?GetDatasourceUrl=" + method;

                    var myop = execGridMethod("options");
                    RS.toExcel(url, myop.queryParams);
                },
                getValues: function () {
                    var arr = [];
                    try {
                        $(this.selectedItems).each(function (i, item) {
                            var id = getRowIDValue(item);
                            if (RS.Lib.isNotEmpty(id))
                                arr.push(id);
                        });
                    }
                    catch (e) { }
                    return arr;
                },
                getTexts: function (FieldName) {
                    var arr = [];
                    try {
                        $(this.selectedItems).each(function (i, item) {
                            var name = getFieldValue(item, FieldName);
                            if (RS.Lib.isNotEmpty(name))
                                arr.push(name);
                        });
                    }
                    catch (e) { }
                    return arr;
                },
                getData: function () {
                    return execGridMethod("getData");
                },
                getRows: function () {
                    return execGridMethod("getRows");
                },
                getRow: function () {
                    return this.selectedItem;
                },
                getValue: function () {
                    return rtn.value;
                },
                getText: function (FieldName) {
                    return getFieldValue(this.selectedItem, FieldName);
                },
                clear: function () {
                    mutilCkBoxs = null;
                    if (!isRunInit) return;
                    this.selectedIndex = -1;//当前操作行的索引
                    this.selectedItem = null;//当前操作行的值,当前光标选中位置
                    this.value = "";//当前操作行的主键值，
                    this.selectedItems = [];//当前选中行的实际值

                    try {
                        execGridMethod("clearSelections");
                        execGridMethodSetV("loadData", []);
                    } catch (e) { }

                    if (rtn.fun != null) {
                        rtn.fun.setFunStatus(null);
                    }
                },
                setCustomObj: function (obj) {
                    var myop = execGridMethod("options");
                    myop.queryParams.CustomObj = JSON.stringify(obj);
                },
                loadUrl: function (url, paraJson,columns) {
                    mutilCkBoxs = null;
                    if (isRunInit) {
                        this.selectedIndex = -1;//当前操作行的索引
                        this.selectedItem = null;//当前操作行的值,当前光标选中位置
                        this.value = "";//当前操作行的主键值，
                        this.selectedItems = [];//当前选中行的实际值

                        try {
                            execGridMethod("clearSelections");

                            if (rtn.fun != null) {
                                rtn.fun.setFunStatus(null);
                            }
                        } catch (e) { }

                        var myop = execGridMethod("options");

                        if (op.isTreeGrid) {
                            myop.queryParams.CustomObj = JSON.stringify(paraJson);

                            try{
                                if (columns != null && columns != undefined) {
                                    json.columns = columns;
                                    var cos = [];
                                    var ocos =JSON.parse(myop.queryParams.ColumnOptions);
                                    $(columns[0]).each(function (i, c) {
                                        try{
                                            var co = null;
                                            for (var i = 0; i < ocos.length; i++)
                                            {
                                                if (ocos[i].DataField==c.field)
                                                {
                                                    co = ocos[i];
                                                    break;
                                                }
                                            }
                                            if (co == null)
                                                co =c2Co(c);
                                            cos.push(co);
                                        }
                                        catch(e){}
                                    });
                                    myop.queryParams.ColumnOptions =JSON.stringify(cos);
                                }
                            }
                            catch(e){}

                            RS.exec(url, myop.queryParams, function (rtn) {
                                grid.treegrid("loadData", rtn);
                            }, function (errMsg) {
                                showNotice("加载数据出现异常：" + errMsg);
                            });
                        } else {
                            myop.queryParams.CustomObj = JSON.stringify(paraJson);
                            if (columns != null && columns != undefined) {
                                json.columns = columns;
                                var cos = [];
                                var ocos = JSON.parse(myop.queryParams.ColumnOptions);
                                $(columns[0]).each(function (i, c) {
                                    try {
                                        var co = null;
                                        for (var i = 0; i < ocos.length; i++) {
                                            if (ocos[i].DataField == c.field) {
                                                co = ocos[i];
                                                break;
                                            }
                                        }
                                        if (co == null)
                                            co = c2Co(c);
                                        cos.push(co);
                                    }
                                    catch (e) { }
                                });
                                myop.queryParams.ColumnOptions = JSON.stringify(cos);

                            }
                            json.queryParams = myop.queryParams;
                            json.url = url;
                            json.pageNumber = 1;
                            op.url = url;
                            execGridMethod(json);
                        }
                    }
                    else {
                        op.url = url;
                        json.url = url;
                        json.queryParams.CustomObj = JSON.stringify(paraJson);

                        if (columns != null && columns != undefined) {
                            json.columns = columns;
                            var cos = [];
                            var ocos = JSON.parse(myop.queryParams.ColumnOptions);
                            $(columns[0]).each(function (i, c) {
                                try {
                                    var co = null;
                                    for (var i = 0; i < ocos.length; i++) {
                                        if (ocos[i].DataField == c.field) {
                                            co = ocos[i];
                                            break;
                                        }
                                    }
                                    if (co == null)
                                        co = c2Co(c);
                                    cos.push(co);
                                }
                                catch (e) { }
                            });
                            myop.queryParams.ColumnOptions = JSON.stringify(cos);
                        }

                        initBindGrid();
                    }
                },
                load: function (paraJson) //加载数据
                {
                    mutilCkBoxs = null;
                    this.selectedIndex = -1;//当前操作行的索引
                    this.selectedItem = null;//当前操作行的值,当前光标选中位置
                    this.value = "";//当前操作行的主键值，
                    this.selectedItems = [];//当前选中行的实际值

                    try {
                        execGridMethod("clearSelections");

                        if (rtn.fun != null) {
                            rtn.fun.setFunStatus(null);
                        }
                    } catch (e) { }

                    var myop = execGridMethod("options");
                    if (paraJson != null && paraJson != undefined)
                        myop.queryParams.CustomObj = JSON.stringify(paraJson);

                    if (op.isTreeGrid) {
                        RS.exec(myop.url, myop.queryParams, function (rtn) {
                            grid.treegrid("loadData", rtn);
                        }, function (errMsg) {
                            showNotice("加载数据出现异常：" + errMsg);
                        });
                    }
                    else
                        execGridMethodSetV("load", myop.queryParams);
                },
                reflash: function () {
                    mutilCkBoxs = null;
                    var id = this.value;
                    if (op.isTreeGrid) {
                        var myop = execGridMethod("options");
                        RS.exec(myop.url, myop.queryParams, function (rtn) {
                            grid.treegrid("loadData", rtn);
                        }, function (errMsg) {
                            showNotice("加载数据出现异常：" + errMsg);
                        });
                    }
                    else {
                        var myop = execGridMethod("options");
                        grid.datagrid("reload", myop.queryParams);
                    }
                },
                loadData: function (data) {
                    mutilCkBoxs = null;
                    execGridMethodSetV("loadData", data);
                },
                expandAll: function () {
                    if (op.isTreeGrid)
                        grid.treegrid("expandAll");
                },
                clearSel: function () {
                    this.selectedIndex = -1;//当前操作行的索引
                    this.selectedItem = null;//当前操作行的值,当前光标选中位置
                    this.value = "";//当前操作行的主键值，
                    this.selectedItems = [];//当前选中行的实际值

                    try {
                        execGridMethod("clearSelections");
                        if (rtn.fun != null) {
                            rtn.fun.setFunStatus(null);
                        }
                    } catch (e) { }

                    if (curGridMethod.unSelectRow != null)
                        curGridMethod.unSelectRow();
                },
                shortCutItems: function () {
                    if (this.filter != null)
                        return this.filter.shortCutItems();
                    else
                        return {};
                },
                getFilterValue1: function (name) {
                    if (this.filter != null)
                        return this.filter.getFilterValue1(name);
                    else if (curFilterItems != null) {
                        var v = "";
                        for(var i=0;i<curFilterItems.length;i++)
                        {
                            if (curFilterItems[i].FieldName==name)
                            {
                                v = curFilterItems[i].Value1;
                                break;
                            }
                        }
                        return v;
                    }
                    else
                        return "";
                },
                getFilterValue2: function (name) {
                    if (this.filter != null)
                        return this.filter.getFilterValue2(name);
                    else if (curFilterItems != null) {
                        var v = "";
                        for(var i=0;i<curFilterItems.length;i++)
                        {
                            if (curFilterItems[i].FieldName==name)
                            {
                                v = curFilterItems[i].Value2;
                                break;
                            }
                        }
                        return v;
                    }
                    else
                        return "";
                },
                filter: null,
                beforeFilter:null,//在执行过滤之前执行的方法
                afterFilter: null,
                enableSel: function (eIndex) {
                    if (mutilCkBoxs == null || mutilCkBoxs.length == undefined) return;
                    if (mutilCkBoxs.length <= eIndex) return;
                    try {
                        var ck = mutilCkBoxs[eIndex];
                        $(ck).removeAttr("disabled");
                    }
                    catch (e) { }
                },
                disableSel: function (eIndex) {
                    if (mutilCkBoxs == null || mutilCkBoxs.length == undefined) return;
                    if (mutilCkBoxs.length <= eIndex) return;
                    try {
                        var ck = mutilCkBoxs[eIndex];
                        $(ck).attr("disabled", "disabled");
                    }
                    catch (e) { }
                },
                showCheckBox: function (eIndex) {
                    if (mutilCkBoxs == null || mutilCkBoxs.length == undefined) return;
                    if (mutilCkBoxs.length <= eIndex) return;
                    try {
                        var ck = mutilCkBoxs[eIndex];
                        $(ck).show();
                    }
                    catch (e) { }
                },
                hideCheckBox: function (eIndex) {
                    if (mutilCkBoxs == null || mutilCkBoxs.length == undefined) return;
                    if (mutilCkBoxs.length <= eIndex) return;
                    try {
                        var ck = mutilCkBoxs[eIndex];
                        $(ck).hide();
                    }
                    catch (e) { }
                },
                setChecked: function (eIndex, isChecked) {
                    if (mutilCkBoxs == null || mutilCkBoxs.length == undefined) return;
                    if (mutilCkBoxs.length <= eIndex) return;
                    try {
                        var ck = mutilCkBoxs[eIndex];
                        ck.checked = isChecked;
                    }
                    catch (e) { }
                },
                reloadGridForData: function (edata, columns)
                {
                    op.columns = columns;
                    this.loadData(edata);
                },
                reloadGrid: function (url, columns,paraJson)
                {
                    op.columns = columns;
                    this.loadUrl(url, paraJson);
                }
            };
            var curGridMethod = {
                clickRow: RS.Lib.parseFun(op.ClickRowFun),
                dblClickRow: RS.Lib.parseFun(op.DblClickRowFun),
                clickCell: RS.Lib.parseFun(op.ClickCellFun),
                dblClickCell: RS.Lib.parseFun(op.DblClickCellFun),
                selectRow: RS.Lib.parseFun(op.SelectRowFun),
                unSelectRow: RS.Lib.parseFun(op.UnselectRowFun),
                selectAll: RS.Lib.parseFun(op.SelectAllFun),
                unSelectAll: RS.Lib.parseFun(op.UnselectAllFun),
                init: RS.Lib.parseFun(op.InitFun),
                rowStylerFun: RS.Lib.parseFun(op.RowStylerFun),
                loadSuccessFun: RS.Lib.parseFun(op.LoadSuccessFun),
                execFilterSqlFun:RS.Lib.parseFun(op.ExecFilterSqlFun)
            }

            function runUnSelectRow() {
                try {
                    if (curGridMethod.unSelectRow != null)
                        curGridMethod.unSelectRow();
                }
                catch (e) { }
                if (rtn.fun != null) {
                    rtn.fun.setFunStatus(null);
                }
            }
            ///Grid数据条件改变后重新加载的数据
            function gridReloadData(data) {
                reloadFun = null;
                rtn.selectedIndex = -1;
                rtn.selectedItem = null;
                rtn.value = "";
                rtn.selectedItems = [];
            }
            //以下方法为添加或移除当前选中行,主要用于多选，注意，当重新加载时，自动清空
            function addSelItem(rowData) {
                var id = getRowIDValue(rowData);
                try {
                    //检测该项是否已选中
                    var r = false;
                    for (var i = 0; i < rtn.selectedItems.length; i++) {
                        var item = rtn.selectedItems[i];
                        var cid = getRowIDValue(item);
                        if (item == rowData || id == cid) {
                            r = true;
                            break;
                        }
                    }
                    if (!r)
                        rtn.selectedItems.push(rowData);
                }
                catch (e) { }
            }
            function removeSelItem(rowData) {
                var id = getRowIDValue(rowData);
                try {
                    var newArr = new Array();
                    for (var i = 0; i < rtn.selectedItems.length; i++) {
                        var item = rtn.selectedItems[i];
                        var cid = getRowIDValue(item);
                        if (item == rowData || id == cid) {
                            continue;
                        }
                        else
                            newArr.push(item);
                    }
                    rtn.selectedItems = newArr;
                }
                catch (e) { }
            }

            ///获取指定行的ID
            function getRowIDValue(rowData) {
                try {
                    if (rowData == null || rowData == undefined)
                        return "";
                    if (op.idfield == null || op.idfield == "") //未设置主键值
                        return "";
                    else {
                        var id = rowData[op.idfield];
                        if (id == null)
                            return "";
                        else
                            return id;
                    }
                }
                catch (e) { return ""; }
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
            function ArrayContains(arr, v) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == v) return true;
                }
                return false;
            }

            function execGridMethod(methodname) {
                if (!isRunInit && methodname == "options")
                    return json;
                else {
                    if (op.isTreeGrid) {
                        return grid.treegrid(methodname);
                    }
                    else {
                        return grid.datagrid(methodname);
                    }
                }
            }

            function execGridMethodSetV(methodname, param) {
                if (op.isTreeGrid) {
                    return grid.treegrid(methodname, param);
                }
                else {
                    return grid.datagrid(methodname, param);
                }
            }

            function onGridClickRow(rowIndex, rowData) {
                var fun = curGridMethod.clickRow;
                if (fun != null) {
                    try {
                        fun(rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }
            function onGridDblClickRow(rowIndex, rowData) {
                var fun = curGridMethod.dblClickRow;
                if (fun != null) {
                    try {
                        fun(rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }
            function onGridClickCell(rowIndex, field, value) {
                var fun = curGridMethod.clickCell;
                if (fun != null) {
                    try {
                        fun(field, value);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }
            function onGridDblClickCell(rowIndex, field, value) {
                var fun = curGridMethod.dblClickCell;
                if (fun != null) {
                    try {
                        fun(field, value);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }

            function onTreeClickRow(rowData) {
                var fun = curGridMethod.clickRow;
                if (fun != null) {
                    try {
                        fun(rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }
            function onTreeDblClickRow(rowData) {
                var fun = curGridMethod.dblClickRow;
                if (fun != null) {
                    try {
                        fun(rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }
            function onTreeClickCell(field, rowData) {
                var fun = curGridMethod.clickCell;
                if (fun != null) {
                    try {
                        fun(field, rowData);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }
            function onTreeDblClickCell(field, rowData) {
                var fun = curGridMethod.dblClickCell;
                if (fun != null) {
                    try {
                        fun(field, rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }
            function onSelect(rowIndex, rowData) {
                isrunselectRow = true;
                if (rowIndex == null || rowIndex == undefined || rowData == null || rowData == undefined) {
                    rtn.selectedIndex = -1;
                    rtn.selectedItem = null;
                    rtn.value = "";
                    rtn.selectedItems = [];
                    return;
                }
                else {
                    rtn.selectedIndex = rowIndex;
                    rtn.selectedItem = rowData;
                    if (rtn.selectedItem != null) rtn.selectedItem = rtn.selectedItem.dataItemEntity;

                    rtn.value = getRowIDValue(rtn.selectedItem);

                    if (!op.singleSelect) //多选
                    {
                        addSelItem(rtn.selectedItem);
                    }
                    else {
                        rtn.selectedItems = [rtn.selectedItem];
                    }
                }

                if (rtn.fun != null) {
                    rtn.fun.setFunStatus(rowData.dataItemEntity);
                }


                var fun = curGridMethod.selectRow;
                if (fun != null) {
                    try {
                        fun(rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }

            function onTreeSelect(rowData) {
                isrunselectRow = true;
                if (rowData == null || rowData == undefined) {
                    rtn.selectedIndex = -1;
                    rtn.selectedItem = null;
                    rtn.value = "";
                    rtn.selectedItems = [];
                    return;
                }
                else {
                    rtn.selectedIndex = 0;
                    rtn.selectedItem = rowData;
                    if (rtn.selectedItem != null) rtn.selectedItem = rtn.selectedItem.dataItemEntity;

                    rtn.value = getRowIDValue(rtn.selectedItem);

                    if (!op.singleSelect) //多选
                    {
                        addSelItem(rtn.selectedItem);
                    }
                    else {
                        rtn.selectedItems = [rtn.selectedItem];
                    }
                }

                if (rtn.fun != null) {
                    rtn.fun.setFunStatus(rowData.dataItemEntity);
                }


                var fun = curGridMethod.selectRow;
                if (fun != null) {
                    try {
                        fun(rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }

            function onUnselect(rowIndex, rowData) {
                if (!op.singleSelect && rowData != null) //多选
                {
                    removeSelItem(rowData.dataItemEntity);
                }

                var fun = curGridMethod.unSelectRow;
                if (fun != null) {
                    try {
                        fun(rowData, rowIndex);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }

                if (rtn.fun != null) {
                    rtn.fun.setFunStatus(null);
                }
            }

            function onTreeUnselect(rowData) {
                if (!op.singleSelect && rowData != null) //多选
                {
                    removeSelItem(rowData.dataItemEntity);
                }

                var fun = curGridMethod.unSelectRow;
                if (fun != null) {
                    try {
                        fun(rowData);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
                if (rtn.fun != null) {
                    rtn.fun.setFunStatus(null);
                }
            }

            function onSelectAll(rows) {
                var items = [];
                try {
                    if (rows != null && rows.length > 0) {
                        rtn.selectedIndex = 0;
                        rtn.selectedItem = rows[0];
                        if (rtn.selectedItem != null) rtn.selectedItem = rtn.selectedItem.dataItemEntity;
                        rtn.value = getRowIDValue(rtn.selectedItem);

                        for (var i = 0; i < rows.length; i++) {
                            addSelItem(rows[i].dataItemEntity);
                            items.push(rows[i].dataItemEntity)
                        }
                    }
                }
                catch (e) { }

                var fun = curGridMethod.selectAll;
                if (fun != null) {
                    try {
                        fun(items);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }
            function onUnselectAll(rows) {
                var items = [];
                try {
                    rtn.selectedIndex = -1;
                    rtn.selectedItem = null;
                    rtn.value = "";

                    if (rows != null && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            removeSelItem(rows[i].dataItemEntity);
                            items.push(rows[i].dataItemEntity);
                        }
                    }
                }
                catch (e) { }


                var fun = curGridMethod.unSelectAll;
                if (fun != null) {
                    try {
                        fun(items);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                    }
                }
            }

            function onGridLoadSuccess(data) {
                if (op.singleSelect)
                    mutilCkBoxs = null;
                else {
                    try {
                        mutilCkBoxs = grid.parent().find("input[name='ck']");
                    }
                    catch (e) {
                        mutilCkBoxs = null;
                    }
                }
                if (data != null) {
                    try {
                        if (((data.total != null && data.total != undefined) && data.total == 0) || data.rows == null || data.rows.length == 0) {//没有数据
                            rtn.selectedIndex = -1;
                            rtn.selectedItem = null;
                            rtn.value = "";
                            rtn.clearSel();
                        }
                        else { //有数据，则看之前选中
                            if (!op.singleSelect) {
                                //设置当前选中项
                                var vs = rtn.getValues();
                                if (selValues != null && selValues != undefined) {
                                    try {
                                        $(selValues).each(function (i, v) {
                                            vs.push(v);
                                        });
                                    } catch (e) { }
                                    selValues = [];
                                }
                                if (vs != null && vs.length > 0) {
                                    isrunselectRow = false;
                                    for (var i = 0; i < vs.length; i++) {
                                        execGridMethodSetV("selectRecord", vs[i]);
                                    }
                                    if (!isrunselectRow) {
                                        var sitem = execGridMethod("getSelected");
                                        if (sitem != null) {
                                            if (curGridMethod.selectRow != null)
                                                curGridMethod.selectRow(sitem.dataItemEntity);
                                        }
                                    }
                                }
                            }
                            else if (op.singleSelect) {
                                var sitem = execGridMethod("getSelected");
                                var rowIndex = execGridMethodSetV("getRowIndex", sitem);
                                if (sitem == null || rowIndex < 0) {
                                    if (rtn.selectedIndex >= 0 && rtn.selectedIndex < data.rows.length) {
                                        isrunselectRow = false;
                                        execGridMethodSetV("selectRow", rtn.selectedIndex);
                                        rtn.selectedItem = execGridMethod("getSelected");
                                        if (rtn.selectedItem != null) {
                                            rtn.selectedItem = rtn.selectedItem.dataItemEntity;
                                            rtn.value = getRowIDValue(rtn.selectedItem);

                                            if (!isrunselectRow) {
                                                if (curGridMethod.selectRow != null)
                                                    curGridMethod.selectRow(rtn.selectedItem);
                                            }
                                        }
                                        else
                                            rtn.value = "";
                                    }
                                    else {
                                        rtn.selectedIndex = 0;
                                        isrunselectRow = false;
                                        execGridMethodSetV("selectRow", rtn.selectedIndex);
                                        rtn.selectedItem = execGridMethod("getSelected");
                                        if (rtn.selectedItem != null) {
                                            rtn.selectedItem = rtn.selectedItem.dataItemEntity;
                                            rtn.value = getRowIDValue(rtn.selectedItem);

                                            if (!isrunselectRow) {
                                                if (curGridMethod.selectRow != null)
                                                    curGridMethod.selectRow(rtn.selectedItem);
                                            }
                                        }
                                        else
                                            rtn.value = "";
                                    }
                                    if (rtn.selectedItem != null) {
                                        rtn.selectedItems = [rtn.selectedItem];
                                    }
                                }
                                else {
                                    sitem = sitem.dataItemEntity;
                                    rtn.selectedItem = sitem;
                                    rtn.selectedIndex = execGridMethodSetV("getRowIndex", sitem);
                                    rtn.value = getRowIDValue(sitem);

                                    if (rtn.fun != null) {
                                        rtn.fun.setFunStatus(sitem);
                                    }

                                    if (curGridMethod.selectRow != null)
                                        curGridMethod.selectRow(rtn.selectedItem);

                                    rtn.selectedItems = [rtn.selectedItem];
                                }
                            }
                        }
                    }
                    catch (e) {
                        showNotice("加载成功，但脚本出现异常：" + e.message);
                    }
                }
                if (reloadFun != null) reloadFun(data);

                if (curGridMethod.loadSuccessFun != null)
                    curGridMethod.loadSuccessFun(data);


                if (((data.total != null && data.total != undefined) && data.total == 0) || data.rows == null || data.rows.length == 0) {//没有数据
                    return;
                }

                try{
                    setMergeView(data.rows);
                }
                catch(e){}
            }

            //对当前数据行分组呈现处理    
            //op: { index: colI, field: col.field, rowspan: 1, colspan: 1 } 
            function getprefixVforMerge(row,colIndex)
            {
                var pv=[];
                for(var index=0;index<colIndex;index++)
                {
                    pv.push(RS.Lib.getAttr(row,mergeColArr[index].op.field));
                }
                return pv;
            }
            function checkIsEqualForPrefixV(prefix,row,colIndex)
            {
                var arr=getprefixVforMerge(row,colIndex);
                if (arr.length!=prefix.length) return false;
                var isEqual=true;
                for(var i=0;i<arr.length;i++)
                {
                    if (arr[i]!=prefix[i])
                    {
                        isEqual=false;
                        break;
                    }
                }
                return isEqual;
            }
            function setMergeView(datas) {
                for (var rowIndex = 0; rowIndex < datas.length; rowIndex++) {
                    var row = datas[rowIndex];
                    for (var colIndex = 0; colIndex < mergeColArr.length;colIndex++){
                        var mcol = mergeColArr[colIndex];
                        if (rowIndex == 0) //第一行，一般不需要进行合并
                        {
                            mcol.prevValue = RS.Lib.getAttr(row, mcol.op.field);
                            mcol.prefixValue=getprefixVforMerge(row,colIndex);
                            mcol.op.rowspan = 1;
                            mcol.op.index = 0;//要合并开始的列
                        }
                        else {
                            var v = RS.Lib.getAttr(row, mcol.op.field);
                            if (mcol.prevValue == v && checkIsEqualForPrefixV(mcol.prefixValue,row,colIndex))//本项与前项相同，则应该是合并列
                            {
                                mcol.op.rowspan++;

                                if (rowIndex == datas.length - 1) //最后一行
                                {
                                    execGridMethodSetV("mergeCells", mcol.op);                                    
                                }
                            }
                            else //则执行合并功能
                            {
                                if (mcol.op.rowspan > 1)//有合并，则执行
                                {
                                    execGridMethodSetV("mergeCells", mcol.op);
                                }

                                mcol.prevValue = RS.Lib.getAttr(row, mcol.op.field);
                                mcol.prefixValue=getprefixVforMerge(row,colIndex);
                                mcol.op.rowspan = 1;
                                mcol.op.index = rowIndex;//要合并开始的列                                
                            }
                        }
                    }
                }
            }


            //对于树形对象，有两种，一类是主细表，一类是和Grid
            function onTreeLoadSuccess(row, data) {
                if (op.singleSelect)
                    mutilCkBoxs = null;
                else {
                    try {
                        mutilCkBoxs = grid.parent().find("input[name='ck']");
                    }
                    catch (e) {
                        mutilCkBoxs = null;
                    }
                }
                if (data != null) {
                    try {
                        var total = RS.Lib.getAttr(data, "total");
                        var rowlen = RS.Lib.getAttr(data.row, "length");
                        if ((total != null && total == 0) || (rowlen != null && rowlen == 0)) {//没有数据
                            if (!(data.length != undefined && data.length > 0)) {
                                rtn.selectedIndex = -1;
                                rtn.selectedItem = null;
                                rtn.value = "";
                            }

                            rtn.clearSel();
                        }
                        else {
                            //有数据，则看之前选中
                            var curGridDatas = [];
                            if (data.rows != undefined && data.rows != null && data.rows.length > 0) {
                                curGridDatas = data.rows;
                            }
                            else if (data.length != undefined && data.length > 0) {
                                curGridDatas = data;
                            }
                            if (!op.singleSelect) { //多选
                                //设置当前选中项
                                var vs = rtn.getValues();
                                if (selValues != null && selValues != undefined) {
                                    try {
                                        $(selValues).each(function (i, v) {
                                            vs.push(v);
                                        });
                                    } catch (e) { }
                                }
                                if (vs != null && vs.length > 0) {
                                    for (var i = 0; i < vs.length; i++) {
                                        if (RS.Lib.isNotEmpty(vs[i]) && existRec(curGridDatas, vs[i]))
                                            grid.treegrid("select", vs[i]);
                                    }
                                }
                            }
                            else {
                                var row = grid.treegrid("find", rtn.value);
                                if (existRec(curGridDatas, rtn.value))
                                    grid.treegrid("select", rtn.value);
                                else {
                                    rtn.clearSel();
                                }
                            }
                            if (op.singleSelect) {
                                var sitem = grid.treegrid("getSelected"); //获取当前选中行
                                //因为有可能节点已被删除，所以要清空当前选中项
                                if (sitem == null || (!existRec(data, getRowIDValue(sitem)))) {
                                    if (data.rows != undefined && data.rows != null && data.rows.length > 0) {
                                        var id = getRowIDValue(data.rows[0]);
                                        grid.treegrid("select", id);
                                        rtn.value = id;
                                        rtn.selectedItem = data.rows[0].dataItemEntity;
                                    }
                                    else if (data.length != undefined && data.length > 0) {
                                        var id = getRowIDValue(data[0].dataItemEntity);

                                        grid.treegrid("select", id);
                                        rtn.value = id;
                                        rtn.selectedItem = data[0].dataItemEntity;
                                    }
                                    else {
                                        rtn.value = "";
                                        rtn.selectedItem = null;
                                        rtn.selectedItems = [];
                                    }
                                    if (rtn.selectedItem != null) {
                                        if (op.singleSelect) {
                                            rtn.selectedItems = [rtn.selectedItem];
                                        }
                                        else {
                                            addSelItem(rtn.selectedItem);
                                        }
                                    }
                                }
                                else {
                                    sitem = sitem.dataItemEntity;
                                    rtn.selectedItem = sitem;
                                    rtn.value = getRowIDValue(sitem);

                                    if (rtn.fun != null) {
                                        rtn.fun.setFunStatus(sitem);
                                    }

                                    if (op.singleSelect) {
                                        rtn.selectedItems = [rtn.selectedItem];
                                    }
                                    else {
                                        addSelItem(rtn.selectedItem);
                                    }
                                }
                            }
                        }
                    }
                    catch (e) {
                        showNotice("加载成功，但脚本出现异常：" + e.message);
                    }
                }
                if (reloadFun != null) reloadFun(data);

                if (curGridMethod.loadSuccessFun != null)
                    curGridMethod.loadSuccessFun(data);
            }

            function onRowContextMenu(e, rowIndex, rowData) {
                showContextMenu(e);
            }

            function onContextMenu(e, row) {
                showContextMenu(e);
            }
            function onHeaderContextMenu(e, field) {
                showHeaderMenu(e);
            }

            function showContextMenu(e) {
                if (!op.canExport) return;

                e.preventDefault();
                if (!cmenu) {
                    createContextMenu();
                }
                cmenu.menu('show', { left: e.pageX, top: e.pageY });
            }
            function showHeaderMenu(e) {
                e.preventDefault();
                if (!hmenu) {
                    createColumnMenu();
                }
                hmenu.menu('show', { left: e.pageX, top: e.pageY });
            }



            function createContextMenu() {
                cmenu = $('<div/>').appendTo('body');
                cmenu.menu({
                    onClick: function (item) {
                        try {
                            rtn.toExcel();
                        }
                        catch (e) {
                            showNotice("导出时出现异常:" + e.message);
                        }
                    }
                });
                cmenu.menu("appendItem", { text: "导出到Excel", name: "toExcel", iconCls: "icon-save" });
            }

            function createColumnMenu() {
                hmenu = $('<div/>').appendTo('body');
                hmenu.menu({
                    onClick: function (item) {
                        if (item.iconCls == 'icon-ok') {
                            execGridMethodSetV('hideColumn', item.name);
                            hmenu.menu('setIcon', { target: item.target, iconCls: 'icon-empty' });
                        } else {
                            execGridMethodSetV('showColumn', item.name);
                            hmenu.menu('setIcon', { target: item.target, iconCls: 'icon-ok' });
                        }
                    }
                });
                var fields = execGridMethod('getColumnFields');
                for (var i = 0; i < fields.length; i++) {
                    var field = fields[i];
                    var col = grid.datagrid('getColumnOption', field);
                    hmenu.menu('appendItem', { text: col.title, name: field, iconCls: 'icon-ok' });
                }
            }

            function existRec(data, id) {
                if (RS.Lib.isEmpty(id)) return false;
                try {
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        var kv = getRowIDValue(item);
                        if (kv == id) {
                            return true;
                        }
                        else {
                            if (op.isTreeGrid) {
                                if (item.children != null && item.children != undefined) {
                                    try {
                                        if (item.children.length > 0) {
                                            var hasRec = existRec(item.children, id);
                                            if (hasRec) return hasRec;
                                        }
                                    }
                                    catch (e) { }
                                }
                            }
                        }
                    }
                }
                catch (e) { }
                return false;
            }

            function onGridStyler(rowIndex, rowData) {
                var fun = curGridMethod.rowStylerFun;
                if (fun != null) {
                    try {
                        return fun(rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                        return "";
                    }
                }
                else
                    return "";
            }

            function onTreeStyler(rowData) {
                var fun = curGridMethod.rowStylerFun;
                if (fun != null) {
                    try {
                        return fun(rowData.dataItemEntity);
                    }
                    catch (e) {
                        showNotice("Error:" + e.message);
                        return "";
                    }
                }
                else
                    return "";
            }


            //处理列的函数
            //外理要分组的行，分组是从第一列开始，如果中间有间断，则中止
            var isHasNoMerge = false;//中间是否有间断
            var headRows = op.columns;
            for (var rowI = 0; rowI < headRows.length; rowI++) {
                try {
                    var row = headRows[rowI];
                    for (var colI = 0; colI < row.length; colI++) {
                        try {
                            var col = row[colI];
                            if (col.isRowMerge) {
                                if (!isHasNoMerge && RS.Lib.isNotEmpty(col.field)) {
                                    mergeColArr.push({prefixValue:[], prevValue: null, op: { index: colI, field: col.field, rowspan: 1 } });
                                }
                            }
                            else if (!isHasNoMerge)
                                isHasNoMerge = true;

                            if (col.styler != null && col.styler != "") {
                                var fun = RS.Lib.parseFun(col.styler);
                                if (fun != null) {
                                    col.styler = fun;
                                }
                                else {
                                    col.styler = null;
                                }
                            }
                            else
                                col.styler = null;

                            if (col.styler == null) col.styler = undefined;

                            if (col.formatter != null && col.formatter != "") {
                                var fun = RS.Lib.parseFun(col.formatter);
                                if (fun != null) {
                                    col.formatter = fun;
                                }
                                else {
                                    col.formatter = null;
                                }
                            }
                            else
                                col.formatter = null;
                            if (col.formatter == null) col.formatter = undefined;
                        }
                        catch (e) { }
                    }
                }
                catch (e1) { }
            }

            //定义时不再直接加载数据
            if (op.isTreeGrid) {
                json = {
                    fit: true,
                    columns: op.columns,
                    striped: op.striped,
                    nowrap: op.nowrap,
                    border: false,
                    idField: op.idfield,
                    pagination: op.pagination,
                    rownumbers: op.rownumbers,
                    title: op.title,
                    selectOnCheck: !op.singleSelect,
                    checkOnSelect: !op.singleSelect,
                    singleSelect: op.singleSelect,//是否支持单选
                    autoRowHeight: false,//op.atuoRowHeight,//行高是否自动
                    pageSize: op.pageSize,//每页的大小
                    remoteSort: op.remoteSort,//是否支持远程数据加载
                    showFooter: op.showFooter,//是否显示页脚                
                    fitColumns: false,
                    toolbar: (op.hasFilter || op.hasFun) ? "#" + op.id + "Tool" : null, //op.operateFuns,
                    queryParams: op.queryParams,
                    cache: false,
                    treeField: op.treeField,
                    animate: true,
                    rowStyler: onTreeStyler,
                    onContextMenu: onContextMenu,
                    onHeaderContextMenu: onHeaderContextMenu,
                    onLoadError: function (e) {
                        if (e.responseText != "") {
                            try {
                                var jobj = JSON.parse(e.responseText);
                                if (jobj != null) {
                                    showNotice(jobj.Message + (RS.Lib.isNotEmpty(jobj.Error) ? ":" + jobj.Error : ""));
                                }
                                else
                                    showNotice("加载数据出错了:" + e.responseText);
                            }
                            catch (e1) {
                                showNotice("加载数据出错了:" + e.responseText);
                            }
                        }
                        else {
                            showNotice("加载数据出错了");
                        }
                    },
                    onBeforeLoad: function (row, param) {

                    },
                    onLoadSuccess: onTreeLoadSuccess,
                    onClickRow: op.isTreeGrid ? onTreeClickRow : onGridClickRow,
                    onDblClickRow: op.isTreeGrid ? onTreeDblClickRow : onGridDblClickRow,
                    onClickCell: op.isTreeGrid ? onTreeClickCell : onGridClickCell,
                    onDblClickCell: op.isTreeGrid ? onTreeDblClickCell : onGridDblClickCell,
                    onSelect: onTreeSelect,
                    onUnselect: onTreeUnselect,
                    onSelectAll: onSelectAll,
                    onUnselectAll: onUnselectAll
                };
            }
            else {
                json = {
                    fit: true,
                    columns: op.columns,
                    striped: op.striped,
                    nowrap: op.nowrap,
                    title: op.title,
                    border: false,
                    idField: op.idfield,
                    pagination: op.pagination,
                    rownumbers: op.rownumbers,//是否要显示数字行列
                    selectOnCheck: !op.singleSelect,
                    checkOnSelect: !op.singleSelect,
                    singleSelect: op.singleSelect,//是否支持单选
                    autoRowHeight: op.atuoRowHeight,//行高是否自动
                    pageSize: op.pageSize,//每页的大小
                    remoteSort: op.remoteSort,//是否支持远程数据加载
                    showFooter: op.showFooter,//是否显示页脚                
                    fitColumns: false,
                    toolbar: (op.hasFilter || op.hasFun) ? "#" + op.id + "Tool" : null, //op.operateFuns,
                    queryParams: op.queryParams,
                    cache: false,
                    rowStyler: onGridStyler,
                    onLoadError: function (e) {
                        if (e.responseText != "") {
                            try {
                                var jobj = JSON.parse(e.responseText);
                                if (jobj != null) {
                                    showNotice(jobj.Message + (RS.Lib.isNotEmpty(jobj.Error) ? ":" + jobj.Error : ""));
                                }
                                else
                                    showNotice("加载数据出错了:" + e.responseText);
                            }
                            catch (e1) {
                                showNotice("加载数据出错了:" + e.responseText);
                            }
                        }
                        else {
                            showNotice("加载数据出错了");
                        }
                    },
                    onHeaderContextMenu: onHeaderContextMenu,
                    onRowContextMenu: onRowContextMenu,
                    onLoadSuccess: onGridLoadSuccess,
                    onClickRow: onGridClickRow,
                    onDblClickRow: onGridDblClickRow,
                    onClickCell: onGridClickCell,
                    onDblClickCell: onGridDblClickCell,
                    onSelect: onSelect,
                    onUnselect: onUnselect,
                    onSelectAll: onSelectAll,
                    onUnselectAll: onUnselectAll
                };
            }

      



            if (!op.hasFilter) {
                if (op.getFilterFun != null && op.getFilterFun != undefined) {
                    rtn.filter = op.getFilterFun();
                    if (rtn.filter == null) {
                        json.url = op.url;
                    }
                }
                else
                    json.url = op.url;
            }
            else if (op.gridFilter == null || op.gridFilter == undefined)
                json.url = op.url;
            else if (op.gridFilter.shortcutItems == null || op.gridFilter.shortcutItems == undefined)
                json.url = op.url;
            else if (op.gridFilter.shortcutItems.length == 0)
                json.url = op.url;
            
            /*
            菜单功能初始化,
            先进行菜单功能初始化，以便加载数据时决定哪些按钮呈现或可用
            */
            var funUrl = op.funCheckUrl;
            var getParaMethod = op.CheckParamFun;
            var setFunBtnMethod = op.setFunBtnMethod;

            if (op.operateFuns != null && op.operateFuns != undefined && op.operateFuns.length > 0) {
                //进行功能按钮区初始化
                var btnJson = {
                    id: op.id + "Fun",
                    operateFuns: op.operateFuns,
                    funCheckUrl: op.funCheckUrl,
                    checkParamFun: op.CheckParamFun,
                    setFunBtnMethod: op.setFunBtnMethod,
                    buttonStyle: 1
                };

                var div = $("#" + op.id + "Fun");
                div.css("border-bottom", "1px solid #cfcfcf");
                div.css("line-height", "25px");
                div.height(28);

                for (var i = 0; i < op.operateFuns.length; i++) {
                    var fun = op.operateFuns[i];
                    var ae = $("<a href=\"javascript:;\" id=\"" + fun.id + "\">" + fun.text + "</a>");
                    div.append(ae);
                }

                rtn.fun = div.funPanel(btnJson);
            }
            else {
                if (op.getFunPanelFun != null && op.getFunPanelFun != undefined) {
                    rtn.fun = op.getFunPanelFun();
                }
            }
            function initBindGrid() {
                execGridMethod(json);

                if (op.isTreeGrid && op.pagination) {
                    grid.treegrid().treegrid('clientPaging');
                }

                isRunInit = true;

                //设置列头为粗体
                $(".datagrid-header-row td div span").each(function (i, th) {
                    var val = $(th).text();
                    $(th).css("font-weight", "bold");
                });
            }
            /*
            对于过滤，还需要进一步完善的功能有：
            1、控制各项是否显示
            2、控制各项列出的值
            3、要支持外部附加过滤条件，并由代码进行控制
            */
            //执行过滤查询
            function execFilterSql(items) {
                curFilterItems = items;
                var myop = execGridMethod("options");
                myop.queryParams.Filter = JSON.stringify(items);
                this.selectedIndex = -1;//当前操作行的索引
                this.selectedItem = null;//当前操作行的值,当前光标选中位置
                this.value = "";//当前操作行的主键值，
                this.selectedItems = [];//当前选中行的实际值
                runUnSelectRow();

                if (curGridMethod.execFilterSqlFun != null)
                {
                    curGridMethod.execFilterSqlFun(rtn);
                    return;
                }                

                if (rtn.beforeFilter != null)
                {
                    rtn.beforeFilter(rtn);
                }

                if (op.isTreeGrid) {
                    RS.exec(myop.url, myop.queryParams, function (rtn) {
                        grid.treegrid("loadData", rtn);
                    }, function (errMsg) {
                        showNotice("加载数据出现异常：" + errMsg);
                    });
                }
                else
                    execGridMethodSetV("load", myop.queryParams);

                if (rtn.afterFilter != null)
                    rtn.afterFilter(rtn);
            }

            var isHasFilterRun = false;
            //初始化过滤条件后激活事件
            function initFilter(filterJson) {
                if (op.gridFilter.shortcutItems.length > 0) {
                    isHasFilterRun = true;
                    if (curGridMethod.init != null) {
                        filterJson.initFun = function (arr) {
                            curFilterItems = arr;
                            json.queryParams.Filter = JSON.stringify(arr);
                            
                            if (curGridMethod.execFilterSqlFun != null)
                            {
                                var u = json.url;
                                json.url = "";
                                initBindGrid();
                                curGridMethod.execFilterSqlFun(rtn);
                            }
                            else {
                                rtn.init();

                                if (RS.Lib.isEmpty(json.url)) {
                                    if (RS.Lib.isNotEmpty(op.url)) {
                                        json.url = op.url;
                                    }
                                    initBindGrid();
                                }

                                if (rtn.afterFilter != null)
                                    rtn.afterFilter(rtn);
                            }
                        }
                    }
                    else {
                        filterJson.initFun = function (arr) {
                            curFilterItems = arr;
                            json.queryParams.Filter = JSON.stringify(arr);

                            if (curGridMethod.execFilterSqlFun != null) {
                                var u = json.url;
                                json.url = "";
                                initBindGrid();
                                curGridMethod.execFilterSqlFun(rtn);
                            }
                            else {

                                if (RS.Lib.isNotEmpty(op.url)) {
                                    json.url = op.url;
                                }
                                initBindGrid();
                                if (rtn.afterFilter != null)
                                    rtn.afterFilter(rtn);
                            }
                        }
                    }
                }
                else {

                }
            }

            if (op.hasFilter) {
                rtn.filter = $("#" + op.id + "Filter").filterPanel(op, { execFilter: execFilterSql, initFilter: initFilter });
            }
            else {
                if (op.getFilterFun != null && op.getFilterFun != undefined) {
                    rtn.filter = op.getFilterFun();
                    if (rtn.filter != null) {
                        rtn.filter.regGrid({ execFilter: execFilterSql, initFilter: initFilter });
                    }
                }
            }
            if (!isHasFilterRun) {
                if (!isRunInit && curGridMethod.init != null) { //还没有初始化，且有初始化函数
                    rtn.init();
                }
                if (!isRunInit) {
                    if (RS.Lib.isNotEmpty(op.url)) {
                        json.url = op.url;
                        initBindGrid();
                    }
                    else if (curGridMethod.init == null) //未设定初始函数
                    {
                        initBindGrid();
                    }
                }
            }
            return rtn;
        }
    })
})($);




