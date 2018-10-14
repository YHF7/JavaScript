var timer = setInterval(function () {
	var dao = document.querySelector("#dao");
	var li = document.querySelectorAll("#ul1 li");
	var show = document.querySelector("#show");
	var showColor = show.style.color;
	for (var i = 0; i < li.length; i++) {
		var font = li[i].innerText;
		if(showColor==getColor(font)){
			li[i].click();
		}
	}
	function getColor(font) {
		switch(font){
			case "红":return "red";break;
			case "黄":return "yellow";break;
			case "蓝":return "blue";break;
			case "绿":return "green";break;
			case "黑":return "black";break;
		}
	}
	if (dao<0) {
		clearInterval(timer);
	}
},1000)
