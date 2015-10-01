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