<?php 
$conn = @mysqli_connect("localhost","root","yhf","html5");
$conn->query("set names utf8");

if(!$conn){
	die("连接失败	");
}

//获取请求的数据
$name = $_POST["name"];
$tel = $_POST["tel"];
$openid = $_POST["openid"];
$city = $_POST["city"];
$sex = $_POST["sex"];
$nickname = $_POST["nickname"];
$headimgurl = $_POST["headimgurl"];

//判断是否已经添加过了
$sql = "SELECT * FROM sq WHERE openid='{$openid}'";
$conn->query($sql);
if (mysqli_affected_rows($conn)>0) {
	echo '{"error":0}';
	exit();
}

//添加数据的sql语句
$sql = "INSERT INTO sq (openid,name,tel,nickname,sex,city,headimgurl) VALUES('{$openid}','{$name}','{$tel}','{$nickname}','{$sex}','{$city}','{$headimgurl}')";
$conn->query($sql);//执行SQL语句

if (mysqli_affected_rows($conn)>0) {
	echo '{"error":0}';
}else{
	echo '{"error":1}';
}

 ?>