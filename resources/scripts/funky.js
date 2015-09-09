//browsers
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;// At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = !!document.all || !!document.documentMode; // At least IE6
var pagesTitle = ["load", "home", "whoweare", "films", "awardsrecognition", "gallery", "corporatevideos", "contactus"];

var dl = (document.domain=='') ? new Array(0,0,0,0) : new Array(1000,2500,500,1500);//Anime 1,2,3

//loader function 1 for show false for hide
function loading(m){
	//$('.fcking').toggleClass('fcking2');
	m = isNaN(m*1000) ?  0 : m*1000 ;
	if(m){
		$('#rollerli').prop({'src':'resources/images/rotator.png','class':'fcking fcking2'});
		$('#loading,#loader').fadeIn();
		//setTimeout(function(){loading()},m);
	}else{
			$('#rollerli').prop({'src':'resources/images/rotator.png','class':'logo'});//put logo.png here. TODO
			$('#loading,#loader').fadeOut();
	}
}

var counter = 0;

//mobile menu
function mobileMenu(m){
	if(m=='x'){
		var m = $('ul.ca-menu').position().left!=0;
	}
	$('ul.ca-menu').show().animate({left:(m?0:'-100%')});
}

function doTheMobileMenu(fl){
	var xfl = fl.pageX < (screen.width/25);
	if(xfl)
		mobileMenu(1);
}

window.onhashchange = function(e) {
  var what = window.location.hash.substring(1);
  var where = $.inArray(what, pagesTitle);
  where = (where >=1 && where <=7) ? where : 1;
  	funnyScript(where,false);

}

$(document).ready(function(){
	var websiteloaded = cookieMe('websiteloaded');
	if(websiteloaded.getCookie()){
		dl = new Array(100,200,10,50);
	}else{
		$.ajax({url: './resources/server/counter.php?mode=add',type: 'POST'});
		
	}
	if(!Modernizr.csstransitions){
		var fckShitHTM = '<div class=fckShit><b><center>&gt;&gt;It seems you are viewing this website in a very ancient browser. '
			+'We recommend that you download and use a modern Browser.</center></b><br/>'
			+'<iframe src="http://browsehappy.com/" width="100%" height="95%" frameBorder=0 allowtransparency="true"></iframe></div>';
		$('body').css({'background':'#FFF'}).empty().html(fckShitHTM);


	}else{
		if(!Modernizr.csspointerevents){
			$('#tv').css({'z-index':1});
		}
		if(isFirefox){
			idontknowman = Math.random();
			$('#idontknowman').prop({src:('resources/images/ctd.gif?r='+idontknowman)});
		}
		$('#preloader').find('img').waitForImages(function(){
			if(++counter == $('#preloader').find('img').length){
				$('#preloader').hide();
				setTimeout(startAnime,1000);
			}
		});
	}
	/*
	if($('ul.ca-menu li').css('display')=='list-item')
		$(document).click(doTheMobileMenu).mousemove(doTheMobileMenu);
	*/
});



function golaRez(){
	var wRol = $('.fckingRoller');
	var wd = wRol.width()>=wRol.height();
	$('#rollerli').css({width:(wd?'':wRol.width()-10),height:(wd?wRol.height()-10:'')});
}

$.fn.animateBG = function(x,y,speed,e,comp) {
    var pos = this.css('background-position').split(' ');
    this.x = pos[0].split('px')[0] || 0;
	this.y = pos[1].split('px')[0] || 0;
    $.Animation(
    	this, {x: x, y: y }, {duration:speed, easing:e, complete:comp}
    	).progress(function(e) {this.css('background-position', '0px '+e.tweens[1].now+'px');
    });
    return this;
}
var preloading = false;
function jaldiKaroPreload(imA){
	//preload all other img
	preloading = true;
	var imgL = imA.length;
	var imgTxt = ''
	while(imgL--){
		imgTxt += '<img src="resources/images/bkg/'+imA[imgL]+'" width=1 height=1 />';
	}
	$('#preloader').empty().append(imgTxt).show().find('img').waitForImages(function(){
		if(++counter == $('#preloader').find('img').length){
			$('#preloader').hide();
			preloading = false;
		}
	});
}

