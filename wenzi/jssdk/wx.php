<?php 
require_once "jssdk.php";
$jssdk = new JSSDK("wxc37ef0f2c502d694", "9f2d3efa12bcac261f398c7f1be26065");
$url = $_POST["url"];
$signPackage = $jssdk->GetSignPackage($url);

echo '{
	"appId":"'.$signPackage["appId"].'",
	"timestamp":'.$signPackage["timestamp"].',
	"nonceStr":"'.$signPackage["nonceStr"].'",
	"signature":"'.$signPackage["signature"].'"
}';

 ?>