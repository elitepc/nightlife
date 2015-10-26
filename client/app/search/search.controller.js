'use strict';

angular.module('nightlifeApp')
  .controller('SearchCtrl', function ($scope, $http) {

    $scope.errors = [];
    $scope.places = [];

    $scope.search = function(form){


      $http.get('/api/places/yelp/' + $scope.city.replace(" ", "+")).then(function(data) {

        $scope.places = data.data.businesses;
        console.log($scope.places);
      },
      function(error){
        $scope.errors.push(error.data);
      });


    }

  });
