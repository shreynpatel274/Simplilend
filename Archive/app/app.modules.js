(function() {
  'use strict';

  angular
    .module('portal', [
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'portal.constants',
      'LocalStorageModule'
    ])
    .run(run);

  run.$inject = ['stateHandler'];

  function run(stateHandler) {
    stateHandler.initialize();
    
  }
})();
