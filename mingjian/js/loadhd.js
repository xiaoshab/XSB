// 定义模块，加载头部、尾部资源
define(["jquery","carousel","cookie"], function($,carousel){
	$.cookie.json =  true;
	// 将 header.html 加载显示，绑定交互效果
	$.ajax("/html/include/headr.html").done(function(data){
		$(".header").html(data);
	}).done(function(){
		// 绑定查找的键盘按键事件
		//输入文字查找
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
		//二级菜单显示隐藏
		$(".hide").mouseover(function() {
			$(".ul_2").show();
		});
	}).done(function () {
		$(".hide").mouseout(function () {
			$(".ul_2").hide();
		});
	}).done(function() {
		//用户登录判断，数据库中是否存在此用户，存在可以登录，不存在不可以登录
		$("#loginform").submit(function(e){
		e = e || event;
		e.preventDefault ? e.preventDefault():e.returnValue = false;
			var user = $("#login_user").val(),
				pass = $("#login_pass").val();
				//用POST方式提交ajax跨域请求
		var urls = 	`http://10.7.187.98/login.php`;
					$.ajax({
						url: urls,
						type: "POST",
						data:`username=${user}&password=${pass}`,
						dataType:"json",
						success:function(data){
//							console.log(data);
							if (data.status == 1) {
//									$.cookie.json=true;
									//将用户名保存到cookie
									$.cookie("key",user,{expires:7,path:"/"});
									var _user = $.cookie('key');
										if (_user) {
											//将用户名显示在头部
											$("#cookie_name").html(_user);
											$("#tip_info").html("");
											setTimeout(function  () {
												$(".login").hide();
											},3000);
										}
							}else{
											$("#cookie_name").html("请注册");
											$("#tip_info").html("用户名或密码不正确");
										}
						}
				});
			
			});
		}).done(function () {
			//登录弹出
			$("#cookie_name").click(function () {
				$(".login").show();
			});
		}).done(function  () {
			//打开浏览器判断cookie中是否有需要的用户名，有则显示到头部
			 	$(document).ready(function () {
			 		 var _user = $.cookie('key');
			 		  if (_user) {
			 		  	$("#cookie_name").html(_user);
					 }
			 	});
	}).done(function  () {
		//删除保存用户名的cookie
		$("#lonout").click(function(){
				$.cookie("key",1,{expires:-1,path:"/"});
				location.reload();
		})
	});	
	// 将 footer.html 加载显示到 div.footer 中
//	$(".footers").load("/html/include/footer.html");
 	$.ajax("/html/include/footer.html").done(function(data){
		$(".footers").html(data);
	}).done(function () {
		//利用ajax异步请求将尾部功能加载显示 
		//加载轮播图
		$(".cons").eq(0).carousel({
			imgs : [
				{src:"/images/1.jpg_.webp.jpg", href:"/html/list.html"},
				{src:"/images/2.jpg_.webp.jpg", href:"/html/list.html"},
				{src:"/images/3.jpg_.webp.jpg", href:"/html/list.html"},
				{src:"/images/4.jpg_.webp.jpg", href:"/html/list.html"},
				{src:"/images/5.jpg_.webp.jpg", href:"/html/list.html"}
			],
			width:300,
			height: 180,
			type: "fade",
			duration: 2000
		});
	});
});