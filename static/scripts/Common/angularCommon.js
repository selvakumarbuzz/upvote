var commonApp = angular.module('AppCommon', []);
commonApp.controller('CtrlCommon', ['$scope', function($scope) {}]);
commonApp.controller('DialogController', ['$scope', '$mdDialog', 'SerCommon', 'dialogData', function($scope, $mdDialog,
  SerCommon, dialogData) {
  if (dialogData.action == 'employee') {
    employeeDetails(dialogData.emp_gid)
  }

  function employeeDetails(emp_gid) {
    var get_employ = SerCommon.getemployee(dialogData.emp_gid, '', 0,'ALL')
    get_employ.then(function(result) {
      var empsmry = result.data;
      if (empsmry.length != 0) {
        $scope.emp_name = empsmry[0].employee_name;
        $scope.emp_doj = empsmry[0].employee_doj;
        $scope.emp_gendr = empsmry[0].employee_gender;
        $scope.emp_mobnum = empsmry[0].employee_mobileno;
        $scope.emp_mailid = empsmry[0].employee_emailid;
      }
    }, function(err) {
      alert('No data!.');
    });
    $scope.cancelDialog = function() {
      $mdDialog.cancel();
    };
  }
}]);
commonApp.service("SerCommon", function($http) {
  this.getemployee = function(gid, name, clusgid,cluster) {
    var response = $http.get(Appname + "/employee_get/", {
      params: {
        "emp_gid": gid,
        "emp_name": name,
        "li_cluster_gid": clusgid,
         "cluster": cluster
      }
    });
    return response;
  }
  this.getposition = function(action, emp_gid, date) {
    var response = $http.get(Appname + "/getposition/", {
        params: {
            "action": action,
            "emp_gid": emp_gid,
            "date": date,
        }
    });
    return response;
   }
 this.getcustomer = function() {
    var response = $http.get(Appname +"/customer_ddl/", {
      params: {

      }
    });
    return response;
  }
   this.getemp_customer = function(gid) {
    var response = $http.get(Appname +"/emp_mapped_customer/", {
      params: {
        "emp_gid": gid
      }
    });
    return response;
  }
});
commonApp.config(function() {});

commonApp.directive('onlyLettersInput', onlyLettersInput);//Only letters only
commonApp.directive('numbersOnly', numbersOnly);
commonApp.directive('validNumber', validNumber);
commonApp.directive('noSpecialChar', noSpecialChar);

function numbersOnly() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        if (text) {
          var transformedInput = text.replace(/[^0-9]/g, '');
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return undefined;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
};
function onlyLettersInput() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^a-zA-Z]/g, '');
        //console.log(transformedInput);
        if (transformedInput !== text) {
          ngModelCtrl.$setViewValue(transformedInput);
          ngModelCtrl.$render();
        }
        return transformedInput;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
};

 function validNumber() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if (!ngModelCtrl) {
        return;
      }
      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
          var val = '';
        }
        var clean = val.replace(/[^-0-9\.]/g, '');
        var negativeCheck = clean.split('-');
        var decimalCheck = clean.split('.');
        if (!angular.isUndefined(negativeCheck[1])) {
          negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
          clean = negativeCheck[0] + '-' + negativeCheck[1];
          if (negativeCheck[0].length > 0) {
            clean = negativeCheck[0];
          }
        }
        if (!angular.isUndefined(decimalCheck[1])) {
          decimalCheck[1] = decimalCheck[1].slice(0, 2);
          clean = decimalCheck[0] + '.' + decimalCheck[1];
        }
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });
      element.bind('keypress', function(event) {
        if (event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
};

 function noSpecialChar() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(inputValue) {
          if (inputValue == null)
            return ''
          cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue;
        });
      }
    }
  };