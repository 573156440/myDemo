'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.movie_detail',   //detail要放在list前面，否则会被list的路由
  'myApp.movie_list',
  'myApp.directives.autofocus',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
	// console.log($routeProvider);
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]).
controller('SearchCtrl',['$scope','$route','$routeParams',function($scope,$route,$routeParams){
	$scope.input = '';
	$scope.search = function(){
		console.log($scope.input);   //获取到了input框的输入内容
		console.log($route);
		// $route.current.$$route.originalPath = '/detail/';
		$route.updateParams({q:$scope.input,category:'search',detail:'detail'});
		//https://api.douban.com/v2/movie/search?q=心迷宫
		//修改url的q参数,和url中的search修改
	}
}])
// .controller('NavController',['$scope','$location',function($scope,$location){
// //用自定义指令做左侧自动焦点，这里注释掉
// 	console.log(11111111111111111)
// 	console.log($location)
// 	$scope.$location = $location;
// 	$scope.$watch('$location.path()',function(now){
// 		if(now.startsWith('/top250')){
// 		$scope.type = 'top250';
// 	}else if(now.startsWith('/coming_soon')){
// 		$scope.type = 'coming_soon';
// 	}else if(now.startsWith('/in_theaters')){
// 		$scope.type = 'in_theaters';
// 	};
// 	console.log($scope.type);
// 	});


// }]);

