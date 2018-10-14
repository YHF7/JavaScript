<?php 
$conn = @mysqli_connect("localhost","root","yhf","html5");
$conn->query("set names utf8");

if(!$conn){
	die("连接失败	");
}

//获取请求的数据
$openid = $_POST["openid"];

//判断是否已经添加过了
$sql = "SELECT * FROM sq WHERE openid='{$openid}'";
$conn->query($sql);

if (mysqli_affected_rows($conn)>0) {
	echo '{"error":0}';
}else{
	echo '{"error":1}';
}

 ?>