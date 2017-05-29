(function() {
  'use strict';

  angular
    .module('portal')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('profile', {
      parent: 'app',
      url: '/profile/:email',
      data: {
        pageTitle: 'Profile'
      },
      views: {
        'content@': {
          templateUrl: 'profile/profile.view.html',
          controller: 'profileController',
          controllerAs: 'profileControllerVm'

        }
      },
      DataService:"DataService",
      resolve:{
        userData : function(DataService) {
          return DataService.getUserDetails();
        },
        loanDetails : function(DataService) {
          return DataService.getLoanDetails();
        }
      }
    });
  }
})();
