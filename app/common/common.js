(function (angular) {
  'use strict';

  angular.module('myApp.common', [])

      .constant('API_URLS', {
        featureToggles: 'my.domain.com/featureToggleSettings',
        logging: 'my.domain.com/loggingService'
      });

})(window.angular);
