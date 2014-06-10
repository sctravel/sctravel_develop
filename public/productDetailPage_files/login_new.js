var cookieName = [];
var _isGuest;
var _nickname;
var isGuest;
var tuniuLevel;
var tuniuVip;
var tuniuImg;
function getLoginInfo() {
	var imgInfo;
	var login;
	getCookieForLogin();
	getLoginState();
    login=getMobileInfo();
	//login='';
	
	if ( _isGuest) {
	   if(cookieName['tuniuuser_level']==""||cookieName['tuniuuser_level']==null){
	       tuniuLevel=0;
	       tuniuVip=0;
	   }else{
		tuniuLevel = base64decode(unescape(cookieName['tuniuuser_level']));
		tuniuVip = base64decode(unescape(cookieName['tuniuuser_vip']));
       }
		tuniuImg =cookieName['tuniuuser_image'];
		if (tuniuImg == "" || tuniuImg == null) {
			imgInfo = "http://img3.tuniucdn.com/img/2014040901/user_center/g_touxiang.png";

		} else {
			var time = new Date().toLocaleTimeString();
			tuniuImg = base64decode(unescape(cookieName['tuniuuser_image']));
			imgInfo = "http://images.tuniucdn.com/head" + tuniuImg + "?v="
					+ time;
		}


			if(tuniuVip == 1){
				login = login+'<li><span>您好，</span></li>';
				login = login+ compLoginInnerInfor(_nickname,imgInfo,-1);
			}else{
				login = login+'<li><span>您好，</span></li>';
				login = login+ compLoginInnerInfor(_nickname,imgInfo,tuniuLevel);
			}
			login = login + '<li><a href="http://www.tuniu.com/u/club" target="_blank">会员俱乐部</a></li><li><a href="http://www.tuniu.com/u/club" target="_blank"><img src="http://img4.tuniucdn.com/img/20140606/common/clickhere.gif" alt="会员俱乐部" style="height: 22px;line-height: 22px;" /></a></li>';
			login = login + '<input type="hidden" value="' + imgInfo
				+ '" id="user_top_img">';
			login = login + '<input type="hidden" value="' + tuniuVip
				+ '" id="is_user_vip">';

	} else {
		login =login + '<li><a rel="nofollow" href="http://www.tuniu.com/u/login" target="_blank">登录</a>|</li><li><a rel="nofollow" href="http://www.tuniu.com/u/register" target="_blank">注册</a></li><li><a href="http://www.tuniu.com/u/club" target="_blank">会员俱乐部</a></li><li><a href="http://www.tuniu.com/u/club" target="_blank"><img src="http://img4.tuniucdn.com/img/20140606/common/clickhere.gif" alt="会员俱乐部" style="height: 22px;line-height: 22px;" /></a></li>';
	}
	return login;

}

function compLoginInnerInfor(nick_name,img_info,user_level){
		var top_user_level = "";
		var bot_user_level = "";
		if(user_level < 0){
			top_user_level = 'vip vip_word';
			bot_user_level = 'vip_lel vip_lel_word';
		}else if(user_level == 0){
			top_user_level = '';
			bot_user_level = '';
		}else{
			top_user_level = 'vip vip'+user_level;
			bot_user_level = 'vip_lel vip_lel'+user_level;
		}
		var comp_str = '<li id="vipnameBox" class="vipname_box"><a href="http://www.tuniu.com/u" id="vipname" class="vipname" rel="nofollow"><span class="fl" style="float:left;">'
				       + nick_name +
				       '</span><span class="'+top_user_level+'"></span> <span class="poparrow"></span></a>|'
						+ '<div class="colle_box"><div class="colle_top clearfix"><div class="right"><a href="http://www.tuniu.com/u">账户管理</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.tuniu.com/u/logout">退出</a></div></div><div class="colle_bottom"><div class="touxiang"><a href="http://www.tuniu.com/main.php?do=user_change_picture"><img src="'
						+img_info
						+'"></a></div><div class="fl"><div class="vip_stage mt_10"><a style="color:#f60; font-weight:bold; font-size:16px;" class="'
						+bot_user_level
						+'" href="http://www.tuniu.com/u/club"></a></div><div><a style="color:#404040; font-weight:bold; font-size:14px;" href="http://www.tuniu.com/u/club">查看我的会员特权</a></div></div></div></div></li>';
		return comp_str;
}

