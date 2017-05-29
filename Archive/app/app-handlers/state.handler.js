(function() {
    'use strict';

    angular
        .module('portal')
        .factory('stateHandler', stateHandler);

    stateHandler.$inject = ['$rootScope', '$state', '$window', 'Principal', 'Auth'];

    function stateHandler($rootScope, $state, $window, Principal, Auth) {
        return {
            initialize: initialize
        };

        function initialize() {
          
            var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState) {
                
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                $rootScope.fromState = fromState;
                $rootScope.progress = true;

                // Redirect to a state with an external URL (http://stackoverflow.com/a/30221248/1098564)
                if (toState.external) {
                    event.preventDefault();
                    $window.open(toState.url, '_self');
                }

              if (Principal.isIdentityResolved()) {
                Auth.authorize();
              }

            });

            var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
              var titleKey = 'global.title' ;

                // Set the page title key to the one configured in state or use default one
                if (toState.data.pageTitle) {
                    titleKey = toState.data.pageTitle;
                    $rootScope.progress = false;
                }
                 $rootScope.progress = false;
            });

            $rootScope.$on('$destroy', function () {
                if(angular.isDefined(stateChangeStart) && stateChangeStart !== null){
                    stateChangeStart();
                }
                if(angular.isDefined(stateChangeSuccess) && stateChangeSuccess !== null){
                    stateChangeSuccess();
                }
            });
        }
    }
})();
