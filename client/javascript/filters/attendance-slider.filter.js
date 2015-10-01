angular.module('studentDashboard')
	.filter('attendance', function(percentageFilter) {
		return function(input, range) { 

			var filteredItems = [];

			if(input) {
				input.forEach(function(student) {
					if(student["attendanceYtd"]) {
						if(percentageFilter(student["attendanceYtd"]) <= range) {
							filteredItems.push(student);
						} 
					}
				});
			}
			return filteredItems;
			
		};
	})