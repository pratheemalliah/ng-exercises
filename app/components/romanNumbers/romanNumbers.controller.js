(function (angular) {


  function RomanNumbersController(romanNumeralTranslatorService) {

    var vm = this;

    function validate($event) {

      if ($event.key < "0" || $event.key > "9") {
        $event.preventDefault();
      } else {
        console.log($event);
      }
    }

    function translate() {
      if (_.isEmpty(vm.decimalInteger)) {
        vm.romanInteger = '';
      } else {
        try {
          vm.romanInteger = romanNumeralTranslatorService.translate(vm.decimalInteger);
        } catch (e) {
          vm.decimalInteger = vm.decimalInteger.slice(0, -1);
          console.log(e);
        }
      }
    }

    vm.decimalInteger = '';
    vm.romanInteger = '';

    vm.translate = translate;
    vm.validate = validate;

  }

  RomanNumbersController.$inject = ['romanNumeralTranslatorService'];

  angular.module('myApp.components.romanNumbers')
      .controller('RomanNumbersController', RomanNumbersController);

})(window.angular);