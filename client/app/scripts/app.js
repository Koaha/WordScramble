'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider,$httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/gameplay',{
        templateUrl: 'views/gameplay.html',
        controller: 'GameplayCtrl',
        controllerAs: 'gameplayCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    /*
    $httpProvider.defaults.transformRequest = function(data){
      if (data === undefined) {
        return data;
      }
      return $.param(data);

    }
    */
  });