function getMobileInfo(){

	var mobile_flag = false;
    var m_url = "http://m.tuniu.com";
   
    try{
    	 var agent=navigator.userAgent.toLowerCase();
    	
    }
    catch(e){
    	var agent=navigatorAlias.userAgent.toLowerCase();
    }
    if (agent.match('/(blackberry|configuration\/cldc|hp |hp-|htc |htc_|htc-|iemobile|kindle|midp|mmp|motorola|mobile|nokia|opera mini|opera |Googlebot-Mobile|YahooSeeker\/M1A1-R2D2|android|iphone|ipod|mobi|palm|palmos|pocket|portalmmm|ppc;|smartphone|sonyericsson|sqh|spv|symbian|treo|up.browser|up.link|vodafone|windows ce|xda |xda_)/i')) {
    
    	mobile_flag = true;
    	if ( agent.match('/iPad/i')) {
    		mobile_flag = false;
    	}
    	var url=Window.location.href;
  
    	if (url.match('/tours/i')){
    	  	var url_temp = url.spli('//');
        	var route_attr = url_temp[1];
        	var route_temp=route_attr.split('/');
        	var route_id=route_temp[2];
        	var route_type = getRouteTypeByID(route_id);
        	if(route_type==1){
    		m_url =m_url+ '/tours/'+route_id;
        	}
    	}
    }
	isPcOrMobile(mobile_flag);
     login =  '<div class="login_menu clearfix">';
     return login;
}
function isPcOrMobile(m_flag,m_url){
	var isPcOrMobile = document.getElementById("isPcOrMobile");
    if (m_flag) {
    	isPcOrMobile.innerHTML = '<a class="sitenav_mobile" href="'+m_url+'" target="_blank" rel="nofollow">手机端</a>';
    } else {
    	isPcOrMobile.innerHTML = '<a class="sitenav_mobile" href="http://www.tuniu.com/static/mobile/" target="_blank" rel="nofollow">手机端</a>';
    }
}

function getCookieForLogin() {
	var aCookie = document.cookie.split("; ");
	for ( var i = 0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		cookieName[aCrumb[0]] =aCrumb[1].replace(/<\/?[^>]*>/g,'');
	}
}
function getLoginState() {
	var userInfo = cookieName['tuniuuser'];
	_nickname = cookieName['tuniuuser_name'];
	if (_nickname) {
		_isGuest = true;
		_nickname = unescape(cookieName['tuniuuser_name']);
		_nickname=utf8to16(base64decode(_nickname)).replace(/<\/?[^>]*>/g,'');
	} else {
		_isGuest = false;
	}
	
}
function utf8to16(str) {
	 var out, i, len, c;
	    var char2, char3;

	    out = "";
	    len = str.length;
	    i = 0;
	    while(i < len) {
	        c = str.charCodeAt(i++);
	        switch(c >> 4)
	        {
	          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	            // 0xxxxxxx
	            out += str.charAt(i-1);
	            break;
	          case 12: case 13:
	            // 110x xxxx   10xx xxxx
	            char2 = str.charCodeAt(i++);
	            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	            break;
	          case 14:
	            // 1110 xxxx  10xx xxxx  10xx xxxx
	            char2 = str.charCodeAt(i++);
	            char3 = str.charCodeAt(i++);
	            out += String.fromCharCode(((c & 0x0F) << 12) |
	                                           ((char2 & 0x3F) << 6) |
	                                           ((char3 & 0x3F) << 0));
	            break;
	        }
	    }

	    return out;
}

function base64decode(str) {
	var base64DecodeChars = new Array(
		    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
		    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
		    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
		    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
		    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
		    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c1 == -1);
        if(c1 == -1)
            break;

        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c2 == -1);
        if(c2 == -1)
            break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if(c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while(i < len && c3 == -1);
        if(c3 == -1)
            break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if(c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while(i < len && c4 == -1);
        if(c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function getRouteTypeByID(route_id){
    if((routeId>0 && routeId<80000)||(routeId>200000 && routeId<1000000)||(routeId>=2000000 && routeId<5000000)||(routeId>20000000 && routeId<40000000)){
        return 1;
    }else if((routeId > 80000 && routeId < 200000)||(routeId > 40000000 && routeId < 50000000)){
        return 2;
    }else if((routeId>1000000 && routeId<2000000) || (routeId>=5000000 && routeId<8000000)){
        return 3;
    }else if(routeId>8000000 && routeId<9000000){
        return 4;
    }
}