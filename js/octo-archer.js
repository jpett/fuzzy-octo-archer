var position = [];
var curposition = 1;
var toppercentage
var pagetotal = 1;

$(document).ready(function() {
			$(".container").css("height", $(window).innerHeight());
			setpages();
			createnav();
			createbases();
			var resizeTimer;
			$(window).on('resize', function(e) {
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(function(){						
							if(curposition == 1 || curposition == pagetotal+1){
							$(".container").css("height", $(window).innerHeight());
							$("#wrap").css("top", 0);
							var hig = $(".container").css("height");
							
								for(i = 0; i< position.length; i++){
									position[i] = ((parseInt(hig))*i);
								}
							
							}else{
								
							$(".container").css("height", $(window).innerHeight());
							var hig = $(".container").css("height");
							$("#wrap").css("top", -(parseInt(hig)*(curposition-1)) + "px");
							
								for(i = 0; i< position.length; i++){
									position[i] = ((parseInt(hig))*i);
								}
						}						
					}, 250);
					
			});
});
function setpages(){
	pagetotal = 0;
	$(".page").each(function(i, obj) {								
						position[i] =  Math.abs($(this).offset().top);
						pagetotal++;
			});
}

function createnav(){
		$(".page").each(function(i, obj){
			var caption = $(this).attr("pagetitle");
			$("#progress-holder").append("<div class='ball' id='ball" + i + "' pageid='" + i + "' caption='" + caption + "' onClick='navClick(this)'></div>")
		});
	$("#progress-holder").append("<div id='activeball'></div>");
		   toppercentage = 100 / (pagetotal - 1);
			$(".ball").each(function(i, obj) {				
						$(this).css("top", (toppercentage * i) + "%");
			});
}

function createbases(){
	$(".holder").each(function(i,obj){
		var basetext = $(this).attr("basetext");
		var arrow = "fa fa-arrow-down fa-3x fa-fw";
		if(i == (pagetotal-1)){
			arrow ="fa fa-arrow-up fa-3x fa-fw";
		}
		$(this).append("<div class='base' onclick='baseclick(this)'><div  id='base"+(i+1)+"' page-id='"+(i+1)+"' class='innerbase'><i class='"+arrow+"'></i><span class='nexttext'>"+basetext+"</span></div></div>");
	});
}

function baseclick(e){
			var pageid = $(e).children().first().attr("page-id");
			movewrap(pageid);
			moveball(pageid);
}

function navClick(e) {
			var pageid = $(e).attr("pageid");
			movewrap(pageid);
			moveball(pageid);
}

function sidereveal(e){
			var elem = e;
			if($(elem).hasClass("sideholder")){
				$(elem).parent().css("left", "10%");
				$(elem).html("<i class='fa fa-arrow-down fa-3x fa-fw'></i>");
				$(elem).next().children(".sidesnippet").fadeOut(500);	
				setTimeout(function(){
				  $(elem).next().children(".sidemaincontent").fadeIn(500);
				}, 500);
				$(elem).removeClass().addClass("sideholderextended");
			} else {
				$(elem).parent().css("left", "100%");
				$(elem).html("<i class='fa fa-arrow-up fa-3x fa-fw'></i>");
				$(elem).next().children(".sidemaincontent").fadeOut(500);	
				setTimeout(function(){
				  $(elem).next().children(".sidesnippet").fadeIn(500);	
				}, 500);
				$(elem).removeClass().addClass("sideholder");
			}
}
			

function movewrap(pos){
	if(pos!= pagetotal){
	$("#wrap").animate({
		top: -position[pos]
	}, 1000);
}else{
	$("#wrap").animate({
		top: 0
	}, 1000);
}
curposition = (parseInt(pos)+1);
}

function moveball(pos){
	if(pos!= pagetotal){
	$("#activeball").animate({
		top: (toppercentage * pos)+"%"
	},1000)
} else{
	$("#activeball").animate({
		top: 0
	},1000)
}
curposition = (parseInt(pos)+1);
}
