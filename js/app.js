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
  $routeProvider.when('/blog/:blogId', {templateUrl: 'partials/blogtemplate.html', controller: 'blogTemplateCtrl'});
  $routeProvider.otherwise({redirectTo: '/about'});
}]);

