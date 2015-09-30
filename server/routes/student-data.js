'use strict';

var router = require('express').Router();
var request = require('request');
module.exports = router;	

var parseStudentsData = function(data) {

	var studentsData = [];
	var studentData = {}

	var students = JSON.parse(data);


	students.forEach(function(student) {

		studentData.studentId = student.studentId;
		studentsData.push(studentData);
		studentData = {};

	});

	return studentsData;
};

router.get('/student-data', function(req, res) {




	request.get('https://script.googleusercontent.com/macros/echo?user_content_key=n0-xTMUN3nHuCO_jnoCuwdjRY1mchfoMK16VB3c2PTfxiebdcgR1hjQEnbV0M5kK-EQUMwFP_TG06WnhaRnAfS8cGy0Ss8Vxm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFL1bTUvgtX-I3dP-rkaVkXwq9c0lP_yAdwLqrO1fBG9ViVZIXLuuM38ZxVVktS6pGwihnkohuAm&lib=Mw-ve0R7zJP9N1rf46jTbuILi7CGwAUIU', 
		function(error, response, body) {
		console.log('response', response.statusCode);
		var bodyToSend = parseStudentsData(body);
		res.send(bodyToSend);
	})
})

//studentId
//studentName
//cohort
//grade
//officialClass
//schoolName
//admitDate
//gender
//ethnicity
//freeOrReducedLunch
//attendance8thGrade
//transitDistanceMiles
//transitTimeMinutes
//attendanceSy1213
//attendanceSy1314
//attendanceSy1415
//percentDaysLateSy1415
//attendanceYtd
//transcriptGradeAverage
//plannedGraduationDate