//Animation - 1 : BKG backdrop
function startAnime(){
	jaldiKaroPreload(imgArr);
	$('#loading').hide();
	$('.preloader').remove();
	$('body').css({'background':'#FFF url(resources/images/bkg2.jpg) repeat-x','background-size':('106px '+$(window).height()+'px'),'background-position':'0px '+($(window).height()*-1)+'px'});
	if(isFirefox || isIE){
		$('body').animateBG(0,0,dl[0],'easeOutCirc',function(){$('body').css({'background-position-y':0});roller1();});
	}else{
		$('body').animate({backgroundPositionY:('+='+$(window).height())},{duration:dl[0]+500,easing:'easeOutCirc',complete:function(){$(this).css({'background-position-y':0});roller1();}});
	}
}
//Animation - 2 | Movie counter > Menu Shift > Menu Build
function roller1(){
	var r = $('<div class=roller/>');

	r.appendTo('body').css({left:$(window).width()/2-125,top:$(window).height()/2-75});
	r.append('<img src="resources/images/ctd.gif'+(isFirefox?'?r='+idontknowman:'')+'" class="ctd" id="ctd" />');
	$('#ctd').delay(dl[1]-200).fadeOut(100);
	r.delay(dl[1]).animate(
		 {top:0,left:10,height:'150',width:'200'}
		,{duration:dl[2]
			,easing:'easeOutCirc'
			,complete:function(){
				$(this).fadeOut(50);
				$('footer').slideDown();
				$('#roller2').css({top:0,height:100,width:250}).fadeIn(130) //**1
					.animate({height:'15%',width:($(window).width())},{duration:dl[3],easing:'easeOutCirc',complete:function(){finishFunky();}});
			}
		}
	);
}
//Animation - 3 | Adjust Roller to screen > main screen in > Stop all anime
function finishFunky(){
	$('#roller2').css({'transition': 'all 400ms linear',width:'99.9%',right:0});
	$('#hello').hide();
	$('.ca-menu').fadeIn();
	var hgt = $('li').css('display')=='list-item' ? ($(window).height()*6/7+'px') : ($(window).height()*7/9.4+'px');
	var tv = $('#tv');
	tv.css({'width':$(window).width()-20,height:hgt,'background-size':$(window).width()-20+'px '+hgt}).fadeIn();
	$('#content').fadeIn();
	setTimeout(golaRez,600);
	$('.roller').remove();
	$('#preloader').hide();
	myCustomReady();
}



$(window).resize(function(){
	var mDevice = $('ul.ca-menu li').css('display')=='list-item';
	/*if(mDevice)
		$(document).click(doTheMobileMenu).mousemove(doTheMobileMenu);
	else
		$(document).unbind('click',doTheMobileMenu).unbind('mousemove',doTheMobileMenu);
	*/

	if($('#roller2').is(':visible')){
		$('#roller2').css({width:($(window).width())});
		var tv = $('#tv');
		var hgt = mDevice ? ($(window).height()*6/7+'px') : ($(window).height()*7/9.4+'px');
		tv.css({'width':$(window).width()-20,height:hgt,'background-size':$(window).width()-20+'px '+hgt});
		//$('#content').css({'width':$(window).width()-30,height:$(window).height()*5.5/8-25+'px'})
		setTimeout(golaRez,600);
	}
	if($('.lvl2').is(':visible')){
		$('#content').animate({scrollLeft:($('#content>div').width()/2)},0);
	}
	$('body').css({'background-size':('106px '+$(window).height()+'px'),'background-position-y':0});
});

//Hover on anything ** Currently disabled
function cine(t,n){
	// onmouseover="cine(1,event)" onmousemove="cine(1,event)" onmouseout="cine(0,event)"
	if(t==1){
			n = n ? n : window.event;
			$('#cineDani').css({top:(n.clientY +10) +'px',left:(n.clientX +10) +'px'}).fadeIn();

	}else if(t==2){
		n = n ? n : window.event;
		$('#cineDani').css({top:(n.clientY +10) +'px',left:(n.clientX +10) +'px'});
	}else $('#cineDani').hide();
}

/*********************************Finished Animations Core fn Start*******************************/

function myCustomReady(){
	//This is my new onload
	//$('.social').find('div').tooltip();
	var websiteloaded = cookieMe('websiteloaded');
	if(!websiteloaded.getCookie()){
		websiteloaded.setCookie('1',15);
	}
	var baseUrl = (window.location.href.split('#')[1]);
	var unit = $.inArray(baseUrl, pagesTitle);
	funnyScript(unit>0 && unit<=7 ? unit : 1);
}


