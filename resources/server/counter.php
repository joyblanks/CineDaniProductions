<?php
	include_once("db.access.php");
	header('Content-type: application/json');
	action();

	function action(){
		if ($_SERVER["REQUEST_METHOD"] != "POST") die("You can only reach this page by posting from the web page.");
		$where = isset($_GET["where"]) ? $_GET["where"] : "home";
		
		if(isset($_GET["mode"])){
			if($_GET["mode"]=="add"){
				addNew($where);
			}
			if($_GET["mode"]=="getCount"){
				echo json_encode(array("count"=>getCount($where)));
			}
		}
		exit();
	}

	function addNew($where){
		$db = new dbAccess();
		$db->query("SELECT * FROM `visitcounter` WHERE  module = '$where';");
		if($db->numrows()){
			$db->query("UPDATE `visitcounter` SET `count`= count+1, `ts` = CURRENT_TIMESTAMP WHERE module = '$where';");
		}else{
			$db->query("INSERT INTO `visitcounter` (`module`, `count`) VALUES ('home','0')");
		}
		$db->freeresult();
		$db->destroy();
	}

	function getCount($where){
		$db = new dbAccess();
		$count = 0;
		$db->query("SELECT count FROM `visitcounter` WHERE  module = '$where';");
		if($db->numrows()){
			$count = $db->fetchfield('count',0);
		}
		$db->freeresult();
		$db->destroy();
		return $count;
	}

?>