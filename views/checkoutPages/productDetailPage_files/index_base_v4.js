$('.categorys').hover(function(){$(this).addClass('hover');$("#_JD_ALLSORT").css({"display":"block"});},function(){$(this).removeClass('hover');$("#_JD_ALLSORT").css({"display":"none"});});function getHeaderMenu(str){if(str!=''){var arr=str;document.getElementById("categorys").innerHTML=arr.content;}(function($){$.fn.menuAim=function(opts){this.each(function(){init.call(this,opts);});return this;};function init(opts){var $menu=$(this),activeRow=null,mouseLocs=[],lastDelayLoc=null,timeoutId=null,options=$.extend({rowSelector:"> div",submenuSelector:"*",submenuDirection:"right",tolerance:75,enter:$.noop,exit:$.noop,activate:$.noop,deactivate:$.noop,exitMenu:$.noop},opts);var MOUSE_LOCS_TRACKED=3,DELAY=300;var mousemoveDocument=function(e){mouseLocs.push({x:e.pageX,y:e.pageY});if(mouseLocs.length>MOUSE_LOCS_TRACKED){mouseLocs.shift();}};var mouseleaveMenu=function(){if(timeoutId){clearTimeout(timeoutId);}if(options.exitMenu(this)){if(activeRow){options.deactivate(activeRow);}activeRow=null;}};var mouseenterRow=function(){if(timeoutId){clearTimeout(timeoutId);}options.enter(this);possiblyActivate(this);},mouseleaveRow=function(){options.exit(this);};var clickRow=function(){activate(this);};var activate=function(row){if(row==activeRow){options.activate(row);activeRow=row;return;}asyMenuImg(row);if(activeRow){options.deactivate(activeRow);}options.activate(row);activeRow=row;};var asyMenuImg=function(r){var cover_img=$(r).find(".cover-img img");var cover_img_data_src=cover_img.attr("data-src");var cover_img_src=cover_img.attr("src");if(cover_img_data_src&&cover_img_data_src.length>0){if(cover_img_data_src==cover_img_src){return;}else{cover_img.attr("src",cover_img_data_src)}}}
var possiblyActivate=function(row){var delay=activationDelay();if(delay){timeoutId=setTimeout(function(){possiblyActivate(row);},delay);}else{activate(row);}};var activationDelay=function(){if(!activeRow||!$(activeRow).is(options.submenuSelector)){return 0;}var offset=$menu.offset(),upperLeft={x:offset.left,y:offset.top-options.tolerance},upperRight={x:offset.left+$menu.outerWidth(),y:upperLeft.y},lowerLeft={x:offset.left,y:offset.top+$menu.outerHeight()+options.tolerance},lowerRight={x:offset.left+$menu.outerWidth(),y:lowerLeft.y},loc=mouseLocs[mouseLocs.length-1],prevLoc=mouseLocs[0];if(!loc){return 0;}if(!prevLoc){prevLoc=loc;}if(prevLoc.x<offset.left||prevLoc.x>lowerRight.x||prevLoc.y<offset.top||prevLoc.y>lowerRight.y){return 0;}if(lastDelayLoc&&loc.x==lastDelayLoc.x&&loc.y==lastDelayLoc.y){return 0;}function slope(a,b){return(b.y-a.y)/(b.x-a.x);};var decreasingCorner=upperRight,increasingCorner=lowerRight;if(options.submenuDirection=="left"){decreasingCorner=lowerLeft;increasingCorner=upperLeft;}else if(options.submenuDirection=="below"){decreasingCorner=lowerRight;increasingCorner=lowerLeft;}else if(options.submenuDirection=="above"){decreasingCorner=upperLeft;increasingCorner=upperRight;}var decreasingSlope=slope(loc,decreasingCorner),increasingSlope=slope(loc,increasingCorner),prevDecreasingSlope=slope(prevLoc,decreasingCorner),prevIncreasingSlope=slope(prevLoc,increasingCorner);if(decreasingSlope<prevDecreasingSlope&&increasingSlope>prevIncreasingSlope){lastDelayLoc=loc;return DELAY;}lastDelayLoc=null;return 0;};$menu.mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);$(document).mousemove(mousemoveDocument);};})(jQuery);;leftCatv2();slideMenu();}function leftCatv2(){var x=$("#_JD_SORTLIST").remove().html();$("#_JD_ALLSORT").html(x).attr("load","1");}
function slideMenu(){var $menu=$("#_JD_ALLSORT");$menu.menuAim({activate:activateSubmenu,deactivate:deactivateSubmenu,exitMenu:exitMenu});function activateSubmenu(row){var $row=$(row),submenuId=$row.data("submenuId"),$submenu=$("#"+submenuId),height=$menu.outerHeight(),width=$menu.outerWidth();$submenu.css({left:width-2});reposLocation($row);$row.addClass("hover");}
function deactivateSubmenu(row){var $row=$(row),submenuId=$row.data("submenuId"),$submenu=$("#"+submenuId);$row.removeClass("hover");}
function exitMenu(row){var $row=$(row),submenuId=$row.data("submenuId"),$submenu=$("#"+submenuId);$row.find(">div").removeClass("hover");}}
function reposLocation(t){var _JD_ALLSORT=$("#_JD_ALLSORT");var _JD_ALLSORT_height=_JD_ALLSORT.height();var t_imc=t.find(".i-mc");var _JD_ALLSORT_top=_JD_ALLSORT.offset().top;var t_imc_height=t_imc.height();var t_top=t.offset().top;var t_height=t.height();var win_height=$(window).height();var t_to_top=t_top-_JD_ALLSORT_top+t_height;var t_top_to_top=t_top-_JD_ALLSORT_top;if(t_imc_height<_JD_ALLSORT_height){if((_JD_ALLSORT_height-t_top_to_top)<=t_imc_height){t_imc.css("top",_JD_ALLSORT_height-t_imc_height);}
else{t_imc.css("top",t_top_to_top);}}}
$(function(){var state=false;if(!state){createHotelSlideBox();state=true;}
$("#hotelNav, #hotelSlideBox").hover(function(){$("#hotelSlideBox").removeClass("hide");},function(){$("#hotelSlideBox").addClass("hide");})})
function createHotelSlideBox(){var obj=document.createElement('div');obj.className="hotel_long_box hide";obj.id="hotelSlideBox";obj.innerHTML=hotel_pop_box;var hotel_pop_box='<div class="hotel_slide_long">'+'<a href="http://hotel.tuniu.com" target="_blank">境内酒店</a>'+'<a href="http://globalhotel.tuniu.com" target="_blank" rel="nofollow">境外酒店</a>'+'<a href="http://tuan.tuniu.com/hotel/" target="_blank" rel="nofollow">酒店团购</a>'+'</div>';obj.innerHTML=hotel_pop_box;document.getElementById("long_nav_bg").appendChild(obj);}