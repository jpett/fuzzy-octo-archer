var position = [];
var toppercentage
var pagetotal = 0;

$(document).ready(function() {
			$(".scroll").css("height", $(window).innerHeight());
			setpages();
			createnav();
			$(window).resize(function() {
						$(".scroll").css("height", $(window).innerHeight());
			});
});

function setpages(){
	$(".page").each(function(i, obj) {
						var caption = $(this).attr("pagetitle");
						$("#progress-holder").append("<div class='ball' id='ball" + i + "' pageid='" + i + "' caption='" + caption + "' onClick='navClick(this)'></div>")
						position[i] = $(this).offset().top;
						pagetotal++;
			});
}

function createnav(){
	$("#progress-holder").append("<div id='activeball'></div>");
		   toppercentage = 100 / (pagetotal - 1);
			$(".ball").each(function(i, obj) {				
						$(this).css("top", (toppercentage * i) + "%");
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
}
