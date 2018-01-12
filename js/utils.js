
var utils={
	
	// 全局数据
	gData: {
		list: []
	},
	
	// 初始化 gData 数据
	init: function() {
		
		var self = this
		
		// 请求后台地址
		var url = "json/list.json"
		$.ajax({
			type: "get",
			url: url,
			async: true,
			success: function(data) {
				
				// 保存数据
				self.gData = data
				
				// 模板解析
				// 采用的是 art-template 方法
				//  http://www.jianshu.com/p/483fa7f6f55b 这里有使用教程
				var html = template('tpl-list', data)
				
				// 更新到页面上
				$("#list-data").html(html)

				// 全选框的实现
				$(".choose").click(function() {
					var a = $(".choose:checkbox")
					var b = $(".choose:checked")
					
					console.log(a.length)
					
					if (a.length == b.length) {
						$("#allChoose").prop("checked", true)
					} else {
						$("#allChoose").prop("checked", false)
					}
				})
				
			}
		});
	},
	
	
	//查询方法（包含模糊查询）
	search: function(opts){
		
		var data = {
			list: []
		}
		
		// 如果存在查询参数
		if (opts) {
			// 过滤数据
			
			for (var i = 0; i < this.gData.list.length; i++) {
				var obj = this.gData.list[i];
				
				// 先不删除
				var isDel = false;
				
				// 检查当前对象中是否存在对应的属性
				for (var k in opts.keys) {
					var v = opts.keys[k];
					
					// 存在一个条件不满足就 删除此记录
					
					// 字符串类型
					if (typeof v == "string") {
						if (v != "" && v.indexOf( obj[k] ) < 0 ) {
							isDel = true;
						}
					}
					
					// 整数类型
					if (typeof v == "number" && v != -1) {
						if (v != -1 && v != obj[k] ) {
							isDel = true;
						}
					}
					
					// 如果对应关键字中存在，那么就不用删除
				}
				
				if (!isDel) {
					// 不需要删除，那么就添加进去
					data.list.push(obj)
				}
			}
		}
		
		var html = template('tpl-list', data)
	
		// 更新到页面上
		$("#list-data").html(html)
				
	},
	
	
	//新增和修改方法（合并为同一个）
	update:function(opts){
		
		if (!opts) {
			return ;
		}
		
		var title = "修改"
		
		if (opts.isAdd == true) {
			title = "新增"		
		} else {
			title = "修改"
		}
		
		var h = template('addHtml', opts)
		
		var self = this
		
		box.init({
			title: title,
			content: h,
			callback: function($box,$cover){
				$('#submitBtn').click(function(){
					// alert(title + "成功")

					var $inp = $(".box .item input")


					var sex = 0
					if ($($inp[3]).prop("checked")) {
						sex = 1
					}

					if (opts.isAdd == true) {
						self.gData.list.push({
							userName: $inp[0].value,
							userAge: $inp[1].value,
							userSex: sex,
							userNation: $inp[4].value,
							userCard: $inp[5].value,
							userPhone: $inp[6].value,
							userVoc: $inp[7].value,					
						})
						
					} else {
						
						self.gData.list[opts.index].userName= $inp[0].value;
						self.gData.list[opts.index].userAge= $inp[1].value;
						self.gData.list[opts.index].userSex= sex;
						self.gData.list[opts.index].userNation= $inp[4].value;
						self.gData.list[opts.index].userCard= $inp[5].value;
						self.gData.list[opts.index].userPhone= $inp[6].value;
						self.gData.list[opts.index].userVoc= $inp[7].value;	
					}
					
					var data = self.gData
					
					var html = template('tpl-list', data)
				
					// 更新到页面上
					$("#list-data").html(html)
					
					$box.remove();
					$cover.remove();
					
				})
			}
		});
	},
	//删除方法（支持批量删除）
	del:function(opts){
		box.init({
			title:"删除",
			del:true,
			content:"你确定要删除这条信息么",
			callback:function(){
				
				// 全部删除
				for (var i = 0; i < opts.dom.length; i++) {
					opts.dom[i].remove()
				}

				// alert("删除成功")
			}
		});
	}
}
