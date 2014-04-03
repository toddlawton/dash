app.controller('WeatherController', function($scope, geolocation, weatherData) {
	
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
			console.log(result);
			$scope.weather = result.data;
		});
	}
});