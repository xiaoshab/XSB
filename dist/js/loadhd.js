"use strict";define(["jquery","carousel","cookie"],function(e,o){e.ajax("/html/include/headr.html").done(function(o){e(".header").html(o)}).done(function(){e(".scrach .word").keyup(function(){var o="https://suggest.taobao.com/sug?code=utf-8&q="+e(this).val()+"&callback=?";e.getJSON(o,function(o){var n="";o.result.forEach(function(e){n+="<div>"+e[0]+"</div>"}),e(".scrach .info").html(n)})})}).done(function(){e(".hide").mouseover(function(){e(".ul_2").show()})}).done(function(){e(".hide").mouseout(function(){e(".ul_2").hide()})}),e.ajax("/html/include/footer.html").done(function(o){e(".footers").html(o)}).done(function(){e(".cons").eq(0).carousel({imgs:[{src:"/images/1.jpg_.webp.jpg",href:"#"},{src:"/images/2.jpg_.webp.jpg",href:"#"},{src:"/images/3.jpg_.webp.jpg",href:"#"},{src:"/images/4.jpg_.webp.jpg",href:"#"},{src:"/images/5.jpg_.webp.jpg",href:"#"}],width:300,height:180,type:"fade",duration:2e3})})});