'use strict';

angular.module('studentDashboard', ['ui.router', 'gridster']);

angular.module('studentDashboard')
	.config(function ($locationProvider, $urlRouterProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    // There is <base href='/'> tag in index.html that is required for this to work
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('students');
});

//config of $stateProvider
angular.module('studentDashboard')
	.config(function ($stateProvider) {

	$stateProvider
		// .state('main', {
		// 	url: '/',
		// 	templateUrl: 'templates/students.html',
		// 	controller: 'StudentsCtrl'
		// })
		.state('students', {
			url: '/students',
			templateUrl: 'templates/students.html',
			controller: 'StudentsCtrl'
		})
		.state('school', {
			url: '/school',
			templateUrl: 'templates/school.html',
			controller: 'StudentsCtrl'
		})
});

	 // $(".button-collapse").sideNav();