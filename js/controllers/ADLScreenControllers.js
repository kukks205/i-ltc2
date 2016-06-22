angular.module('adl.controllers', ['datatables', 'datatables.tabletools'])

.controller('AdlSummaryController', ['$scope', '$http', function($scope, $http){
	
   $http.get('webservice/adlOlder.php')
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
        saveAs(blob, "สรุปผลการคัดกรองADLในผู้สูงอายุแยกรายอำเภอ.xls");
    };

}]);
