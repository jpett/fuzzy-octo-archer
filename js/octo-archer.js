var position = [];
var curposition = 1;
var toppercentage
var pagetotal = 0;

$(document).ready(function() {
			$(".container").css("height", $(window).innerHeight());
			setpages();
			createnav();
			createbases();
			var resizeTimer = false;
			$(window).on('resize', function(e) {
					switch(curposition){
						case 1:
						$(".container").css("height", $(window).innerHeight());
						setpages();
						break;
						case 2:
						$(".container").css("height", $(window).innerHeight());
						var hig = $(".container").css("height");
						console.log(hig);
						$("#wrap").css("top", -(parseInt(hig)) + "px");
						break;
						case 3:
						$(".container").css("height", $(window).innerHeight());
						var hig = $(".container").css("height");
						console.log(hig);
						$("#wrap").css("top", -(parseInt(hig)*2) + "px");
						break;					
						case 4:
						$(".container").css("height", $(window).innerHeight());
						var hig = $(".container").css("height");
						console.log(hig);
						$("#wrap").css("top", -(parseInt(hig)*3) + "px");
						break;
					}
					
					
					/*var oldheight = parseInt($(".container").css("height"));
					var newheight = $(window).innerHeight();
					var difference = oldheight - newheight;
					console.log("oldheight: "+oldheight + "- newheight" + newheight + "= differenece" + difference);
					$(".container").css("height", $(window).innerHeight());
					var curtop = parseInt($("#wrap").css("top"));
					console.log(curposition);
					if(curposition != 0 && curposition != 1){
						$("#wrap").css("top", (curtop - (difference))+"px");
						
					} else {
						setpages();
					}
					
					
					/*var curpos = $("#wrap").css("top");
					$(".container").css("height", $(window).innerHeight());
					$("#wrap").css("top", 0);
					$("#activeball").css("top", 0);
					setpages();*/
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
