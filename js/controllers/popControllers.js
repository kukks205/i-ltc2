angular.module('pop.controllers', [])

.controller('PopOlderController', ['$scope', '$http', function($scope, $http) {

    $scope.controllerName = 'PopOlder';


    $http.get('./webservice/popOlder.php')
        .success(function(data) {
            $scope.older = data;
            $scope.dataloaded = true;
        })
        .error(function(err) {
            alert('ไม่สามารถแสดงข้อมูลได้ครับ');
        });

    $scope.exportData = function() {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "จำนวนประชากรผู้สูงอายุแยกรายอำเภอ.xls");
    };




}])

.controller('PopOlderDetailController', ['$scope', '$http','$stateParams', function($scope, $http,$stateParams) {

    $scope.controllerName = 'PopOlder';

    $scope.cupID = $stateParams.cupID;

    $http.get('./webservice/popOlderD.php?cupcode='+$scope.cupID)
        .success(function(data) {
            $scope.older = data;
            $scope.dataloaded = true;
        })
        .error(function(err) {
            alert('ไม่สามารถแสดงข้อมูลได้ครับ');
        });

    $scope.exportData = function() {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "จำนวนผู้สูงอายุอำเภอ"+$scope.older[0]['ampname']+".xls");
    };




}]);
;
