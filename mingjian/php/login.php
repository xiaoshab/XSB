<?php 
	header("Access-Control-Allow-Origin:*");
	$un = $_POST["username"];
	$upd = $_POST["password"];
	mysql_connect("localhost:3306","root","");
	mysql_select_db("user");
	$sql = "SELECT id,username FROM users WHERE username='$un' AND password = '$upd'";
	$result = mysql_query($sql);
if($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		echo '{"status":1,"data":'.json_encode($row).'}';
	} else {
		echo '{"status":0,"data":{}}';
	}
?>