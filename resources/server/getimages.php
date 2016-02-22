<?php
	$remoteImage = handleRead($_GET['id']);
	$imginfo = getimagesize($remoteImage);
	header("Content-type: ".$imginfo['mime']);
	echo file_get_contents($remoteImage);

	//readfile($remoteImage);

	function handleRead($id){
		$remoteImage = getImg($id)=='' ? "../images/anno.png" : getImg($id);
		//$img_file = file_get_contents(html_entity_decode($remoteImage));
		return html_entity_decode($remoteImage);
	}

	//header("Content-type: text/plain");
	/*function getImg($id){
		$dom = new DOMDocument;
		$dom->loadHTML(getData($id));
		$tags = $dom->getElementsByTagName('img');
		$img = '';
		print_r(getData($id));
		foreach ($tags as $tag) {
			$img =  $tag->getAttribute('src');
			echo($img."<hr/>");
		} 
		return $img;
	}
	//v 2015
	*/

	function getImg($id){
		$questArr = getData($id);
		preg_match_all('/src="([^"]+)"/', $questArr, $images);
		$img = '';
		foreach ($images[0] as $tag) {
			if (strpos($tag, 'p480x480') !==false) {
				$img =  substr ( $tag , 5 , -1 );
				//echo $img;
				break;
			}
		}

		return $img;
	}
	//v 2016

	//content=$(wget http://localhost:8888/CineDani/resources/server/getimages.php?id=10153248367522329 -q -O -)
	//echo $content

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