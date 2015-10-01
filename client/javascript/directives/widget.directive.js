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