(function () {
  'use strict';

    angular
        .module('portal')
        .factory('DataService', dataService);

    dataService.$inject = ['$state', '$q','APIService','localStorageService'];
    function dataService($state, $q, APIService,localStorageService) {
        var service = {
            getUserDetails: currentUser,
            applyLoan:applyLoan,
            loanApplied: loanApplied,
            getLoanDetails:getLoanDetails
        };

        return service;



        function currentUser () {
            
            var deferred = $q.defer();
           
            var userDetails = localStorageService.get('userDetails');
            
            if(userDetails)
                deferred.resolve(userDetails);
            else
                deferred.reject(null);
            
            return deferred.promise;
        }

        function applyLoan() {

            $state.go('loanApply');
        
        }

        function loanApplied(loanDetails) {
            var deferred = $q.defer();
            
            var userDetails = localStorageService.get("userDetails");
            loanDetails.email = userDetails.email;
            
            APIService.applyLoanWithDetails(loanDetails).then(function(response) {
                deferred.resolve(response);
            }).catch(function(err) {
                deferred.reject(err);
            })
            
            return deferred.promise;
        }

        function getLoanDetails() {
            
            var deferred = $q.defer();
            var userDetails = localStorageService.get("userDetails");

            APIService.getLoanDetails(userDetails.email).then(function(response) {
                deferred.resolve(response);
            }).catch(function(err) {
                deferred.resolve(null);
            })
            
            return deferred.promise;
        }
    }
})();
