'use strict';

angular.module('studentDashboard')
	.directive('slider', function() {
		return {
			restrict: 'A',
			templateUrl: '/templates/slider.html'
		};
	});