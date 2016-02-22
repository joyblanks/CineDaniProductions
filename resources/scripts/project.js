function scaryProject(data,id){
	//var bkWt = '#FFF url(resources/images/bkg/3.jpg) no-repeat fixed center/cover';//Project image hardcoded
	var backbutton = "<span  class=backbutton onclick=\"backtoFilms()\">&nbsp;</span>";
	//debugger;
	$('#content')
		.css({'background':('url(resources/stuff/projects/'+id+'/'+data.poster+') '+(data.backdropProp?data.backdropProp:'no-repeat fixed center center / cover')) })
		.find('>div').addClass('lvl2');

	if(isSafari){
		$('#content .projectL:eq(0)').remove();
	}else {
		$('#content').animate({scrollLeft:($('#content>div').width()/2+10)}).scrollTop(0);
	}

	var myOst = data.ost ? '<div id=ostPlayer onclick="helpOST()"><audio autoplay loop preload="auto"><source src="resources/stuff/projects/'+id+'/'+data.ost.song+'" type="audio/mpeg"></audio><img style="width: 50px;" src="resources/images/equalizer.on.gif">&nbsp;&nbsp;<img style="width: 15px;" src="resources/images/pause.png" title="Pause Music"></div>' : '';

	var otherlk = (data.imdb ? '<a href="'+data.imdb+'" target=_blank><span style="background:url(resources/images/imdb.png) no-repeat center / contain;padding-left:50px;margin-left:5px;"></span></a>' : '');
	var toWrite = backbutton
					+ '<div class="transBkg smalltitle">'
					+ '<div class=smallproject style="color:#FFF;">'+myOst+'<img src="resources/stuff/projects/'+id+'/'+data.icon+'" style="box-shadow:0px 0px 3px #FFF;"/><p>'
					+data.project+otherlk+'</p><span class=desc>' + data.synopsis + '</span><a href="javascript:void(0);" onclick="loadMoreDetails(this);">Show&nbsp;More...</a></div></div>';
	var tempVar, img, httpProt = window.location.protocol == 'https:' ? 'https:' : 'http:';
	
	
	toWrite += '<div class=smalldetails>';

	//production Companies
	tempVar = '';
	for(var i in data.prodCompany){
		tempVar += '<h3>'+data.prodCompany[i].namef+'</h3>';
	}
	toWrite += tempVar ? '<br class=clear /><div class=prodcom><b class="lvl2head">Production Companies</b><hr class=clear />'+tempVar+'</div>' : '' ;


	//awards
	tempVar = '';
	for(var i in data.awards){
		tempVar += '<img src="resources/stuff/projects/'+id+'/awards/'+data.awards[i]['l']+'" '+(data.awards[i]['t']?'title="'+data.awards[i]['t']+'"':'')+'/>';
	}
	toWrite += tempVar ? '<br class=clear /><br/><br/><div class=projectawards><b class="lvl2head">Awards & Recognition</b><hr class=clear />'+tempVar+'</div>' : '' ;

	
	//cast&crew
	toWrite += '<div class="toggleDiv"><div onclick="toggleDiv(this)" class="lvl3head">&nbsp;<b class="lvl2head">Cast & Crew </b>&nbsp;<div class="lvl2head">+</div></div>';
	
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
	toWrite += '</div>';//end cast&crew

	//audio/video
	toWrite += '<div class="toggleDiv"><div onclick="toggleDiv(this)" class="lvl3head">&nbsp;<b class="lvl2head">Audio/Video</b>&nbsp;<div class="lvl2head">+</div></div>';

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
	
	toWrite += '<div class=clear style="padding-bottom:20px;"></div>';
	toWrite += '</div>';//end audio/video

	toWrite += '<div class=clear style="padding-bottom:200px;"></div>';

	toWrite += '</div>';//end .smalldetails

	

	
	//console.log(toWrite)
	
	var project = $('#projectTab');
	project.html(toWrite).tooltip({position: {at: "left+50"}});

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


function backtoFilms(){
	$('#projectTab').empty();
	$('#content').find('>div').removeClass('lvl2');
	$('#content').animate({scrollLeft:0}).scrollTop(0).css({background:'#FFF url(resources/images/bkg/3.jpg) no-repeat fixed center center / cover'});
	
	if(isSafari){
		var films = $('.ca-menu > li:eq(3)');
		films.removeClass('active').click();
	}		
}



//http://codepen.io/dudleystorey/pen/gBwbc - fullscreen
function helpOST(xx){
	var ostPlayer = $('#ostPlayer');
	var mode = xx !==undefined ? xx : ostPlayer.find('img').eq(0).prop('src').indexOf('equalizer.on')==-1;
	if(mode){
		ostPlayer.find('img').eq(0).prop('src',ostPlayer.find('img').eq(0).prop('src').replace('equalizer.off.png','equalizer.on.gif'));
		ostPlayer.find('img').eq(1).prop({'src':ostPlayer.find('img').eq(1).prop('src').replace('play','pause'),title:'Pause Music'});
		ostPlayer.prop({title:'Pause Music'});
	}else{
		ostPlayer.find('img').eq(0).prop('src',ostPlayer.find('img').eq(0).prop('src').replace('equalizer.on.gif','equalizer.off.png'));
		ostPlayer.find('img').eq(1).prop({'src':ostPlayer.find('img').eq(1).prop('src').replace('pause','play'),title:'Play Music'});
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
			n.find('>div').text('+');
		});
	}else{
		who.slideDown(400,function(){
			n.find('>div').text('-');
		});
		n.css({'border-bottom-left-radius':0,'border-bottom-right-radius':0});
	}
}

function loadMoreDetails(nde){
	$('.backbutton').fadeIn();
	$('.smalldetails').slideDown('slow');
	$('.smalltitle').animate({'margin-top':'0%','padding-top':'1%','padding-bottom':'1%'},'slow');
	$('#content').animate({scrollTop:($('.smalltitle').height()+50)},1000).css({scrollLeft:($('#content>div').width()/2+10)});
	$(nde).hide();
}