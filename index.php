<?php

	$cnt = @mysql_connect('localhost','root','//databasepass//') or die('mysql eroor');
	@mysql_select_db('mess_users') or die('database error');
	$user_id = $_GET['user_id'];
	$sesion_id = $_GET['sesion_id'];
	$sesion = $_GET['sesion'];
	$url = $_GET['urls'];
	$date = Date('d' )."-".Date('m')."-".Date('Y')."_".Date('G').":".Date('i');
	$check_user = mysql_fetch_assoc(@mysql_query("SELECT `cookie` FROM `users` WHERE `cookie` = '$user_id'"));
	
	if($check_user['cookie'] != $user_id) { 
		$ins = @mysql_query("INSERT INTO `users` (`cookie`,`create` ) VALUES ('$user_id','$date')");
	}else{
		$ins = @mysql_query("UPDATE `users` SET `last_login` = '$date' WHERE `cookie` = '$user_id'");
	}
	if(!$_GET['sesion_id']) { 
		header('location:/mess/pixel/cont.js');
	}else{
	$check_sesion = @mysql_query("SELECT * FROM `sesions` ORDER BY `id` DESC LIMIT 1");
	$check = @mysql_fetch_assoc($check_sesion);
		if($check['sesion_id'] == $sesion_id) { 
			$update = mysql_fetch_assoc(@mysql_query("SELECT `sesion_url` FROM `robocza` WHERE `sesion_id` = '$sesion_id'"));
			$add_url = $update['sesion_url']."::".$url;
			$ins = @mysql_query("UPDATE `robocza` SET `sesion_url` = '$add_url' WHERE `sesion_id` = '$sesion_id'");
				if($ins)
					header('location:/pixel/cont.js');
		}else {
		$ins = @mysql_query("INSERT INTO `sesions` (`user_id`,`sesion_id`,`sesion`,`sesion_url`) VALUES ('$user_id','$sesion_id','$sesion','$url')");
			if($ins)
				header('loacation:/pixel/cont.js');

		} 
	}

?>

