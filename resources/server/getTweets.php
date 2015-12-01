<?php
//ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "2446839200-eydfjmlLptQmEZI7dnbH0O5MuFxEzbr2Els1XjB",
    'oauth_access_token_secret' => "adGoafLREOTUCSONPrVd1rTZBjUvzQQEKa158I86cGYLW",
    'consumer_key' => "98sAQSVr70oul7mqdHIAz7Wuf",
    'consumer_secret' => "ooE7Ot6QSqjbzsBJVN0yGRzEGEjhwTkvClzlc9CQx1RznhPJpO"
);
/*
/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ /
$url = 'https://api.twitter.com/1.1/blocks/create.json';
$requestMethod = 'POST';

/** POST fields required by the URL above. See relevant docs as above /
$postfields = array(
    'screen_name' => 'usernameToBlock', 
    'skip_status' => '1'
);

/** Perform a POST request and echo the response /
$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($postfields)
             ->performRequest();

/** Perform a GET request and echo the response /
/** Note: Set the GET field BEFORE calling buildOauth(); /
$url = 'https://api.twitter.com/1.1/followers/ids.json';
$getfield = '?screen_name=J7mbo';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
*/

$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name=cinedani&exclude_replies=true&count=1000';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
$tweets =  $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();

echo json_encode(array("tweets"=>json_decode($tweets)));
