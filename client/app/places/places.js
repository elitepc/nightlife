'use strict';

angular.module('nightlifeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/places', {
        templateUrl: 'app/places/places.html',
        controller: 'PlacesCtrl'
      });
  });
