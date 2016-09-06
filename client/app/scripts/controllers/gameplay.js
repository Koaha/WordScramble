'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:GameplayCtrl
 * @description
 * # GameplayCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('GameplayCtrl', function ($scope,$http,$log) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.showdetail = false;

    $scope.giveup = function(){
      this.word = "";
      $http.get('app/giveup')
        .success(function (data){
          var resultList = [];
          for (var item in data) {
            resultList.push(data[item]);
          }
          $scope.showdetail = true;
          $scope.foundList = $scope.acceptedList;
          $scope.missingList = getMissingList($scope.foundList,resultList);
          doGetNewGame();
        })
        .error(function (error){
          $log.debug(error);
        });
    };
    $scope.keyPress = function(e){
      if (this.word === undefined){
        this.word = '';
      }
      switch (e.keyCode){
        case 8: // backspace button
          break;
        case 13: // enter button
          if (!isContain(this.word,$scope.acceptedList))
          {
            $http.post('app/submit',{"word":this.word,"count":this.acceptedList.length})
              .success(function(data) {
                if (data !== "-1") {
                  $scope.acceptedList.push($scope.word);
                }
                if (data === "1"){
                  doGetNewGame();
                }
                $log.debug($scope.acceptedList);
              });
          }
          else{
            $log.debug("ALREADY HAVE");
          }
          break;
        default:
          if (checkExist(e.key,$scope.charList)){
            this.word += e.key.toLowerCase();
            $scope.charList=
              getRemainingList(e.key,$scope.charList);
          }
          break;
      }

    };
    $scope.keyDown = function(e){
      if (e.keyCode === 8 && this.word !== undefined && this.word.length >0){
        $scope.charList.push(this.word[this.word.length-1]);
        this.word = this.word.slice(0,-1);
      }

    };

    function doGetNewGame(){
      $http({
        method: 'GET',
        url: 'app/getword'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.charList = shuffle(response.data);
        $scope.acceptedList = [];
        $scope.word = "";
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $log(response);
      });

    }

    doGetNewGame();
  });
