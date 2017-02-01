(function (angular){
  'use strict';

  function faqController($scope, $log, productService) {
    /* jshint validthis: true */
    var vm = this; // eslint-disable-line consistent-this

    $log.log('Faq Controller is initializing ' + $scope.$id);

    // get FAQs from AEM using /bin/faqs servlet call 
    function getFAQData(){
      productService.getFAQData(vm.tags).then(function (response) {
        if(response.data.QuestionsAnswrs){
          vm.QuestionsAnwsList = response.data.QuestionsAnswrs.MyListQuens;
        }
        vm.faqsPerPage = parseInt(response.data.faqsPerPage);
      });
    }

    getFAQData();
  }

  faqController.$inject = ['$scope', '$log', 'productService'];

  angular.module('myApp.components.faq')
    .controller('FaqController',faqController);

})(window.angular);
