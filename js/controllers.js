'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('indexCtrl', ['$scope', '$location', '$cookieStore', function($scope, $location, $cookieStore) {
  $scope.chinese = $cookieStore.get('Language')
  $scope.saveSetting = function(){
    $cookieStore.put('Language', $scope.chinese)
  }

     $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
 
}])

.controller('aboutCtrl', ['$scope', '$location', 'anchorSmoothScroll', 'ScrollToTopService',  function($scope, $location, anchorSmoothScroll, ScrollToTopService) {  
  $scope.gotoElement = function (eID){

      anchorSmoothScroll.scrollTo(eID);   
    };

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

  $scope.scrollToTop = function (){
    ScrollToTopService();
  }

    $(function(){ 
    $('.nav-tabs a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });  
  });

}])

.controller('blogCtrl', ['$scope', '$http', 'ScrollToTopService',function($scope,$http, ScrollToTopService) {
  $scope.items = [];
  $http.get('data/blog.json').
  success(function(data) {
    $scope.items = data;
  }).
  error(function(data, status, headers, config) {
    console.log("error getting blog json data")
  });

  $scope.scrollToTop = function (){
    ScrollToTopService();
  }

  $('.pagination .disabled a, .pagination .active a').on('click', function(e) {
    e.preventDefault();
});
}])

.controller('contactCtrl', ['$scope', 'ScrollToTopService', '$http', function($scope, ScrollToTopService, $http) {
  $scope.formAllGood = function () {

    return ($scope.usernameGood && $scope.emailGood && $scope.messageGood)
  }


  $scope.scrollToTop = function (){
    ScrollToTopService();
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

.controller('photoCtrl', ['$scope',  '$http', '$location','anchorSmoothScroll', 'ScrollToTopService', function($scope, $http, $location, anchorSmoothScroll, ScrollToTopService) {
  $scope.items = [];
  $http.get('data/photo.json').
  success(function(data) {
    $scope.items = data;
  }).
  error(function(data, status, headers, config) {
    console.log("error getting photo json data")
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

  $scope.scrollToTop = function (){
    ScrollToTopService();
  }



}])

.controller('testimonialsCtrl', ['$scope', '$http', 'ScrollToTopService', function($scope, $http, ScrollToTopService) {

  $scope.items = [];
  $http.get('data/testimonials.json').
  success(function(data) {
    $scope.items = data;
  }).
  error(function(data, status, headers, config) {
    console.log("error getting testimonials json data")
  });

  var limitStep = 3;
  $scope.limit = limitStep;
  $scope.incrementLimit = function() {
    $scope.limit += limitStep;
  };

  $scope.scrollToTop = function (){
    ScrollToTopService();
  }
}])


