app.controller('SongkickController', function($scope, geolocation, songkickData) {
	$scope.isLoaded = false;

	$scope.itemsToArray = function (items) {
		var array = [];
			angular.forEach($scope.words, function(item) {
			array.push(item);
		});
		return array;
	};
	$scope.getSongkick = function() {
		songkickData.querySongkick()
		.then(function(result) {
			$scope.songkick = angular.fromJson(result.resultsPage.results);
			$scope.events = $scope.songkick.event;
			console.log($scope.events);
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