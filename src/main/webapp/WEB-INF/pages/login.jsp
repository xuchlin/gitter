<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />
    <title>太阳神云购网-用户登录</title>
    <link href="Content/iconfont/iconfont.css" type="text/css" rel="stylesheet" />
    <link href="Content/Styles/ping-style.css" type="text/css" rel="stylesheet" />

  
</head>

<body class="login-c">
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
                    <div class="pos-abs"><img class="w100" src="Content/Images/dhxt-code.png"></div>
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
                    <a href="/Home/Index"><img src="Content/Images/logo.png" style="border:0px;" /></a>
                </div>

                <div class="h-code fr font-1 tx-r ovh">
                    <div class="h100 dis-inl-b tx-c w30">
                        <img src="Content/Images/ywzs-code.png" class="h80">
                        <p>太阳神云购APP</p>
                    </div>
                    <div class="h100 dis-inl-b tx-c w30">
                        <img src="Content/Images/yfw-code.png" class="h80">
                        <p>太阳神云服务</p>
                    </div>
                </div>
            </div>
            <!-- 页头结束 -->
            <!-- 导航开始 -->
            <!-- 导航结束 -->
        </div>
    </div>
    <div class="bor-sb2 bor-red"> </div>
</div>
<div class="content" style="z-index:0;">
    <div class="main">
        <div class="center">
            <div class="login-bg ovh">
                <div class="login fr bor-s1 bor-gra mar-t1">
                    <div class="c-red tx-l ovh ulh2-5">
                        <h2 class="fl font-n">用户登录</h2>
                        <div class="fr c-org">还没有账号？<a href="/Reg/BusiReg/Index" class="c-gra tx-dec-un">优惠顾客注册</a> <a href="/Reg/JXSReg/SelRegShoptype" class="c-gra tx-dec-un">经销商注册</a></div>
                    </div>
                    <div class="mar-t2 tx-l">
                        <div class="pad-b2 login-fill">
                            <input type="text" id="txtuid" placeholder="请输入优惠顾客编号/店编号" class="bor-s1 bor-gra w100"><i class="icon iconfont pos-abs login-user font1-4 c-light-gra">&#xe605;</i>
                        </div>
                        <div class="pad-b2 login-fill">
                            <input type="password" id="txtpwd" placeholder="请输入登录密码" class="bor-s1 bor-gra"><i class="icon iconfont pos-abs login-user font1-4 c-light-gra">&#xe603;</i>
                        </div>
                        <div class="pad-b1 login-fill login-code">
                            <input type="text" id="txtcode" placeholder="请输入验证码" maxlength="4" class="bor-s1 bor-gra"><div class="auth-code dis-inl-b ver-m">
                            <img id="imgCode" src="/Home/LoginValidate?token=636507779094353570" class="mar-l1 h80"><a class="c-deep-gre mar-l-5 cur-p" onclick="RefalshVCode()">换一张</a>
                        </div>
                        </div>
                        <div class="lngtip c-blu">请输入店长编号和密码，按“登录”即可！</div>
                    </div>
                    <div class="mar-t1-5"><input type="button" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" class="bg-red c-wh w100 font1-2 lh40" onclick="userLogin()"></div>

                </div>
            </div>
        </div>
    </div>
</div>
<div class="footer">
    <div class="copyrights font-1">
        <p>版权所有 广东太阳神健康产业有限公司 未经许可不得转载和链接 粤ICP备09005861号 Copyright©2009-2016. www.apollo.cn All rights reserved.</p>
    </div>
</div>
</body>
</html>