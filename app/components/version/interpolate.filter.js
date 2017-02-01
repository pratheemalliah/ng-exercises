(function (angular) {
  'use strict';

  angular.module('myApp.components.version.interpolate-filter', [])

      .filter('interpolate', ['version', function (version) {
        return function (text) {
          return String(text).replace(/\%VERSION\%/mg, version);
        };
      }]);

})(window.angular);
