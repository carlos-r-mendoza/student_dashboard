'use strict';

var router = require('express').Router(),
	request = require('request'),
	fs = require('fs');

module.exports = router;	

// student model constructor function
	// this is the data of each student being sent to the client-side 
var studentDataModel = function(student) {
	
	this.studentId = student.studentId;
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

// function that parses student data so that only necessary data is passed to client-side
var parseStudentsData = function(data) {
	var parsedStudentsData = [];
	var students = JSON.parse(data);
	//removes first array item with property mapping names
	students.shift();

	students.forEach(function(student) {
		parsedStudentsData.push(new studentDataModel(student));
	});

	return parsedStudentsData;
};

// prints status code of response
var statusCode = function(statusCode) {
	console.log('Response status code: ', statusCode);
};

var writeDataFile = function(data) {
	fs.writeFile('./server/data/students-data.json', data, {encoding: 'utf8'}, function(err) {
    	if (err) throw err;
    	console.log('Student data written to server/data/students-data.json');
    });
};

var readDataFile = function() {
	return fs.readFileSync('./server/data/students-data.json', {encoding: 'utf8'});
};

// route getting student data
router.get('/student-data', function(req, res, next) {

	// wrote data to json file for dev purposes
	// var data = readDataFile();
	// res.send(parseStudentsData(data));

	var url = 'https://script.googleusercontent.com/macros/echo?user_content_key=n0-xTMUN3nHuCO_jnoCuwdjRY1mchfoMK16VB3c2PTfxiebdcgR1hjQEnbV0M5kK-EQUMwFP_TG06WnhaRnAfS8cGy0Ss8Vxm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFL1bTUvgtX-I3dP-rkaVkXwq9c0lP_yAdwLqrO1fBG9ViVZIXLuuM38ZxVVktS6pGwihnkohuAm&lib=Mw-ve0R7zJP9N1rf46jTbuILi7CGwAUIU';

	request.get(url, function(err, response, body) {
			if(err) { throw err; }
			statusCode(response.statusCode);
			// writeDataFile(body);
			res.send(parseStudentsData(body));
	});
});