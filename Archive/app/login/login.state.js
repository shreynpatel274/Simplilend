(function() {
  'use strict';

  angular
    .module('portal')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('login', {
      parent: 'app',
      url: '/',
      data: {
        pageTitle: 'Login'
      },
      views: {
        'content@': {
          templateUrl: 'login/login.view.html',
          controller: 'loginController',
          controllerAs: 'loginControllerVm'
        }
      }
    });
  }
})();
