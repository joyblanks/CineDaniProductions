var constants = (function(){
	//browsers
	var data = {};
	data.isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	data.isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	data.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;// At least Safari 3+: "[object HTMLElementConstructor]"
	data.isChrome = !!window.chrome && !data.isOpera;              // Chrome 1+
	data.isIE = !!document.all || !!document.documentMode; // At least IE6
	data.pagesTitle = ["load", "home", "whoweare", "films", "awardsrecognition", "gallery", "corporatevideos", "contactus"];
	data.imgArr = ['2.jpg','3.jpg','4.jpg','5.jpg','7.jpg','err.png'];
	return data;
})();


//loader function 1 for show false for hide
function loading(m){
	//$('.fcking').toggleClass('fcking2');
	m = isNaN(m*1000) ?  0 : m*1000 ;
	if(m){
		$('#rollerli').prop({'src':'resources/images/rotator.png','class':'fcking fcking2'});
		$('#loading,#loader').fadeIn();
		//setTimeout(function(){loading()},m);
	}else{
			$('#rollerli').prop({'src':'resources/images/logo.png','class':'logo'});//put logo.png here. TODO
			$('#loading,#loader').fadeOut();
	}
}

var counter = 0;

//mobile menu
function mobileMenu(m){
	if(m=='x'){
		var m = $('ul.ca-menu').position().left!=0;
		$('#menumobile').hide();
	}else{
		$('#menumobile').delay(400).fadeIn();
	}
	$('ul.ca-menu').show().animate({left:(m?0:'-100%')});
}


window.onhashchange = function(e) {
  var what = window.location.hash.substring(1);
  var where = $.inArray(what, constants.pagesTitle);
  where = (where >=1 && where <=7) ? where : 1;
  funnyScript(where,false);

}

function urlfn(mode,what){
	var baseUrl = window.location.href.split('#')[0];
	var subTitle = (constants.pagesTitle[what]?'#'+constants.pagesTitle[what]:'')
	var title = 'Cine Dani Productions: '+$('ul.ca-menu li').eq(what).find('.ca-main').text();
	if(history.pushState)
		history.pushState({},title,subTitle);
	$('title').text(title);
	ga('send', 'pageview', {'title': title});
}


$(document).ready(function(){
	var websiteloaded = cookieMe('websiteloaded');
	var quickAnime = false;
	if(websiteloaded.getCookie()){
		quickAnime = true;
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
		if(constants.isFirefox){
			idontknowman = Math.random();
			$('#idontknowman').prop({src:('resources/images/ctd.gif?r='+idontknowman)});
		}
		$('#preloader').find('img').waitForImages(function(){
			if(++counter == $('#preloader').find('img').length){
				$('#preloader').hide();
				setTimeout(function(){animationAction.init(quickAnime);},1000);
			}
		});
	}
});

$(window).resize(function(){
	var mDevice = $('ul.ca-menu li').css('display')=='list-item';
	if(mDevice){
			$('#menumobile').show();
		}else $('#menumobile').hide();
	if($('#roller2').is(':visible')){
		$('#roller2').css({width:($(window).width())});
		var tv = $('#tv');
		var hgt = mDevice ? ($(window).height()*6.6/7+'px') : ($(window).height()*7.3/9+'px');
		tv.css({'width':$(window).width()-20,height:hgt,'background-size':$(window).width()-20+'px '+hgt});
		//$('#content').css({'width':$(window).width()-30,height:$(window).height()*5.5/8-25+'px'})
		setTimeout(function(){
			var wRol = $('.fckingRoller');
			var wd = wRol.width()>=wRol.height();
			$('#rollerli').css({width:(wd?'':wRol.width()-10),height:(wd?wRol.height()-10:'')});
			if($('.lvl2').is(':visible') && !constants.isSafari){
				$('#content').animate({scrollLeft:($('#content>div').width()/2+10)},0);
			}
		},600);
	}
	
	$('body').css({'background-size':('106px '+$(window).height()+'px'),'background-position-y':0});
});


