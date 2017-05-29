(function() {
  'use strict';

  angular
    .module('portal')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('loanApply', {
        parent: 'app',
        url: '/loanApply',
        data: {
            pageTitle: 'Loan'
        },
        params : {
            loanDetails : null
        },
        views: {
            'content@': {
                templateUrl: 'loan/loan.view.html',
                controller: 'loanController',
                controllerAs: 'loanControllerVm'
            }
        }
    });
  }
})();
