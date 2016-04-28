<?php
	

	header('Content-type: application/json');
	//error_reporting(E_ALL); This is a jugaad method
	$chg = '';
	$imageName;
	$categoryName;
	$allrecords = array();
	$records = array();
	$dirArray = array();
	$count = 0;
	$urlPrefix = "./resources/gallery/";
	$filter = isset($_GET['filter']) ? $_GET['filter'] : 0; 
	$dir = new RecursiveDirectoryIterator("../gallery");
	foreach (new RecursiveIteratorIterator($dir) as $filename => $file) {
		$imageName = basename($filename);
		$categoryName = basename(dirname($filename));
		//echo $imageName;
		if($filter && !preg_match('/'.$filter.'/i',$categoryName)){
			continue;
		}
		if($imageName === '..' || $categoryName === 'gallery') {
			continue;//parent folder iterator and main dir
		}else if ($imageName === '.') {
    		//array_push($jsonObj, array("category" => $categoryName, "dir"=>rawurlencode($categoryName), "records"=>array()));
    		//array_push($dirArray, array("category" => $categoryName, "dir"=>rawurlencode($categoryName)));
    		//echo count($dirArray);
    	}else if(!($imageName=='.DS_Store' || $imageName=='Thumbs.db')){
    		if($chg==''){
    			$chg=$categoryName;
    		}
    		if($chg==$categoryName){
    			array_push($records,array( "image" => $urlPrefix.rawurlencode($categoryName)."/".$imageName, "id" => ++$count, "description" => $categoryName ));
    		}else{
    			$chg=$categoryName;
    			//array_push($allrecords, array("category" => $categoryName, "dir"=>rawurlencode($categoryName), "records"=>$records));
    			//$records = array();
    			array_push($records,array( "image" => $urlPrefix.rawurlencode($categoryName)."/".$imageName, "id" => ++$count, "description" => $categoryName ));
    		}
    		//array_push($jsonObj[count($jsonObj)-1]['records'],  array( "image" => $imageName, "id" => ++$count, "desc" => "" ));
    		//if($count==3)break;
    	}
	}
	//array_push($allrecords, array("category" => $categoryName, "dir"=>rawurlencode($categoryName), "records"=>$records));
	$jsonObj = array("gallery"=>$records);
	/*for($i=0;$i<count($dirArray);$i++){
		$dirArray[$i]["records"] = $allrecords[$i];
		array_unshift($jsonObj["gallery"],$dirArray[$i]);
	}*/
	echo json_encode($jsonObj);

?>