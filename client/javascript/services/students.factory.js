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

		var counter = 0;

		var studentOverviewModel = function(student) {
			this.studentId = student.studentId;
			this.studentName = student.studentName;
			this.grade = student.grade;
			this.gender = student.gender;
			this.percentDaysLateSy1415 = student.percentDaysLateSy1415;
			this.attendanceYtd = student.attendanceYtd;
			this.index = counter;
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
					counter++;
				});

				return studentsOverview;
			});
		};

		var getStudentDetails = function(indx) {
			return new studentDetailsModel(cachedData[indx]);
		};

		var mapKey = function(indx) {
			var keys = new studentOverviewModel(cachedData[0]);
			return Object.keys(keys)[indx];
		}

		return {
			getData: getData,
			getOverview: getOverview,
			getStudentDetails: getStudentDetails,
			mapKey: mapKey
		};

	});