(function () {
    'use strict';

    angular
        .module('portal')
        .controller('profileController', profileController);

    profileController.$inject = ['DataService','userData','loanDetails','Auth','$state'];
    function profileController( DataService,userData,loanDetails,Auth,$state) {

        var profileControllerVm = this;

        /* methods that are exposed outside*/

        profileControllerVm.logout = logout;
        profileControllerVm.applyLoan = applyLoan;
        profileControllerVm.showButton = (loanDetails==null) ? true : false;
        profileControllerVm.loanDetails = loanDetails;
        profileControllerVm.edit = edit;

        /* Methods that are invoked on start of the controller*/

        function logout() {

          Auth.logout();
          $state.go('login');
        }

        function applyLoan() {

          DataService.applyLoan();
        }

        function edit() {
            $state.go('loanApply',{loanDetails: profileControllerVm.loanDetails});
        }
        
    }
})();
