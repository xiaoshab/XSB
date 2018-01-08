// 定义模块，加载头部、尾部资源
define(["jquery","carousel","cookie"], function($,carousel){
	// 将 header.html 加载显示，绑定交互效果
	$.ajax("/html/include/headr.html").done(function(data){
		$(".header").html(data);
	}).done(function(){
		// 绑定查找的键盘按键事件
		$(".scrach .word").keyup(function(){
			var url = "https://suggest.taobao.com/sug?code=utf-8&q="+ $(this).val() +"&callback=?";
			$.getJSON(url, function(data){
				var html = "";
				data.result.forEach(function(curr){
					html += "<div>"+ curr[0] +"</div>"
				});
				$(".scrach .info").html(html);
			});
		});
	}).done(function () {
		$(".hide").mouseover(function() {
			$(".ul_2").show();
		});
	}).done(function () {
		$(".hide").mouseout(function () {
			$(".ul_2").hide();
		});
	});
	// 将 footer.html 加载显示到 div.footer 中
//	$(".footers").load("/html/include/footer.html");
 	$.ajax("/html/include/footer.html").done(function(data){
		$(".footers").html(data);
	}).done(function () {
		$(".cons").eq(0).carousel({
			imgs : [
				{src:"/images/1.jpg_.webp.jpg", href:"#"},
				{src:"/images/2.jpg_.webp.jpg", href:"#"},
				{src:"/images/3.jpg_.webp.jpg", href:"#"},
				{src:"/images/4.jpg_.webp.jpg", href:"#"},
				{src:"/images/5.jpg_.webp.jpg", href:"#"}
			],
			width:300,
			height: 180,
			type: "fade",
			duration: 2000
		});
	});
});