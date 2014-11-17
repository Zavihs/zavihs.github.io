'use strict';

/* Directives */


angular.module('myApp.directives', [])

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
