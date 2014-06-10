function ScrollText(content,btnPrevious,btnNext,autoStart)
{this.Delay=10;this.LineHeight=20;this.Amount=1;this.Direction="up";this.Timeout=1500;this.ScrollContent=this.$(content);this.ScrollContent.innerHTML+=this.ScrollContent.innerHTML;if(btnNext)
{this.NextButton=this.$(btnNext);this.NextButton.onclick=this.GetFunction(this,"Next");this.NextButton.onmouseover=this.GetFunction(this,"Stop");this.NextButton.onmouseout=this.GetFunction(this,"Start");}
if(btnPrevious)
{this.PreviousButton=this.$(btnPrevious);this.PreviousButton.onclick=this.GetFunction(this,"Previous");this.PreviousButton.onmouseover=this.GetFunction(this,"Stop");this.PreviousButton.onmouseout=this.GetFunction(this,"Start");}
this.ScrollContent.onmouseover=this.GetFunction(this,"Stop");this.ScrollContent.onmouseout=this.GetFunction(this,"Start");if(autoStart)
{this.Start();}}
ScrollText.prototype.$=function(element)
{return document.getElementById(element);}
ScrollText.prototype.Previous=function()
{clearTimeout(this.AutoScrollTimer);clearTimeout(this.ScrollTimer);this.Scroll("up");}
ScrollText.prototype.Next=function()
{clearTimeout(this.AutoScrollTimer);clearTimeout(this.ScrollTimer);this.Scroll("down");}
ScrollText.prototype.Start=function()
{clearTimeout(this.AutoScrollTimer);this.AutoScrollTimer=setTimeout(this.GetFunction(this,"AutoScroll"),this.Timeout);}
ScrollText.prototype.Stop=function()
{clearTimeout(this.ScrollTimer);clearTimeout(this.AutoScrollTimer);}
ScrollText.prototype.AutoScroll=function()
{if(this.Direction=="up")
{if(parseInt(this.ScrollContent.scrollTop)>=parseInt(this.ScrollContent.scrollHeight)/2)
{this.ScrollContent.scrollTop=0;}
this.ScrollContent.scrollTop+=this.Amount;}
else
{if(parseInt(this.ScrollContent.scrollTop)<=0)
{this.ScrollContent.scrollTop=parseInt(this.ScrollContent.scrollHeight)/2;}
this.ScrollContent.scrollTop-=this.Amount;}
if(parseInt(this.ScrollContent.scrollTop)%this.LineHeight!=0)
{this.ScrollTimer=setTimeout(this.GetFunction(this,"AutoScroll"),this.Delay);}
else
{this.AutoScrollTimer=setTimeout(this.GetFunction(this,"AutoScroll"),this.Timeout);}}
ScrollText.prototype.Scroll=function(direction)
{if(direction=="up")
{if(this.ScrollContent.scrollTop==0)
{this.ScrollContent.scrollTop=parseInt(this.ScrollContent.scrollHeight)/2;}
this.ScrollContent.scrollTop-=this.Amount;}
else
{this.ScrollContent.scrollTop+=this.Amount;}
if(parseInt(this.ScrollContent.scrollTop)>=parseInt(this.ScrollContent.scrollHeight)/2)
{this.ScrollContent.scrollTop=0;}
if(parseInt(this.ScrollContent.scrollTop)%this.LineHeight!=0)
{this.ScrollTimer=setTimeout(this.GetFunction(this,"Scroll",direction),this.Delay);}}
ScrollText.prototype.GetFunction=function(variable,method,param)
{return function()
{variable[method](param);}};function getCookie(c_name){if(document.cookie.length>0){c_start=document.cookie.indexOf(c_name+"=");if(c_start!=-1){c_start=c_start+c_name.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length;}
return unescape(document.cookie.substring(c_start,c_end));}}
return"";}
function init_compare(){compareCookie=getCookie("_compare");if(compareCookie!=''){show_slide_Down();get_compare_info(compareCookie);var check_count=(compareCookie.split(',')).length;compare_num_change(check_count);var compare_checkbox_obj=document.getElementsByName("general_route_compare");for(var i=0;i<compare_checkbox_obj.length;i++){if(compareCookie.indexOf(compare_checkbox_obj[i].value)!=-1){compare_checkbox_obj[i].checked=true;if(typeof(compare_checkbox_obj[i].parentNode)!="undefined"){if(compare_checkbox_obj[i].parentNode.parentNode.className=="comparison_bg select"){compare_checkbox_obj[i].parentNode.parentNode.className="comparison_bg";}}
var word=document.getElementById('compare_word'+compare_checkbox_obj[i].value);if((word!=null)&&(typeof(word)!='undefined')){word.innerHTML="取消对比";}}else{compare_checkbox_obj[i].checked=false;if(typeof(compare_checkbox_obj[i].parentNode)!="undefined"){if(compare_checkbox_obj[i].parentNode.parentNode.className=="comparison_bg"){compare_checkbox_obj[i].parentNode.parentNode.className="comparison_bg select";}}
var word=document.getElementById('compare_word'+compare_checkbox_obj[i].value);if((word!=null)&&(typeof(word)!='undefined')){word.innerHTML="加入对比";}}}}}
function label_click(){show_slide_Down();var compare_checkbox_obj=document.getElementsByName("general_route_compare");var routeIds=getCookie("_compare");if(routeIds!=''){routeIds=routeIds+',';}
var routeIdsAdd='';var routeIdsSubTemp='';for(var i=0;i<compare_checkbox_obj.length;i++){if(compare_checkbox_obj[i].checked==true){if(routeIds.indexOf(compare_checkbox_obj[i].value)==-1){routeIds+=compare_checkbox_obj[i].value+',';}
if(routeIdsAdd.indexOf(compare_checkbox_obj[i].value)==-1){routeIdsAdd+=compare_checkbox_obj[i].value+',';}
var comma_count=(routeIds.split(',')).length-1;if(comma_count>3){compare_checkbox_obj[i].checked=false;has_full();return false;}
if(typeof(compare_checkbox_obj[i].parentNode)!="undefined"){if(compare_checkbox_obj[i].parentNode.parentNode.className=="comparison_bg select"){compare_checkbox_obj[i].parentNode.parentNode.className="comparison_bg";}}
checkbox_click(compare_checkbox_obj[i].value);}else if(compare_checkbox_obj[i].checked==false){routeIdsSubTemp=compare_checkbox_obj[i].value;if(routeIdsAdd.indexOf(routeIdsSubTemp)==-1){if(routeIds.indexOf(compare_checkbox_obj[i].value)!=-1){routeIds=routeIds.replace(compare_checkbox_obj[i].value+',','')}}
if(typeof(compare_checkbox_obj[i].parentNode)!="undefined"){if(compare_checkbox_obj[i].parentNode.parentNode.className=="comparison_bg"){compare_checkbox_obj[i].parentNode.parentNode.className="comparison_bg select";}}
checkbox_click(compare_checkbox_obj[i].value);}}
var checked_count=(routeIds.split(',')).length-1;routeIds=routeIds.substr(0,routeIds.length-1);document.cookie="_compare ="+routeIds+";path=/;domain=.tuniu.com";get_compare_info(routeIds);compare_num_change(checked_count);}
function has_full(){$(".top_notice").html('');$(".top_notice").html('<span>对不起，您最多只可以添加三个产品，请先删除对比栏中的一些产品后再添加。</span>');$(".top_notice").show();setTimeout('$(".top_notice").hide()',5000);}
function del_comp_item(i,routeId){clean_item(i);var compare_checkbox_obj=document.getElementsByName("general_route_compare");var routeIds_cookie_tem=getCookie("_compare");if(routeIds_cookie_tem!=''){routeIds_cookie_tem=routeIds_cookie_tem+',';}
for(var i=0;i<compare_checkbox_obj.length;i++){if(routeId==compare_checkbox_obj[i].value){compare_checkbox_obj[i].checked=false;if(routeIds_cookie_tem.indexOf(compare_checkbox_obj[i].value)!=-1){routeIds_cookie_tem=routeIds_cookie_tem.replace(compare_checkbox_obj[i].value+',','')}
if(typeof(compare_checkbox_obj[i].parentNode)!="undefined"){if(compare_checkbox_obj[i].parentNode.parentNode.className=="comparison_bg"){compare_checkbox_obj[i].parentNode.parentNode.className="comparison_bg select";}}
checkbox_click(compare_checkbox_obj[i].value);}}
if(typeof(routeId)!='undefined'){if(routeIds_cookie_tem.indexOf(routeId)!=-1){routeIds_cookie_tem=routeIds_cookie_tem.replace(routeId+',','')}}
var checked_count=(routeIds_cookie_tem.split(',')).length-1;compare_num_change(checked_count);routeIds_cookie_tem=routeIds_cookie_tem.substr(0,routeIds_cookie_tem.length-1)
document.cookie="_compare ="+routeIds_cookie_tem+";path=/;domain=.tuniu.com";get_compare_info(routeIds_cookie_tem);}
function delCookie(name){var date=new Date();date.setTime(date.getTime()-10000);document.cookie=name+"=a; expires="+date.toGMTString()+";path=/;domain=.tuniu.com";}
function del_all_compare(){for(i=0;i<3;i++){clean_item(i);}
var compare_checkbox_obj=document.getElementsByName("general_route_compare");for(var i=0;i<compare_checkbox_obj.length;i++){compare_checkbox_obj[i].checked=false;if(typeof(compare_checkbox_obj[i].parentNode)!="undefined"){if(compare_checkbox_obj[i].parentNode.parentNode.className=="comparison_bg"){compare_checkbox_obj[i].parentNode.parentNode.className="comparison_bg select";}}
checkbox_click(compare_checkbox_obj[i].value);}
delCookie("_compare");compare_num_change(0);hide_slide_Down();}
function clean_item(i){$("#item-empty"+i).html('');$("#item-empty"+i).removeClass('prod_line');$("#item-empty"+i).addClass('add_more');$("#item-empty"+i).html('<p>您还可以继续添加产品</p>');document.getElementById('del_compare'+i).href='javascript:void(0);';}
function get_compare_info(routeIds){if(routeIds==''){del_all_compare();return false;}
var base_url="http://www.tuniu.com";var url=base_url+'/yii.php?r=toursAjax/getInfo/routeIds/'+routeIds+'&jsoncallback=?';$.getJSON(url,function(data){compare_return_count=data.length;for(i=0;i<3;i++){if(data.length>i){$("#item-empty"+i).html('');$("#item-empty"+i).removeClass('add_more');$("#item-empty"+i).addClass('prod_line');$("#item-empty"+i).id='cmp_item_'+data[i].id;$("#item-empty"+i).html('<a href="http://www.tuniu.com/tours/'+data[i].id+'" target="_blank" title="'+data[i].name+'">'
+data[i].showName+'</a><span class="c_price">¥'+data[i].budget+'</span>起');document.getElementById('del_compare'+i).href='javascript:del_comp_item('+i+','+data[i].id+')';}else{clean_item(i);}}
if(data.length>1){document.getElementById('goto-contrast').className='com_btn';}else{document.getElementById('goto-contrast').className='com_btn grey';}});}
function gotocontrast(){init_compare();var routeIds=getCookie("_compare");if(routeIds!=''){var check_count=(compareCookie.split(',')).length;if(check_count<2){$(".top_notice").html('');$(".top_notice").html('<span>对不起，至少有两件商品才能对比哦。</span>');$(".top_notice").show();setTimeout('$(".top_notice").hide()',5000);}else{window.open('http://www.tuniu.com/routecompare/'+routeIds);}}else{$(".top_notice").html('');$(".top_notice").html('<span>对不起，至少有两件商品才能对比哦。</span>');$(".top_notice").show();setTimeout('$(".top_notice").hide()',5000);get_compare_info('');}}
function compare_num_change(check_count){$("#slideDown").html('');if(check_count>0){$("#slideDown").html('对比中的产品('+check_count+'/3)<b>▼</b>');}else{$("#slideDown").html('对比中的产品('+check_count+'/3)<b>▲</b>');}
if(check_count<2){document.getElementById('goto-contrast').className='com_btn grey';}}
function com_pro_click(){show_slide_Down();var routeIds=getCookie("_compare");if(routeIds!=''){routeIds=routeIds+',';}
var routeId=$('#route_id_tmp').val();if(routeIds.indexOf(routeId)==-1){routeIds+=routeId+',';}else{$(".top_notice").html('');$(".top_notice").html('<span>此商品已在对比栏中，不需要重复添加哦。</span>');$(".top_notice").show();setTimeout('$(".top_notice").hide()',5000);return false;}
var comma_count=(routeIds.split(',')).length-1;if(comma_count>3){has_full();init_compare();return false;}
routeIds=routeIds.substr(0,routeIds.length-1)
document.cookie="_compare ="+routeIds+";path=/;domain=.tuniu.com";get_compare_info(routeIds);compare_num_change(comma_count);}
function show_slide_Down(){if($.browser.msie&&$.browser.version=="6.0"){$('.compared_prod').css({position:'absolute',display:"block"});}
else{$('.compared_prod').css({position:'fixed',display:"block"});}
$('.compared_prod').removeClass('hide');if($('.top_detail').length){$('.top_detail').addClass('show');$('.com_prod_lists').show();$('.top_detail').find("b").html("▼");}
var hei=$(window).height();if($.browser.msie&&($.browser.version=="6.0")){$(".compared_prod").css("top",hei+$(window).scrollTop()-108);}}
function hide_slide_Down(){$('.compared_prod').css({position:'static',display:"none"});$('.compared_prod').addClass('hide');if($('.top_detail').hasClass("show")){$('.top_detail').removeClass('show');$('.com_prod_lists').hide();$('.top_detail').find("b").html("▲");}
var hei=$(window).height();if($.browser.msie&&($.browser.version=="6.0")){$(".compared_prod").css("top",hei+$(window).scrollTop()-32);}}
$(function(){var compare_checkbox_show=document.getElementsByName('general_route_compare');var init_flag=0;if(compare_checkbox_show.length!=0){init_flag=1;for(var i in compare_checkbox_show){if(compare_checkbox_show[i].value==''){init_flag=0;}}}
var routeId=$("#route_id_tmp").val();if(typeof(routeId)!='undefined'){init_flag=1;}
if(init_flag==1){init_compare();}else if(init_flag==0){return false;}})
function checkbox_click(routeId){var routeId=routeId;var checkbox=document.getElementById('compare_checkbox'+routeId);var word=document.getElementById('compare_word'+routeId);if((typeof(checkbox)!="undefined")&&(checkbox!=null)){if(checkbox.checked==true){word.innerHTML="取消对比";}else{word.innerHTML="加入对比";}}};(function(a){a.fn.lazyload=function(b){var c={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,skip_invisible:true,feedback:function(){}};if(b){if(null!==b.failurelimit){b.failure_limit=b.failurelimit;delete b.failurelimit}
a.extend(c,b)}
var d=this;if(0==c.event.indexOf("scroll")){a(c.container).bind(c.event,function(g){var e=0;d.each(function(){if(c.skip_invisible&&!a(this).is(":visible")){return}
if(a.abovethetop(this,c)||a.leftofbegin(this,c)){}else{if(!a.belowthefold(this,c)&&!a.rightoffold(this,c)){a(this).trigger("appear")}else{if(++e>c.failure_limit){return false}}}});var f=a.grep(d,function(h){return!h.loaded});d=a(f)})}
this.each(function(){var e=this;e.loaded=false;a(e).one("appear",function(){if(!this.loaded){a("<img />").bind("load",function(){a(e).hide().attr("src",a(e).attr("data-src"))[c.effect](c.effectspeed);e.loaded=true}).attr("src",a(e).attr("data-src"));c.feedback();}});if(0!=c.event.indexOf("scroll")){a(e).bind(c.event,function(f){if(!e.loaded){a(e).trigger("appear");}})}});a(c.container).trigger(c.event);return this};a.belowthefold=function(c,d){if(d.container===undefined||d.container===window){var b=a(window).height()+a(window).scrollTop()}else{var b=a(d.container).offset().top+a(d.container).height()}
return b<=a(c).offset().top-d.threshold};a.rightoffold=function(c,d){if(d.container===undefined||d.container===window){var b=a(window).width()+a(window).scrollLeft()}else{var b=a(d.container).offset().left+a(d.container).width()}
return b<=a(c).offset().left-d.threshold};a.abovethetop=function(c,d){if(d.container===undefined||d.container===window){var b=a(window).scrollTop()}else{var b=a(d.container).offset().top}
return b>=a(c).offset().top+d.threshold+a(c).height()};a.leftofbegin=function(c,d){if(d.container===undefined||d.container===window){var b=a(window).scrollLeft()}else{var b=a(d.container).offset().left}
return b>=a(c).offset().left+d.threshold+a(c).width()};a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0,container:window})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0,container:window})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0,container:window})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0,container:window})}})})(jQuery);;;$(document).mousemove(function(){loadImgLazyBasicAsync();});$(document).keydown(function(){loadImgLazyBasicAsync();});var loadImgLazyBasicAsync_loaded=false;function loadImgLazyBasicAsync(){if(!loadImgLazyBasicAsync_loaded){loadImgLazyBasicAsync_loaded=true;if(loadImgLazyBasicAsync_loaded==true){loadImgLazyBasicMethod();}}else{return 0;}}
$(function(){setTimeout("loadImgLazyBasicMethod()",1500);});function loadImgLazyBasicMethod(){$("img").lazyload({effect:"show",failurelimit:25,threshold:300});}