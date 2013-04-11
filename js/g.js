(function($){
	//画出六芒星
//	(function($){
//		function draw(d){
//			var can = document.getElementById("showfix");
//			if(can.getContext){
//				console.log(can.height);
//				can.height = 83;
//				can.width = 83;
//				console.log(can.height);
//				var ctx = can.getContext("2d");
//				ctx.strokeStyle = "#191919";
//				ctx.lineWidth = 3;
//				ctx.beginPath();
//				
//				var x1 = 80.00;
//				var y1 = 30.00;
//				
//				var x2 = 20.00;
//				var y2 = 30.00;
//				
//				
//				var x11 = x2 + (x1 - x2) / 2;
//				var y11 = y1 + Math.sin(Math.PI / 3) * (x1 - x2);
//				
//				var depth =  d; //绘制维度
//				
//				koch(ctx, x1, y1, x2, y2, 0, depth);
//				koch(ctx, x11, y11, x1, y1, 0, depth);
//				koch(ctx, x2, y2, x11, y11, 0, depth);
//				
//			}else{
//				alert("不支持Canvas");
//			}
//		}
//		function koch(ctx, x1, y1, x2, y2, n, m){		
//			if(m == 0){
//				ctx.moveTo(x1, y1);
//				ctx.lineTo(x2, y2);
//				ctx.stroke();
//				return false;
//			}
//			var x3 = (x2 - x1) / 3 + x1;
//			var y3 = (y2 - y1) /3 + y1;
//			var x4 = (x2 - x1) / 3 * 2 + x1;
//			var y4 = (y2 - y1) / 3 * 2 + y1;
//			var x5 = x3 + ((x2 - x1) - (y2 - y1) * Math.sqrt(3)) / 6;
//			var y5 = y3 + ((x2 - x1) * Math.sqrt(3) + (y2 - y1)) / 6;
//			
//			n = n + 1;
//			
//			if(n == m){
//				ctx.moveTo(x1, y1);
//				ctx.lineTo(x3, y3);
//				ctx.lineTo(x5, y5);
//				ctx.lineTo(x4, y4);
//				ctx.lineTo(x2, y2);
//				ctx.stroke();
//				return false;
//			}
//			
//			koch(ctx, x1, y1, x3, y3, n, m)
//			koch(ctx, x3, y3, x5, y5, n, m)
//			koch(ctx, x5, y5, x4, y4, n, m)
//			koch(ctx, x4, y4, x2, y2, n, m)
//		}
//		draw(1);
//
//	})(jQuery)
	(function($){
		var canvas = $('#showfix')[0];
		var maxr = 40 * Math.sin(Math.PI/3) +2;
		var minr = 40 - 20 * Math.cos(Math.PI/3);
		canvas.height = 2*maxr +6;
		canvas.width = 2*maxr +6;
		var ctx = canvas.getContext('2d');
		ctx.strokeStyle = "#191919";
		ctx.lineWidth = 3;
		ctx.save();
		ctx.translate(maxr -30 + 3,20*Math.sin(Math.PI/3) +3);
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(60,0);
		ctx.lineTo(60*Math.cos(Math.PI/3),60*Math.sin(Math.PI/3));
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
		
		ctx.save();
		ctx.translate(maxr -30 + 3,20*Math.sin(Math.PI/3) +3);
		ctx.beginPath();
		ctx.moveTo(0,40*Math.sin(Math.PI/3));
		ctx.lineTo(60,40*Math.sin(Math.PI/3));
		ctx.lineTo(30,-20*Math.sin(Math.PI/3));
		ctx.closePath();
		ctx.stroke();
		ctx.restore();

		ctx.save();
		ctx.translate(maxr -30 + 3,20*Math.sin(Math.PI/3) +3);
		ctx.beginPath();
		ctx.arc(30,20,maxr,0,Math.PI*2,true);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
		
	})(jQuery);

	var count = 0;
	var handle;
	var docir = function(flag){
		handle = setTimeout(function(){
			if(count ==360){
				count = 0;
			}
			count ++;
			$('#showfix').css({
				'-moz-transform': 'rotate('+ count+'deg)'
				,'-webkit-transform': 'rotate('+ count+'deg)'
			});
			docir();
		},50)
	};
	docir();
    $('nav.fixnav').bind('mouseover',function(){
        $('nav.fixnav .navitem').removeClass('hide');
		clearTimeout(handle);
    }).bind('mouseout',function(){
        $('nav.fixnav .navitem').addClass('hide');
		docir();
    });
})(jQuery);
