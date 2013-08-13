(function ($){
	/*focusImage  用来设置焦点图
	 * opts.images: type:  array 必选   
	 * opts.type: 幻灯片的种类 1、大图加数字 2、左右箭头加图 3 大图小图
	 * opts.method: 左右移动、隐藏显示、src变换
	 * opts.n 开始显示第几幅图 
	 * */
	$.fn.focusImage = function(options){
		if(! this.length){ 
			return;
		}
		var Default = {
			images:['./images/1.jpg','./images/2.jpg','./images/3.jpg','./images/4.jpg','./images/5.jpg','./images/6.jpg','./images/7.jpg']
			,type: 1
			,method: 1
			,n: 0
			,imgDim: {width:460,height:600}
		};
		var opts = $.extend(Default,options);
		var cssHtmlArr = [],htmlArr = [];
		
		var wid = parseInt(opts.imgDim.width)
			,hei = parseInt(opts.imgDim.height);

		cssHtmlArr.push(
			'<style>'
			,'	.hide{display:none}'
			,'	.fiUl{padding:0;}'
			,'	.fiUl li{list-style:none;}'
			//,'	.fiArrrowBtn{background: url("images/ico_1.png") no-repeat scroll 0 0 transparent;cursor: pointer;display: inline-block;height: 20px;overflow: hidden;vertical-align: middle;width: 20px;}'
			,'	.ficontainer{width:',wid,'px;height:',hei,'px;}'
			,'	.fiArrowBtn{background:url(images/ico.png) no-repeat;display:inline-block;width:21px;height:110px;position:relative;}'
			,'	.fiArrowL{background-position:-190px -10px;bottom:',hei/2 + 55,'px;left:0;}'
			,'	.fiArrowR{background-position:-230px -10px;bottom:',hei/2 + 55,'px;left:',wid-40,'px;}'
			,'	.fiArrowL:hover{background-position:-110px -10px;}'
			,'	.fiArrowR:hover{background-position:-150px -10px;}'
			,'</style>'
		);
		htmlArr.push(
			'<div class="ficontainer">'
			,'<ul class="fiUl">'	
		);
		for(var i=0;i<opts.images.length;i++){
			htmlArr.push(
				'<li class="hide">'
					,'<img alt="none" width="',wid,'px" height="',hei,'px" src="',opts.images[i],'"/>'
				,'</li>'
			);
		}
		htmlArr.push('</ul>');
		htmlArr.push('<a href="#" class="fiArrowL fiArrowBtn hide"></a>')
		htmlArr.push('<a href="#" class="fiArrowR fiArrowBtn hide"></a>')
		htmlArr.push('</div>');
		$(document.head).append(cssHtmlArr.join(''));
		this.html(htmlArr.join('')).find('.fiUl li:eq('+ opts.n +')').removeClass('hide');
		$(this).carousel();
		return this;
	};
	/*用来设置图片的切换。
	 *start：初始显示的图片
	 *content: 图片内容区域 
	 *tab：左右标签
	 */
	$.fn.carousel = function(options){
		if(!this.length){
			return;
		}	
		var defaults = {
			//start: Math.floor(window.Math.random() * this.find('.sy-con').length)
			start: 0 
			,content: this.find('ul li')
			,tab: this.find('.fiArrowBtn')
			,active: 'on'
		};
		var opts = $.extend(defaults, options);
		var N = opts.content.length; 
		var current = opts.start;
		var setTimeout_handle;
		var content_show = function(flag){
			//flag 为true逆序
            var n = current;
			opts.content.addClass('hide').eq(n).removeClass('hide');
            //opts.tab.find('ul li').removeClass('on').eq(n).addClass('on');
			if(flag){
				current = n-1 < 0 ? N-1 : n - 1;
			}else{
				current = n+1 == N ? 0 : n + 1;
			}
			setTimeout_handle = setTimeout(arguments.callee,5000);
		}
		content_show(opts.start);
        opts.tab.bind('click',function(e){
			e.preventDefault();
            window.clearTimeout(setTimeout_handle);
			if($(e.target).hasClass('fiArrowR')){
				content_show();
			}else{
				content_show(true);
			}
		});
		return this;
	};
})(jQuery)
