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
			templateUrl: 'templates/students.html',
			controller: 'StudentsCtrl'
		})
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
'use strict';

angular.module('studentDashboard')
	.controller('StudentsCtrl', function($scope, $q, Students) {

		$scope.studentsTableHeaders = [
			'Student ID',
			'Name',
			'Grade',
			'Gender',
			'% Days Late',
			'Attendance %'
		];

		$scope.studentTableColumns = [
			'Cohort',
			'Class',
			'Ethnicity',
			'Free or Reduced Lunch',
			'8th Grade Attendance',
			'SY 12-13 Attendance',
			'SY 13-14 Attendance',
			'SY 14-15 Attendance',
			'YTD Attendance',
			'GPA',
			'Transit Distance',
			'Travel Time'
		];

		Students.getOverview()
			.then(function(data) {
			$scope.students = data;
			getStudentDetails(0);
		});

		$scope.showStudentDetails = function(indx) {
			getStudentDetails(indx);
		};

		var getStudentDetails = function(indx) {
			$q.when(Students.getStudentDetails(indx))
				.then(function(data) {
					console.log(data)
					$scope.studentDetails = data;
				});
		};

	$scope.gridsterOpts = {
	    columns: 6, // the width of the grid, in columns
	    pushing: true, // whether to push other items out of the way on move or resize
	    floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
	    swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
	    width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
	    colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
	    rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
	    margins: [20, 20], // the pixel distance between each widget
	    outerMargin: true, // whether margins apply to outer edges of the grid
	    isMobile: false, // stacks the grid items if true
	    mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
	    mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
	    minColumns: 1, // the minimum columns the grid must have
	    minRows: 2, // the minimum height of the grid, in rows
	    maxRows: 100,
	    defaultSizeX: 2, // the default width of a gridster item, if not specifed
	    defaultSizeY: 1, // the default height of a gridster item, if not specified
	    minSizeX: 1, // minimum column width of an item
	    maxSizeX: null, // maximum column width of an item
	    minSizeY: 1, // minumum row height of an item
	    maxSizeY: null, // maximum row height of an item
	    resizable: {
	       enabled: true,
	       handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
	       start: function(event, $element, widget) {}, // optional callback fired when resize is started,
	       resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
	       stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
	    },
	    draggable: {
	       enabled: true, // whether dragging items is supported
	       handle: '.my-class', // optional selector for resize handle
	       start: function(event, $element, widget) {}, // optional callback fired when drag is started,
	       drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
	       stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
	    }
	};



	});
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
angular.module('studentDashboard')
	.directive('widgetTable', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.addClass('bordered centered highlight responsive-table');
			}
		};
	})
angular.module('studentDashboard')
	.directive('widget', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.addClass('custom-widget z-depth-1');
				element.children(1).wrap('<div class="widget-body"></div>');
				
				var header = attrs.header;
				var headerHtml = '<div class="widget-header z-index-1"><h1 class="widget-header-title">' + header + '</h1></div>'
				element.prepend(headerHtml);

				// updates widget header title when title changes in html 
				attrs.$observe('header', function(newValue){
					header = '<div class="widget-header z-index-1"><h1 class="widget-header-title">' + newValue + '</h1></div>';
					$(element).find(".widget-header").replaceWith(header);
				});

			}
		};
	})
angular.module('studentDashboard')
	.filter('percentage', function() {
		return function(input) {
			return parseInt(input * 100);
		};
	})
'use strict';

angular.module('studentDashboard')
	.factory('Students', function($http, $q) {

		var cachedData = "";

		var getData = function() {
			if(!cachedData) {
				return $http.get('/api/student-data')
					.then(function(response) {
						if(response.data.error) { console.log('ERROR: ', response.data.error); }
						else {
							cachedData = response.data;
							return response.data;
						}
					});
			} else {
				return cachedData;
			}
		};

		var studentOverviewModel = function(student) {
			this.studentId = student.studentId;
			this.studentName = student.studentName;
			this.grade = student.grade;
			this.gender = student.gender;
			this.percentDaysLateSy1415 = student.percentDaysLateSy1415;
			this.attendanceYtd = student.attendanceYtd;
		};

		var studentDetailsModel = function(student) {
			this.studentName = student.studentName;
			this.cohort = student.cohort;
			this.grade = student.grade;
			this.officialClass = student.officialClass;
			this.schoolName = student.schoolName;
			this.admitDate = student.admitDate;
			this.gender = student.gender;
			this.ethnicity = student.ethnicity;
			this.freeOrReducedLunch = student.freeOrReducedLunch;
			this.attendance8thGrade = student.attendance8thGrade;
			this.transitDistanceMiles = student.transitDistanceMiles;
			this.transitTimeMinutes = student.transitTimeMinutes;
			this.attendanceSy1213 = student.attendanceSy1213;
			this.attendanceSy1314 = student.attendanceSy1314;
			this.attendanceSy1415 = student.attendanceSy1415;
			this.percentDaysLateSy1415 = student.percentDaysLateSy1415;
			this.attendanceYtd = student.attendanceYtd;
			this.transcriptGradeAverage = student.transcriptGradeAverage;
			this.plannedGraduationDate = student.plannedGraduationDate;
		};

		var getOverview = function() {
			
			var	studentsOverview = [];
			return $q.when(getData()).then(function(students) {
				students.forEach(function(student) {
					studentsOverview.push(new studentOverviewModel(student));
				});
				console.log(studentsOverview)

				return studentsOverview;
			});
		};

		var getStudentDetails = function(indx) {
			return new studentDetailsModel(cachedData[indx]);
		};

		return {
			getData: getData,
			getOverview: getOverview,
			getStudentDetails: getStudentDetails
		};

	});