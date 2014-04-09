app.controller('HackerNewsController', function($scope, $http) {
	$http.jsonp('http://api.ihackernews.com/page?format=jsonp&callback=JSON_CALLBACK').success(function(data) {
		$scope.posts = data;
		$scope.isLoaded = true;
	});
});