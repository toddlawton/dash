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
	}
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