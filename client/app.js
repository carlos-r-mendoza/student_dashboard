'use strict';

angular.module('studentDashboard', ['ui.router', 'gridster']);

angular.module('studentDashboard')
	.config(function ($locationProvider, $urlRouterProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    // There is <base href='/'> tag in index.html that is required for this to work
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('main');
});

//config of $stateProvider
angular.module('studentDashboard')
	.config(function ($stateProvider) {

	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'templates/student-dashboard.html'
		})
		.state('student-dashboard', {
			url: '/student-dashboard',
			templateUrl: 'templates/student-dashboard.html'
		})
		.state('school-profile', {
			url: '/school-profile',
			templateUrl: 'templates/student-dashboard.html'
		})
});

	 // $(".button-collapse").sideNav();
'use strict';

angular.module('studentDashboard')
	.directive('navbar', function() {
		return {
			restrict: 'A',
			templateUrl: 'templates/navbar.html',
			link: function(scope, element, attrs) {
				$('.button-collapse').sideNav();
			}
		}
	});