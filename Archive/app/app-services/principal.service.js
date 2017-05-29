(function() {
    'use strict';

    angular
        .module('portal')
        .factory('Principal', Principal);

    Principal.$inject = ['$q','DataService'];

    function Principal ($q,DataService) {
        var _identity,
            _authenticated = false;

        var service = {
            authenticate: authenticate,
            identity: identity,
            isAuthenticated: isAuthenticated,
            isIdentityResolved: isIdentityResolved
        };

        return service;

        function authenticate (identity) {
            _identity = identity;
            _authenticated = identity !== null;
        }

        function identity (force) {
            var deferred = $q.defer();

            if (force === true) {
                _identity = undefined;
            }

            // check and see if we have retrieved the identity data from the server.
            // if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // retrieve the identity data from the server, update the identity object, and then resolve.
          DataService.getUserDetails()
                .then(getUserThen)
                .catch(getUserCatch);

            return deferred.promise;

            function getUserThen (account) {
               _identity = account;
                _authenticated = true;
                deferred.resolve(_identity);
            }

            function getUserCatch () {
                 _identity = null;
                _authenticated = false;
                deferred.resolve(_identity);
            }
        }

        function isAuthenticated () {
            return _authenticated;
        }

        function isIdentityResolved () {
           return angular.isDefined(_identity);
        }
    }
})();
