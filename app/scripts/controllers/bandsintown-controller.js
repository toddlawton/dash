app.controller('BandsinTownController', function($scope, geolocation, BandsInTownData) {
	$scope.isLoaded = false;

	geolocation.getLocation().then(function(data) {
		$scope.coordinates = data.coords;
	})
	.then(function(){
		$scope.getBandsinTown();
	});
	
	$scope.getBandsinTown = function() {
		$scope.locationQuery = $scope.coordinates;
		BandsInTownData.queryAPI($scope.locationQuery)
		.then(function(result) {
			$scope.events = result;
			$scope.artists = [];
			$.each(result.data, function(index, element){
				var artistName = element.artists;
				$scope.artists.push(artistName);
			});
			console.log($scope.artists);
			$scope.isLoaded = true;
			
		});
	}
});

app.factory('BandsInTownData', function($http) {
	return {
		queryAPI: function(locationQuery) {
			return $http.jsonp('http://api.bandsintown.com/events/search.json?&page=2&app_id=DASH', {
				params: {
					"location": locationQuery.latitude+","+locationQuery.longitude,
					"callback": "JSON_CALLBACK",
				}
			});
		}
	}
});