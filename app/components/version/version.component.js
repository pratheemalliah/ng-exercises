(function (angular) {

  'use strict';

  angular.module('myApp.components.version', [
    'myApp.components.version.interpolate-filter',
    'myApp.components.version.version-directive'
  ])

      .value('version', '0.1');

})(window.angular);