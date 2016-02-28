

function ajax(data){
	//data={data:"",dataType:"xml/json",type:"get/post"，url:"",asyn:"true/false",success:function(){},failure:function(){}}

	//data:{username:123,password:456}
	//data = 'username=123&password=456';
	//第一步：创建xhr对象
	var xhr = null;
	if(window.XMLHttpRequest){//标准的浏览器
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//第二步：准备发送前的一些配置参数
	var type = data.type == 'get'?'get':'post';
	var url = '';
	if(data.url){
		url = data.url;
		if(type == 'get'){
			url += "?" + data.data + "&_t="+new Date().getTime();
		}
	}
	var flag = data.asyn == 'true'?'true':'false';
	xhr.open(type,url,flag);

	//第三步：执行发送的动作
	if(type == 'get'){
	   xhr.send(null);
	}else if(type == 'post'){
	   xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	   xhr.send(data.data);
	}

	//第四步：指定回调函数
	xhr.onreadystatechange = function(){
		if(this.readyState == 4){
			if(this.status == 200){
				if(typeof data.success == 'function'){
					var d = data.dataType == 'xml'?xhr.responseXML:xhr.responseText;
					console.log(d+'-------封装的AJAX函数中的d');
					//d为服务器返回的数据
					data.success(d);

				}
			}else{
				if(typeof data.failure == 'function'){
					console.log('出错了封装AJAX里面的:'+"------"+xhr.readyState+"----"+xhr.status);
					data.failure();
				}
			}
		}
	}

}





	// window.onload = function(){
	// 	//注册按钮单击事件
	// 	var btn = document.getElementById('btn');
	// 	btn.onclick = function(){
	// 		var param = {
	// 			url:"00data.php",
	// 			type:'get',
	// 			dataType:'json',
	// 			success:function(data){
	// 				alert(data);
	// 			}
	// 		};
	// 		ajax(param);
	// 	}
	// }
// </script>
