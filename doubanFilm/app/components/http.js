/*
* @Author: 573156440
* @Date:   2016-03-10 12:33:38
* @Last Modified by:   573156440
* @Last Modified time: 2016-03-12 16:33:40
*/

'use strict';
(function(angular){   //angular提供的跨域不支持自定义回调函数名称，豆瓣用不了。这里自己写个
var http = angular.module('myApp.services.http',[]);
http.service('HttpService',['$document','$window',function($document,$window){
	// console.log($document);
	// console.log($window);
	this.jsonp = function(url,data,callback){
		//1挂载回调函数
		var fnSuffix = Math.random().toString().replace('.','');
		var cbFuncName = 'my_json_cb_'+fnSuffix;
		$window[cbFuncName] = callback;
		//2处理url中的回调参数，
		var queryString = url.indexOf('?')==-1?'?':'';
		for (var key in data) {
		    queryString+=(key +'='+ data[key]+ '&');
		}
		queryString+= ('callback=' +cbFuncName);
		//3把这个url放到创建的script标签里面。
		var scriptElement = $document[0].createElement('script');
		scriptElement.src = url + queryString;
		//4将script标签放到页面中
		$document[0].body.appendChild(scriptElement);
	}

}])

})(angular)
