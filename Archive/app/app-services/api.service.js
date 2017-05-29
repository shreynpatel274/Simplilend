(function () {
    'use strict';

    angular
        .module('portal')
        .factory('APIService', APIService);

    APIService.$inject = ['$http','CONSTANTS','$q'];
    function APIService($http,CONSTANTS,$q) {
        var service = {

            login : login,
            register:register,
            applyLoanWithDetails:applyLoanWithDetails,
            getLoanDetails:getLoanDetails 
        };

        return service;

        function login(authDetails)  {
            var _deferred = $q.defer();   
            var method = "POST";
            var req =  {
                method : method,
                url :CONSTANTS.API_CONFIG.BASE_URL+'/'+CONSTANTS.API_CONFIG.ENVIRONMENT+'/'+CONSTANTS.API_CONFIG.AUTH,
                data : angular.toJson(authDetails),
                headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
                }
            }
            $http(req).then(function(response){
                if(response.data.statusCode == 200) {
                    _deferred.resolve(response.data);
                } else if(response.data.statusCode == 404){
                    _deferred.reject("User name or password doesnt match");
                } else {
                    _deferred.reject("Error while retrieving data");
                }

            }).catch(function(err){
                
                _deferred.reject(err);
            })
            return _deferred.promise;
        }

        function register(user)  {
            
            var _deferred = $q.defer();
            var method = "POST";
            var req =  {
                method : method,
                url :CONSTANTS.API_CONFIG.BASE_URL+'/'+CONSTANTS.API_CONFIG.ENVIRONMENT+'/'+CONSTANTS.API_CONFIG.CREATE_USER,
                
                data : angular.toJson(user),
                headers : {
                'Content-Type' : 'application/json'
                }
            }

            $http(req).then(function(response){
                if(response.status==200)
                {
                    _deferred.resolve(response.data);
                }
            }).catch(function(err){
                
                _deferred.reject(err);
            })
            return _deferred.promise;
        }
        function applyLoanWithDetails(loanDetails) {

            var _deferred = $q.defer();
            var method = "POST";
            var req =  {
                method : method,
                url :CONSTANTS.API_CONFIG.BASE_URL+'/'+CONSTANTS.API_CONFIG.ENVIRONMENT+'/'+CONSTANTS.API_CONFIG.LOAN,
                
                data : angular.toJson(loanDetails),
                headers : {
                'Content-Type' : 'application/json'
                }
            }

            $http(req).then(function(response){
                if(response.data.statusCode == 200) {
                    _deferred.resolve(response.data);
                } else(response.data.statusCode == 404)
                    _deferred.reject("Loan Already Applied");
                
            }).catch(function(err){
                
                _deferred.reject(err);
            })
            return _deferred.promise;
        }
        function getLoanDetails(email) {

            var _deferred = $q.defer();
            var method = "GET";
            var req =  {
                method : method,
                url :CONSTANTS.API_CONFIG.BASE_URL+'/'+CONSTANTS.API_CONFIG.ENVIRONMENT+'/'+CONSTANTS.API_CONFIG.LOAN+'?id='+email,
                
                data : angular.toJson(null),
                headers : {
                'Content-Type' : 'application/json',
                'Accept' :  'application/json'
                }
            }

            $http(req).then(function(response){
                if(response.data.statusCode == 200) {
                    _deferred.resolve(response.data);
                } else(response.data.statusCode == 404)
                    _deferred.reject("Loan Already Applied");
                
            }).catch(function(err){
                
                _deferred.reject(err);
            })
            return _deferred.promise;
        }
    }
})();