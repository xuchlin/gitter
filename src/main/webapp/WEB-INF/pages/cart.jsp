<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    

<!DOCTYPE html>

<html>
<head>
    <title>购物车</title>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />
    
    <link href="Content/iconfont/iconfont.css" type="text/css" rel="stylesheet">
    <link href="Content/Styles/ping-style.css?v=20171128" type="text/css" rel="stylesheet">
    <link href="Content/Styles/NumSpinner.css" rel="stylesheet"/>

    <link href="Content/Styles/FlyCart.css" rel="stylesheet"/>


    <link href="Content/Styles/jquery.datetimepicker.css" rel="stylesheet"/>


    
 
</head>
<body class="register" onbeforeunload="">
      


<div class="header" style="z-index:20;">
    
<div class="h-top bg-bla c-wh font-1">
    <div class="center">
        <div class="h-top-l fl">
                    <div class="h-unlogged">
                        <a href="/Home/Login" class="pad-l1 pad-r1 bor-sr1 bor-light-gra c-wh">登录</a>
                        <a href="/Reg/BusiReg/Index" class="pad-l1 pad-r1 bor-sr1 bor-light-gra c-wh">优惠顾客注册</a>
                        <a href="/Reg/JXSReg/SelRegShoptype" class="pad-l1 pad-r1 c-wh">授权经销商注册</a>
                    </div>

        </div>
        <div class="h-top-r fr">
            <a href="http://www.apollo.cn/ydyy/index_176.aspx" target="_blank" class="pad-l1 pad-r1 bor-sr1 bor-light-gra c-red pos-rel download-app">
                客户端下载
                <div class="pos-abs"><img class="w100" src="/Content/Images/dhxt-code.png"></div>
            </a>


            <a href="/Home/Help" class="pad-l1 pad-r1 bor-sr1 bor-light-gra c-wh">帮助中心</a>

            <a onclick="SetHome('https://www.apollogw.com/')" href="javascript:void(0)" class="pad-l1 pad-r1 bor-sr1 bor-light-gra c-wh">设为首页</a>

            <a onclick="AddFavorite('https://www.apollogw.com/','太阳神云购网')" href="javascript:void(0)" class="pad-l1 pad-r1 c-wh">加入收藏</a>

        </div>
    </div>
</div>

<script language="javascript" type="text/javascript">
  //加入收藏
    function AddFavorite(sURL, sTitle) {
        sURL = encodeURI(sURL);
        try {
            window.external.addFavorite(sURL, sTitle);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
            }
        }
    }
    //设为首页
    function SetHome(url) {
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(url);
        }
        else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
                    history.go(-1);
                }
            }

            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage',url);
        }
    }
</script>
    <div class="h-body">
        <div class="center">
            <!-- 页头开始 -->
            <div class="h-body-t pad-t1 pad-b1-5">
                <div class="fl tx-l">
                    <a href="/Home/Index"><img src="/Content/Images/logo.png" style="border:0px;" /></a>
                </div>
                <div class="h-body-c fl tx-c ovh">
                    
                </div>
                <div class="h-code fr font-1 tx-r ovh">
                    <div class="h100 dis-inl-b tx-c w30">
                        <img src="/Content/Images/ywzs-code.png" class="h80">
                        <p>太阳神云购APP</p>
                    </div>
                    <div class="h100 dis-inl-b tx-c w30">
                        <img src="/Content/Images/yfw-code.png" class="h80">
                        <p>太阳神云服务</p>
                    </div>
                </div>
            </div>
            <!-- 页头结束 -->
            <!-- 导航开始 -->
            <!-- 导航结束 -->
        </div>
    </div>
