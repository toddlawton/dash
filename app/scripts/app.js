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
	.when('/news/designer-news', {
		templateUrl: 'views/news/designer-news.html',
		controller: 'DesignerNewsController'
	})
	.when('/news/hacker-news', {
		templateUrl: 'views/news/hacker-news.html',
		controller: 'HackerNewsController'
	})
	.when('/news/product-hunt', {
		templateUrl: 'views/news/product-hunt.html',
		controller: 'ProductHuntController'
	})
	.otherwise({
		redirectTo: '/'
	});
});


// Layouts

app.controller('NavigationController', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
	     var active = (viewLocation === $location.path());
	     return active;
	};
});


// Widgets

app.controller('DateTimeController', function($scope, $interval) {
	$scope.updateTime = function() {
		$scope.date = new Date();
	};
	$scope.date = new Date();
	$interval($scope.updateTime, 1000);
});

app.controller('WeatherController', function($scope, geolocation, weatherData) {
	$scope.isLoaded = false;

	geolocation.getLocation().then(function(data) {
		$scope.coordinates = data.coords;
	})
	.then(function(){
		$scope.getWeather();
	});
	
	$scope.getWeather = function() {
		$scope.locationQuery = $scope.coordinates;
		weatherData.queryWeather($scope.locationQuery)
		.then(function(result) {
			$scope.weather = result.data;
			$scope.isLoaded = true;
		});
	};
});

app.factory('weatherData', function($http) {
	return {
		queryWeather: function(locationQuery) {
			return $http.jsonp('http://api.openweathermap.org/data/2.5/weather', {
				params: {
					'lat': locationQuery.latitude,
					'lon': locationQuery.longitude,
					'units': 'metric',
					'callback': 'JSON_CALLBACK',
				}
			});
		}
	};
});

// Sections

app.controller('ProductHuntController', function($scope, $http) {
	$http.jsonp('http://www.kimonolabs.com/api/e8m2so5c?apikey=d8e02115e89bf009946f1e74672c3c70&callback=JSON_CALLBACK')
	.success(function(data) {
		$scope.posts = data.results.producthunt;
		$scope.isLoaded = true;
		console.log($scope.posts);
	})
	.error(function(data, status) {
		console.log(data+' '+status);
	});
});

app.controller('HackerNewsController', function($scope, $http) {
	$http.jsonp('http://api.ihackernews.com/page?format=jsonp&callback=JSON_CALLBACK')
	.success(function(data) {
		$scope.posts = data;
		$scope.isLoaded = true;
	})
	.error(function(data, status) {
		console.log(data+' '+status);
	});
});

app.controller('DesignerNewsController', function($scope, $http) {
	$http.jsonp('http://www.kimonolabs.com/api/c8x3xa4c?apikey=d8e02115e89bf009946f1e74672c3c70&callback=JSON_CALLBACK')
	.success(function(data) {
		$scope.posts = data.results.designernews;
		$scope.isLoaded = true;
	})
	.error(function(data, status) {
		console.log(data+' '+status);
	});
});