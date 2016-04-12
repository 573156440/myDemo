
(function(angular){
	'use strict';


	var module = angular.module('myApp.movie_list', ['ngRoute','myApp.services.http']);

	module.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/:category/:page', {
	    templateUrl: 'movie_list/view.html',
	    controller: 'MovieListCtrl'
	  });
	}])
	module.controller('MovieListCtrl', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
		//控制器1 设计暴露的数据 2设计暴露的行为
		var count = 5;   //每页条数
		var page = parseInt($routeParams.page); //当前第几页
		var start = (page-1)*count;   //当前页从哪开始
		$scope.subjects = [];
		$scope.message = '';
		$scope.title = 'loading...';
		$scope.totalCount = 0;
		$scope.loading = true;
		$scope.totalPages = 0;
		$scope.currentPage = page;
		// console.log('当前页'+$scope.currentPage)
		/*var doubanAPIurl = 'http://api.douban.com/v2/movie/in_theaters';
		$http.jsonp(doubanAPIurl+"?callback=JSON_CALLBACK").then(function(response){
			//angular的jsonp   callback=JSON_CALLBACK 最终会替换成个随机的回调函数名
			//此处代码需要异步请求后执行
			console.log(response);
			if(response.status == 200){
				$scope.message = '正确获取数据';
				$scope.subjects = response.data.subjects;
			} else{
				$scope.message = '获取数据错误,错误信息：'+ response.statusText;
			}

		},function(err){
			console.log(err);
			$scope.message = '获取数据错误,错误信息' + response.statusText;
		});*/
	//获取数据
	HttpService.jsonp(
		'http://api.douban.com/v2/movie/'+$routeParams.category,
		{start:start,count:count,q:$routeParams.q},
		function(data){
		// console.log(data);
		$scope.subjects = data.subjects;
		$scope.title = data.title;
		$scope.totalCount = data.total;
		$scope.totalPages = Math.ceil($scope.totalCount/count);

		$scope.loading = false;
		$scope.$apply();  //apply的作用是让表达式重新同步
		 //因为用了自己写的跨域http.js 需要用到angular的apply方法，通知angular，否则页面无法绑定（￥routScope.Scope）
	});
	//分页
	$scope.go = function(page){
		//传过来第几页就跳到第几页
		if(page>=1&&page<=$scope.totalPages)
		$route.updateParams({page:page})
	}
	}]);

})(angular)

