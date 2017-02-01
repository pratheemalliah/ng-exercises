(function(angular){
  'use strict';

  function customizeFaqPaginationDirective($timeout, $compile) {
    return {
      restrict: 'A',
      link: function (scope, elm, attrs) {

      function bindClickEvent(){
          var liArray = elm.find('.pagination li');
          
            angular.forEach(liArray, function(liElm, key){
                liElm.firstElementChild.setAttribute("bring-in-viewport", "");
                liElm.firstElementChild.setAttribute("sticky-element-selector", "#navBar");
                $compile(liElm.firstElementChild)(scope);     
            });
        }

        $timeout(bindClickEvent,1000);
        
      }
    };
  }

  customizeFaqPaginationDirective.$inject = ['$timeout', '$compile'];

  angular.module('myApp.components.faq')
    .directive('customizeFaqPagination', customizeFaqPaginationDirective);

})(window.angular);

