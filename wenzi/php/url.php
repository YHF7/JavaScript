<?php 
$appid = "wxc37ef0f2c502d694";

$scope = "snsapi_userinfo";
$src = urlEncode("http://192.168.1.103/wenzi/php/getuser.php");

$url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appid}&redirect_uri={$src}&response_type=code&scope={$scope}&state=STATE#wechat_redirect";
echo $url;
 ?>