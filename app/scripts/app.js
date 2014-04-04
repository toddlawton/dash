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