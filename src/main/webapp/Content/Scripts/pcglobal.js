var shopCart = [];//购物车
var isSupportLocal = false;
if (localStorage) {
    isSupportLocal = true;
} else {
    isSupportLocal = false;
}
var isProdList = false;//当前是否为产品列表页

function request(paras) {
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
}



//缓存相关
//以下为适配(主要是针对app)
/**
 * localStorage保存数据
 * @param String key  保存数据的key值
 * @param String value  保存的数据
 */
function setLocVal(key, value) {
    try {
        if (isSupportLocal == true) //支持本地化存储
        {
            localStorage.setItem(key, value);
        }
        else {
            $.cookie(key, value);
        }
    } catch (e) { }
}

/**
 * 根据key取localStorage的值
 * @param Stirng key 保存的key值
 */
function getLocVal(key) {
    try {
        if (isSupportLocal == true) //支持本地化存储
        {
            var v = localStorage.getItem(key);
            if (v == null)
                return "";
            else
                return v;
        }
        else {
            var v = $.cookie(key);
            if (v == null)
                return "";
            else
                return v;
        }
    }
    catch (e) { }
}

/**
 * 清除缓存
 * @param Striong key  保存数据的key，如果不传清空所有缓存数据
 */
function clearLocVal(key) {
    try {
        if (isSupportLocal) {
            if (key)
                window.localStorage.removeItem(key);
            else
                window.localStorage.clear();
        }
        else {
            $.cookie(key, null);
        }
    }
    catch (e) {

    }
}

function clearCash() {
    try {
        if (isSupportLocal) {
            window.localStorage.clear();
        }
    }
    catch (e) {

    }
    showNotice("已清空完成");
}

//向购物车添加产品（注意，这个购物车不是报单中的购物车）
function addToShopCart(productCode, count) {
    if (shopCart.length > 100) {
        alert("购物车产品过多，添加到购物车失败");
        return;
    }


    var prod = { code: productCode, num: count };
    //检查产品中是否有该产品
    if (shopCart == null) shopCart = [];
    var hasP = false;//是否已在购物车中
    for (var i = 0; i < shopCart.length; i++) {
        var p = shopCart[i];
        if (p.code == productCode) {
            p.num += count;
            hasP = true;
        }
    }
    if (!hasP) {
        shopCart.push(prod);
        refShopCartNum();
    }
    locSaveToCart();
}

/*改变购物车产品数量*/
function changeShopcartNum(code,newcount)
{
    var hasP = false;//是否已在购物车中
    if (newcount<=0) //移除
    {
        var newArr = [];
        for (var i = 0; i < shopCart.length; i++) {
            var p = shopCart[i];
            if (p.code != code) {
                newArr.push(p);
                hasP = true;
            }
        }
        shopCart = newArr;
    }
    else
    {
        for (var i = 0; i < shopCart.length; i++) {
            var p = shopCart[i];
            if (p.code == code) {
                p.num = newcount;
                hasP = true;
            }
        }
        if (hasP!=true) //不在
        {
            var prod = { code: code, num: newcount };
            shopCart.push(prod);
            refShopCartNum();
        }
    }
    locSaveToCart();
}





function locSaveToCart() {
    if (shopCart == null) shopCart = [];
    var json = JSON.stringify(shopCart);
    setLocVal("shopCart", json);
}
function locReadToCart() {
    var json = getLocVal("shopCart");
    if (json == null || json == "") {
        shopCart = [];
        return;
    }
    else {
        shopCart = JSON.parse(json);
    }
}
//刷新购物车数量
function refShopCartNum() {
    try {
        var div = $(".shoppingCart");
        if (div.length > 0) {
            div.html(shopCart.length);
        }
    }
    catch (e) {

    }
}

function clearShopCart() {
    clearLocVal("shopCart");
    shopCart = [];
    refShopCartNum();
}

$(function () {
    locReadToCart();
    refShopCartNum();
});

function gotoLoginPage() {
    location.href = apollo.pageInfo.rootvpath + "Home/Login?FromShopCart=1";
}

function gotoShoppingCart() {
    if (shopCart.length == 0) {
        alert("购物车没有产品");
        return;
    }
    location.href = apollo.pageInfo.rootvpath + "Home/ShopCart";
}

/*转入具体购物类型*/
function gotoSaleReg(type)
{
    if (type=="2") //普通消费或2次购物
    {
        //先检测是否已登录
        var successFun = function (rtn) {
            if (rtn.IsSuccess == true)//已登录
            {
                var u = rtn.ReturnValue;
                var url = "", name = "";
                if (u.IsShopUser == true) {
                    url = apollo.pageInfo.rootvpath + "Sale/JXSBuy/Index?SaleTypeID=5&FromShopCart=1"; //进入经销商二次进货
                }
                else {
                    url = apollo.pageInfo.rootvpath + "Sale/BusiBuy/Index?SaleTypeID=10&FromShopCart=1";//进入会员普通消费
                }
                location.href = url;
            }
            else {
                gotoLoginPage();
            }
        };
        apollo.UCenter.CheckIsLogined(successFun);
    }
    else if (type=="1") //经销商注册
        location.href = apollo.pageInfo.rootvpath + "Reg/JXSReg/Index?FromShopCart=1";//进入注册
    else //进入会员注册
        location.href = apollo.pageInfo.rootvpath + "Reg/BusiReg/Index?FromShopCart=1";//进入注册
}