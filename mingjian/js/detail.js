require(["config"], function(){
	require(["jquery", "template","cookie","zoom","fly", "load"], function($,template,cookie,zoom,fly){
		$.cookie.json = true;
		var contr = $.cookie("id");
		$.getJSON("/mock/list.json",function (data) {
			let contrData = data.res_body.data;
			let arr = [],i = 0;
			$.each(contrData, function(index,elements) {
				arr.push(`${elements.id}`);
			});
			i = $.inArray(contr,arr);
			let  prodData = {products : data.res_body.data};
			var array = []; 
			array.push(prodData.products[i]);
//			console.log(array)
			var html  = "";
			$.each(array,function (index,element) {
				html = `<div class="box">
					<div class="id" style="display:none">${element.id}</div>
					<img id="img" src="${element.img}"  data-zoom-image="${element.imag}">
					<div class="price">${element.price}</div>
					<div class="title">${element.title}</div>
					<div class="add">加入购物车</div>
				</div>`
				$(".detail_box").html(html);
				
			});	

			$("#img").elevateZoom({ 
			    lensColour: '#fede4f', //放大镜背景颜色 
			    cursor: 'move', //悬浮在放大镜鼠标形状 
			    borderSize: '1', //右侧放大镜边框尺寸 
			    borderColour: '#dddddd' //右侧放大镜边框颜色 
			});
		//利用事件委派，为"加入购物车"绑定点击事件
	//保存:[{},{},{}]
	$(".detail_box").delegate(".add","click",function(event){
		//当前"加入购物车"父级元素
		var _box=$(this).parent();
		//将当前选购商品的信息保存到对象中
		var prod={
			id:_box.children(".id").text(),
			title:_box.children(".title").text(),
			price:_box.children(".price").text(),
			amount:1,
			img:_box.children("#img").attr("src")
		};
		//查找cookie中已有的购物车结构
		var _products=$.cookie("products") || [];
		//判断当前选购商品是否在数组中已有选购
		var index = exist(prod.id,_products);
		if(index===-1){
			//将当前选购商品保存到数组中
			_products.push(prod);
		}else{
			//将已选购商品数量自增
			_products[index].amount++;
		}
		//将数组存会cookie中
		$.cookie("products",_products,{expires:7,path:"/"});
		/*加入购物车成功的抛物线效果*/
		var flyer=$(`<img src="${_box.children("#img").attr("src")}">`);
		flyer.fly({
			start:{
				left:event.pageX,
				top:event.pageY
			},
			end:{
				left:$("#car").offset().left,
				top:$("#car").offset().top,
				width:0,
				height:0
			}
		});
	});
	function exist(id,products){
		var idx=-1;
		$.each(products,function(index,element){
			if(element.id==id){
				idx=index;
				return false;
			}
		});
		return idx;
	}
	 
			});
	});
});