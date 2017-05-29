
(function () {
    'use strict';

    angular
        .module('portal')
        .controller('loanController', loanController);

    loanController.$inject = ['$rootScope','$scope','toastr','DataService','$state','$stateParams'];
    function loanController($rootScope ,$scope,toastr,DataService,$state,$stateParams) {

        var loanControllerVm = this;

        loanControllerVm.yearGenerator = numberObjectReurn(25);
        loanControllerVm.monthGenerator = numberObjectReurn(11);
        loanControllerVm.loanDetailsEdit = ($stateParams.loanDetails == null) ? false:true;
        loanControllerVm.loan = ($stateParams.loanDetails == null) ? '':$stateParams.loanDetails;
        loanControllerVm.dataLoading =false;
        loanControllerVm.applyLoan = applyLoan;

        /** Private function Not exposed outside **/
        function numberObjectReurn(length) {
            
            var jsonObj = [];
            for(var i=1;i<=length;i++)
                jsonObj.push(i);
            
            return jsonObj;
        }

        function applyLoan() {

            DataService.loanApplied(loanControllerVm.loan).then(function(response){
                toastr.success("Successfully Applied Loan", "Success");
                $state.go('profile');
            }).catch(function(err) {
                toastr.error(err,"Error");
            })
        }
    }

})();
