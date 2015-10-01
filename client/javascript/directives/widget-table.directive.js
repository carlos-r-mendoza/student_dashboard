angular.module('studentDashboard')
	.directive('widgetTable', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.addClass('bordered centered highlight responsive-table');
			}
		};
	})