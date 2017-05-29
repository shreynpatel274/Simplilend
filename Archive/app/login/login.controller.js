(function () {
    'use strict';

    angular
        .module('portal')
        .controller('loginController', loginController);

    loginController.$inject = ['$rootScope','$scope','Auth','toastr','$state'];
    function loginController($rootScope ,$scope,Auth,toastr,$state) {

        var loginControllerVm = this;
        loginControllerVm.dataLoading =false;
        loginControllerVm.signInFormShow = signInFormShow;
        loginControllerVm.signUpFormShow = signUpFormShow;
        loginControllerVm.signIn = false;
        loginControllerVm.signUp = true;
        loginControllerVm.login = login;

        loginControllerVm.register = register;

        function register() {
            loginControllerVm.dataLoading =true;
            var pureNumber = loginControllerVm.user.mobile.replace(/\D/g, "");
            var isValid = pureNumber.length >= 10 && loginControllerVm.user.mobile.match(/^[\(\)\s\-\+\d]{10,17}$/);
            if(isValid) {
                Auth.createAccount(loginControllerVm.user).then(function () {
                    loginControllerVm.authenticationError = false;
                    loginControllerVm.dataLoading = false;
                    toastr.success("Please click on Sign In to sign In ","Success");
                }).catch(function (err) {
                    loginControllerVm.dataLoading = false;
                    toastr.error(err.message, "Error");
                    throw { message: err };
                });
            } else  {
                loginControllerVm.dataLoading = false;
                toastr.error("Please enter a valid number","Error");
            }
            
        }

        function signInFormShow() {

            loginControllerVm.signIn = true;
            loginControllerVm.signUp = false;
        }
        
        function signUpFormShow() {

            loginControllerVm.signIn = false;
            loginControllerVm.signUp = true;
        }

        function login() {
            loginControllerVm.dataLoading = true;
            Auth.login({
                username: loginControllerVm.username,
                password: loginControllerVm.password
            }).then(function () {
                $state.go('profile');
                loginControllerVm.dataLoading = false;
            }).catch(function (err) {
                loginControllerVm.dataLoading = false;
                toastr.error(err, "Error");
            });
        }
    }

})();
