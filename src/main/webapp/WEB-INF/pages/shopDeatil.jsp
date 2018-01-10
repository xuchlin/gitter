<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
   
   
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />
    <title>太阳神云购网--产品详情</title>

    <link rel="icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
    <meta name="description" content="太阳神云购网(www.apollogw.com)--集成优惠顾客电商、授权经销于一体的太阳神业务报单系统,营养保健食品、化妆品、保洁用品、小型厨具、保健器材等多个类型商品.便捷、诚信的服务，为您提供愉悦的全新业务报单体验!">
    <meta name="Keywords" content="云购,易购,直销,太阳神,电子商务,授权经销,保健,水机,美容,营养保健食品,化妆品,保洁用品,小型厨具,保健器材">

    <meta http-equiv="Page-Enter" content="blendTrans(Duration=0.5)" />
    <meta http-equiv="Page-Exit" content="blendTrans(Duration=0.5)" />

    <link href="Content/iconfont/iconfont.css" rel="stylesheet"/>

    <link href="Content/Styles/ping-style.css" rel="stylesheet"/>


    <link href="Content/Styles/NumSpinner.css" rel="stylesheet"/>

    <link href="Content/Styles/FlyCart.css" rel="stylesheet"/>


   
</head>
<body>
    <script type="text/javascript" src="/Content/Scripts/Product.js?v=20171231"></script>

<div class="header" style="z-index: 20;">
    
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


    <div class="h-body">
        <div class="center">
            <!-- 页头开始 -->
            <div class="h-body-t pad-t1 pad-b1-5">
                <div class="fl h-logo tx-l">
                    <a href="/Home/Index">
                        <img src="/Content/Images/logo.png" style="border:0px;" />
                    </a>
                </div>
                <div class="h-body-c fl tx-l ovh">
                    <div class="h-search fl">
                        <div class="h-s-box bor-s1 bor-gra">
                            <input type="text" class="bg-wh" id="txtKeyword" placeholder="输入您要搜索的产品" />
                            <div id="btnSearch" class="dis-inl-b h-s-icon tx-c bor-sl1 bor-gra"><i class="icon iconfont font-b font1-4 c-gra">&#xe601;</i></div>
                        </div>
                        <div class="h-s-key font-1 pad-t1" id="divTopPTKey">
                            <a href='javascript:showProductList("化妆品", "", "", "检索结果");' class="bor-sr1 bor-light-gra pad-r1 c-red">化妆品</a>
                            <a href='javascript:showProductList("保健品", "", "", "检索结果");' class="bor-sr1 bor-light-gra pad-l1 pad-r1 c-red">保健品</a>
                            <a href='javascript:showProductList("水机", "", "", "检索结果");' class="bor-sr1 bor-light-gra pad-l1 pad-r1 c-red">水机</a>
                            <a href='javascript:showProductList("洗发水", "", "", "检索结果");' class="pad-l1 pad-r1 c-red">洗发水</a>
                        </div>
                    </div>
                    
                    <a class="h-s-cart fl bg-red mar-l1 tx-c tx-dec-no hand" id="cart" onclick="gotoShoppingCart()">
                        <div class="w50 fl tabcart"><span class="c-wh w100 bor-sr1 bor-light-red dis-inl-b"><i class="icon iconfont font2-5">&#xe604;</i></span></div>
                        <div class="c-wh w50 fl font1-2 h-cart-num cartNum shoppingCart">0</div>
                    </a>
                </div>
                <div class="h-code fr font-1 tx-r ovh">

                    <div class="h100 tx-c dis-inl-b w30">
                        <img src="/Content/Images/ywzs-code.png" class="h80">
                        <p>太阳神云购APP</p>
                    </div>
                    <div class="h100 tx-c dis-inl-b w30">
                        <img src="/Content/Images/yfw-code.png" class="h80">
                        <p>太阳神云服务</p>
                    </div>
                </div>
            </div>
            <!-- 页头结束 -->
            <!-- 导航开始 -->
            <div class="h-body-b bor-st2">
                <!-- 分类导航开始 -->
                <div class="h-nav-l c-wh fl tx-l">
                    <dl>
                        <dt class="pad-l1 pad-r1"><span class="c-wh font1-1 dis-inl-b w100 tx-dec-no pos-rel">全部商品分类<i class="icon iconfont font1-2 pos-abs r0"><i class="icon-ie7">&#xe607;</i></i></span></dt>
                        <dd class="bg-red h-nav-dropL pad-b1 pos-rel">
                            <ul class="h-nav-drop">
                                <li class="pad-l1 pad-r1 bg-org-red bor-sl2 bor-org-red">产品汇总</li>
                                <li class="bg-red" id="divPT">

                                </li>
                                <li class="pad-l1 pad-r1 bg-org-red bor-sl2 bor-org-red">新品专区</li>
                                <li class="bg-red" id="divCT">

                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <!-- 分类导航结束 -->
                <ul id="divClass" class="h-nav ovh fl">
                    <li class="nav-on"><a href="index.htm" class="dis-inl-b w100 c-bla">首页</a></li>
                    <li class=""><a href="product-classify.htm" class="dis-inl-b w100 c-bla">营养保健食品类</a></li>
                    <li class=""><a href="product-classify.htm" class="dis-inl-b w100 c-bla">化妆品类</a></li>
                    <li class=""><a href="product-classify.htm" class="dis-inl-b w100 c-bla">保洁用品类</a></li>
                    <li class=""><a href="product-classify.htm" class="dis-inl-b w100 c-bla">小型厨具类</a></li>
                    <li class=""><a href="product-classify.htm" class="dis-inl-b w100 c-bla">保健器材类</a></li>
                </ul>
            </div>
            <!-- 导航结束 -->
        </div>
    </div>
