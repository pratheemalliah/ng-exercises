(function (angular, lodash, moment) {
  "use strict";

  function featureToggleParser($log) {

    // --===--- PRIVATE METHODS --===--

    function _parseBoolean(bool) {
      bool = bool === undefined ? false : bool.toString().toLowerCase();
      if (lodash.includes(['true', 'on', '1', 'yes'], bool)) {
        bool = true;
      } else if (lodash.includes(['false', 'off', '0', 'no'], bool)) {
        bool = false;
      } else {
        bool = undefined;
      }
      return bool;
    }

    function _parseDate(date) {
      var result = undefined;
      try {
        date = moment(date);
        if (date.isValid) {
          result = date;
        }
      } catch (e) {
      } // swallow the exception
      return result;
    }

    function _getJson(jsonData) {

      if (lodash.isEmpty(jsonData) ||
          lodash.isArray(jsonData) ||
          lodash.isNumber(jsonData) ||
          lodash.isBoolean(jsonData) ||
          !lodash.includes(['string','object'],typeof jsonData ) ) {
        return {};
      }

      var data = angular.copy(jsonData);

      if (typeof data === 'string') {
        try {
          data = angular.fromJson(data);
        } catch (e) {
          $log.error('invalid json input', jsonData);
          data = {};
        }
      }

      return data;
    }

    // --===-- Public Methods --===--


    function parseToggleObject(newToggles) {

      var toggles = _getJson(newToggles);

      if (lodash.isEmpty(toggles)) {
        return {};
      }

      // iterate each level of properties within toggles object
      // if (level.hasOwnProperty('enabled')

      Object.keys(toggles).forEach(function (key) {

        var value = toggles[key];

        if (!lodash.isEmpty(value.toString())) {

          var bln = _parseBoolean(value);
          if (bln !== undefined) { // toggle is a boolean

            value = bln;

          }
          else if (lodash.isString(value)) { // date string ?

            value = _parseDate(value);

          }
          else if (lodash.isDate(value) || value._isAMomentObject) { // date object ?

            value = moment(value);

          }
          else { // object: {

            value = parseToggleObject(value);

          }

          if (!lodash.isEmpty(value) || lodash.isBoolean(value)) {
            toggles[key] = value;
          } else {
            delete toggles[key];
          }

        }
      });

      return toggles;
    }

    function parseConfigObject(newConfig) {
      var config = lodash.merge({},newConfig);
      if (angular.isDefined(config.enableDates)) {
        config.enableDates = _parseBoolean(config.enableDates) || false;
      }
      return config;
    }


    // --===--  factory API --===--

    $log.log('featureToggleParser is initialized');

    return {

      parseToggleObject: parseToggleObject,
      parseConfigObject: parseConfigObject

    };


  }

  angular.module('myApp.utilities')
      .factory('featureToggleParser', ['$log', featureToggleParser]);


})(window.angular, window._, window.moment);