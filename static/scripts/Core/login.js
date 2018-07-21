var loginapp = angular.module('loginapp', []) .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    });

loginapp.controller("Logincnt", ['$scope','$window','loginService',function ($scope,$window,loginService) {
    $scope.maintable = [];
    document.getElementById('Username').focus();
    $scope.Loginchk = function () {
        var username = $scope.Username;
        var password = $scope.Password;
        var pswd = loginService.getlogin(username ,password);
        pswd.then(function (result)
        {
                if(JSON.parse(result.data) ==="SUCCESS"){
                    $window.location.href = "../welcome";
                }
                else{
                    alert('User Name or Password Not Matched.');
                }
        }
        ),function(){
            alert('no data');
        };

     };
}]);

 loginapp.service("loginService", function ($http) {
     this.getlogin = function (e,e1) {
        var response = $http.post("/loginpswd/",{parms:{"username":e,"password":e1}});
         return response;
    }
    });