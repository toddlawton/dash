app.controller('SongkickController', function($scope, geolocation, songkickData) {
	$scope.isLoaded = false;
	$scope.getSongkick = function() {
		songkickData.querySongkick()
		.then(function(result) {
			console.log(result);
			$scope.songkick = result.resultsPage.results;
			console.log($scope.songkick);
			$scope.events = $scope.songkick.event;
			$scope.isLoaded = true;
		});
	}();
});

app.factory('songkickData', function($http) {
	return {
		querySongkick: function() {
			return $.getJSON('http://api.songkick.com/api/3.0/events.json?location=clientip&apikey=ikcfrPrcFaOkPhhP&jsoncallback=?');
		}
	}
});