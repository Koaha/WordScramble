'use strict';

describe('Controller: GameplayCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var GameplayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameplayCtrl = $controller('GameplayCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GameplayCtrl.awesomeThings.length).toBe(3);
  });
});
