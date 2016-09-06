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

    $scope.giveup = function(){
      $http.get('app/giveup')
        .success(function (data, status, headers, config){
          $log.debug(data);
          $http.get('app/getword')
            .success(function (data){
              $scope.charList = shuffle(data);
              $log.debug(data);
            })
            .error(function (error){
              $log.debug(error)
            })
        })
        .error(function (error){
          $log.debug(error)
        })
    }

    $scope.keyPress = function(e){
      if (this.word === undefined){
        this.word = '';
      }
      switch (e.keyCode){
        case 8: // backspace button
          break;
        case 13: // enter button
          $http.post('app/submit',{word:this.word})
            .success(function(data) {
              $log.debug(data);
            });
          break;
        default:
          if (checkExist(e.key,$scope.charList)){
            this.word += e.key;
            $scope.charList=
              getRemainingList(e.key,$scope.charList);
          }
          break;
      }

    };
    $scope.keyDown = function(e){
      if (e.keyCode === 8 && this.word !== undefined
        && this.word.length >0){
        $scope.charList.push(this.word[this.word.length-1]);
        this.word = this.word.slice(0,-1);
      }

    };

    $http({
      method: 'GET',
      url: 'app/getword'
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.charList = shuffle(response.data);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      $log(response)
    });


  })

function shuffle(str){
    var charList = str.split('');
    for(var i= charList.length-1;i>0;--i){
      var j = Math.floor(Math.random()*(i+1));
      var temp = charList[i];
      charList[i] = charList[j];
      charList[j] = temp;
    }
    return charList;
}

function checkExist(key,charList){
  for (var i in charList){
      if (key.toLowerCase()==charList[i])
        return true;
  }
  return false;
}

function getRemainingList(key,remainingList){
  var i = remainingList.indexOf(key);
  remainingList.splice(i,1);
  return remainingList;
}
