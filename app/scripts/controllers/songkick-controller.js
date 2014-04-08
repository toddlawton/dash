app.controller('SongkickController', function($scope, geolocation, songkickData) {
	$scope.isLoaded = false;
	$scope.getSongkick = function() {
		songkickData.querySongkick()
		.then(function(result) {
			$scope.songkick = result.resultsPage.results;
			$scope.events = $scope.songkick.event;
			$scope.eventList = [];
			for (i=0; i < $scope.events.length; i++) {
				$scope.eventList.push($scope.events[i]);	
			}
			console.log($scope.eventList);
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