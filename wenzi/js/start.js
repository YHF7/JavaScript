$(function() {

	//手势事件
	$(function() {  
	    FastClick.attach(document.body);  
	});  

	//阻止默认事件
	$("body").bind("touchmove",function (event){
		event.preventDefault();
	});
	
// 数据获取------------------------------------------------------------------>

	//获取数据
	var $start = $("#start");//开始按钮
	var $retry = $("#retry");//重按钮
	var $dao = $("#dao");//倒计时
	var $wan = $("#wan");//记录完成的分数
	var $show = $("#show");//点击的字
	var $li = $("#ul1 li");//底部的字

	var $ks = 0;

	var $score = 0;//记录分数
	var $start_bol = false;//判断开始和结束
	var $retry_bol = false;//判断重试
	var $a;//记录show的字颜色

// 数据获取------------------------------------------------------------------>


// 开始和重试---------------------------------------------------------------->

	// 点击开始
	$start.on("click",function() {
		if ($start_bol) {return}//如果点击了开始不再可以点击

		// ajax请求数据库判断是否有openid
		$.ajax({
			type:"post",
			url:"php/show.php",
			data:{//需要添加的数据
				openid:localStorage.openid
			},
			dataType:"json",
			success:function (rs) {
				if (rs.error==0) {
					startFn();//开始游戏函数
					$ks = 1;
				}else {
					//添加创建数据
					$("#user_data").show();
				}
			}
		})
		$start_bol = true;//判断开始
		// startFn();
	})

	//点击重试
	$retry.on("click",function() {
		if($ks<1){return}
		$retry_bol = true;
		$start_bol = true;
		startFn();//开始游戏函数
	})

// 开始和重试---------------------------------------------------------------->


// 游戏设置------------------------------------------------------------------>

	//提交用户信息-》成功后执行
	$(".sub").on("touchstart",function (e){
		var reg = /^1[34578]\d{9}$/;//正则判断电话
		//判断数据不可以为空
		if ($(".userData_name").val()=="") {
			alert("姓名不能为空");
			return;
		}else if($(".tel").val()==
			""){
			alert("手机不能为空");
			return;
		}else if(!reg.test($(".tel").val())){
			alert("手机号有误");
			return;
		}
		//ajax请求添加数据
		$.ajax({
			type:"post",
			url:"php/add.php",
			data:{//需要添加的数据
				openid:localStorage.openid,//获取openid
				nickname:localStorage.nickname,//获取微信名
				city:localStorage.city,//获取地点
				headimgurl:localStorage.headimgurl,//获取头像
				sex:localStorage.sex,//获取性别
				name:$(".userData_name").val(),//获取游戏创建名字
				tel:$(".tel").val()//获取电话
			},
			dataType:"json",
			success:function (rs) {
				if (rs.error==0) {
					$("#user_data").hide();
					startFn();//开始游戏函数
					$ks = 1;
				}
			}
		})				
		e.preventDefault();//阻止默认事件
	});

	//开始游戏函数
	function startFn() {
		$a = null;//重置字颜色
		$score = 0;//重置分数
		$wan.text("完成: " + $score);//显示分数
		daoFn(20);//倒数函数
		changeAll();//开始改变字颜色函数		
		$li.on("click",function () {
			if (!$start_bol) {return}
			var $showColor = $a;//获取到show字的颜色
			var $font = $(this).text();//获取但前点击到的字
			if($showColor==getColor($font)){//判断是否正确
				$score++;//加分
			}else{
				$score--;//减分
			}
			// $score++;
			$wan.text("完成: " + $score);//更新分数
			changeAll();//开始改变字颜色函数
		})
	}

	//改变字颜色函数
	function changeAll() {
		var $arrFont = ["红","黄","蓝","绿","黑"];//文字数组
		var $arrColor = ["red","green","blue","black","yellow"];//颜色数组
		$a = $arrColor[rndFn(0,4)];//记录show的字颜色
		$show.html($arrFont[rndFn(0,4)]);//显示文字
		$show.css("color",$a);//显示颜色
		// 文字数组排序打乱
		$arrFont.sort(function() {
			return Math.random() - 0.5;
		})
		//颜色数组排序打乱
		$arrColor.sort(function() {
			return Math.random() - 0.5;
		})
		//给美=每个li分配颜色和文字
		for (var i = 0; i < $li.length; i++) {
			$li.eq(i).html($arrFont[i]);//显示li的字
			$li.eq(i).css("color",$arrColor[i]);//显示li字的颜色	
		}
	}

	//随机函数
	function rndFn(min,max){
		return parseInt(Math.random()*(max-min)+min);
	}

	//判断颜色
	function getColor($font) {
		switch($font){
			case "红":return "red";break;
			case "黄":return "yellow";break;
			case "蓝":return "blue";break;
			case "绿":return "green";break;
			case "黑":return "black";break;
		}
	}

	//时间倒数
	function daoFn(n) {
		var $timer=setInterval(function (){
			if (n){
				n-=0.02;
				n=n.toFixed(2);	
				if ($retry_bol){
					n=0;
					clearInterval($timer);
					$retry_bol = false;
				}
				if (n<0){
					n=0;
					// window.share("我数了"+"¥,大家快来挑战我！");
					clearInterval($timer);
					$("#p3").show();
					$("#result_num").html("￥" + $score);
					var resultTxt = Math.random()>0.5?"没办法！你已经强到没有对手了":"你太客气了，这不是你的挑战极限吧";
					$("#result_txt").html(resultTxt);

					//ajax请求保存分数
					$.ajax({
						type:"get",
						url:"php/sore.php",
						data:{sore:$score,openid:localStorage.openid},
						dataType:"json",
						success:function(rs) {
							if (rs.error==0) {
								//获取最高分
								$("#highScore").html(rs.sore);
								//获取排名
								$("#result_rank").html(rs.ranking);
							}
						},
						error:function () {
							alert("请求失败")
						}
					})

					$retry_bol = false;
					$start_bol = false;
					$ks = 0;

					return;
				}
				$dao.html("剩余时间:" + n);
			}
		}, 20);
	}
})

