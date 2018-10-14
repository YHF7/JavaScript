<?php 
$conn = @mysqli_connect("localhost","root","yhf","html5");
$conn->query("set names utf8");

if (!$conn) {
	die("连接数据库失败");
}

//获取排名SQL语句
$sql = "SELECT nickname,sore,headimgurl FROM sq ORDER BY sore DESC LIMIT 0,10";
$result = $conn->query($sql);

$arr = array();
while ($row = $result->fetch_assoc()) {
	$arr[] = $row;
}

$str = json_encode($arr);//转为字符串
echo '{"error":0,"data":'.$str.'}';

?>