/*************** The Animation Object ***************/
var animationAction = (function(){
	var preloading = false;
	var isMobile = $('li').css('display')=='list-item';
	var dl = (document.domain=='') ? [0,0,0,0] : [1500,2500,500,1500];//Anime 1,2,3
	var bodyEl = $('body');

	var jaldiKaroPreload = function(imA){
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
	};
	
	$.fn.animateBG = function(x,y,speed,e,comp) {
	    var pos = this.css('background-position').split(' ');
	    this.x = pos[0].split('px')[0] || 0;
		this.y = pos[1].split('px')[0] || 0;
	    $.Animation(
	    	this, {x: x, y: y }, {duration:speed, easing:e, complete:comp}
	    	).progress(function(e) {this.css('background-position', '0px '+e.tweens[1].now+'px');
	    });
	    return this;
	};
	//Animation - 1 : BKG backdrop
	var startAnime = function (quickAnime){
		dl = quickAnime ? [0,0,0,0] : dl;
		jaldiKaroPreload(constants.imgArr);
		$('#loading').hide();
		$('.preloader').remove();
		bodyEl.css({'background':'#FFF url(resources/images/bkg2.jpg) repeat-x'
						,'background-size':('106px '+$(window).height()+'px')
						,'background-position':'0px '+($(window).height()*-1)+'px'
					});
		if(constants.isFirefox || constants.isIE){
			bodyEl.animateBG(0,0,dl[0],'easeOutCirc',function(){
				bodyEl.css({'background-position-y':0});
				roller1();
			});
		}else{
			bodyEl.animate({
				backgroundPositionY:('+='+$(window).height())}
				,{duration:dl[0],easing:'easeOutCirc'
				,complete:function(){
					$(this).css({'background-position-y':0});
					roller1();
				}
			});
		}
	};
	//Animation - 2 | Movie counter > Menu Shift > Menu Build
	var roller1 = function(){
		var r = $('<div class=roller/>');
		r.appendTo('body').css({left:$(window).width()/2-125,top:$(window).height()/2-75});
		r.append('<img src="resources/images/ctd.gif'+(constants.isFirefox?'?r='+idontknowman:'')+'" class="ctd" id="ctd" />');
		$('#ctd').delay(dl[1]).fadeOut(100);
		r.delay(dl[1]).animate(
			 {top:0,left:10,height:'150',width:'200'}
			,{duration:dl[2]
				,easing:'easeOutCirc'
				,complete:function(){
					$(this).fadeOut(50);
					$('footer').slideDown();
					$('#roller2').css({top:0,height:100,width:250}).fadeIn(130) //**1
						.animate(
							{
								height:'11.5%'
								,width:($(window).width())
							}
							,{
								duration:dl[3]
								,easing:'easeOutCirc'
								,complete:function(){finishFunky();}
							});
				}
			}
		);
	};
	//Animation - 3 | Adjust Roller to screen > main screen in > Stop all anime
	var finishFunky = function (){
		$('#roller2').css({'transition': 'all 400ms linear',width:'99.9%',right:0});
		$('#hello').hide();
		$('.ca-menu').fadeIn();
		
		var hgt = isMobile ? ($(window).height()*6.6/7+'px') : ($(window).height()*7.3/9+'px');
		var tv = $('#tv');
		tv.css({'width':$(window).width()-20,height:hgt,'background-size':$(window).width()-20+'px '+hgt}).fadeIn();
		$('#content').fadeIn();
		setTimeout(function(){
			var wRol = $('.fckingRoller');
			var wd = wRol.width()>=wRol.height();
			$('#rollerli').css({width:(wd?'':wRol.width()-10),height:(wd?wRol.height()-10:'')});
		},600);
		$('.roller').remove();
		$('#preloader').hide();
		if(isMobile){
			$('#menumobile').show();
		}else $('#menumobile').hide();
		myCustomReady();
	};

	//Hover on anything ** Currently disabled
	var cine = function(t,n){
		// onmouseover="cine(1,event)" onmousemove="cine(1,event)" onmouseout="cine(0,event)"
		if(t==1){
				n = n ? n : window.event;
				$('#cineDani').css({top:(n.clientY +10) +'px',left:(n.clientX +10) +'px'}).fadeIn();

		}else if(t==2){
			n = n ? n : window.event;
			$('#cineDani').css({top:(n.clientY +10) +'px',left:(n.clientX +10) +'px'});
		}else $('#cineDani').hide();
	};

	return {init:startAnime};
})();



