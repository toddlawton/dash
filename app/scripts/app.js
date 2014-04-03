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

app.factory('weatherData', function($http) {
	return {
		queryWeather: function(locationQuery) {
			return $http.jsonp('http://api.openweathermap.org/data/2.5/weather', {
				params: {
					"lat": locationQuery.latitude,
					"lon": locationQuery.longitude,
					"units": "metric",
					"callback": "JSON_CALLBACK",
				}
			});
		}
	}
});