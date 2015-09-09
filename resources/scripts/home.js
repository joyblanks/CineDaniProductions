function homeSlide(){
	socialFeed();
	
	var homeJSON;
	$.getJSON('./resources/server/galleryJSON.php?filter=movie',function(data){
		var bkgs = [];
		homeJSON = {'gallery':[]};
		$.each(data.gallery, function(i1, obj1) {
			$.each(obj1.records, function(i2, obj2) {
				homeJSON.gallery.push('./resources/gallery/'+obj1.dir+'/'+obj2.image);
				bkgs.push('url(./resources/gallery/'+obj1.dir+'/'+obj2.image+')');
			});
		});
		if(!homeSLideInt){
			$('#slideout').css({'background-image':bkgs.join(','),'background-size':'0% 100%'});
			fuckedUpSlider(0,homeJSON);	
		}else{
			$('#slideout').css({'background-image':bkgs.join(',')});
		}
	});

	
}
var homeSLideInt;

function fuckedUpSlider(ind,homeJSON){
	//console.log(ind);
	var slider = $('#slideout');
	
	if(slider.length){
		var size = [], position = [];
		var allItemsLen = homeJSON.gallery.length;
		for(var i=0; i<allItemsLen;i++){
			if(i<ind){
				size.push('0% 100%');
				position.push('left center');
			}else if(i==ind){
				size.push('100% 100%');
				position.push('right center');
			}else if(i>ind){
				size.push('0% 100%');
				position.push('right center');
			}
		}
		if(ind==allItemsLen-1){
			size[0] = ('0% 100%');
			position[0] = ('right center');
			ind = 0;
		}else if(ind==0){
			size[allItemsLen-1] = ('0% 100%');
			position[allItemsLen-1] = ('left center');
			ind++;
		}else ind++;
		slider.css({'background-size': size.join(','),'background-position': position.join(',')});
		//when = true;
	}
	homeSLideInt = setTimeout(function(){fuckedUpSlider(ind,homeJSON)},5000);
}


function toggleFeed(){
	var p = $('#socialFeed span.close');
	if(p.text()=='X'){
		$('#socialFeed > .castcard').slideUp('slow');
		$('#socialFeed > hr').hide();
		p.text('+');
	}else{
		$('#socialFeed > .castcard').slideDown('slow');
		$('#socialFeed > hr').show();
		p.text('X');
	}
}

function socialFeed(){
	
	$.getJSON('./resources/server/getTweets.php', function(data){
		var fStr = [];
		$.each(data.tweets,function(k,tweet){
			fStr.push('<div class=castcard>')
			fStr.push('<img src="'+tweet.user.profile_image_url+'" /><p class=twitter>@'+tweet.user.screen_name+' &nbsp; '+$.datepicker.formatDate('d MM',new Date(tweet.user.created_at))+'</p><hr/>');
			fStr.push(tweet.text)
			if(tweet.extended_entities.media.length){
				fStr.push('<br/><img src="'+tweet.extended_entities.media[0].media_url+'" style="float:none;width:100px; height:100px;" />')
			}
			fStr.push('</div>');
		});
		$('#socialFeed').append(fStr.join('')).fadeIn();

		$.ajax({url: './resources/server/counter.php?mode=getCount',type: 'POST'})
		.done(function(data){
			$('#socialFeed').append('<div class=castcard>Total Site Visits: '+data.count+'</div>');
		});
	});
	
}