function pageGallery() {
	var $navArrows = $( '#nav-arrows' ).hide();
	var $navOptions = $( '#nav-options' ).hide();
	var	$shadow = $( '#shadow' ).hide();
	slicebox = 0,
	init = function() {initEvents();},
	initEvents = function() {
		var ddv = $('.bhdimg');
		$.getJSON('./resources/server/galleryJSON.php',function(data){
			var thumbsGallery = '';
			var mainGallery = '';
			var count = 0;
			$.each(data.gallery, function(i1, obj1) {
				thumbsGallery += '<h3 class=clear>'+obj1.category+'</h3>';
				$.each(obj1.records, function(i2, obj2) {
					mainGallery += '<li><img src="./resources/gallery/'+obj1.dir+'/'+obj2.image+'"/>'+(obj2.desc?'<div class="sb-description"><h3>'+obj2.desc+'</h3></div>':'')+'</li>';
					thumbsGallery += '<div what="'+(++count)+'" style="background:url(./resources/gallery/'+obj1.dir+'/'+obj2.image+') no-repeat scroll center / cover;"></div>';
				});
			});
			
			$( '#sb-slider' ).append(mainGallery);
			slicebox = $( '#sb-slider' ).slicebox( {
				onReady : function() {
					$navArrows.show();
					$navOptions.show();
					$shadow.show();
				},
				orientation : 'r',
				cuboidsRandom : true,
				disperseFactor : 30

			} );
			$('.bhdimg')
				.append(thumbsGallery)
				.find('>div').click(function(){
					slicebox.jump( parseInt($(this).attr('what')));
				});
			$navArrows.children(':first')	.on('click', function() { slicebox.next();		return false;} );
			$navArrows.children(':last')	.on('click', function() { slicebox.previous();	return false;} );
			$navOptions.children(':first')	.on('click', function() { slicebox.play();		return false;} );
			$navOptions.children(':last')	.on('click', function() { slicebox.pause();		return false;} );
		});
		//<div><div class=video /></div> if required
		
	};
	return { init : init };
}