</div>


    
<div class="content" style="z-index:0;">
    <div class="main">
        <div class="center">            
            <div class="m-site pad-t2 mar-b1 tx-l">
                <a href="Index" class="pad-l1 c-bla" title="首页">首页</a>
                <i class="icon iconfont font-1">&#xe611;</i>
                <a class="c-bla" id="pdTitle1"></a>
            </div>
            <!--产品介绍开始-->
            <div class="item-cont mar-t1">
                <div class="pro-wrap pad1 ovh">
                    <div class="fl pro-wrap-img bor-s1 bor-gra" id="pdProductUrl">
                        <img id="imgProduct" class="w90 mar-t1" onerror="onLoadImgError(this)">
                    </div>
                    <div class="fl pro-wrap-info tx-l">
                        <div>
                            <h2 class="font-n pad-t1 pad-b1" id="pdTitle"></h2>
                        </div>                        
                        <div class="bor-sb1 bor-st1 bor-light-gra">
                            <div class="pad-t1 pad-b1 c-light-gra"><label id="lblProductPrice">销售价：</label><b class="c-red pro-price" id="pdPrice"></b></div>
                            <div id="divTwoPrice">
                                <div class="pad-t1 pad-b1 c-light-gra"><label>积分换购价：</label><span id="pdProductScore"></span></div>
                                <div class="pad-t1 pad-b1 c-light-gra"><label>积分现金价：</label><span id="pdScorePrice"></span></div>
                            </div>
                            
                            <div class="pad-t1 pad-b1 c-light-gra ovh" id="pdCXPanel">
                                <label class="fl">促销活动：</label>
                                <div class="ver-t c-bla" id="pdCXInfo">
                                    此商品参与买3送1活动，数量有限，先抢先得，赠完即止！<br>
                                    <a href="notice.htm" class="c-red pad-t1 dis-inl-b">【更多优惠活动请点击进入】</a>
                                </div>
                            </div>
                            <div class="pad-t1 pad-b1 c-light-gra">计量单位：<span class="c-bla" id="pdProductUnit"></span></div>
                            <div class="pad-t1 pad-b1 c-light-gra">包装规格：<span class="c-bla" id="pdBoxSpec"></span></div>
                            <div class="pad-t1 pad-b1 c-light-gra">
                                购买数量：
                                <span id="liProdNumSpinner">
                                    <span class='Spinner' id="ProdNumSpinner" style="line-height:40px;"></span>
                                </span>
                            </div>
                        </div>
                        <div class="pad-t1 pad-b1 c-light-gra ovh" id="divFX095Gife" style="display:none;">
                            <label class="dis-inl-b mar-b-5 mar-r-5 fl">选择套装：</label>
                            <div class="fl c-bla">
                                <div class="mar-b-5"><input type="radio" name="FX095" id="FX095_1" value="1" /><label for="FX095_1" class="cur-p">永久续约套装1号（1盒微肽修护丝滑洁面乳+1盒筋络速通）</label></div>
                                <div class="mar-b-5"><input type="radio" name="FX095" id="FX095_2" value="2" /><label for="FX095_2" class="cur-p">永久续约套装2号（1盒微肽修护多元赋活霜）</label></div>
                                <div class="mar-b-5"><input type="radio" name="FX095" id="FX095_3" value="3" /><label for="FX095_3" class="cur-p">永久续约套装3号（1支微肽柔皙遮瑕隔离霜）</label></div>
                                <div class="mar-b-5"><input type="radio" name="FX095" id="FX095_4" value="4" /><label for="FX095_4" class="cur-p">永久续约套装4号（4盒筋络速通）</label><br /></div>
                                <div class="mar-b-5"><input type="radio" name="FX095" id="FX095_5" value="5" /><label for="FX095_5" class="cur-p">永久续约套装5号（1支樱桃丝滑香体乳+1瓶小麦胚芽洗发露）</label></div>
                            </div>
                        </div>
                        <div class="pro-buy mar-t2 pad-t1 ovh">
                            <input type="button" class="btn bg-red c-wh font1-1 mar-r1 fl" value="加入购物车" id="btnAdd" onclick="OnAddToBasket(this)">
                        </div>
                    </div>
                </div>
                <!--商品详情开始-->
                <div class="bor-s1 bor-gra mar-t2">
                    <ul class="detail-title bor-sb1 bor-gra bg-light-gra">
                        <li class="bor-sr1 bor-gra pad-l2 pad-r2 fl detail-on"><a href="" class="c-bla">商品详情</a></li>
                    </ul>
                    <div class="pad1">
                        <div class="detail-intro">
                            <p class="bor-sb1 bor-light-gra c-deep-gre tx-l font1-2 pad-t1">规格参数</p>
                            <dl class="tx-l mar-t1 mar-b1">
                                <dd class="pad-t1">
                                    <label class="tx-r dis-inl-b">规格：</label><span class="c-light-gra dis-inl-b" id="pdBoxSpec1">10ml/支 40支/盒</span>
                                </dd>
                                <dd class="pad-t1">
                                    <label class="tx-r dis-inl-b">PV值：</label><span class="c-light-gra dis-inl-b" id="pdPV">家鸡、赤链蛇、黑眉锦蛇、乌梢蛇、牛磺酸、乳酸锌等</span>
                                </dd>
                                <dd class="pad-t1">
                                    <label class="tx-r dis-inl-b">促销赠品：</label><span class="c-light-gra dis-inl-b" id="pdGiveInfo">改善记忆、免疫调节</span>
                                </dd>
                                <dd class="pad-t1">
                                    <label class="tx-r dis-inl-b">产品全称：</label><span class="c-light-gra dis-inl-b" id="pdChineseName">需要改善记忆者、免疫力低下者、需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者需要改善记忆者</span>
                                </dd>
                                <dd class="pad-t1">
                                    <label class="tx-r dis-inl-b">产品简介：</label><span class="c-light-gra dis-inl-b" id="pdMemo">无</span>
                                </dd>
                            </dl>
                        </div>
                        <div class="detail-intro" id="divMoreImage">
                            <p class="bor-sb1 bor-light-gra c-deep-gre tx-l font1-2 pad-t1">详细信息</p>
                            <div class="mar-t1" id="ulMoreImage">
                                <img src="Images/CA013/CA013-01.jpg" class="w100">
                                <img src="Images/CA013/CA013-02.jpg" class="w100">
                                <img src="Images/CA013/CA013-03.jpg" class="w100">
                                <img src="Images/CA013/CA013-04.jpg" class="w100">
                                <img src="Images/CA013/CA013-05.jpg" class="w100">
                                <img src="Images/CA013/CA013-06.jpg" class="w100">
                                <img src="Images/CA013/CA013-07.jpg" class="w100">
                                <img src="Images/CA013/CA013-08.jpg" class="w100">
                                <img src="Images/CA013/CA013-09.jpg" class="w100">
                                <img src="Images/CA013/CA013-10.jpg" class="w100">
                            </div>
                        </div>
                    </div>
                </div>
                <!--商品详情结束-->
            </div>
            <!--产品介绍结束-->
        </div>
    </div>
</div>


<div class="m-sidebar">
    <div class="prevCart">&nbsp;</div>
    <div class="cart hand" onclick="gotoShoppingCart()">
        <a id="end"></a>
        <span>购物车</span>
        <span class="cartNum shoppingCart">0</span>
    </div>
</div>
<div id="cartMsg" style="left: 1222px; top: 130px;">已成功加入购物车！</div>

    
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
   