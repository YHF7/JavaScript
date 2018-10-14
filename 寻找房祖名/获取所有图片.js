var img = document.querySelectorAll(".wrap img")
setInterval(function () {
	for (var i = 0; i < img.length; i++) {
	img[i].click()
}
},1000)
//用定时器一秒执行一次
//获取触发所有的照片