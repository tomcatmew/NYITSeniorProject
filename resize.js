
$(document).ready(function(){
	mobilestyle();
})
$(window).resize(function () {
	mobilestyle();
})

function mobilestyle(){
	if(isMobile()){
		$("body").addClass("mobile").removeClass("pc");
	}else{
		$("body").removeClass("mobile").addClass("pc");
	}
}

function isMobile() {
    var userAgentInfo = navigator.userAgent;
    var mobileAgents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad","iPod"];
    var mobile_flag = false;
    // 根据userAgent判断是否是手机
    for (var v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }
     var screen_width = window.screen.width;
     var screen_height = window.screen.height;

     // 根据屏幕分辨率判断是否是手机
     if(screen_width < 500 && screen_height < 800){
         mobile_flag = true;
     }

     return mobile_flag;
}

// 扩展最大宽度
(function($) {
	$.fn.picMax = function(boxWidth, boxHeight, seed) {
	    this.each(function() {
		// var newimgHeight = boxHeight;//图片新高度
		// var newimgWidth;//图片新宽度
		var imgheight = $(this).height();// 图片实际高度
		var imgwidth = $(this).width();// 图片实际宽度
		if (imgwidth > 0) {
		    /* 根据原始图片宽高比例 计算出新的图片宽度 */
		    var scale = imgwidth / imgheight;
		    var inputscale = boxWidth / boxHeight;
			  if (scale > inputscale) {
					newheight = boxWidth / imgwidth * imgheight;
					console.log(boxHeight);
					ntop = ((newheight * (seed - 1)) / 2) - ((boxHeight - newheight) / 2);
					nleft = ((boxWidth * (seed - 1)) / 2);
					$(this).css({"width": boxWidth * seed, "height": newheight * seed, "display": "block", "margin-top": -ntop, "margin-left": -nleft});
					$(this).attr("active-data", "over");
		    } else {
					newwidth = boxHeight / imgheight * imgwidth;
					ntop = (boxHeight * (seed - 1)) / 2;
					nleft = ((newwidth * (seed - 1)) / 2) - ((boxWidth - newwidth) / 2);

					$(this).css({"width": newwidth * seed, "height": boxHeight * seed, "display": "block", "margin-left": -nleft, "margin-top": -ntop});
					$(this).attr("active-data", "over");
		    }
		}
	 });
	}
})(jQuery);

function wait_for_img(obj, callback) {
	var max_img_size = $(obj).size();
	var load_img_size = 0;
	if(max_img_size>0){
		$(obj).one('error',function(){
			load_img_size++;
			if (max_img_size == load_img_size) callback();
			return;
		});
		$(obj).one('load', function() {
			load_img_size++;
			if (max_img_size == load_img_size) callback();
			return;
		}).each(function() {
			if (this.complete) $(this).load();
		});
	}else{
		callback();
		return;
	}
}
