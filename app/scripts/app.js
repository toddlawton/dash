'use strict';

var app = angular.module('dashApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'geolocation'
]);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.directive('shapeshift', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(".container").shapeshift({
			        gutterX: -1, // Compensate for border width
			        gutterY: -1, // Compensate for border width
			        paddingX: 0,
			        paddingY: 0
			});
		}
	}
});