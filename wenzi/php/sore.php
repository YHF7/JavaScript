<?php 
$conn = @mysqli_connect("localhost","root","yhf","html5");
$conn->query("set names utf8");

if (!$conn) {
	die("连接数据库失败");
}

$sore = $_GET["sore"];
$openid = $_GET["openid"];

//获取数据库里面的分数
$sql = "SELECT sore FROM sq WHERE openid='{$openid}'";
$result = $conn->query($sql);
$sq_sore = $result->fetch_assoc()["sore"];


//判断当前分数大于数据库分数
if ($sore>$sq_sore) {
	$max_sore = $sore;
	$sql = "UPDATE sq SET sore={$sore} WHERE openid='{$openid}'";
	$conn->query($sql);
}else{
	$max_sore = $sq_sore;
}

//获取排名
$sql = "SELECT count(id) as ranking FROM sq WHERE sore>{$max_sore}";
$result = $conn->query($sql);
$ranking = $result->fetch_assoc()["ranking"]+1;

echo '{"error":0,"sore":'.$max_sore.',"ranking":'.$ranking.'}';

?>