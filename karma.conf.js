//jshint strict: false
module.exports = function (config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/lodash/dist/lodash.js',
      'bower_components/moment/moment.js',

      'components/**/*.component.js',

      'components/**/*.js',

      'utilities/*.js',
      'utilities/**/*.js',
      'services/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'jasmine-matchers', 'sinon'],

    browsers: ['Chrome'],

    // plugins: [
    //   'karma-chrome-launcher',
    //   'karma-firefox-launcher',
    //   'karma-jasmine',
    //   'karma-junit-reporter',
    //   'karma-spec-reporter'
    // ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'app/**/!(*.spec).js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'templates'
    },

    reporters: [
      //'progress',
      'spec',
      'coverage',
      //'html',
      //'kjhtml',
      'junit',
      'failed'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: false,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },

    coverageReporter: {
      type: 'html',
      dir: 'test-reports/coverage/',
      file: 'coverage.html'
    }

  });
};
