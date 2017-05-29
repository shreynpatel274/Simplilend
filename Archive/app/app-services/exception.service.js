(function () {
  'use strict';

  

  angular
    .module('portal')
    .factory('$exceptionHandler', $exceptionHandler);

  $exceptionHandler.$inject = ['$injector','CONSTANTS'];

  function $exceptionHandler($injector,CONSTANTS)
  {
      return function(exception, cause)  {
        var http = $injector.get('$http');
        console.log(exception);
    };
  }

})();
