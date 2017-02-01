(function (angular, lodash) {
  "use strict";

  function featureToggleService($log, $location, $http, featureToggleParser, API_URLS, DEFAULT_FEATURE_TOGGLE_SETTINGS, MINIMUM_FEATURE_TOGGLE_CONFIG) {

    var svc = this;

    var enableAllPath = 'hosts.' + $location.host() + '.enableAll';
    var disableAllPath = 'hosts.' + $location.host() + '.disableAll';

    // --===--- PRIVATE METHODS --===--

    function _allIsEnabledForHost() {
      return lodash.get(_config, enableAllPath) || false;
    }

    function _allIsDisabledForHost() {
      return lodash.get(_config, disableAllPath) || false;
    }

    function _isEnabledBeforeToday(toggle) {

      return _config.enableDates === true && !lodash.isEmpty(toggle.enableAfterDate) && // enableAfterDate is an optional property
          toggle.enableAfterDate.isBefore(moment()); // if the prop exists it will be a moment object
    }


    // --===-- Public Methods --===--

    function isEnabled(path) {
      var toggle = svc.getToggleByPath(path);

      if (angular.isUndefined(toggle)) {
        // missing or unknown toggle paths are considered 'off'|'False'
        return false;
      }
      if (_allIsDisabledForHost()) {
        return false;
      }
      if (_allIsEnabledForHost()) {
        return true;
      }
      return toggle === true ||    // property is a boolean
          toggle.enabled === true || // property is an object with a boolean sub-property
          _isEnabledBeforeToday(toggle); // property is a date or an object with a date that is past.
    }


    // --===-- Accessors to Read from Service Config --===--

    function getConfig() {
      return angular.copy(_config);
    }

    function getToggles() {
      return angular.copy(_toggles);
    }

    function getToggleByPath(path) {
      return lodash.get(_toggles, path);
    }


    // --===-- Accessors to Write to Service config --===--

    function setConfig(newConfig) {
      _config = lodash.merge({}, MINIMUM_FEATURE_TOGGLE_CONFIG, featureToggleParser.parseConfigObject(newConfig));
    }

    function setToggles(toggles) {
      _toggles = lodash.merge({}, featureToggleParser.parseToggleObject(toggles));
    }


    function configure(json) {

      var data = json;
      if (angular.isString(json)) {
        try {
          data = angular.fromJson(json);
        } catch (e) {
          $log.error('invalid json argument', json, e);
          data = {};
        }
      }

      if (!lodash.isEmpty(data)) {
        svc.setConfig(data.config);
        svc.setToggles(data.toggles);
      }
    }


    function updateConfig(config) {
      _config = lodash.merge({}, MINIMUM_FEATURE_TOGGLE_CONFIG, _config, config);
    }

    function updateToggles(toggles) {
      lodash.merge(_toggles, featureToggleParser.parseToggleObject(toggles));
    }


    function loadToggles() {
      var url = API_URLS.featureToggles;
      if (!lodash.isEmpty(url)) {
        // no caching used in case we want to update toggles
        return $http.get(url).then(function (response) {
            svc.configure(response.data);
        });
      }
    }


    // --===--  Private properties --===--

    var _toggles, _config;

    // --===--  Service API --===--

    // get a single (nested) toggle option by path, or false 'undefined' if not found
    svc.getToggleByPath = getToggleByPath;


    // return a copy (not a reference) of internal data
    svc.getConfig = getConfig;
    svc.getToggles = getToggles;

    // replace current settings with new settings
    svc.setConfig = setConfig;
    svc.setToggles = setToggles;

    // set both config and toggles in one call
    svc.configure = configure;


    // merge/update settings with more/modified setting values
    svc.updateConfig = updateConfig;
    svc.updateToggles = updateToggles;

    // replace existing toggles with whatever is returned from API call.
    svc.loadTogglesFromWebAPI = loadToggles;


    // --===-- Query Toggles --===--

    svc.isEnabled = isEnabled;


    // --===--  Initialize Local Data --===--
    svc.configure(DEFAULT_FEATURE_TOGGLE_SETTINGS);

    $log.log('featureToggleService is initialized');

  }

  featureToggleService.$inject = [
    '$log',
    '$location',
    '$http',
    'featureToggleParser',
    'API_URLS',
    'DEFAULT_FEATURE_TOGGLE_SETTINGS',
    'MINIMUM_FEATURE_TOGGLE_CONFIG'
  ];

  angular.module('myApp.services',['myApp.utilities'])
      .service('featureToggleService', featureToggleService)

      .constant('MINIMUM_FEATURE_TOGGLE_CONFIG', {
        enableDates: false,  // toggle config must have 'enableDates' property
        hosts: {}            // toggle config must have 'hosts' property
      })

      .constant('DEFAULT_FEATURE_TOGGLE_SETTINGS', {
        config: {
          enableDates: true, // auto enable after toggle dates (if given)
          hosts: {
            localhost: {
              enableAll: false,
              disableAll: false // disableAll takes precedence over enableAll
            }
          }
        },
        toggles: {}

      });

})(window.angular, window._);