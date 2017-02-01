(function (angular) {
  'use strict';

  var romanNumbersComponent = {
    bindings: {},
    controller: 'RomanNumbersController',
    controllerAs: 'vm',
    templateUrl: 'components/romanNumbers/romanNumbers.tpl.html'
  };

  angular.module('myApp.components.romanNumbers', [])
      .component('romanNumbers', romanNumbersComponent);

})(window.angular);