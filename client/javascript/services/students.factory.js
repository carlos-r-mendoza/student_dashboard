'use strict';

angular.module('studentDashboard')
	.factory('Students', function($http,$q) {

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
			this.attendanceSy1415 = student.attendanceSy1415;
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

		return {
			getData: getData,
			getOverview: getOverview
		};

	});