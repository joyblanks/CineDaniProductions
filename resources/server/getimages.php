<?php
	
	$remoteImage = getImg($_GET['id'])=='' ? "../images/anno.png" : getImg($_GET['id']);
	$imginfo = getimagesize($remoteImage);
	header("Content-type: ".$imginfo['mime']);
	readfile($remoteImage);
	
	function getImg($id){
		$dom = new DOMDocument;
		$dom->loadHTML(getData($id));
		$tags = $dom->getElementsByTagName('img');
		$img = '';
		foreach ($tags as $tag) {
			$img =  $tag->getAttribute('src');
			//echo($img."<hr/>");
		} 
		return $img;
	}



	function getData($id){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,'https://www.facebook.com/photo.php?fbid='.$id);
		//curl_setopt($ch, CURLOPT_URL,'https://www.facebook.com/'.$id.'?fref=photo');
		//curl_setopt($ch, CURLOPT_PROXY, $proxy);
		//curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:39.0) Gecko/20100101 Firefox/39.0');
		$data = curl_exec($ch);
		curl_close($ch);
		return $data;
	}
	//localhost:8888/CineDani/resources/server/getimages.php?id=###
	
?>