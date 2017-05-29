(function() {
  'use strict';

  angular
    .module('portal')
    .config(stateConfig)
    .config(toastConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('app', {
      abstract: true,
      views: {
        
      },
      resolve: {
        authorize: ['Auth',
          function (Auth) {
            return Auth.authorize();
          }
        ]
      }
    });
  }
  function toastConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: true,
      containerId: 'toast-container',
      maxOpened: 1,
      newestOnTop: true,
      positionClass: 'toast-top-full-width',
      preventDuplicates: false,
      preventOpenDuplicates: true,
      target: 'body'
    })
  };
})();
