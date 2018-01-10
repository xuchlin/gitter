
//以下为webAPI JS版
//报单表单检测相关API方法，对应于API-CheckController
var ApolloYGApi = function () {
    apollo.Check = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/CheckApi/",
        CheckIsIDCode: function (data) {
            return {
                url: apollo.Check.currentPath + "CheckIsIDCode",
                type: "post",
                dataType: "json",
                data: data
            };
        },
        CheckIsMobile: function (data) {
            return {
                url: apollo.Check.currentPath + "CheckIsMobile",
                type: "post",
                dataType: "json",
                data: data
            };
        },
        CheckIsPassword: function (data) {
            return {
                url: apollo.Check.currentPath + "CheckIsPassword",
                type: "post",
                dataType: "json",
                data: data
            };
        },
        CheckIsBankCode: function (data) {
            return {
                url: apollo.Check.currentPath + "CheckIsBankCode",
                type: "post",
                dataType: "json",
                data: data
            };
        },
        CheckIsBirthday: function (data) {
            return {
                url: apollo.Check.currentPath + "CheckIsBirthday",
                type: "post",
                dataType: "json",
                data: data
            };
        },
        CheckGood: function (data) {
            return {
                url: apollo.Check.currentPath + "CheckGood",
                type: "post",
                dataType: "json",
                data: data
            };
        },
        CheckIsValidForTerminal: function (data) {
            return {
                url: apollo.Check.currentPath + "CheckIsValidForTerminal",
                type: "post",
                dataType: "json",
                data: data
            };
        },
        CheckGetInfoForParentCode: function (ParentCode, DownCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ParentCode: ParentCode, DownCode: DownCode };
            apollo.exec(apollo.Check.currentPath + "CheckGetInfoForParentCode", param, successFun, errorFun);
        },
        CheckGetInfoForFromBusinessCode: function (FromBusinessCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { FromBusinessCode: FromBusinessCode };
            apollo.exec(apollo.Check.currentPath + "CheckGetInfoForFromBusinessCode", param, successFun, errorFun);
        }
    };

    apollo.UCenter = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/UCenterApi/",
        Login: function (uid, pwd, code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { uid: uid, pwd: pwd, code: code };
            apollo.exec(apollo.UCenter.currentPath + "Login", param, successFun, errorFun);
        },
        LoginForNoCode: function (uid, pwd, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { uid: uid, pwd: pwd };
            apollo.exec(apollo.UCenter.currentPath + "LoginForNoCode", param, successFun, errorFun);
        },
        Logout: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.UCenter.currentPath + "Logout", param, successFun, errorFun);
        },
        UpdatePassword: function (OldPassword, NewPassword, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { OldPassword: OldPassword, NewPassword: NewPassword };
            apollo.exec(apollo.UCenter.currentPath + "UpdatePassword", param, successFun, errorFun);
        },
        //UpdatePasswordForQuerySys: function (OldPassword, NewPassword, successFun, errorFun) {
        //    if(errorFun == null || errorFun == undefined) errorFun = apollo.onError;
        //    var param = { OldPassword : OldPassword, NewPassword: NewPassword };
        //    apollo.exec(apollo.UCenter.currentPath + "UpdatePasswordForQuerySys", param, successFun, errorFun);
        //},
        UpdatePasswordForQuerySys: function (OldPassword, NewPassword,IsModifyShop, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { OldPassword: OldPassword, NewPassword: NewPassword, IsModifyShop: IsModifyShop };
            apollo.exec(apollo.UCenter.currentPath + "UpdatePasswordForQuerySys", param, successFun, errorFun);
        },
        UpdatePasswordForQuerySysNotLogin: function (BusinessCode,Sign, OldPassword, NewPassword, IsModifyShop, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {BusinessCode:BusinessCode,Sign:Sign, OldPassword: OldPassword, NewPassword: NewPassword, IsModifyShop: IsModifyShop };
            apollo.exec(apollo.UCenter.currentPath + "UpdatePasswordForQuerySysNotLogin", param, successFun, errorFun);
        },
        IsFirstUpdatePasswordForTwoLevel: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.UCenter.currentPath + "IsFirstUpdatePasswordForTwoLevel", param, successFun, errorFun);
        },
        UpdatePasswordForTwoLevel: function (OldPassword, NewPassword, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { OldPassword: OldPassword, NewPassword: NewPassword };
            apollo.exec(apollo.UCenter.currentPath + "UpdatePasswordForTwoLevel", param, successFun, errorFun);
        },
        ValidateForTwoLevel: function (Password, from, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { Password: Password, From: from };
            apollo.exec(apollo.UCenter.currentPath + "ValidateForTwoLevel", param, successFun, errorFun);
        },
        ValidateForDynamicPwd: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            //var param = { Password: Password, From: from };
            apollo.exec(apollo.UCenter.currentPath + "ValidateForDynamicPwd", param, successFun, errorFun);
        },
        WXBoundValidateForDynamicPwd: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            //var param = { Password: Password, From: from };
            apollo.exec(apollo.UCenter.currentPath + "WXBoundValidateForDynamicPwd", param, successFun, errorFun);
        },
        CheckIsLogined: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.UCenter.currentPath + "CheckIsLogined", param, successFun, errorFun);
        },
        WXBoundLogin: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.UCenter.currentPath + "WXBoundLogin", param, successFun, errorFun);
        },
        WXSameideBound: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.UCenter.currentPath + "WXSameideBound", param, successFun, errorFun);
        },
        UserWeixinUnBound: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.UCenter.currentPath + "UserWeixinUnBound", param, successFun, errorFun);
        },
        UserWeixinUnBoundByOnlyOne: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.UCenter.currentPath + "UserWeixinUnBoundByOnlyOne", param, successFun, errorFun);
        },
        QueryLogin: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.UCenter.currentPath + "QueryLogin", param, successFun, errorFun);
        },
        QueryWXAutoLogin: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.UCenter.currentPath + "QueryWXAutoLogin", param, successFun, errorFun);
        },
        OnNextEditProFile: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.UCenter.currentPath + "OnNextEditProFile", param, successFun, errorFun);
        }
    };
    /*订货产品选购相关jsAPI*/
    //选购产品相关API方法，对应于API-SelProductController
    apollo.SelProduct = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/SelProductApi/",
        /*获取当前订货对象在购物车显示的提示信息*/
        GetSaleProductInfo: function (EntityJson,ProductCode, SaleType, ShopCode, LevelID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {
                EntityJson:EntityJson,
                ProductCode: ProductCode,
                SaleType: SaleType,
                LevelID: LevelID,
                ShopCode: ShopCode
            };
            apollo.exec(apollo.SelProduct.currentPath + "GetSaleProductInfo", param, successFun, errorFun);
        },
        GetSaleProductItems: function (EntityJson, ProductCodes, SaleType, SearchValue, ProductType, ClassType, IsNeedProduct, PageIndex, PageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {
                EntityJson: EntityJson,
                ProductCodes: ProductCodes,
                SaleType: SaleType,
                SearchValue: SearchValue,
                ProductType: ProductType,
                ClassType: ClassType,
                IsNeedProduct: IsNeedProduct,
                PageIndex: PageIndex,
                PageSize: PageSize //每页显示30个产品
            };
            apollo.exec(apollo.SelProduct.currentPath + "GetSaleProductItems", param, successFun, errorFun);
        },
        GetPtsAndCts: function (SaleTypeID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleTypeID: SaleTypeID };
            apollo.exec(apollo.SelProduct.currentPath + "GetPtsAndCts", param, successFun, errorFun);
        },
        GetBasketTip: function (SaleType, EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleType: SaleType, EntityJson: EntityJson };
            apollo.exec(apollo.SelProduct.currentPath + "GetBasketTip", JSON.stringify(param), successFun, errorFun);
        },
        CheckIsValidProducts: function (SaleType, EntityJson, Products, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleType: current.EntityType, EntityJson: JSON.stringify(current), Products: JSON.stringify(bill.Products) };
            apollo.exec(apollo.SelProduct.currentPath + "CheckIsValidProducts", JSON.stringify(param), successFun, errorFun);
        },
        GetCXProductCodes: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.SelProduct.currentPath + "GetCXProductCodes", param, successFun, errorFun);
        },
        GetSaleProductsAndClass: function (SaleTypeID, EntityJson, SaleType, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleTypeID: SaleTypeID, EntityJson: EntityJson, SaleType: SaleType };
            apollo.exec(apollo.SelProduct.currentPath + "GetSaleProductsAndClass", param, successFun, errorFun);
        }
    };

    /*报单公共API，对应于API-SelProductController*/
    apollo.Common = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/CommonApi/",
        GetProvinces: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Common.currentPath + "GetProvinces", {}, successFun, errorFun);
        },
        GetCitys: function (ProvinceID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ProvinceID: ProvinceID };
            apollo.exec(apollo.Common.currentPath + "GetCitys", param, successFun, errorFun);
        },
        GetCountys: function (CityID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { CityID: CityID };
            apollo.exec(apollo.Common.currentPath + "GetCountys", param, successFun, errorFun);
        },
        GetAllCitys: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Common.currentPath + "GetAllCitys", param, successFun, errorFun);
        },
        GetAllCountys: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Common.currentPath + "GetAllCountys", param, successFun, errorFun);
        },
        GetFullAddress: function (ProvinceID, CityID, CountyID, Address, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ProvinceID: ProvinceID, CityID: CityID, CountyID: CountyID, Address: Address };
            apollo.exec(apollo.Common.currentPath + "GetFullAddress", param, successFun, errorFun);
        },
        GetPaymentUrl: function (PlatForm, RequestID, YHGKCode, m, MyCode, ShopCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PlatForm: PlatForm, RequestID: RequestID, YHGKCode: YHGKCode, m: m, MyCode: MyCode, ShopCode: ShopCode };
            apollo.exec(apollo.Common.currentPath + "GetPaymentUrl", param, successFun, errorFun);
        },
        GetPaymentUrlNoParam: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Common.currentPath + "GetPaymentUrlNoParam", {}, successFun, errorFun);
        },
        GetPaymentUrlForQuery: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            //var param = { PlatForm: PlatForm, RequestID: RequestID, YHGKCode: YHGKCode, m: m, MyCode: MyCode, ShopCode: ShopCode };
            apollo.exec(apollo.Common.currentPath + "GetPaymentUrlForQuery", param, successFun, errorFun);
        },
        Base64ToImage: function (base64, fn, BusinessCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { Base64: base64, fn: fn, BusinessCode: BusinessCode };
            apollo.exec(apollo.Common.currentPath + "Base64ToImage", param, successFun, errorFun);
        },
        UploadImageForPC: function (file, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { file: file };
            apollo.exec(apollo.Common.currentPath + "UploadImageForPC", param, successFun, errorFun);
        },
        //促销政策相关
        GetCxInfos: function (ProductCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ProductCode: ProductCode };
            apollo.exec(apollo.Common.currentPath + "GetCxInfos", param, successFun, errorFun);
        },
        GetCxExplain: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Common.currentPath + "GetCxExplain", param, successFun, errorFun);
        },

        GetGiveInfosForProduct: function (SaleType, EntityJson, ProductCode, SaleNum, SaleMoney, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleType: SaleType, EntityJson: EntityJson, ProductCode: ProductCode, SaleNum: SaleNum, SaleMoney: SaleMoney };
            apollo.exec(apollo.Common.currentPath + "GetGiveInfosForProduct", param, successFun, errorFun);
        },
        GetGiveInfos: function (SaleType, EntityJson, SaleProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleType: SaleType, EntityJson: EntityJson, SaleProductsJson: SaleProductsJson };
            apollo.exec(apollo.Common.currentPath + "GetGiveInfos", param, successFun, errorFun);
        },
        CheckAndGetGiveInfoForProduct: function (SaleType, EntityJson, ProductCode, SaleNum, SaleMoney, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleType: SaleType, EntityJson: EntityJson, ProductCode: ProductCode, SaleNum: SaleNum, SaleMoney: SaleMoney };
            apollo.exec(apollo.Common.currentPath + "CheckAndGetGiveInfoForProduct", param, successFun, errorFun);
        },
        CheckAndGetGiveInfo: function (SaleType, EntityJson, SaleProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleType: SaleType, EntityJson: EntityJson, SaleProductsJson: SaleProductsJson };
            apollo.exec(apollo.Common.currentPath + "CheckAndGetGiveInfo", param, successFun, errorFun);
        },
        GetGiveSelects: function (SaleType, EntityJson, SaleProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { SaleType: SaleType, EntityJson: EntityJson, SaleProductsJson: SaleProductsJson };
            apollo.exec(apollo.Common.currentPath + "GetGiveSelects", param, successFun, errorFun);
        },
        GetSaleBillList: function (ListType, PageIndex, PageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ListType: ListType, PageIndex: PageIndex, PageSize: PageSize };
            apollo.exec(apollo.Common.currentPath + "GetSaleBillList", param, successFun, errorFun);
        },
        GetSaleOrder: function (CashType, CashCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { CashType: CashType, CashCode: CashCode };
            apollo.exec(apollo.Common.currentPath + "GetSaleOrder", param, successFun, errorFun);
        },
        GetLogisticstTacking: function (CashType, CashCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { CashType: CashType, CashCode: CashCode };
            apollo.exec(apollo.Common.currentPath + "GetLogisticstTacking", param, successFun, errorFun);
        },
        GetUserMenus: function (successFun, errorFun) //获取当前用户功能菜单
        {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Common.currentPath + "GetUserMenus", param, successFun, errorFun);
        },
        GetPayList: function (PageIndex, PageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: PageIndex, PageSize: PageSize };
            apollo.exec(apollo.Common.currentPath + "GetPayList", param, successFun, errorFun);
        },
        GetShopList: function (PageIndex, PageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: PageIndex, PageSize: PageSize };
            apollo.exec(apollo.Common.currentPath + "GetShopList", param, successFun, errorFun);
        },
        GetInvoiceList: function (PageIndex, PageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: PageIndex, PageSize: PageSize };
            apollo.exec(apollo.Common.currentPath + "GetInvoiceList", param, successFun, errorFun);
        },
        SaveUserTrack: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Common.currentPath + "SaveUserTrack", param, successFun, errorFun);
        },
        //该方法已调整为GetPayData,为兼容app，这里仍旧采用
        GetPayData: function (PlatForm, RequestID, YHGKCode, MyCode, m, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PlatForm: PlatForm, RequestID: RequestID, YHGKCode: YHGKCode, MyCode: MyCode, m: m };
            apollo.exec(apollo.Common.currentPath + "GetPayData", param, successFun, errorFun);
        },
        //获取微信支付订单数据，param对象应包含：PlatForm, RequestID, YHGKCode, MyCode, m 这些参数信息
        GetPayBill: function (paramObj, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ParamJson: JSON.stringify(paramObj) };
            apollo.exec(apollo.Common.currentPath + "GetPayBill", param, successFun, errorFun);
        },
        GetWechatPayData: function (platForm, requestId, m, code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { platform: platForm, RequestID: requestId, m: m, Code: code };
            apollo.exec(apollo.Common.currentPath + "GetWechatPayData", param, successFun, errorFun);
        },
        LogError: function (content, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { Content: content };
            apollo.exec(apollo.Common.currentPath + "LogError", param, successFun, errorFun);
        },
        GetSXFee: function (PayMoney, ShopCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PayMoney: PayMoney, ShopCode: ShopCode };
            apollo.exec(apollo.Common.currentPath + "GetSXFee", param, successFun, errorFun);
        },
        GetBankInfo: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Common.currentPath + "GetBankInfo", param, successFun, errorFun);
        },
        DeleteSaleInfo: function (CashCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { CashCode: CashCode };
            apollo.exec(apollo.Common.currentPath + "DeleteSaleInfo", param, successFun, errorFun);
        },
        BeginShopEdit: function (ShopCode, EditSign, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ShopCode: ShopCode, EditSign: EditSign };
            apollo.exec(apollo.Common.currentPath + "BeginShopEdit", param, successFun, errorFun);
        },
        SaveShopEntity: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.Common.currentPath + "SaveShopEntity", param, successFun, errorFun);
        },
        CheckAuthorized: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Common.currentPath + "CheckAuthorized", param, successFun, errorFun);
        },
        GetReShopEditSign: function (ShopCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ShopCode: ShopCode };
            apollo.exec(apollo.Common.currentPath + "GetReShopEditSign", param, successFun, errorFun);
        },
        CreateBillForShopCart: function (ShopCartJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ShopCartJson: ShopCartJson };
            apollo.exec(apollo.Common.currentPath + "CreateBillForShopCart", param, successFun, errorFun);
        },
        GetTempStepInfos: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Common.currentPath + "GetTempStepInfos", param, successFun, errorFun);
        },
        GetScoreList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Common.currentPath + "GetScoreList", param, successFun, errorFun);
        },
        GetMyScoreStat: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Common.currentPath + "GetMyScoreStat", {}, successFun, errorFun);
        },
        BeginRealShopApply: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Common.currentPath + "BeginRealShopApply", param, successFun, errorFun);
        },
        SaveRealShopApply: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;            
            apollo.exec(apollo.Common.currentPath + "SaveRealShopApply", param, successFun, errorFun);
        },
        IsSetRealShopType: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Common.currentPath + "IsSetRealShopType", param, successFun, errorFun);
        },
        GetSaleRealNameShops: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Common.currentPath + "GetSaleRealNameShops", param, successFun, errorFun);
        },
        SetNoRealShop: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Common.currentPath + "SetNoRealShop", param, successFun, errorFun);
        }
    };

    //会员注册报单相关API方法，对应于API-BusiRegController*/
    apollo.BusiReg = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/BusiRegApi/",
        /*从购物车中直接进入注册*/
        BeginBusiRegForShopCart: function (BusinessCode, Sign, ShopCartJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { BusinessCode: BusinessCode, Sign: Sign, ShopCartJson: ShopCartJson };
            apollo.exec(apollo.BusiReg.currentPath + "BeginBusiReg", param, successFun, errorFun);
        },
        /*普通方式进入注册*/
        BeginBusiReg: function (BusinessCode, Sign, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { BusinessCode: BusinessCode, Sign: Sign };
            apollo.exec(apollo.BusiReg.currentPath + "BeginBusiReg", param, successFun, errorFun);
        },
        CheckRegInfo: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.BusiReg.currentPath + "CheckRegInfo", param, successFun, errorFun);
        },
        SumbitBill: function (EntityJson, ProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {
                EntityJson: EntityJson,
                ProductsJson: ProductsJson
            };
            apollo.exec(apollo.BusiReg.currentPath + "SumbitBill", param, successFun, errorFun);
        },
        GetOnlineMoney: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.BusiReg.currentPath + "GetOnlineMoney", param, successFun, errorFun);
        }
    };

    //经销商注册报单相关API方法，对应于API-BusiRegController*/
    apollo.JXSReg = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/JXSRegApi/",
        /*从购物车中直接进入注册*/
        BeginJXSRegForShopCart: function (ShopCode, FromShopCode, Sign, ShopCartJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ShopCode: ShopCode, FromShopCode: FromShopCode, Sign: Sign, ShopCartJson: ShopCartJson };
            apollo.exec(apollo.JXSReg.currentPath + "BeginJXSReg", param, successFun, errorFun);
        },
        /*普通方式进入注册*/
        BeginJXSReg: function (ShopCode, FromShopCode, Sign, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ShopCode: ShopCode, FromShopCode: FromShopCode, Sign: Sign };
            apollo.exec(apollo.JXSReg.currentPath + "BeginJXSReg", param, successFun, errorFun);
        },
        CheckRegInfo: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.JXSReg.currentPath + "CheckRegInfo", param, successFun, errorFun);
        },
        CheckRegRealShop: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.JXSReg.currentPath + "CheckRegRealShop", param, successFun, errorFun);
        },
        SumbitBill: function (EntityJson, ProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson, ProductsJson: ProductsJson };
            apollo.exec(apollo.JXSReg.currentPath + "SubmitBill", param, successFun, errorFun);
        },
        InitBaskets: function (EntityJson, ProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson, ProductsJson: ProductsJson };
            apollo.exec(apollo.JXSReg.currentPath + "InitBaskets", param, successFun, errorFun);
        },
        GetOnlineMoney: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.JXSReg.currentPath + "GetOnlineMoney", param, successFun, errorFun);
        },
        UpdateBasketProducts: function (EntityJson, ProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson, ProductsJson: ProductsJson };
            apollo.exec(apollo.JXSReg.currentPath + "UpdateBasketProducts", param, successFun, errorFun);
        }
    };

    //电商会员报单相关API方法
    apollo.BusiBuy = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/BusiBuyApi/",
        BeginBusiBuy: function (CashCode, SaleTypeID, ShopCartJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { CashCode: CashCode, SaleTypeID: SaleTypeID, ShopCartJson: ShopCartJson };
            apollo.exec(apollo.BusiBuy.currentPath + "BeginBusiBuy", param, successFun, errorFun);
        },
        CheckBuyInfo: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.BusiBuy.currentPath + "CheckBuyInfo", param, successFun, errorFun);
        },
        SumbitBill: function (EntityJson, ProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {
                EntityJson: EntityJson,
                ProductsJson: ProductsJson
            }

            apollo.exec(apollo.BusiBuy.currentPath + "SumbitBill", param, successFun, errorFun);
        },
        GetOnlineMoney: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.BusiBuy.currentPath + "GetOnlineMoney", param, successFun, errorFun);
        }
    }

    //授权经销报单相关API方法
    apollo.JXSBuy = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/JXSBuyApi/",
        BeginJXSBuy: function (CashCode, SaleTypeID, ShopCartJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { CashCode: CashCode, SaleTypeID: SaleTypeID, ShopCartJson: ShopCartJson };
            apollo.exec(apollo.JXSBuy.currentPath + "BeginJXSBuy", param, successFun, errorFun);
        },
        CheckJXSBuyInfo: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.JXSBuy.currentPath + "CheckJXSBuyInfo", param, successFun, errorFun);
        },
        SaveBill: function (EntityJson, ProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {
                EntityJson: EntityJson,
                ProductsJson: ProductsJson
            }

            apollo.exec(apollo.JXSBuy.currentPath + "SaveBill", param, successFun, errorFun);
        },
        SubmitBill: function (CashCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { CashCode: CashCode };
            apollo.exec(apollo.JXSBuy.currentPath + "SubmitBill", param, successFun, errorFun);
        },
        GetOnlineMoney: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.JXSBuy.currentPath + "GetOnlineMoney", param, successFun, errorFun);
        },
        GetSHAddressList: function (ShopCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ShopCode: ShopCode };
            apollo.exec(apollo.JXSBuy.currentPath + "GetSHAddressList", param, successFun, errorFun);
        },
        ChangeSHAddress: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.JXSBuy.currentPath + "ChangeSHAddress", param, successFun, errorFun);
        },
        GetCustomInfo: function (ProductCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ProductCode: ProductCode };
            apollo.exec(apollo.JXSBuy.currentPath + "GetCustomInfo", param, successFun, errorFun);
        },
        GetCustomInfoForUpdate: function (ProductCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ProductCode: ProductCode };
            apollo.exec(apollo.JXSBuy.currentPath + "GetCustomInfoForUpdate", param, successFun, errorFun);
        },
        SaveCustomInfo: function (id, idType, CustomInfoJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { id: id, idType: idType, CustomInfoJson: CustomInfoJson };
            apollo.exec(apollo.JXSBuy.currentPath + "SaveCustomInfo", param, successFun, errorFun);
        },
        GetDefineParamExp: function (jsonEntity, ProductCode, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { jsonEntity: jsonEntity, ProductCode: ProductCode };
            apollo.exec(apollo.JXSBuy.currentPath + "GetDefineParamExp", param, successFun, errorFun);
        },
        UpdateBasketProducts: function (EntityJson, ProductsJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson, ProductsJson: ProductsJson };
            apollo.exec(apollo.JXSBuy.currentPath + "UpdateBasketProducts", param, successFun, errorFun);
        },
        ReflashJXSBuyForPayed: function (EntityJson, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: EntityJson };
            apollo.exec(apollo.JXSBuy.currentPath + "ReflashJXSBuyForPayed", param, successFun, errorFun);
        }
    };

    //首页相关API方法
    apollo.Home = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/HomeApi/",
        GetMarketInfoList: function (PageIndex, PageSize, AppInfoType, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: PageIndex, PageSize: PageSize, AppInfoType: AppInfoType };
            apollo.exec(apollo.Home.currentPath + "GetMarketInfoList", param, successFun, errorFun);
        },
        GetMarketInfo: function (ID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ID: ID };
            apollo.exec(apollo.Home.currentPath + "GetMarketInfo", param, successFun, errorFun);
        },
        GetHelpList: function (PageIndex, PageSize, TypeID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: PageIndex, PageSize: PageSize, TypeID: TypeID };
            apollo.exec(apollo.Home.currentPath + "GetHelpList", param, successFun, errorFun);
        },
        GetHelpInfo: function (HelpID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { HelpID: HelpID };
            apollo.exec(apollo.Home.currentPath + "GetHelpInfo", param, successFun, errorFun);
        },
        GetCurrCXInfo: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Home.currentPath + "GetCurrCXInfo", param, successFun, errorFun);
        },
        GetCXInfo: function (CXMainID, CXDetailID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { CXMainID: CXMainID, CXDetailID: CXDetailID };
            apollo.exec(apollo.Home.currentPath + "GetCXInfo", param, successFun, errorFun);
        },
        GetScrollPics: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Home.currentPath + "GetScrollPics", param, successFun, errorFun);
        },
        GetHomeNavs: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Home.currentPath + "GetHomeNavs", param, successFun, errorFun);
        },
        mySystem: function (serialCode, mobileVersion, APPName, APPID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { serialCode: serialCode, mobileVersion: mobileVersion, APPName: APPName, APPID: APPID };
            apollo.exec(apollo.Home.currentPath + "mySystem", param, successFun, errorFun);
        },
        CheckHasNewVersion: function (AppVersion, SysType, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { AppVersion: AppVersion, SysType: SysType };
            apollo.exec(apollo.Home.currentPath + "CheckHasNewVersion", param, successFun, errorFun);
        },
        NewVersionIsFull: function (AppVersion, SysType, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { AppVersion: AppVersion, SysType: SysType };
            apollo.exec(apollo.Home.currentPath + "NewVersionIsFull", param, successFun, errorFun);
        },
        NewVersionInfo: function (AppVersion, SysType, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { AppVersion: AppVersion, SysType: SysType };
            apollo.exec(apollo.Home.currentPath + "NewVersionInfo", param, successFun, errorFun);
        },
        HealthMonitor: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Home.currentPath + "HealthMonitor", param, successFun, errorFun);
        },
        SaveUserTrack: function (AppDevID, Longitude, Latitude, Type, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { AppDevID: AppDevID, Longitude: Longitude, Latitude: Latitude, Type: Type };
            apollo.exec(apollo.Home.currentPath + "SaveUserTrack", param, successFun, errorFun);
        },
        GetSalePHB: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.Home.currentPath + "GetSalePHB", param, successFun, errorFun);
        }
    };

    apollo.OneShop = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/OneShopApi/",
        GetShopScore: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.OneShop.currentPath + "GetShopScore", param, successFun, errorFun);
        },
        GetShopScoreList: function (PageIndex, PageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: PageIndex, PageSize: PageSize };
            apollo.exec(apollo.OneShop.currentPath + "GetShopScoreList", param, successFun, errorFun);
        },
        GetScoreConvertList: function (PageIndex, PageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: PageIndex, PageSize: PageSize };
            apollo.exec(apollo.OneShop.currentPath + "GetScoreConvertList", param, successFun, errorFun);
        },
        SaveScoreInfo: function (businessCode, score, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { BusinessCode: businessCode, Score: score, IsToTwoShop: true };
            apollo.exec(apollo.OneShop.currentPath + "SaveScoreInfo", param, successFun, errorFun);
        }
    };

    apollo.Weixin = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/WeixinApi/",
        /*获取个人中心页面初始化json对象*/
        GetJsSDKConfig: function (url, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { URL: url };
            apollo.exec(apollo.Weixin.currentPath + "GetJsSDKConfig", param, successFun, errorFun);
        },
        SaveWXPhoto: function (mediaid, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { mediaid: mediaid };
            apollo.exec(apollo.Weixin.currentPath + "SaveWXPhoto", param, successFun, errorFun);
        },
        GetWXOAuth2UrlInfo: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Weixin.currentPath + "GetWXOAuth2UrlInfo", param, successFun, errorFun);
        },
        GetAppWeixinPayData: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Weixin.currentPath + "GetAppWeixinPayData", param, successFun, errorFun);
        },
        SaveUploadPhoto: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Weixin.currentPath + "SaveUploadPhoto", param, successFun, errorFun);
        }
    };

    apollo.AppPageInit = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/AppPageInitApi/",
        /*获取个人中心页面初始化json对象*/
        MainPageInit: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.AppPageInit.currentPath + "MainPageInit", param, successFun, errorFun);
        },
        ThemeShopInit: function (ThemeType, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ThemeType: ThemeType };
            apollo.exec(apollo.AppPageInit.currentPath + "ThemeShopInit", param, successFun, errorFun);
        },
        ThemeTwoShopInit: function (pt, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { pt: pt };
            apollo.exec(apollo.AppPageInit.currentPath + "ThemeTwoShopInit", param, successFun, errorFun);
        },
        GetIndexInit: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.AppPageInit.currentPath + "GetIndexInit", param, successFun, errorFun);
        },
        GetMarketListInit: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.AppPageInit.currentPath + "GetMarketListInit", param, successFun, errorFun);
        },
        GetSaleBillListInit: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.AppPageInit.currentPath + "GetSaleBillListInit", param, successFun, errorFun);
        },
        GetSelSaleTypeInit: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = {};
            apollo.exec(apollo.AppPageInit.currentPath + "GetSelSaleTypeInit", param, successFun, errorFun);
        }
    };

    /***********  微信订票类  ***********/
    apollo.Meet = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/MeetApi/",
        GetMeetingList: function (pageIndex, pageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: pageIndex, PageSize: pageSize };
            apollo.exec(apollo.Meet.currentPath + "GetMeetingList", param, successFun, errorFun);
        },
        GetMeetRequstList: function (DeployMeetingID, pageIndex, pageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID, PageIndex: pageIndex, PageSize: pageSize };
            apollo.exec(apollo.Meet.currentPath + "GetMeetRequstList", param, successFun, errorFun);
        },
        GetMeetRequestInfo: function (DeployMeetingID, RequestID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID, RequestID: RequestID };
            apollo.exec(apollo.Meet.currentPath + "GetMeetRequestInfo", param, successFun, errorFun);
        },
        GetMeetBaseInfo: function (DeployMeetingID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID };
            apollo.exec(apollo.Meet.currentPath + "GetMeetBaseInfo", param, successFun, errorFun);
        },
        GetMeetInfo: function (DeployMeetingID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID };
            apollo.exec(apollo.Meet.currentPath + "GetMeetInfo", param, successFun, errorFun);
        },
        SetNum: function (DeployMeetingID, RequestID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID, RequestID: RequestID };
            apollo.exec(apollo.Meet.currentPath + "SetNum", param, successFun, errorFun);
        },
        SubmitApplyRecord: function (DeployMeetingID, RequestID, postData, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID, RequestID: RequestID, PostData: JSON.stringify(postData) };
            apollo.exec(apollo.Meet.currentPath + "SubmitApplyRecord", param, successFun, errorFun);
        },
        PageInitValid: function (DeployMeetingID, RequestID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID, RequestID: RequestID };
            apollo.exec(apollo.Meet.currentPath + "PageInitValid", param, successFun, errorFun);
        },
        CheckAtendeeInfo: function (deployMeetingId, requestId, attendee, meet, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: deployMeetingId, RequestID: requestId, Meet: JSON.stringify(meet), Attendee: JSON.stringify(attendee) };
            apollo.exec(apollo.Meet.currentPath + "CheckAtendeeInfo", param, successFun, errorFun);
        },
        DeleteApplyRecord: function (DeployMeetingID, RequestID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID, RequestID: RequestID };
            apollo.exec(apollo.Meet.currentPath + "DeleteApplyRecord", param, successFun, errorFun);
        },
        GetRequestInfo: function (DeployMeetingID, RequestID, code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID, RequestID: RequestID, Code: code };
            apollo.exec(apollo.Meet.currentPath + "GetRequestInfo", param, successFun, errorFun);
        },
        SubmitPayReturn: function (DeployMeetingID, RequestID, m, code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { DeployMeetingID: DeployMeetingID, RequestID: RequestID, Money: m, Code: code };
            apollo.exec(apollo.Meet.currentPath + "SubmitPayReturn", param, successFun, errorFun);
        }
    };

    apollo.Customer = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/CustomerApi/",
        GetRecevierInfo: function (Code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { Code: Code };
            apollo.exec(apollo.Customer.currentPath + "GetRecevierInfo", param, successFun, errorFun);
        },
        GetProfile: function (Code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { Code: Code };
            apollo.exec(apollo.Customer.currentPath + "GetProfile", param, successFun, errorFun);
        },
        GetProfileDetail: function (Code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { Code: Code };
            apollo.exec(apollo.Customer.currentPath + "GetProfileDetail", param, successFun, errorFun);
        },
        UpdatePhoto: function (photoType, photourl, code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PhotoType: photoType, PhotoUrl: photourl, Code: Code };
            apollo.exec(apollo.Customer.currentPath + "UpdatePhoto", param, successFun, errorFun);
        },
        SaveRecevierInfo: function (profile, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: profile };
            apollo.exec(apollo.Customer.currentPath + "SaveRecevierInfo", param, successFun, errorFun);
        },
        NewSaveRecevierInfo: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.Customer.currentPath + "NewSaveRecevierInfo", param, successFun, errorFun);
        },
        OnDeleteMember: function (Code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { Code: Code };
            apollo.exec(apollo.Customer.currentPath + "OnDeleteMember", param, successFun, errorFun);
        },
        SaveMember: function (model, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { EntityJson: model };
            apollo.exec(apollo.Customer.currentPath + "SaveMember", param, successFun, errorFun);
        },
        GetFamilyMermberList: function (Code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { Code: Code };
            apollo.exec(apollo.Customer.currentPath + "GetFamilyMermberList", param, successFun, errorFun);
        },
        SaveProfilePhoto: function (mediaid, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { mediaid: mediaid };
            apollo.exec(apollo.Customer.currentPath + "SaveProfilePhoto", param, successFun, errorFun);
        },
        SaveOtherTable: function (code, glory, motto, birthday, degreeid, zzmmid, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { code: code, glory: glory, motto: motto, birthday: birthday, degreeid: degreeid, zzmmid: zzmmid };
            apollo.exec(apollo.Customer.currentPath + "SaveOtherTable", param, successFun, errorFun);
        },
        GetBusinessHonour: function (code, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { code: code };
            apollo.exec(apollo.Customer.currentPath + "GetBusinessHonour", param, successFun, errorFun);
        },
        GetRecevierInfoList: function (pageIndex, pageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: pageIndex, PageSize: pageSize };
            apollo.exec(apollo.Customer.currentPath + "GetRecevierInfoList", param, successFun, errorFun);
        },
        UploadImageForPC: function (file, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { file: file };
            apollo.exec(apollo.Customer.currentPath + "UploadImageForPC", param, successFun, errorFun);
        },
        GetJXSQCode: function (file, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { file: file };
            apollo.exec(apollo.Customer.currentPath + "GetJXSQCode", param, successFun, errorFun);
        },
        GetBaseData: function (file, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { file: file };
            apollo.exec(apollo.Customer.currentPath + "GetBaseData", param, successFun, errorFun);
        },
        GetBusinessInfoLogo: function (file, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { file: file };
            apollo.exec(apollo.Customer.currentPath + "GetBusinessInfoLogo", param, successFun, errorFun);
        },
        GetInfoChgList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;

            apollo.exec(apollo.Customer.currentPath + "GetInfoChgList", param, successFun, errorFun);
        },
        DeleteInfoChg: function (requestID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { RequestID: requestID };
            apollo.exec(apollo.Customer.currentPath + "DeleteInfoChg", param, successFun, errorFun);
        },
        SaveBusinessInfoChg: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            //var param = { ModifyType: modifyType, RequestID: requestid, NewValue: NewValue };
            apollo.exec(apollo.Customer.currentPath + "SaveBusinessInfoChg", param, successFun, errorFun);
        },
        GetInfoChg: function (requestID, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { RequestID: requestID };
            apollo.exec(apollo.Customer.currentPath + "GetInfoChg", param, successFun, errorFun);
        }
    };

    apollo.AimSignup = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/AimSignupApi/",
        UserAimSign: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.AimSignup.currentPath + "UserAimSign", param, successFun, errorFun);
        },
        AuditPassAimSign: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.AimSignup.currentPath + "AuditPassAimSign", param, successFun, errorFun);
        },
        GetChildSignList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.AimSignup.currentPath + "GetChildSignList", param, successFun, errorFun);
        }
    };

    /*
    以下为查询系统相关业务功能API
    */
    /*查询系统首页相关API*/
    apollo.QHome = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QHomeApi/",
        GetQueryMenus: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QHome.currentPath + "GetQueryMenus", params, successFun, errorFun);
        }
    };

    apollo.QAssist = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QAssistApi/",
        GetValidateUrlForPC: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GetValidateUrlForPC", params, successFun, errorFun);
        },
        GetAssistTaskCount: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GetAssistTaskCount", params, successFun, errorFun);
        },
        GetTourismTaskList: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GetTourismTaskList", params, successFun, errorFun);
        },
        GetTourismInfo: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GetTourismInfo", params, successFun, errorFun);
        },
        GetJoinerInfoByActionId: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GetJoinerInfoByActionId", params, successFun, errorFun);
        },
        GiveupTourismSignup: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GiveupTourismSignup", params, successFun, errorFun);
        },
        GetTourAndUserInfo: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GetTourAndUserInfo", params, successFun, errorFun);
        },
        SubmitTourismInfo: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "SubmitTourismInfo", params, successFun, errorFun);
        },
        GetUnfinishedTaskList: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GetUnfinishedTaskList", params, successFun, errorFun);
        },
        GetMarketServiceInfo: function (params, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QAssist.currentPath + "GetMarketServiceInfo", params, successFun, errorFun);
        }
    };

    apollo.QInfo = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QInfoApi/",
        GetNewInfos: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QInfo.currentPath + "GetNewInfos", param, successFun, errorFun);
        },
        GetPolicyInfos: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QInfo.currentPath + "GetPolicyInfos", param, successFun, errorFun);
        },
        GetInfoObj: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QInfo.currentPath + "GetInfoObj", param, successFun, errorFun);
        },
        GetBagList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QInfo.currentPath + "GetBagList", param, successFun, errorFun);
        },
        GetBagTypeList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QInfo.currentPath + "GetBagTypeList", param, successFun, errorFun);
        }
    };

    apollo.QExample = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QExampleApi/",
        GetJJInfos: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QExample.currentPath + "GetJJInfos", param, successFun, errorFun);
        },
        GetLYInfos: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QExample.currentPath + "GetLYInfos", param, successFun, errorFun);
        },
        GetAACInfos: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QExample.currentPath + "GetAACInfos", param, successFun, errorFun);
        },
        GetHeKaLists: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QExample.currentPath + "GetHeKaLists", param, successFun, errorFun);
        }
    };

    apollo.QMyRecommended = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QMyRecommendedApi/",
        GetList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMyRecommended.currentPath + "GetList", param, successFun, errorFun);
        },
        GetSuccList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMyRecommended.currentPath + "GetSuccList", param, successFun, errorFun);
        },
        SaveMyRecommended: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMyRecommended.currentPath + "SaveMyRecommended", param, successFun, errorFun);
        },
        GetMyRecommended: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMyRecommended.currentPath + "GetMyRecommended", param, successFun, errorFun);
        },
        Delete: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMyRecommended.currentPath + "Delete", param, successFun, errorFun);
        }
    };


    apollo.QMeeting = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QMeetingApi/",
        GetMeetingInfoList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetMeetingInfoList", param, successFun, errorFun);
        },
        GetMeetingInfo: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetMeetingInfo", param, successFun, errorFun);
        },
        GetMeetingReportList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetMeetingReportList", param, successFun, errorFun);
        },
        GetMeetingReport: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetMeetingReport", param, successFun, errorFun);
        },
        GetProvinceList: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetProvinceList", null, successFun, errorFun);
        },
        GetCityList: function (provinceId, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { ProvinceID: provinceId };
            apollo.exec(apollo.QMeeting.currentPath + "GetCityList", param, successFun, errorFun);
        },
        SubmitBeiAnApply: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "SubmitBeiAnApply", param, successFun, errorFun);
        },
        DeleteMeetingReport: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "DeleteMeetingReport", param, successFun, errorFun);
        },
        UploadReportReturnReceipt: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "UploadReportReturnReceipt", param, successFun, errorFun);
        },
        GetMeetingReportReturnReceipt: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetMeetingReportReturnReceipt", param, successFun, errorFun);
        },
        GetBusinessToRegion: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetBusinessToRegion", param, successFun, errorFun);
        },
        SubmitTicketRegion: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "SubmitTicketRegion", param, successFun, errorFun);
        },
        GetInternalMeetingPlan: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetInternalMeetingPlan", param, successFun, errorFun);
        },
        SubmitInternalMeetingPlan: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "SubmitInternalMeetingPlan", param, successFun, errorFun);
        },
        GetOutsideMeetingPlan: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetOutsideMeetingPlan", param, successFun, errorFun);
        },
        SubmitOutsideMeetingPlan: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "SubmitOutsideMeetingPlan", param, successFun, errorFun);
        },
        GetMeetingTypeList: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetMeetingTypeList", null, successFun, errorFun);
        },
        GetBusinessLevelList: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetBusinessLevelList", null, successFun, errorFun);
        },
        GetMeetingList: function (pageIndex, pageSize, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var param = { PageIndex: pageIndex, PageSize: pageSize, IsWechat: 0 }; //参数有做改动，区分是否微信订票
            //注意：这里调用apollo.Meet.GetMeetingList的，而非apollo.QMeet.GetMeetingList，保持数据一致
            apollo.exec(apollo.Meet.currentPath + "GetMeetingList", param, successFun, errorFun);
        },
        GetValidateReturn: function (successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMeeting.currentPath + "GetValidateReturn", null, successFun, errorFun);
        }
    };

    apollo.QMarket = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QMarketApi/",
        BeginTerminalReg: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMarket.currentPath + "BeginTerminalReg", param, successFun, errorFun);
        },
        SaveTerminalReg: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMarket.currentPath + "SaveTerminalReg", param, successFun, errorFun);
        },
        InitApplicationForm: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMarket.currentPath + "InitApplicationForm", param, successFun, errorFun);
        },
        SubmitVolunteerApply: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMarket.currentPath + "SubmitVolunteerApply", param, successFun, errorFun);
        },
        GetMyGuiShuDi: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMarket.currentPath + "GetMyGuiShuDi", param, successFun, errorFun);
        }
    };

    apollo.QLogin = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QLoginApi/",
        NoRealNameTipNext: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QLogin.currentPath + "NoRealNameTipNext", param, successFun, errorFun);
        },
        GetTaxStyleTip: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QLogin.currentPath + "GetTaxStyleTip", param, successFun, errorFun);
        },
        OnSubmitTaxStyle: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QLogin.currentPath + "OnSubmitTaxStyle", param, successFun, errorFun);
        },
        OnNextTest: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QLogin.currentPath + "OnNextTest", param, successFun, errorFun);
        },
        GetTestTipCount: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QLogin.currentPath + "GetTestTipCount", param, successFun, errorFun);
        },
        GetDaBiaoRecords: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QLogin.currentPath + "GetDaBiaoRecords", param, successFun, errorFun);
        },
        GetBeginTestParameters: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QLogin.currentPath + "GetBeginTestParameters", param, successFun, errorFun);
        },
        IsAllowQLoginForTest: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QLogin.currentPath + "IsAllowQLoginForTest", param, successFun, errorFun);
        }
    };

    apollo.QStudy = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QStudyApi/",
        InitMyBookList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "InitMyBookList", param, successFun, errorFun);
        },
        InitMyBookDirectory: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "InitMyBookDirectory", param, successFun, errorFun);
        },
        InitMyBookContent: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "InitMyBookContent", param, successFun, errorFun);
        },
        QueryNetChartForBusiness: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "QueryNetChartForBusiness", param, successFun, errorFun);
        },
        QueryNetChartForAuth: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "QueryNetChartForAuth", param, successFun, errorFun);
        },
        QuerySWZXJJCX: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "QuerySWZXJJCX", param, successFun, errorFun);
        },
        QueryBusinessCenterIntegral: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "QueryBusinessCenterIntegral", param, successFun, errorFun);
        },
        GetAvailableIntegral: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetAvailableIntegral", param, successFun, errorFun);
        },
        GetProductExchangePoints: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetProductExchangePoints", param, successFun, errorFun);
        },
        GetProductConsumptionDetails: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetProductConsumptionDetails", param, successFun, errorFun);
        },
        GetSpareQuery: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetSpareQuery", param, successFun, errorFun);
        },
        GetVHScoreList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetVHScoreList", param, successFun, errorFun);
        },
        GetVHTotalScore: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetVHTotalScore", param, successFun, errorFun);
        },
        GetVhScoreView: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetVhScoreView", param, successFun, errorFun);
        },
        GetTourismIntegralTotalScore: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetTourismIntegralTotalScore", param, successFun, errorFun);
        },
        GetTourismIntegralList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetTourismIntegralList", param, successFun, errorFun);
        },
        GetPreABQuery: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetPreABQuery", param, successFun, errorFun);
        },
        GetRuiBuList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetRuiBuList", param, successFun, errorFun);
        },
        GetTotalScore: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetTotalScore", param, successFun, errorFun);
        },
        GetRewardScoreList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetRewardScoreList", param, successFun, errorFun);
        },
        GetShopAllowanceList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetShopAllowanceList", param, successFun, errorFun);
        },
        GetServiceChargeDetails: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetServiceChargeDetails", param, successFun, errorFun);
        },
        GetServiceChargeTotalMoney: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetServiceChargeTotalMoney", param, successFun, errorFun);
        },
        GetThreeMarketFXList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetThreeMarketFXList", param, successFun, errorFun);
        },
        GetThreeMarketFXDetailList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetThreeMarketFXDetailList", param, successFun, errorFun);
        },
        GetDownGanBu: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetDownGanBu", param, successFun, errorFun);
        },
        GetDownGanBuDetailList: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetDownGanBuDetailList", param, successFun, errorFun);
        },
        GetReadingCount: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetReadingCount", param, successFun, errorFun);
        },
        GetBusinessLevelName: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetBusinessLevelName", param, successFun, errorFun);
        },
        GetOtherFeeDetails: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetOtherFeeDetails", param, successFun, errorFun);
        },
        GetShopRecommendDetails: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QStudy.currentPath + "GetShopRecommendDetails", param, successFun, errorFun);
        }
    };

    apollo.FileUpload = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/FileUploadApi/",
        PublicMethod: function (upload_url, postdata, successFun, errorFun) {
            $.ajax({
                url: upload_url,
                type: "POST",
                data: postdata,
                contentType: false,
                processData: false,
                success: successFun,
                error: errorFun
            });
        },
        UploadImageForPC: function (file, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var data = new FormData();
            data.append(file.name, file);
            apollo.FileUpload.PublicMethod(apollo.FileUpload.currentPath + "UploadImageForPC", data, successFun, errorFun);
        },
        UploadImageForVolunteerApply: function (file, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var data = new FormData();
            data.append(file.name, file);
            apollo.FileUpload.PublicMethod(apollo.FileUpload.currentPath + "UploadImageForVolunteerApply", data, successFun, errorFun);
        },
        UploadImageForMeetingReceipt: function (file, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            var data = new FormData();
            data.append(file.name, file);
            apollo.FileUpload.PublicMethod(apollo.FileUpload.currentPath + "UploadImageForMeetingReceipt", data, successFun, errorFun);
        }
    };

    apollo.QMessage = apollo.prototype = {
        currentPath: apollo.pageInfo.webapipath + "api/QMessageApi/",
        SendDynamicPwd: function (param, successFun, errorFun) {
            if (errorFun == null || errorFun == undefined) errorFun = apollo.onError;
            apollo.exec(apollo.QMessage.currentPath + "SendDynamicPwd", param, successFun, errorFun);
        }
    };

    /*请在以下空白处增加新服务组件API的JS调用方法*/







    /*请在以上空白处增加新服务组件API的JS调用方法*/
};




//下面这行请千成不要删除，且必须在本脚本最下方
//再次执行定义(主要是兼容云购端)
ApolloYGApi();