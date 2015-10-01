'use strict';

angular.module('studentDashboard')
	.directive('navbar', function() {
		return {
			restrict: 'A',
			templateUrl: 'templates/navbar.html',
			link: function(scope, element, attrs) {
				$('.button-collapse').sideNav();
				scope.tab = 'Students';
			}
		}
	});