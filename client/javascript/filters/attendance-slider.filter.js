angular.module('studentDashboard')
	.filter('attendance', function(percentageFilter) {
		return function(input, range) { 

			var filteredItems = [];

			input.forEach(function(student) {
				if(student["attendanceYtd"]) {
					if(percentageFilter(student["attendanceYtd"]) <= range) {
						filteredItems.push(student);
					} 
				}
			});
			console.log('filteredItems', filteredItems)
			return filteredItems;
			
		};
	})