</div>
<div class="content" style="z-index:0;">
    <div class="main">
        <!--提示开始-->
        <div class="bg-red c-wh bor-st2 bor-bla none" id="divCartTipPanel">
            <div class="center">
                <table class="m-tips">
                    <tbody>
                        <tr>
                            <td class="tx-l tipPanel none">请选择您要进行的操作类型</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--提示结束-->
        <!--注册信息开始-->

        <div class="basket" id="basket">
            <div class="center">
    <div class="cart-h pad-l1 pad-t1 pad-b1 ovh "><h2 class="font-n fl">购物车</h2><span class="cart-tips dis-inl-b pad-l1 bor-sl1 bor-gra c-gra tx-l fl tipCheckPanel"><span class="c-red">温馨提示：</span></span></div>
    <!--快捷购物开始-------------------------------------------------->
    <div class="ovh mar-t1">
        <!--左侧树形菜单开始-------------------------------------------------->
        <div class="classtree ovh fl divKJSelProduct" id="divKJSelProduct">
            <ul class="grandparent bor_ri fl">
                <li class="grand_li grand_cur c-wh tx-l"><b class="dis-inl-b font1-1">新品推荐</b></li>
                <li class="grand_li c-wh tx-l"><b class="dis-inl-b font1-1">产品汇总</b></li>
            </ul>
            <ul class="parent classtree_one tx-l fl" style="display: block;">
                <li class="parent_title parent_show">
                    <span class="w100 dis-inl-b bg-light-org-red p_title"><h4>明星产品</h4><i></i></span>
                    <ul class="classtree_two">

                    </ul>
                </li>
                
            </ul>
            <ul class="parent classtree_one tx-l fl" style="display: none;">
                <li class="parent_title">
                    <span class="w100 dis-inl-b bg-light-org-red p_title"><h4>营养保健食品类</h4><i></i></span>
                    <ul class="classtree_two">

                    </ul>
                </li>
                
            </ul>
        </div>
        <!--左侧树形菜单结束-------------------------------------------------->
        <!-- 购物车开始 -->
        <div class="cartKJ fl divBasketCart">
            
            <!--促销与th开始 -->
            <div class="bor-s1 bor-gra">
                <div class="cart-sales pad-l1 pad-r1 bor-sb1 bor-gra lh50 ovh">
                    <span class="dis-inl-b bor-rads5 bg-gre c-wh fl">促销活动</span>
                    <div class="c-gra mar-l1 fl">
                        <div class="fl" style="width:900px; overflow:hidden;" id="divCXExplainScroll">
                            <div id="lblCXExplain" style="white-space: nowrap;color:#0026ff; cursor:pointer;"></div>
                        </div>
                        <a href="/Home/ShowCXInfo" class="c-red" target="_blank" style="width:270px;">【更多活动详情请点击】</a>
                    </div>
                </div>

                <div class="cart-sales pad-l1 pad-r1 lh50 ovh" id="basketHeaderForTwo">
                    <div style="width:30%" class="tx-l font-b fl">商品</div>
                    <div style="width:12%" class="font-b fl">价格类型</div>
                    <div style="width:13%" class="font-b fl">单价</div>
                    <div style="width:10%" class="font-b fl">数量</div>
                    <div style="width:10%" class="font-b fl">积分小计</div>
                    <div style="width:10%" class="font-b fl">金额小计</div>
                    <div style="width:15%" class="font-b fl">操作</div>
                </div>
                <div class="cart-sales pad-l1 pad-r1 lh50 ovh" id="basketHeader">
                    <div style="width:50%" class="tx-l font-b fl">商品</div>
                    <div style="width:11%" class="font-b fl">单价</div>
                    <div style="width:13%" class="font-b fl">数量</div>
                    <div style="width:11%" class="font-b fl">小计</div>
                    <div style="width:15%" class="font-b fl">操作</div>
                </div>
            </div>
            <!--促销与th结束 -->
            <!-- 购物车为空开始 -->
            <div id="emptyBasket" class="s-cart-empty dis-blo">
                <img src="/Content/Images/error-pic2.png">
                <p>目前购物车没有商品，请点击下面按钮选购产品</p>
                <div class="mar-t2 mar-b2"><input type="button" class="btn bg-org bor-rads5 c-wh font1-1 btnselProduct" value="选购产品" onclick="onSelProduct(false)"></div>
            </div>
            <!-- 购物车为空结束 -->
            <!-- 购物车有商品开始 -->
            <div class="s-cart-full dis-blo" id="listBasket">
                <!--产品购物篮开始 -->
                <div class="bor-s1 bor-gra mar-t1">
                    <div class="bor-sb1 bor-org ovh lh50" id="basketCBHeaderForTwo">
                        <b class="fl bor-sl2 bor-gra pad-l1" style="width:63%;text-align:left">产品购物车</b>
                        <div class="fl" style="width:10%" id="lischj"></div>
                        <div class="fl" style="width:10%" id="licbhj"></div>
                        <div class="fl" style="width:15%"><input type="button" class="bg-org btn bor-rads5 c-wh s-cart-btn btnselProduct" value="继续选购产品" onclick="onSelProduct();"></div>
                    </div>
                    <div class="bor-sb1 bor-org ovh lh50" id="basketCBHeader">
                        <b class="fl bor-sl2 bor-gra pad-l1" style="width:72%;text-align:left">产品购物车</b>
                        <div class="fl" style="width:11%" id="licbhj"></div>
                        <div class="fr" style="width:15%"><input type="button" class="bg-org btn bor-rads5 c-wh s-cart-btn btnselProduct" value="继续选购产品" onclick="onSelProduct();"></div>
                    </div>

                    <div class="s-cart-detail" id="basketCB">

                    </div>
                </div>
                <!--产品购物篮结束 -->
                <!--其他购物篮开始 -->
                <div class="bor-s1 bor-gra mar-t1">
                    <div class="bor-sb1 bor-org ovh lh50">
                        <b class="fl bor-sl2 bor-gra pad-l1" style="width:85%;text-align:left">其它购物篮</b>
                        <div class="fr pad-r1"><input type="button" class="bg-org btn bor-rads5 c-wh s-cart-btn" id="btnNeedProduct" value="添加必选产品" onclick="onSelProduct(true);"></div>
                    </div>
                    <div class="s-cart-detail" id="basketFL">

                    </div>
                </div>
                <!--其他购物篮结束 -->

                <!--对于整个报单的促销赠品-->
                <div class="bor-s1 bor-gra mar-t1" id="divBillCXGives">
                    <div class="bor-sb1 bor-org ovh lh50">
                        <b class="fl bor-sl2 bor-gra pad-l1" style="width:85%;text-align:left">报单促销赠品</b>
                        <div class="fr pad-r1"></div>
                    </div>
                    <div class="s-cart-detail">
                        <div class="bor-sb1 bor-gra" id="basketCX">
                        </div>
                    </div>
                </div>


            </div>
            <!-- 购物车有商品结束 -->
        </div>
        <!-- 购物车结束 -->
    </div>
