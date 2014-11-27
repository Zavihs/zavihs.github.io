'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('indexCtrl', ['$scope', '$location', '$cookieStore', 'ScrollToTopService', function($scope, $location, $cookieStore, ScrollToTopService) {
  $scope.chinese = $cookieStore.get('Language')
  $scope.saveSetting = function(){
    $cookieStore.put('Language', $scope.chinese);
  }

  $scope.isActive = function (viewLocation) { 
        return ((viewLocation === $location.path()) || (viewLocation === ($location.path()).split('/')[1]));
    }

    $scope.scrollToTop = function (){
    ScrollToTopService();
  }
 
}])

.controller('aboutCtrl', ['$scope', '$location', 'anchorSmoothScroll', 'TabSelectService', function($scope, $location, anchorSmoothScroll, TabSelectService) {  
  $scope.gotoElement = function (eID){
      anchorSmoothScroll.scrollTo(eID);   
    };

    $scope.SelectTabs = function (){
      TabSelectionService();
    }

    $('#sidebar').affix({
        offset: {
          top: 100
        }
    });

    var $body   = $(document.body);
    var navHeight = $('.navbar').outerHeight(true) + 10;

    $body.scrollspy({
        target: '#leftCol',
        offset: navHeight
    });

}])

.controller('blogCtrl', ['$scope', '$http', function($scope,$http) {
  $scope.items = [];
  $http.get('data/blogentries.json').
  success(function(data) {
    $scope.items = data;
  }).
  error(function(data, status, headers, config) {
    console.log("Error getting Blog json data, this should not happen unless its been deleted")
  });


}])

.controller('blogTemplateCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

    $scope.blogs = [];
    $http.get('data/blogentries.json').
    success(function(data) {
        $scope.blogs = data;
        $scope.result = $scope.blogs[($routeParams.blogId)-1];
        $scope.count = $scope.blogs.length;
        //if trying to access a blog url without an entry, redirect to blog main page
        if ($routeParams.blogId > $scope.blogs.length){
          $location.path('/blog');
        }
        $scope.blogid = Number($routeParams.blogId);
    }).
    error(function(data, status, headers, config) {
        console.log("Error getting Blog entries json data, this should not happen unless its been deleted")
    });


}])

.controller('contactCtrl', ['$scope','$http', function($scope, $http) {
  $scope.formAllGood = function () {
    return ($scope.usernameGood && $scope.emailGood && $scope.messageGood)
  }

  //The code below and php was created using example here http://www.chaosm.net/blog/2014/05/21/angularjs-contact-form-with-bootstrap-and-phpmailer/
  $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, phone, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted

    $scope.submit = function() {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
            $http({
                method  : 'POST',
                url     : 'http://localhost:8000/app/data/contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                crossDomain: true,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
                }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        }  
   
}])

.controller('photoCtrl', ['$scope',  '$http', '$location','anchorSmoothScroll', function($scope, $http, $location, anchorSmoothScroll) {
  $scope.items = [];
  $http.get('data/photo.json').
  success(function(data) {
    $scope.items = data;
  }).
  error(function(data, status, headers, config) {
    console.log("Error getting Photo json data, this should not happen unless its been deleted")
  });


  var limitStep = 3;
  $scope.limit = limitStep;
  $scope.incrementLimit = function() {
    $scope.limit += limitStep;
  };

  $scope.LimitNotReached = function() {
    return ($scope.limit < $scope.items.length) ? true :false;
  }

  $scope.gotoElement = function (eID){
        anchorSmoothScroll.scrollTo(eID, 30); 
     };

}])

.controller('testimonialsCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.items = [];
  $http.get('data/testimonials.json').
  success(function(data) {
    $scope.items = data;
  }).
  error(function(data, status, headers, config) {
    console.log("error getting Testimonials json data, this should not happen unless its been deleted")
  });

  var limitStep = 3;
  $scope.limit = limitStep;
  $scope.incrementLimit = function() {
    $scope.limit += limitStep;
  };

}])


