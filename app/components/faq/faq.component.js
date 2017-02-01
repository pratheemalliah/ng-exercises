(function (angular) {
  'use strict';

  var faqComponent = {
    bindings: {
      tags:'@'
    },
    controller: 'FaqController',
    controllerAs: 'vm',
    templateUrl: 'app/components/faq/faq.component.tpl.html'
  };

  angular.module('myApp.components.faq', [])
    .component('frequentlyAskedQuestions', faqComponent); // frequently-asked-questions

})(window.angular);
