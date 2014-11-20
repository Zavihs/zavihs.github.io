'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'infinite-scroll',
  'ngCookies',
  'ngAnimate'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {templateUrl: 'partials/index.html', controller: 'indexCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'aboutCtrl'});
  $routeProvider.when('/blog', {templateUrl: 'partials/blog.html', controller: 'blogCtrl'});
  $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'contactCtrl'});
  $routeProvider.when('/photo', {templateUrl: 'partials/photo.html', controller: 'photoCtrl'});   
  $routeProvider.when('/testimonials', {templateUrl: 'partials/testimonials.html', controller: 'testimonialsCtrl'});
  $routeProvider.when('/blog/1', {templateUrl: 'partials/blog1.html', controller: 'blogCtrl'});
  $routeProvider.when('/blog/2', {templateUrl: 'partials/blog2.html', controller: 'blogCtrl'});
  $routeProvider.when('/blog/3', {templateUrl: 'partials/blog3.html', controller: 'blogCtrl'});
  $routeProvider.when('/blog/4', {templateUrl: 'partials/blog4.html', controller: 'blogCtrl'});
  $routeProvider.otherwise({redirectTo: '/about'});
}]);

