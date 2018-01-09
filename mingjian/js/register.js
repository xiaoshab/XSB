require(["config"], function(){
	require(["load"], function(){
	$.cookie.json = true;
	$("#for").submit(function(e){
		e = e || event;
		e.preventDefault ? e.preventDefault():e.returnValue = false;
			var user = $("#username").val(),
				pass = $("#password").val();
		var urls = 				`http://10.7.187.98/username.php?username=${user}&password=${pass}`;
					$.ajax({
						url: urls,
						type: "GET",
						datatype:"json",
						success:function(data){
							data = JSON.parse(data); 
							if (data.status === 1) {
								location = "/index.html";
							} else{
								location = "/html/register.html";
							}
						}
			});
		});
		//////
		$("#username").blur(function () {
			var namereg = /^[a-z][0-9]{3,11}$/;
			if (namereg.test(this.value)) {
				$("#username_info").text("格式正确");
			} else{
				$("#username_info").text("请输入正确的用户名");
			}
			var user = $("#username").val();
			var urls = 				`http://10.7.187.98/check.php?username=${user}`;
					$.ajax({
						url: urls,
						type: "GET",
						datatype:"json",
						success:function(data){
							data = JSON.parse(data); 
							if (data.status == 0) {
								$("#username_info").text("用户已存在");
							} else{
								$("#username_info").text("用户名");
							}
						}
			});
		});
		$("#password").blur(function (){
			var passreg = /^\w{6,17}$/;
			if (passreg.test(this.value)) {
				$("#password_info").text("请记住此密码");
			} else{
				$("#password_info").text("请输入密码");
			}
		});
		$("#passwords").blur(function () {
			var pass = $("#password").val();
			if (pass == this.value) {
				$("#passwords_info").text("");
					
			} else{
				$("#passwords_info").text("两次输入不一样");
			}
		});
		function generate(){
				var url = "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7";
				var result = $.getJSON(url, function(data){
					// 设置图片的 src 属性，显示出验证码
					$("#vali").attr("src", data.showapi_res_body.image);
					// 缓存 sid 用于验证码校验
					$("#vali").data("sid", data.showapi_res_body.sid);
				});
			}

			generate();

			$("#vali").click(generate);

			$("#code").blur(function(){
				// 获取输入的字符串
				var _input = $("#code").val();
				// sid
				var _sid = $("#vali").data("sid");
				// url
				var url = `http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode=${_input}&sid=${_sid}`;
				// getJSON
				$.getJSON(url, function(data){
					if(data.showapi_res_body.valid)
						$("#code_info").text("验证成功");
					else
						$("#code_info").text("验证码有误");
				})
			});
	});
});