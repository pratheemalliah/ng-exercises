(function (angular) {
  'use strict';

  angular.module('myApp', [
    'ui.router',

    'myApp.utilities',
    'myApp.services',

    'myApp.components.romanNumbers',
    'myApp.components.version',
    'myApp.components.faq'

  ])

      .constant('API_URLS', {
        featureToggles: 'my.domain.com/featureToggleSettings',
        logging: 'my.domain.com/loggingService'
      })

      .config(['$locationProvider', '$urlRouterProvider', function ($locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/view1');

      }]);

})(window.angular);
