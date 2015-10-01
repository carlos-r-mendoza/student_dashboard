angular.module('studentDashboard')
	.directive('widget', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.addClass('custom-widget');
				element.addClass('z-depth-1');
			}
		};
	})