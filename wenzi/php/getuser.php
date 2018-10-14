<?php 
$code = $_GET["code"];

$appid = "wxc37ef0f2c502d694";
$secret = "9f2d3efa12bcac261f398c7f1be26065";

// 通过code获取access_token的地址
$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$appid}&secret={$secret}&code={$code}&grant_type=authorization_code";
$data = file_get_contents($url);
// $data字符串转对象
$obj = json_decode($data);
$access_token = $obj->access_token;
$openid = $obj->openid;
// echo "$data";
// 通过access_token获取用户信息

//获取一个用户信息的地址
$url = "https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token."&openid=".$openid."&lang=zh_CN";

//请求获取用户信息
$data = file_get_contents($url);
//获取到的字符串转为JSON
$json = json_decode($data);

$str = '
	<script>
		localStorage.openid = "'.$openid.'";
		localStorage.nickname = "'.$json->nickname.'";
		localStorage.sex = "'.$json->sex.'";
		localStorage.city = "'.$json->city.'";
		localStorage.headimgurl = "'.$json->headimgurl.'";
		location.href = "../wenzi.html";
	</script>
';
echo $str;

 ?>