// 游戏设置------------------------------------------------------------------>


// 按钮和结束----------------------------------------------------------------->

	//活动奖品
	$(".prize").on("click",function (){
		$("#prize").show();
	})

	//使用说明
	$(".shiyong").on("click",function (){
		$("#shiyong").show();
	})

	//活动规则
	$(".activity_rule").on("click",function (){
		$("#activity_rule").show();
	})

	//关闭注册弹窗
	$(".close").on("touchstart",function (){
		$(this).parent().hide();
	});

	//分享按钮
	$(".p3_share_btn").on("click",function() {
		$("#share").show();
	})

	//再来一次
	$(".p3_again").on("click",function() {
		$("#p3").hide();
		$start_bol = true;
		$ks = 1;
		startFn();//开始游戏函数
	})

	//排行榜
	$("#row").on("click",function(e) {
		$("#ranking").show();
			//ajax请求获取排行榜数据
			$.ajax({
				type:"get",
				url:"php/ranking.php",
				dataType:"json",
				success:function (rs) {
					if (rs.error!=0) {return}
					var arr = rs.data;
					var num = '';
					for (var i = 0; i < arr.length; i++) {
						if (i>2) {
							num = i+1;
						}
						var $li = $('<li><span class="rank">'+num+'</span><img class="title_img" src="'+arr[i].headimgurl+'" alt="" /><span class="user_name">'+arr[i].nickname+'</span><span class="point">'+arr[i].sore+'分</span></li>');
						$(".ranking_wrap ul").append($li);
					}
				},
				error:function () {
				}
			})
		$("#ranking").on("click",function(e) {
			e.preventDefault();
		})
	})

	//结束时的排行榜
	$(".ranking").on("click",function() {
		$("#ranking").show();
			//ajax请求获取排行榜数据
			$.ajax({
				type:"get",
				url:"php/ranking.php",
				dataType:"json",
				success:function (rs) {
					if (rs.error!=0) {return}
					var arr = rs.data;
					var num = '';
					for (var i = 0; i < arr.length; i++) {
						if (i>2) {
							num = i+1;
						}
						var $li = $('<li><span class="rank">'+num+'</span><img class="title_img" src="'+arr[i].headimgurl+'" alt="" /><span class="user_name">'+arr[i].nickname+'</span><span class="point">'+arr[i].sore+'分</span></li>');
						$(".ranking_wrap ul").append($li);
					}
				},
				error:function () {
				}
			})
		$("#ranking").on("click",function(e) {
			e.preventDefault();
		})
	})

	// 按钮和结束----------------------------------------------------------------->