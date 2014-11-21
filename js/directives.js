'use strict';

/* Directives */


angular.module('myApp.directives', [])
.directive('scroll', function ($window){
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset > 0 && this.pageYOffset < 450) {
                scope.section = '1';
             } else if (this.pageYOffset > 450 && this.pageYOffset < 1000){
                scope.section = '2';    
             } else if (this.pageYOffset > 1000 && this.pageYOffset < 1720){
             	scope.section = '3';
             } else if (this.pageYOffset > 1720 && this.pageYOffset < 2000){
             	scope.section = '4'
             } else if (this.pageYOffset > 2000) {
             	scope.section = '5'
             } else {
             	scope.section ='0'
             }
            scope.$apply();
        });
    };
})

.directive('validUsername', function (){
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function (viewValue) {
                // Any way to read the results of a "required" angular validator here?
                var isBlank = viewValue === ''
                var invalidChars = !isBlank && !/^[A-z ]+$/.test(viewValue)
                var invalidLen = !isBlank && !invalidChars && (viewValue.length < 3 || viewValue.length > 20)
                ctrl.$setValidity('isBlank', !isBlank)
                ctrl.$setValidity('invalidChars', !invalidChars)
                ctrl.$setValidity('invalidLen', !invalidLen)
                scope.usernameGood = !isBlank && !invalidChars && !invalidLen
            })
		}
}})

.directive('validEmail', function (){
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function (viewValue) {
            // Any way to read the results of a "required" angular validator here?
            var isBlank = viewValue === ''
            var invalid = !isBlank && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(viewValue)
            ctrl.$setValidity('isBlank', !isBlank)
            ctrl.$setValidity('invalid', !invalid)
            scope.emailGood = !isBlank && !invalid
        	})
		}
}})

.directive('validPhone', function (){
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function (viewValue) {
	        // Any way to read the results of a "required" angular validator here?
	        var invalidChars = !/^[0-9]+$/.test(viewValue)
	        var invalidLen = !invalidChars && (viewValue.length !== 10)
	        ctrl.$setValidity('invalidChars', !invalidChars)
	        ctrl.$setValidity('invalidLen', !invalidLen)
	        scope.phoneGood = !invalidChars && !invalidLen
    		})
		}
}})

.directive('validMessage', function (){
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function (viewValue) {
		    // Any way to read the results of a "required" angular validator here?
		    var isBlank = viewValue === ''
		    ctrl.$setValidity('isBlank', !isBlank)
		    scope.messageGood = !isBlank 
			})
		}
}});
