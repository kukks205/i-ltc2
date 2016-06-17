angular.module('pop.controllers', [])

.controller('PopOlderController', ['$scope', '$http', function($scope, $http) {

    $scope.controllerName = 'PopOlder';


    $http.get('webservice/popOlder.php')
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

.controller('PopOlderDetailController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

    $scope.controllerName = 'PopOlder';
    $scope.cupID = $stateParams.cupID;
    $scope.hospcode = window.localStorage['hospcode'];
    $scope.token = window.localStorage['token'];


    $scope.viewDetail = function(hospcode) {
        
        //start check expire and level

        $http.post('webservice/tokenCheck.php', { 'token': $scope.token })
            .success(function(data) {
                $scope.status = data[0]['status'];


                //start check step1
                if ($scope.status == 'Success') {

                    var d = new Date();
                    $scope.info = data[1];
                    $scope.dateNow = moment().format();

                    //start check step2 

                    if ($scope.dateNow > $scope.info.expire) {

                        window.localStorage.removeItem('logged');
                        window.localStorage.removeItem('username');
                        window.localStorage.removeItem('fullname');
                        window.localStorage.removeItem('hospcode');
                        window.localStorage.removeItem('hospname');
                        window.localStorage.removeItem('token');

                        $.Notify({
                            type: 'warning',
                            caption: 'หมดเวลาการเชื่อมต่อ',
                            content: "กำลังออกจากระบบ กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
                            icon: "<span class='mif-lock'></span>"
                        });


                    } else {

                        alert(hospcode);

                    }
                    //end check step2 

                } else {

                        $.Notify({
                            type: 'warning',
                            caption: 'คุณไม่สิทธิ์เข้าถึงข้อมูลนี้',
                            content: "กรุณา Login ก่อนจึงจะสามารถเข้าถึงข้อมูลส่วนนี้ได้" ,
                            icon: "<span class='mif-lock'></span>"
                        });
                }
                //end check step1


                $scope.dataloaded = true;
            })
            .error(function(err) {
                alert('ไม่สามารถแสดงข้อมูลได้ครับ');
            });

        //end check expire and level
    }




    $http.get('webservice/popOlderD.php?cupcode=' + $scope.cupID)
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
        saveAs(blob, "จำนวนผู้สูงอายุอำเภอ" + $scope.older[0]['ampname'] + ".xls");
    };




}])

.controller('ViewPopOlderController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

    
    $scope.hospcode = $stateParams.hospcode;
    $scope.token = window.localStorage['token'];


        //start check expire and level

        $http.post('webservice/tokenCheck.php', { 'token': $scope.token })
            .success(function(data) {
                $scope.status = data[0]['status'];


                //start check step1
                if ($scope.status == 'Success') {

                    var d = new Date();
                    $scope.info = data[1];
                    $scope.dateNow = moment().format();

                    //start check step2 

                    if ($scope.dateNow > $scope.info.expire) {

                        window.localStorage.removeItem('logged');
                        window.localStorage.removeItem('username');
                        window.localStorage.removeItem('fullname');
                        window.localStorage.removeItem('hospcode');
                        window.localStorage.removeItem('hospname');
                        window.localStorage.removeItem('token');

                        $.Notify({
                            type: 'warning',
                            caption: 'หมดเวลาการเชื่อมต่อ',
                            content: "กำลังออกจากระบบ กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
                            icon: "<span class='mif-lock'></span>"
                        });


                    } else {

                        alert(hospcode);

                    }
                    //end check step2 

                } else {

                        $.Notify({
                            type: 'warning',
                            caption: 'คุณไม่สิทธิ์เข้าถึงข้อมูลนี้',
                            content: "กรุณา Login ก่อนจึงจะสามารถเข้าถึงข้อมูลส่วนนี้ได้" ,
                            icon: "<span class='mif-lock'></span>"
                        });
                }
                //end check step1


                $scope.dataloaded = true;
            })
            .error(function(err) {
                alert('ไม่สามารถแสดงข้อมูลได้ครับ');
            });

        //end check expire and level
 
}]);



