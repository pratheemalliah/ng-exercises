(function (angular) {
  'use strict';

  angular.module('myApp', [
    'ui.router',

    'myApp.common',
    'myApp.utilities',
    'myApp.services',

    'myApp.components.romanNumbers',
    'myApp.components.version',
    'myApp.components.faq'

  ])

      .config(['$locationProvider', '$urlRouterProvider', function ($locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/view1');

      }]);

})(window.angular);