/*cookie util@joy*/
function cookieMe(name){
	this.name = name;
	this.getCookieInternal = function(){
		var cookieStr = document.cookie;
		var startSlice = cookieStr.indexOf(this.name+"=");
		if (startSlice == -1){return false}
		var endSlice = cookieStr.indexOf(";",startSlice+1)
		if (endSlice == -1){endSlice = cookieStr.length}
		var isData = cookieStr.substring(startSlice,endSlice)
		var isValue = isData.substring(isData.indexOf("=")+1,isData.length);
		return isValue;
	}
	this.setCookie = function(value,expiry){
		var d = new Date();
	    d.setTime(d.getTime() + ((expiry?expiry:1)*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
		document.cookie = this.name+"="+value+";"+expires;
	}
	this.getCookie = function(){
		var tranValue = this.getCookieInternal(this.name);
		return (tranValue)?tranValue:false;
	}
	this.deleteCookie = function(){
		var tranValue = this.getCookieInternal(this.name)
		if(tranValue){document.cookie = this.name + "= ; expires=Thu, 01-Jan-00 00:00:01 GMT;";}
	}
	return this;
}

// internal AJAX Call to bring resources
function funnyScript(what,which){
	var sts = 0;
	$.ajax({
		url: './resources/stuff/'+what+'.html'+'?e='+Math.random()
		,type: 'GET'
		,dataType: 'html'
		,success: function (data) {
			$('#content').html(data).scrollTop(0).scrollLeft(0);
			sts = 1;
			var bkWt = '#FFF '+ ((imgArr.indexOf(what+'.jpg')>-1) ? 'url(resources/images/bkg/'+what+'.jpg) no-repeat fixed center center / cover' : '');
			$('#content').css({'background':bkWt});
		}
		,error: function (xhr, status) {
			sts=0;
			var scrwdUp = '';
			console.log(status);
			//scrwdUp  += '<div><br/><b style="font-size:18px;color:#63EF00;text-shadow:0px 3px 1px #000;font-family:monospace;">'+'&lt;code&gt; <span style="color:red;text-shadow:0 0 0;">'+xhr.status+' '+xhr.statusText+'</span> &lt;&#47;code&gt;</b></div>';
			scrwdUp  += '<div class="err fnt1">Coming soon!</div>';
			$('#content').html(scrwdUp).css({'background':'#3f4c6b url(resources/images/bkg/err.png) no-repeat fixed right bottom/35% 40%'});
		}
	}).always(function(){
		loading();
		if(which!==false){
			urlfn(true,what)
		}
		which = which ? which : $('.ca-menu > li').get(what*1);
		$('title').text('Cine Dani Productions: '+$(which).find('.ca-main').text());
		screwDLinks(which,sts,(what>100));
		if(sts && (what==7)){
			$('div.myfrm :input').fancyInput(); //input form fancy
			//google maps
			if(!$('#googlemapsapi').length){
				loadScript();
			}else{
				initializeMaps();
			}
		}
		if(sts && what==5){
			
			pageGallery().init();
		}
		if(sts && what==1){
			homeSlide();
		}
	});
}

function initializeMaps() {
	var map_canvas 	= document.getElementById('map-canvas')
	var myLatlng 	= new google.maps.LatLng(19.1380308,72.8079864);
	var map 		= new google.maps.Map(map_canvas, {center: myLatlng, zoom: 16, mapTypeId: google.maps.MapTypeId.ROADMAP});
	var marker 		= new google.maps.Marker({position: myLatlng, map: map, title: 'Cine Dani Productions'});
}

function loadScript() {
	var script 	= document.createElement('script');
	script.type = 'text/javascript';
	script.src 	= 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +'callback=initializeMaps';
	script.id 	= 'googlemapsapi';
	document.body.appendChild(script);
}


//Highlight Tab click
function screwDLinks(xx,fcked,whr){
	if(whr){
		 $('#homeLI').siblings().addBack().removeClass('active red');
	}else{
		xx = $(xx);
		xx.siblings().addBack().removeClass('active red');
		xx.addClass(fcked ? 'active' : 'red');
	}
}

function loadOtherLinks(){

}

//Call from the Tab
function doMyBoom(what,which,something){
	if($(which).hasClass('active')){
		return false;
	}
	if($('ul.ca-menu li').css('display')=='list-item'){
		$('ul.ca-menu').animate({left:'-100%'});
	}
	loading(1);

	funnyScript(what,which);
}

function callItLnk(id,nde){
	loading(1);
	var sts = 0;
	var jqxhr = $.getJSON( 'resources/stuff/projects/'+id+'/data.json?r='+Math.random(), function( data ) {
	}).done(function(data) {
		sts = 1;
		scaryProject(data,id);
	}).fail(function( jqxhr, textStatus, error ) {
		sts=0;
		$('#popup').hide();
	}).always(function() {
		loading();
	});
}

function mailQuery(form){
	//id = 903246913039326;
	$.post( 
		"./resources/server/query.php"
		, $( form ).serialize() 
		, function(d){
			d = $.parseJSON(d);
			$('#queryform').html('<div class="transBkg" style="height:300px;padding:50px;color:#fff;">'+d.message+'</div>');
		}
	);
}




//http://codepen.io/dudleystorey/pen/gBwbc - fullscreen
function helpOST(xx){
	var ostPlayer = $('#ostPlayer');
	var mode = xx !==undefined ? xx : ostPlayer.find('img').eq(0).prop('src').indexOf('equalizer.on')==-1;
	if(mode){
		ostPlayer.find('img').eq(0).prop('src',ostPlayer.find('img').eq(0).prop('src').replace('equalizer.off.png','equalizer.on.gif'));
		ostPlayer.find('img').eq(1).prop('src',ostPlayer.find('img').eq(1).prop('src').replace('play','pause'));
		ostPlayer.find('audio').trigger('play');
	}else{
		ostPlayer.find('img').eq(0).prop('src',ostPlayer.find('img').eq(0).prop('src').replace('equalizer.on.gif','equalizer.off.png'));
		ostPlayer.find('img').eq(1).prop('src',ostPlayer.find('img').eq(1).prop('src').replace('pause','play'));
		ostPlayer.find('audio').trigger('pause');
		if(xx ===undefined)
			$('.songcontrol').removeClass('songpause').addClass('songplay').prop({'title':'Play this music in background!'}).data({uiTooltipTitle:'Play this music in background!'});
	}
}

function toggleDiv(n){
	n = $(n);
	var who = n.find('~div');
	if(who.is(':visible')){
		who.slideUp(400,function(){
			n.css({'border-bottom-left-radius':'5px','border-bottom-right-radius':'5px'});
			n.find('>span').text('+');
		});
	}else{
		who.slideDown(400,function(){
			n.find('>span').text('-');
		});
		n.css({'border-bottom-left-radius':0,'border-bottom-right-radius':0});
	}
}

function urlfn(mode,what){
	var baseUrl = window.location.href.split('#')[0];
	var subTitle = (pagesTitle[what]?'#'+pagesTitle[what]:'')
	var title = 'Cine Dani Productions: '+$('ul.ca-menu li').eq(what).find('.ca-main').text();
	if(history.pushState)
		history.pushState({},title,subTitle);
	$('title').text(title);
	ga('send', 'pageview', {'title': title});
}

function scaryProject(data,id){
	//var bkWt = '#FFF url(resources/images/bkg/3.jpg) no-repeat fixed center/cover';//Project image hardcoded
	var backbutton = "<span  class=backbutton onclick=\"$('#projectTab').empty();"
			+"$('#content').animate({scrollLeft:0}).scrollTop(0).css({background:'"+'#FFF url(resources/images/bkg/3.jpg) no-repeat fixed center center / cover'+"'})"
			+".find('>div').removeClass('lvl2');\">&nbsp;</span>";
	$('#content')
		.css({'background':('url(resources/stuff/projects/'+id+'/'+data.poster+') '+(data.backdropProp?data.backdropProp:'no-repeat fixed center center / cover')) })
		.animate({scrollLeft:($('#content>div').width()/2)}).scrollTop(0)
		.find('>div').addClass('lvl2');

	var myOst = data.ost ? '<div id=ostPlayer onclick="helpOST()"><audio autoplay loop preload="auto"><source src="resources/stuff/projects/'+id+'/'+data.ost.song+'" type="audio/mpeg"></audio><img style="width: 50px;" src="resources/images/equalizer.on.gif">&nbsp;&nbsp;<img style="width: 15px;" src="resources/images/pause.png"></div>' : '';

	var otherlk = (data.imdb ? '<a href="'+data.imdb+'" target=_blank><span style="background:url(resources/images/imdb.png) no-repeat center / contain;padding-left:50px;margin-left:5px;"></span></a>' : '');
	var toWrite = backbutton
					+ '<div class=transBkg>'
					+ '<div class=smallproject style="color:#FFF;">'+myOst+'<img src="resources/stuff/projects/'+id+'/'+data.icon+'" style="box-shadow:0px 0px 3px #FFF;"/><p>'
					+data.project+otherlk+'</p><span class=desc>' + data.synopsis + '</span></div></div>';
	var tempVar, img, httpProt = window.location.protocol == 'https:' ? 'https:' : 'http:';
	
	//production Companies
	tempVar = '';
	for(var i in data.prodCompany){
		tempVar += '<h3>'+data.prodCompany[i].namef+'</h3>';
	}
	toWrite += tempVar ? '<br class=clear /><div class=prodcom><b class="fnt4 lvl2head">Production Companies</b><hr class=clear />'+tempVar+'</div>' : '' ;


	//awards
	tempVar = '';
	for(var i in data.awards){
		tempVar += '<img src="resources/stuff/projects/'+id+'/awards/'+data.awards[i]['l']+'" />';
	}
	toWrite += tempVar ? '<div><br class=clear /><br/><br/><div class=projectawards><b class="fnt4 lvl2head">Awards & Recognition</b><hr class=clear />'+tempVar+'</div>' : '' ;

	
	toWrite += '<div class="toggleDiv"><div onclick="toggleDiv(this)" class="lvl3head">&nbsp;<b class="fnt4 lvl2head">Cast & Crew </b>&nbsp;<span class="fnt4 lvl2head">+</span></div>';
	
	//cast
	tempVar = '';
	for(var i in data.castp){
		img = data.castp[i].fb ? './resources/server/getimages.php?id='+data.castp[i].fb : 'resources/images/anno.png';
		tempVar += '<div class=castcard><img src="'+img+'" />'+data.castp[i].namef+(data.castp[i].role ? '<br/> &nbsp;&nbsp; as : '+ data.castp[i].role:'')+'</div>';
	}
	toWrite += tempVar ? '<div><br class=clear /><br/><b class="fnt4 lvl2head">Cast</b><hr class=clear />'+tempVar +'</div>' : '';

	//creativeTeam
	tempVar = '';
	for(var i in data.crewp){
		img = data.crewp[i].fb ? './resources/server/getimages.php?id='+data.crewp[i].fb : 'resources/images/anno.png';
		tempVar += '<div class=castcard><img src="'+img+'" /><b>'+data.crewp[i].role+'</b><hr/>'+ data.crewp[i].namef+'</div>';
	}
	toWrite += tempVar ? '<div><br class=clear /><br/><br/><b class="fnt4 lvl2head">Creative Team</b><hr class=clear />'+tempVar +'</div>' : '';

	//productionTeam
	tempVar = '';
	for(var i in data.prodp){
		img = data.prodp[i].fb ? './resources/server/getimages.php?id='+data.prodp[i].fb : 'resources/images/anno.png';
		tempVar += '<div class=castcard><img src="'+img+'" /><b>'+data.prodp[i].role+'</b><hr/>'+ data.prodp[i].namef+'</div>';
	}
	toWrite += tempVar ? '<div><br class=clear /><br/><br/><b class="fnt4 lvl2head">Production Team</b><hr class=clear />'+tempVar +'</div>' : '';
	
	toWrite += '<div class=clear style="padding-bottom:20px;"></div>';

	toWrite += '</div>';

	toWrite += '<div class="toggleDiv"><div onclick="toggleDiv(this)" class="lvl3head">&nbsp;<b class="fnt4 lvl2head">Audio/Video</b>&nbsp;<span class="fnt4 lvl2head">+</span></div>';

	//videos
	tempVar = '';
	for(var i in data.video){
		tempVar += '<div class=video-container><iframe width=100 height=100 src="'+httpProt+data.video[i].l+'" frameborder="0" allowfullscreen ></iframe><br/><div class=ttle>'+data.video[i].namef + '</div></div>';
	}
	toWrite += tempVar ? '<div><br class=clear /><br/><br/><b class="fnt4 lvl2head">Video Links</b><hr class=clear />'+tempVar +'</div>': '' ;

	
	//music
	tempVar = '';
	for(var i in data.music){
		tempVar += '<div class="castcard bigcard" data-linksong="'+data.music[i].linksong+'"><img src="resources/images/music.png" /><b>'+data.music[i].namef+'</b>'+'&nbsp;<div class="song songcontrol songplay" title="Play this music in background!" onclick="song(this,\'songcontrol\')">&nbsp;</div>'+'&nbsp;<div title="Music Details" class="song songplus" onclick="song(this,\'songdetail\')">&nbsp;</div>'+'&nbsp;<a href="'+data.music[i].linksong+'" download="'+data.music[i].downnamef+'"><div title="Download Media" class="song songdown">&nbsp;</div><a>'+'<hr style="display:none;"/>';//+ data.prodp[i].namef+'</div>';
		for(var j in data.music[i].who){
			img = data.music[i].who[j].fb ? './resources/server/getimages.php?id='+data.music[i].who[j].fb: 'resources/images/anno.png';
			tempVar += '<div class=castcard style="display:none;"><img src="'+img+'" />'+ data.music[i].who[j].role +'<hr/>' + data.music[i].who[j].namef + '</div>';
		}
		tempVar+='</div>'
	}
	toWrite += tempVar ? '<div><br class=clear /><br/><br/><b class="fnt4 lvl2head">Music</b><hr class=clear />'+tempVar +'</div>' : '';
	toWrite += '<div class=clear style="padding-bottom:20px;"></div></div>';

	toWrite += '<div class=clear style="padding-bottom:200px;"></div>';
	//console.log(toWrite)
	var project = $('#projectTab');
	project.html(toWrite).tooltip();

	project.find('audio')[0].volume = data.ost.volume;
	urlfn(true,3);
}

function song(n,mode){
	n = $(n);
	switch(mode){
		case 'songdown':
			location.href = n.parent('.bigcard').data('linksong');
			break;
		case 'songdetail':
			if(n.hasClass('songminus')){
				n.parent('.bigcard').find('.castcard').slideUp('slow');
				n.find('~hr').hide();
			}else{
				n.parent('.bigcard').find('.castcard').slideDown('slow');
				n.find('~hr').show();
			}
			n.toggleClass('songplus songminus');
			break;
		case 'songcontrol':
			if(n.hasClass('songpause')){
				helpOST(false);
				n.prop({'title':'Play this music in background!'}).data({uiTooltipTitle:'Play this music in background!'});
			}else{
				var ostPlayer = $('#ostPlayer');
				if(ostPlayer.find('audio > source').prop('src').indexOf(n.parent('.bigcard').data('linksong'))==-1){
					ostPlayer.find('audio > source').prop({'src':n.parent('.bigcard').data('linksong')});
					ostPlayer.find('audio').load()[0].volume=1;
				}
				helpOST(true);
				n.prop({'title':'Pause music!'}).data({uiTooltipTitle:'Pause music!'});
			}
			n.toggleClass('songplay songpause');
			break;
	}
}

var imgArr = new Array('2.jpg','3.jpg','4.jpg','5.jpg','7.jpg','err.png');
