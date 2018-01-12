$(function(){
	var $body=$('body');
	
	utils.init();
	
	$body.on('click','#addBtn',function(){
		
		var opt = {
			isAdd: true,
			item: {}
		}
		
		opt.item.userName = ""
		opt.item.userAge = ""
		opt.item.userSex = ""
		opt.item.userNation = ""
		opt.item.userCard = ""
		opt.item.userPhone = ""
		opt.item.userVoc = ""
		
		utils.update(opt);
	})
	
	$body.on('click','#updateBtn', function() {
		
		var opt = {
			isAdd: false,
			item: {}
		}
		
		// 获取当前数据的编号，用于修改全局数据
		opt.index = $(this).parent().parent().index() - 1
		
		// 获取当前点击的数据
		var allTds = $(this).parent().parent().find("td")
		
		opt.item.userName = allTds[1].innerHTML
		opt.item.userAge = allTds[2].innerHTML
		opt.item.userSex = allTds[3].innerHTML.trim()
		opt.item.userNation = allTds[4].innerHTML
		opt.item.userCard = allTds[5].innerHTML
		opt.item.userPhone = allTds[6].innerHTML
		opt.item.userVoc = allTds[7].innerHTML
		
		
		utils.update(opt);
	})
	
	
	
	
	
	// 全部删除按钮
	$body.on('click','#delBtnAll',function(){
		
		console.log(this)
		
		var opts = {
			dom: $("#list-data tr:gt(0)").find("input:checked").parent().parent()
		}
		
		utils.del(opts);
	})
	
	
	
	
	$body.on('click','#delBtn',function(){
		
		console.log(this)
		
		var opts = {
			dom: [$(this).parent().parent()]
		}
		
		utils.del(opts);
	})
	
	$body.on('click','#allChoose',function(){
		var $this=this;
		$('.choose').each(function(){
			if($this.checked){
				this.checked=true;
			}else{
				this.checked=false;
			}
		})
	})
	

	
	// 搜索按钮的实现
	$body.on('click','#searchBtn',function() {
		
		// 查询参数
		var opt = {};
		
		// 是否采用模糊查询
		opt.isMofu = true;
		// 查询字段
		opt.keys = {};
		
		// 获取参数
		opt.keys.userName = $("input[name='userName']").val();
		opt.keys.userAge = $("input[name='userAge']").val();
		opt.keys.userSex = -1;
		if ($("input[name='userSex']").eq(0).is(":checked")) {
			opt.keys.userSex = 0;
		} else if ($("input[name='userSex']").eq(1).is(":checked")) {
			opt.keys.userSex = 1;
		} 
		
		// 搜索
		utils.search(opt);
	})
})
