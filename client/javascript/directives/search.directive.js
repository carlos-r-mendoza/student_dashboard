'use strict';

angular.module('studentDashboard')
	.directive('search', function() {
		return {
			restrict: 'A',
			templateUrl: '/templates/search.html'
		};
	});