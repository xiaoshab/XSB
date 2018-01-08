require(["config"], function(){
	require(["jquery","carousel","load"], function($){
    $(".banner_img").eq(0).carousel({
			imgs : [
				{src:"/images/6.jpg", href:"#"},
				{src:"/images/7.jpg", href:"#"},
				{src:"/images/8.jpg", href:"#"},
				{src:"/images/9.jpg", href:"#"}
			],
			width:1263,
			height: 500,
			type: "fade",
			duration: 2000
		});
	});
});