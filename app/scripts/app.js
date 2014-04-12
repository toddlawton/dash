'use strict';

var app = angular.module('dashApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'angularMoment',
	'geolocation'
]);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
	.when('/news/hacker-news', {
		templateUrl: 'views/news/hacker-news.html',
		controller: 'MainCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.controller('DateTimeController', function($scope, $interval) {
	$scope.updateTime = function() {
		$scope.date = new Date();
	};
	$scope.date = new Date();
	$interval($scope.updateTime, 1000);
});