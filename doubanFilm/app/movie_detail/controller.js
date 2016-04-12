
(function(angular){
	'use strict';


	var module = angular.module('myApp.movie_detail', ['ngRoute','myApp.services.http']);

	module.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/detail/:id', {
	    templateUrl: 'movie_detail/view.html',
	    controller: 'MovieDetailCtrl'
	  });
	}])
	module.controller('MovieDetailCtrl', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService){
		console.log($route);
			$scope.movie = {};
			$scope.loading = true;
			var id = $routeParams.id;
			var apiAddress = 'http://api.douban.com/v2/movie/subject/'+id;
			HttpService.jsonp(apiAddress,{},function(data){
				$scope.movie = data;
				// console.log($scope.movie);
				$scope.loading = false;
				$scope.$apply();
			})
		}
	]);

})(angular)

