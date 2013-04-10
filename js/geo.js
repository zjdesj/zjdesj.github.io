$(function(){
	(function(window,$){
		var geo = window.navigator.geolocation,
			$lat = $('#lat'),
			$lng = $('#lng'),
			$heg = $('#heg'),
			$img = $('.img');
		
		$lat.val('正在加载');
		$lng.val('正在加载');
		$heg.val('正在加载');
		if(!! geo){
			geo.getCurrentPosition(function(data){
				console.log(data);
				var coor = data.coords;
				$('#lat').val(coor.latitude);
				$('#lng').val(coor.longitude);
				$('#heg').val(coor.altitude);
				$img.hide();
			},function(msg){
				console.log(msg);
			});
		}else{
			$lat.val('不支持定位');
			$lng.val('不支持定位');
			$heg.val('不支持定位');
			$img.hide();
		}
	})(window,jQuery)
});
