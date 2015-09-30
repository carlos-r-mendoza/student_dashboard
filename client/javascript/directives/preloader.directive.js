'use strict';

angular.module('studentDashboard')
	.directive('preloader', function() {
		return {
			restrict: 'A',
			template: '<div class="progress preloader"><div class="indeterminate"></div></div>',
			link: function(scope, element, attrs) {
			}
		};
	});