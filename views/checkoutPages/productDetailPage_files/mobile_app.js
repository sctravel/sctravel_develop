function createLink(){var myLink=document.createElement("link");myLink.type="text/css";myLink.rel="stylesheet";myLink.href="http://img1.tuniucdn.com/s/20140512/ad_mask/mask.css";document.getElementsByTagName("head")[0].appendChild(myLink);}
function getCookie(c_name)
{if(document.cookie.length>0)
{c_start=document.cookie.indexOf(c_name+"=")
if(c_start!=-1)
{c_start=c_start+c_name.length+1
c_end=document.cookie.indexOf(";",c_start)
if(c_end==-1)c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))}}
return""}
function setCookie(c_name,value,expiredays)
{var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+"="+escape(value)+
((expiredays==null)?"":";expires="+exdate.toGMTString())+";path=/;domain=.tuniu.com";}
function closeMobileApp(){var client_mask=document.getElementById("client_mask");client_mask.style.display="none";setCookie("tuniu_app_cc","list_three_days",3);}
function createMobielApp(){createLink()
var obj=document.createElement('div');obj.className="client_mask";obj.id="client_mask";obj.innerHTML=mobile_app;var mobile_app='<div class="mask"></div>'+'<div class="main_ clearfix">'+'<img src="http://img4.tuniucdn.com/img/2014051215/ad_mask/mask_bottom.png" usemap="#maskbottom" />'+'<map id="maskbottom" name="maskbottom">'+'<area shape="rect" coords="885,77,965,103" href="http://itunes.apple.com/cn/app/id447313708?ls=1&mt=8" target="_blank" />'+'<area shape="rect" coords="885,112,965,137" href="http://images.tuniu.com/android/tuniu.apk" target="_blank" />'+'<area shape="rect" coords="885,145,965,170" href="http://itunes.apple.com/cn/app/id550926905?ls=1&mt=8" target="_blank" />'+'<area shape="rect" coords="990,41,1045,88" href="javascript:void(0)" onclick="closeMobileApp()" />'+'</map>'+'</div>'+'</div>';obj.innerHTML=mobile_app;document.getElementsByTagName("body")[0].appendChild(obj);}
function tuniuapp_init(){username=getCookie('tuniu_app_cc');if(username.length>0){return false;}else{createMobielApp();}}
var dy_temp=true;document.onmousemove=function(){if(dy_temp){if(!window.XMLHttpRequest){dy_temp=false;return false;}
tuniuapp_init();}
dy_temp=false;}