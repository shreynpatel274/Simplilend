(function() {
    'use strict';

    angular
        .module('portal')
        .factory('Auth', Auth);

    Auth.$inject = ['$state', '$rootScope', '$q', 'Principal','APIService','localStorageService'];

    function Auth ($state, $rootScope, $q, Principal,APIService,localStorageService) {
        var service = {
            authorize: authorize,
            createAccount: createAccount,
            login: login,
            logout:logout
        };

        return service;

        function authorize (force) {
            var authReturn = Principal.identity(force).then(authThen);

            return authReturn;

            function authThen() {
                var isAuthenticated = Principal.isAuthenticated();
            
                // an authenticated user can't access to login and register pages
                if (isAuthenticated && ($rootScope.toState.name === 'login')) {
                  $state.go('profile');
                }

                // recover and clear previousState after external login redirect (e.g. oauth2)
                if (isAuthenticated && !$rootScope.fromState.name && getPreviousState()) {
                  var previousState = getPreviousState();
                  resetPreviousState();
                  $state.go(previousState.name, previousState.params);
                }
            
                if ((!isAuthenticated) && !($rootScope.toState.name === 'login')) {
              
                    // user is not authenticated. store the state they wanted before you
                    // send them to the login service, so you can return them when you're done
                    storePreviousState($rootScope.toState.name, $rootScope.toStateParams);

                    // now, send them to the signin state so they can log in
                    $state.go('login');
                }
            }
        }

        function createAccount (account) {
          
            var deferred = $q.defer();
            APIService.register(account).then(function(response){
                
                deferred.resolve(response);
            }).catch(function(err){
                deferred.reject(err);
            })
            
            return deferred.promise;
        }

        function login (credentials) {

            var deferred = $q.defer();

            var authDetails = {email: credentials.username, password: credentials.password};
            APIService.login(authDetails).then(function(response){
                
                var jsonObj = {
                    "email" : response.email,
                    "name" : response.name,
                    "mobile" : response.mobile
                };
                localStorageService.set("userDetails", jsonObj);
                Principal.identity(true).then(function(account) {
                    deferred.resolve(response);
                }).catch(function(err) {
                    deferred.reject(err);
                })
            }).catch(function(err){
                deferred.reject(err);
            })
            
            return deferred.promise;
        }

        function logout (authority) {
            localStorageService.clearAll();
            Principal.authenticate(null);
        }

        function getPreviousState() {
            var previousState = localStorageService.get('previousState');
            return previousState;
        }

        function resetPreviousState() {
            localStorageService.remove('previousState');
        }

        function storePreviousState(previousStateName, previousStateParams) {
            var previousState = { "name": previousStateName, "params": previousStateParams };
            localStorageService.set('previousState', previousState)
        }
    }
})();