</div>

        </div>

        <div class="center">
            <!-- 购物车开始 -->
            <div class="cart">
                <!--结算开始 -->
                <div class="bor-s1 bor-gra bg-light-gra lh50 mar-t2">
                    <div class="fl s-cart-total tx-r" style="width:79%">
                        <div class="dis-inl-b tx-c c-gra pad-l1 pad-r2 ulh2-5 bor-sr1 bor-gra">
                            <span class="mar-r1">共<b class="font-n" id="spTotalCount">5</b>件商品</span>
                            <span class="mar-r1 c-deep-gre">产品金额：<b class="font-n c-red" id="spCBMoneyBySideBar"></b></span>
                            <span class="mar-r1 c-deep-gre">其他：<b class="font-n c-red" id="spOtherBySideBar"></b></span>
                            <span class="c-deep-gre dis-n">PV：<b class="font-n c-red" id="spPVBySideBar"></b></span>
                        </div>
                        <div class="dis-inl-b tx-c c-gra pad-l1 pad-r1 ulh2-5">
                            <span class=" c-deep-gre">合计总额：<b class="c-red" id="spTotalmBySideBar"></b></span>
                        </div>
                        <div class="dis-inl-b tx-c c-gra pad-l1 pad-r1 ulh2-5 ">
                            <span class="c-deep-gre">
                                操作类型：
                            </span>
                            <div class="dis-inl-b info-select info-fill">
                                <i class="icon iconfont pos-abs">&#xe607;</i>
                                <select id="cbType" name="cbType" class="bor-s1 bor-gra" style="color:red;">
                                    <option value="0">优惠顾客会员注册</option>
                                    <option value="1">授权经销商注册</option>
                                    <option value="2">普通消费/二次进货</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="fr s-cart-confirm">
                        <input type="button" class="lh50 bg-red c-wh font1-2 w100 jsOK" value="进入操作" onclick="toSaleReg();">
                    </div>
                </div>
                <!--结算结束 -->
            </div>
        </div>

        <script type="text/javascript">
            window.cartTool = {
                basket: null,
                init: function () {
                    this.basket = $("#basket").Basket({ isShopcart: true });
                    this.basket.reflash();
                },
                load: function () {
                    this.basket.reflash();
                },
                assignment: function () {
                    //不需要实际赋值
                },
                valid: function () {
                    if (this.basket.isValid != true) {
                        alert(this.basket.Message);
                        return false;
                    }
                    else
                        return true;
                }
            };

            $(function () {
                BeginCart();
            });

            function toSaleReg()
            {
                var type = $("#cbType").val();
                gotoSaleReg(type);
            }
        </script>
    </div>
