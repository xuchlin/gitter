package com.mengke.web.qrcode;

import java.awt.image.BufferedImage;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mengke.util.QRcodeUtil;

@Controller
public class QrcodeController {
	
	/**
	 * 生成二维码
	 * 方法名：createQrode<br/>
	 * 创建人：xuchengfeifei <br/>
	 * 时间：2017年11月9日-上午12:32:26 <br/>
	 * 手机:15074816437<br/>
	 * @param response void<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	@RequestMapping("/qrcode")
	public void createQrode(HttpServletResponse response){
		try {
			//QRcodeUtil.qrCodeEncode("I Love You!!!", response);
			//QRcodeUtil.qrCodeEncode("http://blog.csdn.net/hualele/article/details/70208561", response);
			QRcodeUtil.qrCodeEncode("http://img.bss.csdn.net/201609251654183128.png", response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
