angular.module('studentDashboard')
	.filter('percentage', function() {
		return function(input) {
			return parseInt(input * 100);
		};
	})