/*********************************Finished Animations Core fn Start*******************************/

function myCustomReady(){
	//This is my new onload
	//$('.social').find('div').tooltip();
	var websiteloaded = cookieMe('websiteloaded');
	if(!websiteloaded.getCookie()){
		websiteloaded.setCookie('1',15);
	}
	var baseUrl = (window.location.href.split('#')[1]);
	var unit = $.inArray(baseUrl, constants.pagesTitle);
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
					mainGallery += '<li>'
										+'<img src="./resources/gallery/'+obj1.dir+'/'+obj2.image+'"/>'
										+(obj2.desc?'<div class="sb-description"><h3>'+obj2.desc+'</h3></div>':'')
										+'</li>';
					thumbsGallery += '<div what="'+(++count)+'" '
										+'style="background:url(./resources/gallery/'+obj1.dir+'/'+obj2.image+') no-repeat scroll center / cover;">'
										+'</div>';
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
};

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

//used to scramble the gallery
$.fn.randomize=function(a){
	(a?this.find(a):this).parent().each(
		function(){
			$(this).children(a).sort(
				function(){
					return Math.random()-0.5;
				}
			).detach().appendTo(this);
		}
	);
	return this;
};

//init the masonry plugin for awards
function handleAwardWall(){
	var mDevice = $('ul.ca-menu li').css('display')=='list-item';
	var theWallOfFame = $('.awardwall');
	
	theWallOfFame.randomize('.award');				
	if(!mDevice){
		theWallOfFame.find(".award").each(function(i, el) {
			var that = $(el);
			that.height(Math.max(100 , Math.floor(Math.random() * 250)));
			that.width(Math.max(150 , Math.floor(Math.random() * 350)));
		});
		theWallOfFame.masonry({itemSelector: '.award',columnWidth: 5,gutterWidth: 22});
	}else{
		theWallOfFame.find('.award').css({'margin':'5%'});
	}
	theWallOfFame.tooltip({position: {at: "left+50"}});
}



//Maps in contact us page
function initializeMaps() {
	if(!$('#googlemapsapi').length){
		var script 	= document.createElement('script');
		script.type = 'text/javascript';
		script.src 	= 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +'callback=initializeMaps';
		script.id 	= 'googlemapsapi';
		document.body.appendChild(script);
	}else{
		var map_canvas 	= document.getElementById('map-canvas')
		var myLatlng 	= new google.maps.LatLng(19.1380308,72.8079864);
		var map 		= new google.maps.Map(map_canvas, {center: myLatlng, zoom: 16, mapTypeId: google.maps.MapTypeId.ROADMAP});
		var marker 		= new google.maps.Marker({position: myLatlng, map: map, title: 'Cine Dani Productions'});
	}
}

//Send email query in contact us page
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

//Call from the Tab
function doMyBoom(what,which,something){
	if($(which).hasClass('active')){
		return false;
	}
	if($('ul.ca-menu li').css('display')=='list-item'){
		$('ul.ca-menu').animate({left:'-100%'});
		$('#menumobile').delay(400).fadeIn();
	}
	loading(1);

	funnyScript(what,which);
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
			var bkWt = '#FFF '+ ((constants.imgArr.indexOf(what+'.jpg')>-1) 
						? 'url(resources/images/bkg/'+what+'.jpg) no-repeat fixed center center / cover' 
						: '');
			$('#content').css({'background':bkWt});
		}
		,error: function (xhr, status) {
			sts=0;
			var scrwdUp = '';
			console.log(status);
			scrwdUp  += '<div class="err">Coming soon!</div>';
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
		
		if(sts){
			if(what==5){
				//pageGallery().init();
				// Initialize Galleria
				$.getJSON('./resources/server/galleryJSONv2.php',function(data){
					xxx = Galleria.run('#icongallery', {dataSource: data.gallery,trueFullscreen:true,imageCrop:'landscape', overlayOpacity: 0.5,transition:'fade'});
				});
    			
			}else if(what==1){
				homeSlide(); //home.js
			}else if(what==4){
				handleAwardWall();//Awards
			}else if(what==7){
				$('div.myfrm :input').fancyInput(); //input form fancy
				initializeMaps();//google maps
			}
		}
	});
}

//call for Projects in Films tab
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


