/*
* @Author: 573156440
* @Date:   2016-03-11 09:07:09
* @Last Modified by:   573156440
* @Last Modified time: 2016-03-12 16:32:27
*/

'use strict';
//自定义指令 实现左侧自动焦点
(function(angular){
		angular.module('myApp.directives.autofocus',[])
		//自定义的指令名：autoFocus，注入$locaiton对象
		.directive('autoFocus',['$location',function($location){
				// var path = $location.path();
				// console.log($location);    // 为空说明是在路由跳转之前执行的.....路由的跳转是在公共模块完成之后。
				return{
					restrict:'A',   //E: element  A:Attribute C:class M：
					link:function($scope,iElm,iAttrs,controller){
						//iElm 为作用的元素 iAttrs为此元素上的属
						// console.log(iElm);
						// console.log(iAttrs);
						$scope.$location = $location;
						$scope.$watch('$location.path()',function(now){
							var aLink = iElm.children().attr('href');
						var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
						// console.log("aaaaaaa"+now+"bbbbbbbbbb"+type)
						if(now.startsWith(type)){   //访问的是当前链接
							iElm.parent().children().removeClass('active');
							iElm.addClass('active');
						}
						})


						// iElm.on('click',function(){
						// 	console.log(111111111111111111)
						// iElm.parent().children().removeClass('active');
						// iElm.addClass('active');
						// })
					}
				}
		}]);

})(angular)
