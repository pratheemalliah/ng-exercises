(function (angular) {
  'use strict';

  angular.module('myApp.components.version.version-directive', [])

      .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
          elm.text(version);
        };
      }]);

})(window.angular);