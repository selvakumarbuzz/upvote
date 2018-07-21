var app = angular.module('appdept', ['ngMaterial']) .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    });
    app.controller('deprtcntrl',['$scope','$window','departservice','editservice','deleteservice','activeservice','inactiveservice', function($scope,$window,departservice,editservice,deleteservice,activeservice,inactiveservice) {
     $scope.edit = function (e)
    {
     var name = $scope.departmentdetails[e].dept_gid;
     alert(JSON.stringify(name));
    // $window.location.href = "../departedit";
    // alert(JSON.stringify(name));
$scope.departedit==[];
     var en = editservice.getdeptedit(name);
     //detail.d(name);
//$window.location.href = "../departedit";
        en.then(function (en) {
        alert("suces");
            $scope.departedit= JSON.parse(en.data);
            alert(JSON.stringify($scope.departedit));
        }, function () {
            alert('Records not found')
        });
    }

     $scope.check = function (emp,ev){
     if(emp==true){
     $scope.disable=true;
      var name = $scope.departmentdetails[ev].dept_gid;
      var viewcode = $scope.departmentdetails[ev].dept_code;
      var viewname = $scope.departmentdetails[ev].dept_name;
      alert(JSON.stringify(name));
      $scope.view_data = function (){
 $scope.viewcode = viewcode;
 $scope.viewname = viewname;
}

$scope.active = function (){

var en = activeservice.getdeptactive(name);
//alert("sucess");
 $window.location.href = "../department";
}
$scope.inactive = function (){

var en = inactiveservice.getdeptinactive(name);
//alert("sucess");
 $window.location.href = "../department";
}


 $scope.delete_data = function (){

 alert(name);
var en = deleteservice.getdeptdelete(name);
 en.then(function (en) {
        alert("Would you like to delete your department details");
            $scope.departedit= JSON.parse(en.data);
            //alert(JSON.stringify($scope.departedit));
            $window.location.href = "../department";
        }, function () {
            alert('Records not found')
        });
 }

      }
      else{
$scope.disable=false;
      }

     }



  $scope.departmentdetails==[];
     var rolegrouplist = departservice.getdept();

        rolegrouplist.then(function (rolegrouplist) {
            $scope.departmentdetails= JSON.parse(rolegrouplist.data);
           // alert($scope.departmentdetails.dept_code);
           var myObject = $scope.departmentdetails;
 // var count = Object.keys(myObject).length;

 // alert($scope.departmentdetails[5].dept_isactive);


        }, function () {
            alert('Records not found')
        });
    }]);

     app.service("departservice", function ($http) {
     this.getdept = function () {
        var response = $http.get("/deptjson/");
        return response;
    }
    });
     app.service("editservice", function ($http) {
     this.getdeptedit = function (enn) {
       debugger;
     alert(enn);
        var response = $http.post("/depteditjson/",{parms:{"dept_gid":enn}});
        return response;
    }
    });

    app.service("deleteservice", function($http){
    this.getdeptdelete = function (e){
    var response = $http.post("/deptdeletejson/",{parms:{"dept_gid":e}});
    return response;
    }
    });

    app.service("activeservice", function($http){
    this.getdeptactive = function (e){
    var response = $http.post("/deptactivejson/",{parms:{"dept_gid":e}});
    return response;
    }
    });

    app.service("inactiveservice", function($http){
    this.getdeptinactive = function (e){
    var response = $http.post("/deptinactivejson/",{parms:{"dept_gid":e}});
    return response;
    }
    });

//app.factory('detail', function() {





 var app = angular.module('appdeptapp', ['ngMaterial']) .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    });

    app.controller("DepartCtrl", ['$scope','$window','DepartService',function ($scope,$window,DepartService) {
    $scope.maintable = [];
    $scope.Close = function ()
    {
         $window.location.href = "../department";
    }
    $scope.Savedetail = function () {
    debugger;
        var dept_code = $scope.dept_code;
        var dept_name = $scope.dept_name;

        var pswd = DepartService.savedetail(dept_code ,dept_name);
        pswd.then(function (result)
        {
                alert(result.data);
                debugger;
                if(JSON.parse(result.data) !==""){
                    $window.location.href = "../department";
                }
        }
        ),function(){
        alert('no data');
        };


     };
}]);

 app.service("DepartService", function ($http) {
     this.savedetail = function (e,e1) {
     debugger;
        var response = $http.post("/departjson/",{parms:{"dept_code":e,"dept_name":e1}});
         return response;
    }
    });