<?php
function email($to, $from, $cc, $subject, $message){
	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";

	if($cc){
		$headers .= 'Cc: <'.$cc.'>' . "\r\n";
	}
	$headers .= 'From: <'.$from.'>' . "\r\n";
	//$message = preparehtmlmail($message);
	//if(mail($to,$subject,$message['multipart'],$message['headers'])){
	if(@mail($to,$subject,$message,$headers)){
		echo '{"status":"1","message":"Message from Server: Your query was sent successfully!"}';
		return true; 
	}
	else{
		echo '{"status":"0","message":"Sorry, could not deliver e-mail!"}';
		return false;
	}
}

function mailQuery($name, $fromEmail, $phone, $subject, $query , $toEmail){
	$domain = "@cinedaniproductions.co.in";
	$message=
	"<div style=\"filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#F2F5A9', endColorstr='#DBA901',GradientType=0 );background-image:-webkit-radial-gradient(50% 50%, circle, #F2F5A9, #DBA901);background-image:-moz-radial-gradient(50% 50%, circle, #F2F5A9, #DBA901);background-image:-ms-radial-gradient(50% 50%, circle, #F2F5A9, #DBA901);background-image:-o-radial-gradient(50% 50%, circle, #F2F5A9, #DBA901);background-image:radial-gradient(circle at 50% 50%, #F2F5A9, #DBA901);padding:100px 50px;\">".
	"<h1 style=\"color:brown;text-shadow:1px 1px 1px #000;\">".
	"<img src=\"http://cinedaniproductions.co.in/resources/images/logo.png\" style=\"width:50px;height:50px;\" />".
	"Cine Dani Productions</h1><br />".
	"Dear Vikas Dani,".
	"<br />"."<br />".
	$query.
	"<br />".
	"<br />&nbsp;Thanks".
	"<br />&nbsp;<b>$name</b>".
	"<br />&nbsp;$fromEmail".
	"<br />&nbsp;$phone".
	"<br /><hr />".
	"</div>";
	
	return(email($toEmail, "webauto".$domain, $fromEmail, $subject, $message)) ? true : false;
}


define("DEFCALLBACKMAIL", "webauto@cinedaniproductions.co.in"); // WIll be shown as "from".
//$final_msg = preparehtmlmail($html); // give a function your html*

//mail('your@mail.com', 'your subject', $final_msg['multipart'], $final_msg['headers']); 
// send email with all images from html attached to letter


function preparehtmlmail($html) {

  preg_match_all('~<img.*?src=.([\/.a-z0-9:_-]+).*?>~si',$html,$matches);
  $i = 0;
  $paths = array();

  foreach ($matches[1] as $img) {
    $img_old = $img;

    if(strpos($img, "http://") == false) {
      $uri = parse_url($img);
      $paths[$i]['path'] = $_SERVER['DOCUMENT_ROOT'].$uri['path'];
      //echo $paths[$i]['path'];
      $content_id = md5($img);
      $html = str_replace($img_old,'cid:'.$content_id,$html);
      $paths[$i++]['cid'] = $content_id;
    }
  }

  $boundary = "--".md5(uniqid(time()));
  $headers .= "MIME-Version: 1.0\n";
  $headers .="Content-Type: multipart/mixed; boundary=\"$boundary\"\n";
  $headers .= "From: ".DEFCALLBACKMAIL."\r\n";
  $multipart = '';
  $multipart .= "--$boundary\n";
  $kod = 'utf-8';
  $multipart .= "Content-Type: text/html; charset=$kod\n";
  $multipart .= "Content-Transfer-Encoding: Quot-Printed\n\n";
  $multipart .= "$html\n\n";

  foreach ($paths as $path) {
    if(file_exists($path['path']))
      $fp = fopen($path['path'],"r");
      if (!$fp)  {
        return false;
      }

    $imagetype = substr(strrchr($path['path'], '.' ),1);
    $file = fread($fp, filesize($path['path']));
    fclose($fp);

    $message_part = "";

    switch ($imagetype) {
      case 'png':
      case 'PNG':
            $message_part .= "Content-Type: image/png";
            break;
      case 'jpg':
      case 'jpeg':
      case 'JPG':
      case 'JPEG':
            $message_part .= "Content-Type: image/jpeg";
            break;
      case 'gif':
      case 'GIF':
            $message_part .= "Content-Type: image/gif";
            break;
    }

    $message_part .= "; file_name = \"$path\"\n";
    $message_part .= 'Content-ID: <'.$path['cid'].">\n";
    $message_part .= "Content-Transfer-Encoding: base64\n";
    $message_part .= "Content-Disposition: inline; filename = \"".basename($path['path'])."\"\n\n";
    $message_part .= chunk_split(base64_encode($file))."\n";
    $multipart .= "--$boundary\n".$message_part."\n";

  }

  $multipart .= "--$boundary--\n";
  return array('multipart' => $multipart, 'headers' => $headers);  
}
	$test = "joy.blanks@gmail.com";
	$prod = "cinnedani@gmail.com";
	mailQuery($_POST["fname"]." ".$_POST["lname"],$_POST["email"],$_POST["tel"],$_POST["subject"],$_POST["query"],$prod);

?>