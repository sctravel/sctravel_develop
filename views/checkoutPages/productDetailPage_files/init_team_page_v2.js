function floatLogo(){if($("#kefu_show").length){tourPage.__onLineService($('#kefu_show').attr('groupid'));}
if($("#favorite_id").length){tourPage.__addStow();tourPage.__addBtnRight();tourPage.__clearComparSelect();if($(".zizhu_process").length){$(".comparison_btn").remove();}}
tourPage.__backTop();}
var tourPage={leftCat:function(){var lc=$("#leftcat").length,lcVal=$("#leftcat").val();if(lc){var catLoaded=false;$('.categorys').hover(function(){if(!catLoaded){catLoaded=true;$(".categorys").load('/header/'+lcVal+'');}});}},canlendarLoad:function(){if($("#hotel_page").length){return;}
var routeId=$("#route_id_tmp").val();var no_product_flag=$("#no_product").val();if(no_product_flag==1){routeId=1;}
$.ajax({datatype:"html",url:'/singleCalendar/routeId/'+routeId,success:function(data){$('#calendar').html(data);tabScroll();}});},noDate:function(){var no_date=$("#no_date").length;if(no_date){try{var arrPageSizes=___getPageSize();$('#noDate').css({top:parseInt($('#noDate').css("top"))
-(arrPageSizes[3]/5)
+(arrPageSizes[3]-parseInt($('#noDate').css("height")))/2-10});}catch(e){}}},__tourList:function(){var arry=new Array();for(var t=0;t<$(".tourList").children().length;t++){arry[t]=0;}
if($(".tourList").children().length>1){$(".tourList").find("li").each(function(i,n){var _this=$(n);_this.hover(function(){var _index=_this.index();var l_left=80*(_index)+30;$(".tourItem").eq(_index).find($(".mRec_con .arrow")).css("left",l_left);_this.addClass("xc_selected");var _src=_this.attr(("data-src"));showImg(_src,_index);changeCont(i);},function(){var temp=0;if(arry[i]==1){return false;}
for(var j=0;j<arry.length;j++){if(arry[j]==1){temp=j;}}
changeCont(temp);$(".tourList").find("li").siblings().removeClass("xc_selected").end().eq(temp).addClass("xc_selected");});});$(".tourList").find("li").each(function(i,n){var _ths=$(n);_ths.click(function(){_ths.siblings().removeClass("xc_selected").end().addClass("xc_selected");for(var j=0;j<arry.length;j++){if(i!=j){arry[j]=0;}else{arry[j]=1;$(".tourItem").eq(j).find($(".mRec_con .arrow")).css("left",80*j+30);}}});});function changeCont(tt){$(".tourSection_niuren_parent").children().siblings().hide().end().eq(tt).show();}}},__clearComparSelect:function(){if($(".comparison_btn").length){$(".del_btn").click(function(){$(".comparison_btn").removeClass("compar_select");});}},__commScroll:function(){if($(".right_scroll").length==0){var rightHtml='<div class="right_scroll"></div>';var winWidth=$(window).width(),comparison=parseInt((winWidth-1000),10)/2,winh=$(window).height();$(document.body).append(rightHtml);$(".right_scroll").css({top:258});}},__scrollPosition:function(obj){var st=$(window).scrollTop(),winh=$(window).height();if(!window.XMLHttpRequest){obj.css({"top":st+winh-winh/2,"background-attachment":"fixed","background-image":"url(about:blank)"});}},__onLineService:function(groupid){var st=$(window).scrollTop(),localTime=new Date().getHours().toLocaleString();var numTime=parseInt(localTime,10);var onLine=$('<li><a class="add_order" id="esq_live800" value="0"></a></li>'),offLine=$('<li><a class="add_order add_order_hide"></a></li>');var $backToTopEle;if(numTime>=7&&numTime<=21){addAttr(onLine,$backToTopEle);$backToTopEle=onLine;$(function(){$backToTopEle.show();});}else{return false;}
function addAttr(obj,fnshow){var treeObj=obj,fnobj=fnshow;var $backToTopTxt='在线客服';fnobj=treeObj.appendTo($(".right_scroll")).attr({title:$backToTopTxt});treeObj.find("a").attr({href:'javascript:Live800('+groupid+',560,480);'});}},__addBtnRight:function(){var st=$(window).scrollTop();var comparison_btn=$('<li data="加入对比"><a class="comparison_btn" onclick="com_pro_click();""></a></li>');addAttr(comparison_btn,comparison_btn);function addAttr(obj,fnshow){fnshow=obj.appendTo($(".right_scroll"));};$(function(){comparison_btn.show();$(".comparison_btn").click(function(){_gaq.push(['_trackEvent','[产品页]','[浮动层点击]','[加入对比]']);if($(".compared_prod").hasClass("hide")){$(".comparison_btn").removeClass("compar_select");}else{$(".comparison_btn").addClass("compar_select");}});});},__addStow:function(){var uId=$("#userId").val(),routeId=$("#route_id").val();var addStow=$('<li data="加入收藏"><a class="add_scroll"></a></li>');addAttr(addStow);function addAttr(obj,fnshow){fnshow=obj.appendTo($(".right_scroll"));}
addStow.click(function(){_gaq.push(['_trackEvent','[产品页]','[浮动层点击]','[加入收藏]']);var addbtn=$("#favorite_id");if(addbtn.hasClass("on")){addStow.addClass("addbtn");}
$(window).scrollTop(100,0);clickAddScroll();});},__backTop:function(){var backTop=$('<li data="返回顶部"><a class="backToTop"></a></li>');addAttr(backTop);function addAttr(obj,fnshow){fnshow=obj.appendTo($(".right_scroll"));}
backTop.click(function(){$(window).scrollTop(0,0);});},__addWeChat:function(s){var weChat=$('<li class="fashion_icon" data="扫码支付" id="Saoma"><a class="add_weChat"></a><div class="pop_weChart" id="weChat_pop"></div></li>');addAttr(weChat);function addAttr(obj,fnshow){if($(".right_scroll").find(".add_order").length>0){fnshow=obj.insertAfter($(".right_scroll li").eq(0));}else{fnshow=obj.insertBefore($(".right_scroll li").eq(0));}}
if(!$("#weChat_pop").find("img").length){$("#weChat_pop").append('<img src='+s+' alt="" /><p class="">微信扫码预订<br />点评多返5元</p>');}
tourPage.__showRightScrollPop();},__addOrderPhone:function(){if($("#Saoma").length>0){return false;}
var tuniuNum=$(".tuniu_400_num").html();var orderPhone=$('<li class="fashion_icon" data="电话预订"><a class="add_phone"></a><span class="pop_phone_p"><img class="pop_phone" src="http://img1.tuniucdn.com/img/20140423/common/pop_phone.png"/><span class="pop_phone_num">'+tuniuNum+'</span></span></li>');addAttr(orderPhone);function addAttr(obj,fnshow){if($(".right_scroll").find(".add_order").length>0){fnshow=obj.insertAfter($(".right_scroll li").eq(0));}else{fnshow=obj.insertBefore($(".right_scroll li").eq(0));}}
tourPage.__showRightScrollPop();},__clearComparSelect:function(){if($(".comparison_btn").length){$(".del_btn").click(function(){$(".comparison_btn").removeClass("compar_select");});}},__showRightScrollPop:function(){var fashion_icon=$(".right_scroll .fashion_icon");if(fashion_icon.length>0){fashion_icon.each(function(i,n){$(n).hover(function(){if($(n).find(".pop_phone_p").length>0){$(n).find(".pop_phone_p").find(".pop_phone").show();$(n).find(".pop_phone_p").find(".pop_phone_num").show();}
if($(n).find(".pop_weChart").length>0){$(n).find(".pop_weChart").show();}},function(){$(n).find(".pop_phone_p").find(".pop_phone").hide();$(n).find(".pop_phone_p").find(".pop_phone_num").hide();$(n).find(".pop_weChart").hide();});});}},__addErWeiMa:function(s,t){var wifiYouhui=$("#wifiYouhui");if(s){wifiYouhui.find("#wifiHasErWei").show().find("img").attr("src",t);}else{wifiYouhui.hide();}}}
tourPage.canlendarLoad();$(window).resize(function(){rightScrollChange.adjustScreen();});var rightScrollChange={adjustScreen:function(){var time="";$(window).resize(function(){clearTimeout(time);time=setTimeout("rightScrollChange.rePosRightScroll()",200);});},rePosRightScroll:function(){var right_scroll=$(".right_scroll");if(right_scroll.length>0){var winWidth=$(window).width();if(winWidth>1100){$(".right_scroll").show();var comparison=parseInt((winWidth-1000),10)/2;var winh=$(window).height();$(".right_scroll").css({bottom:winh/2-80});}else{$(".right_scroll").hide();}};}}
var getAppData={getCookie:function(c_name){if(document.cookie.length>0)
{c_start=document.cookie.indexOf(c_name+"=")
if(c_start!=-1)
{c_start=c_start+c_name.length+1
c_end=document.cookie.indexOf(";",c_start)
if(c_end==-1)c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))}}
return""},getRouteId:function(){var routeId_ProdType=[];var route_id=$("#route_id").val();var city_code=$("#city_code").val();var prodType="";if(route_id&&route_id!=""){routeId_ProdType[0]=route_id;}
if(city_code&&city_code!=""){routeId_ProdType[1]=city_code;}
if(prodType!=""){routeId_ProdType[2]=0;}
return routeId_ProdType;},insertInPage:function(data){var insertWhere=$("");insertWhere.html(data);},getTuniuApp:function(){var routeIdProdType=getAppData.getRouteId();var tn_url="http://dynamic.m.tuniu.com/webBanner/getBannerForProduct";var tn_data={"productId":routeIdProdType[0],"cityCode":routeIdProdType[1],"p":getAppData.getCookie("tuniu_partner"),"productType":routeIdProdType[2]}
var data={"success":false,"qRCodeUrl":""}
if(data.success){tourPage.__addWeChat(data.qRCodeUrl);}else{tourPage.__addOrderPhone();}
tourPage.__addErWeiMa(data.success,data.qRCodeUrl);}}
$(function(){tourPage.noDate();tourPage.__commScroll();floatLogo();getAppData.getTuniuApp();$(window).bind("scroll",function(){setTimeout(function(){tourPage.__scrollPosition($(".right_scroll"))},100);});tourPage.leftCat();});;$(function(){tourPage.__tourList();$('.update_project').each(function(i,n){$(this).hover(function(){$('.update_con').eq(i).toggle(0,function(){$('.update_project').eq(i).toggleClass('update_project_hover');return false;});});});if($('#kind_flag').length>0&&$('#tour_abstruct').length>0){if($('#kind_flag').val()==7){var cont=$.trim($('#tour_abstruct').text());cont=cont.substring(0,cont.length-1);$('#tour_abstruct').text(cont+'（您可在网上预订过程中查看和选择合适的航班出行）。');}}
var cmpId=request('cmpid');var routeId;var noDateStr=$('#no_product').val();var noDate=parseInt(noDateStr,10);var cityCode=$('#city_code').val();var catid=$('#catid').val();if(noDate==1){routeId=$('#route_id_tmp').val();}else{routeId=0;}
if(!cmpId){cmpId=0;}
if(cmpId=='mkt_08009601'||cmpId=='mkt_08009602'||noDate){var data={'key':'recommended','id':catid,'routeid':routeId,'city':cityCode,'type':1,'limit':4,'cmpid':cmpId};$.get('/ajax-default/',data,function(data,status){if(data){$("#noprod_box").html(data);$("#noprod_box").show();}else if(noDate==1){try{var arrPageSizes=___getPageSize();$('#noDate').css({top:parseInt($('#noDate').css("top"))-(arrPageSizes[3]/5)+(arrPageSizes[3]-parseInt($('#noDate').css("height")))/2-10});}catch(e){}
$("#noprod_box").removeClass("mb_10");}else{$("#noprod_box").removeClass("mb_10");}});}
$(document).mousemove(function(){mouseAsync();});var is_lazy=false;var offsetTopHeight=$("#pkg-detail-tab-bd").offset().top,windowHeight=$(window).height();$(window).scroll(function(){if(is_lazy==false){var scrollTopHeight=$(window).scrollTop();if(((offsetTopHeight-scrollTopHeight)<=windowHeight)){is_lazy=true;In('thickbox');In('online_ask');}}});$(function(){$('.pop_box .del').each(function(){$(this).click(function(){$(this).parent().hide();})});var userId=$('#userId').attr("user_id");var myCollectId=$('#myCollectId').attr("my_collect_id");if(userId>0&&myCollectId>0){disClick();}});doAddCollection();gaAndTac();});function doAddCollection(){$("#favorite_id").click(function(){var userId=$("#userId").attr("user_id"),routeId=$("#route_id_tmp").val();if(userId>0){var url="/main.php?do=user_route_collect&flag=collectInsert";var info={userId:userId,routeId:routeId};$.get(url,info,function(data){if(data==1){disClick();$('#collcet_id').show();$('#delete_collcet_id').hide();return;}else if(data==2){$('#delete_collcet_id').show();$('#collcet_id').hide();$(".add_to_favorite").removeClass("on");$(".change_price").children('div').removeClass('change_price_con').css('display','none');$('.start_subscribe').addClass('change_price_con');$('.change_plan_date').addClass('change_price_date');$('.change_price_list .subscribe_info').hide();$('.select_date1').find('.s_con').text('请选择出发日期');$('.select_date2').find('.s_con').text('请选择出发日期');$('.email').val('');return;}else if(data==3){alert('添加收藏失败!');return;}else if(data==4){alert('删除收藏失败!');return;}});}else{$('#login_id').show();return;}});}
function clickAddScroll(){var userId=$("#userId").attr("user_id"),routeId=$("#route_id_tmp").val();if(userId>0){var url="/main.php?do=user_route_collect&flag=collectInsert";var info={userId:userId,routeId:routeId};$.get(url,info,function(data){if(data==1){disClick();$('#collcet_id').show();$('#delete_collcet_id').hide();return;}else if(data==2){$('#delete_collcet_id').show();$('#collcet_id').hide();$(".add_to_favorite").removeClass("on");$(".change_price").children('div').removeClass('change_price_con').css('display','none');$('.start_subscribe').addClass('change_price_con');$('.change_plan_date').addClass('change_price_date');$('.change_price_list .subscribe_info').hide();$('.select_date1').find('.s_con').text('请选择出发日期');$('.select_date2').find('.s_con').text('请选择出发日期');$('.email').val('');return;}else if(data==3){alert('添加收藏失败!');return;}else if(data==4){alert('删除收藏失败!');return;}});}else{$('#login_id').show();return;}}
function request(paras){var url=location.href;var paraString=url.substring(url.indexOf("?")+1,url.length).split("&");var paraObj={}
for(i=0;j=paraString[i];i++){paraObj[j.substring(0,j.indexOf("=")).toLowerCase()]=j.substring(j.indexOf("=")+1,j.length);}
var returnValue=paraObj[paras.toLowerCase()];if(typeof(returnValue)=="undefined"){return"";}else{return returnValue;}}
function disClick(){$(".add_to_favorite").addClass("on");var addbtn=$("#favorite_id");if(addbtn.hasClass("on")){$(".add_scroll").addClass("addbtn");}}
function loadXmlDocRecentOrderInfo(url,func){if(window.XMLHttpRequest){xmlhttpRecentOrders=new XMLHttpRequest();}else{xmlhttpRecentOrders=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttpRecentOrders.onreadystatechange=func;xmlhttpRecentOrders.open("GET",url,true);xmlhttpRecentOrders.send();}
var mouseAsync_loaded=false;function mouseAsync(){if(!mouseAsync_loaded){mouseAsync_loaded=true;In('header_v2');var callBackLeftUserInfo_Async=$("#callBackLeftUserInfo_Async").val();if(callBackLeftUserInfo_Async){callBackLeftUserInfo();}
$("img").lazyload({effect:"show",failurelimit:25,threshold:300});if(document.getElementById("recent_orders_show")){callBackRecentOrderInfo();}
if(document.getElementById("bdshell_js").length>0){document.getElementById("bdshell_js").src="http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion="+Math.ceil(new Date()/3600000);}
In('foot_css');}}
function floatLogo(){if($("#kefu_show").length){tourPage.__onLineService($('#kefu_show').attr('groupid'));}
if($("#favorite_id").length){tourPage.__addStow();tourPage.__addBtnRight();tourPage.__clearComparSelect();if($(".zizhu_process").length){$(".comparison_btn").remove();}}
tourPage.__backTop();}
var xmlhttpRecentOrders;function callBackRecentOrderInfo(){var routeId=$("#route_id_tmp").val();var empty_tenUsers=$("#empty_tenUsers").val();var urlRecentOrders="/lazy/routeRecentOrder/";urlRecentOrders+=routeId;loadXmlDocRecentOrderInfo(urlRecentOrders,function(){if(xmlhttpRecentOrders.readyState==4&&xmlhttpRecentOrders.status==200){document.getElementById("recent_orders_show").innerHTML=xmlhttpRecentOrders.responseText;if(!empty_tenUsers){if($(".ub_wrap").find("li").length>0){var marquee=new ScrollText("ub_wrap");marquee.LineHeight=30;marquee.Amount=1;marquee.Timeout=1000;marquee.Delay=30;marquee.Start();}}}});}