</div>

<div class="footer">
    <div class="center bor-st2 bor-bla">
        <ul class="f-nav bor-st1 bor-bla">
            <li class="dis-inl-b pad-l1 pad-r1 mar-l1 mar-r1"><a href="http://www.apollo.cn" target="_blank" class="c-bla">关于我们</a></li>
            <li class="dis-inl-b pad-l1 pad-r1 mar-l1 mar-r1"><a href="http://www.apollo.cn" target="_blank" class="c-bla">走进太阳神</a></li>
            <li class="dis-inl-b pad-l1 pad-r1 mar-l1 mar-r1"><a href="" class="c-bla">隐私声明</a></li>
            <li class="dis-inl-b pad-l1 pad-r1 mar-l1 mar-r1"><a href="" class="c-bla">加入我们</a></li>
            <li class="dis-inl-b pad-l1 pad-r1 mar-l1 mar-r1"><a href="http://www.apollo.cn/gszb/index_86.aspx" class="c-bla">联系我们</a></li>
            <li class="dis-inl-b pad-l1 pad-r1 mar-l1 mar-r1"><a href="" class="c-bla">帮助中心</a></li>
            <li class="dis-inl-b pad-l1 pad-r1 mar-l1 mar-r1"><a href="" class="c-bla">合作共赢</a></li>
        </ul>
        <div class="f-box bor-st1 bor-sb1 bor-light-gra pad-t1 pad-b1 ovh">
            <div class="f-rules fl">
                <ul class="tx-l dis-inl-b">
                    <b>新用户指南</b>
                    <li><a href="" class="c-bla">新用户注册</a></li>
                    <li><a href="" class="c-bla">订单流程</a></li>
                    <li><a href="" class="c-bla">订单查询与修改</a></li>
                    <li><a href="" class="c-bla">我的账户</a></li>
                </ul>
            </div>
            <div class="f-rules fl">
                <ul class="tx-l dis-inl-b">
                    <b>支付和配送</b>
                    <li><a href="" class="c-bla">支付方式</a></li>
                    <li><a href="" class="c-bla">配送方式\范围及时间</a></li>
                    <li><a href="" class="c-bla">发票制度</a></li>
                    <li><a href="" class="c-bla">支付和配送常见问题</a></li>
                </ul>
            </div>
            <div class="f-rules fl">
                <ul class="tx-l dis-inl-b">
                    <b>退换货指南</b>
                    <li><a href="" class="c-bla">退换货原则</a></li>
                    <li><a href="" class="c-bla">退换货流程</a></li>
                    <li><a href="" class="c-bla">退款方式</a></li>
                </ul>
            </div>
            <div class="f-rules fl">
                <ul class="tx-l dis-inl-b">
                    <b>常见问题</b>
                    <li><a href="" class="c-bla">优惠券使用规则</a></li>
                    <li><a href="" class="c-bla">会员制与积分政策</a></li>
                    <li><a href="" class="c-bla">会员积分的获得与使用</a></li>
                </ul>
            </div>
        </div>
        <div class="copyrights font-1">
            <p>版权所有 广东太阳神健康产业有限公司 未经许可不得转载和链接 粤ICP备09005861号 Copyright©2009-2016. <a href="http://www.apollo.cn" target="_blank">www.apollo.cn</a> All rights reserved.</p>
        </div>
    </div>
</div>
</body>
</html>

    