function mousewheel(obj,callback) {
	//判断是否火狐浏览器
	if (navigator.userAgent.indexOf("Firefox")>-1) {
		obj.addEventListener("DOMMouseScroll",fn);//火狐滚轮事件
	}else{
		obj.addEventListener("mousewheel",fn);//非火狐滚轮事件
	}
	function fn(e) {
		var e = e || window.event;
		//火狐 detail 上-3 下3
		//非火狐 wheelDelta 上120 下-120
		// false:下 true:上
		if (e.detail) {
			//e.detail<0判断往上还是往下滚动小于0是上
			callback.call(obj,e,e.detail<0);
		}else{
			//e.wheelDelta>0判断往上还是往下滚动大于0是上
			callback.call(obj,e,e.wheelDelta>0);		
		}
		//阻止默认事件
		e.preventDefault ? e.preventDefault() : (e.returnValue = false);
	}
}