(function ($) {
    $.fn.extend({        
        layoutForm: function (options) {
            var form = $(this);//当前的编辑表单
            var areas = new Array();//用于存储当前表单中各区域
            var areaItems = [];//用于存储正常区域
            var areaTemplates = [];//用于存储模板区域，主要是用于呈现和隐藏
            var defaults = {
                id: '',
                areas: null,
                initFun:null
            };
            var op = $.extend(defaults, options);


            //先设置高度
            for (var i = 0; i < op.areas.length; i++) {
                try {
                    if (i == op.areas.length - 1) {
                        setFitHeight(op.areas[i]);
                    }
                }
                catch (e) { }
            }

            //进行tab处理
            this.find(".LayoutFormTabSript").tabs({ fit: true, border: true });

            var rtnObj = {
                hideTab: function (title) {
                    var taboption = form.find(".LayoutFormTabSript").tabs('getTab', title).panel('options').tab;
                    taboption.hide();
                },
                showTab: function (title) {
                    var taboption = form.find(".LayoutFormTabSript").tabs('getTab', title).panel('options').tab;
                    taboption.show();
                },
                setCaption:function(areaName,ItemName,title)
                {
                    var lbl = $("#" + areaName + "_" + ItemName + "_label");
                    if (lbl.length > 0)
                    {
                        var t = lbl.text();
                        if (t != null && t.indexOf("*：")>=0)
                            lbl.text(title + "*：");
                        else
                            lbl.text( title + "：");
                    }
                },
                getCaption:function(areaName,ItemName)
                {
                    var lbl = $("#" + areaName + "_" + ItemName + "_label");
                    if (lbl.length > 0) {
                        var t = lbl.text();
                        if (t != null && t.indexOf("*：") >= 0)
                            return t.substring(0, t.indexOf("*："));
                        else if (t != null && t.indexOf("：") >= 0)
                            return t.substring(0, t.indexOf("："));
                        else
                            return t;
                    }
                },
                getAreaData: function (areaName) {
                    if (areaName == null || areaName == undefined) {
                        var datas = {}// new Array();
                        for (var key in areas)
                            datas[key] = areas[key].getAreaData();
                        return datas;
                    }
                    else {
                        var area = this.getArea(areaName);
                        if (area != null)
                            return area.getData();
                        else
                            return null;
                    }
                },
                getArea: function (areaName) {
                    var area = areas[areaName];
                    if (area == null || area == undefined)
                        return null;
                    else
                        return area;
                },
                getEditor: function (areaName, itemName) {
                    var area = this.getArea(areaName);
                    return area.getEditor(itemName);
                },
                setAreaData: function (areaName, data) //设置各编辑区域值，编辑区域属性必须与对象相同
                {
                    var area = this.getArea(areaName);
                    if (area == null) return;//无该区域，则取消
                    area.setData(data);
                },
                updataObj: function (areaName, obj) {
                    var area = this.getArea(areaName);
                    if (area == null) return;//无该区域，则取消
                    area.updataObj(obj);
                },
                //获取指定区域编辑项的值，对于表格区域,则需要获取其索引
                setItemValue: function (areaName, itemName, value, rowIndex) {
                    var area = this.getArea(areaName);
                    if (area == null) return;
                    area.setItemValue(itemName, value);
                },
                getItemValue: function (areaName, itemName, rowIndex) {
                    var area = this.getArea(areaName);
                    if (area == null) return "";
                    return area.getItemValue(itemName);
                },
                setEnabled: function (areaName, itemName, IsEnabled) {
                    var area = this.getArea(areaName);
                    if (area == null) {
                        //则检查模板
                        for (var i = 0; i < areaTemplates.length; i++) {
                            var a = areaTemplates[i];
                            if (a.areaName == areaName) {
                                var div = $("#" + a.id);
                                if (div.length > 0) {
                                    if (IsEnabled)
                                        div.removeAttr("disabled");
                                    else
                                        div.attr("disabled","disabled");
                                }
                                break;
                            }
                        }
                        return;
                    }
                    else
                        area.setEnabled(itemName, IsEnabled);
                },
                setVisible: function (areaName, itemName, IsVisible) {
                    var area = this.getArea(areaName);
                    if (area == null) {
                        //则检查模板
                        for (var i = 0; i < areaTemplates.length; i++)
                        {
                            var a = areaTemplates[i];
                            if (a.areaName == areaName)
                            {
                                var div = $("#" + a.id);
                                if (div.length>0)
                                {
                                    if(IsVisible)
                                        div.show();
                                    else
                                        div.hide();
                                }
                                break;
                            }
                        }
                        return;
                    }
                    else
                        area.setVisible(itemName, IsVisible);
                },
                isValid: function () {
                    for (var i = 0; i < areaItems.length; i++) {
                        var area = this.getArea(areaItems[i]);
                        if (area != null) {
                            if (!area.isValid())
                                return false;
                        }
                    }
                    return true;
                }
            };


            for (var i = 0; i < op.areas.length; i++)
            {
                initArea(op.areas[i]);
            }

            //初始化各编辑区域(主要是初始化各编辑项)
            function initArea(layArea)
            {
                if (layArea.IsTemplate) {
                    areaTemplates.push(layArea);
                    return;
                }
                else {
                    areaItems.push(layArea.areaName);
                    if (layArea.layoutType == 1)
                        areas[layArea.areaName] = $("#" + layArea.id).layoutGrid(layArea, rtnObj);
                    else
                        areas[layArea.areaName] = $("#" + layArea.id).layoutArea(layArea, rtnObj);
                }

                if (layArea.childArea.length > 0) //有子级区域时
                {
                    for (var i = 0; i < layArea.childArea.length; i++)
                        initArea(layArea.childArea[i]);
                }
            }

            //设置自定义高度
            function setFitHeight(layArea)
            {
                if (layArea.childArea.length>0) //有子级
                {
                    var areadiv = $("#" + layArea.id);
                    if (layArea.repeatType != 1) {//按行排列
                        var cadiv = areadiv.next();
                        var th = areadiv.height();
                        var ch = cadiv.height();
                        var ph = areadiv.parent().height();
                        if (th + ch < ph)//不够高度
                        {
                            cadiv.height(ph - th);
                        }
                        if (ch > 150 && ph - th > 150) {
                            cadiv.height(ph - th);
                        }
                        if (layArea.repeatType == 2) //Tab方式排列
                        {
                            $(layArea.childArea).each(function (i, area) {
                                setFitHeight(area);
                            });
                        }
                        else {
                            setFitHeight(layArea.childArea[layArea.childArea.length - 1]);
                        }
                    }
                }
                else //无子级
                {
                    var areadiv = $("#" + layArea.id);
                    var pdiv = areadiv.parent();
                    var ph = pdiv.height();
                    var th=0;
                    pdiv.children().each(function (i,item) {
                        if (item != areadiv.get(0)) th += $(item).height();
                    });
                    var ch = areadiv.height();

                    if (layArea.layoutType == 1)
                    {
                        if (ch > 150 && ph - th > 150)
                            areadiv.height(ph-th);
                    }
                }
            }
            try {
                var fun = RS.Lib.parseFun(op.initFun);
                if (fun != null) {
                    fun(rtnObj);
                }
            }
            catch (e)
            { }
            return rtnObj;
        }
    });
})($);