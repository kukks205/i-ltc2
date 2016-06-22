angular.module('pop.controllers', ['datatables', 'datatables.tabletools'])

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
                        content: "กรุณา Login ก่อนจึงจะสามารถเข้าถึงข้อมูลส่วนนี้ได้",
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

.controller('ViewPopOlderController', ['$scope', '$http', '$stateParams', 'DTOptionsBuilder', 'DTColumnBuilder',
    function($scope, $http, $stateParams, DTOptionsBuilder, DTColumnBuilder) {


        $scope.hospcode = $stateParams.hospcode;
        $scope.token = window.localStorage['token'];

        $scope.dataloaded = false;

        if ($scope.token) {
            //loginแล้ว

            //start check expire and level

            $http.post('webservice/tokenCheck.php', { 'token': $scope.token })
                .success(function(data) {

                    $scope.status = data[0]['status'];


                    //start check step1 ตรวจสอบ token
                    if ($scope.status == 'Success') {

                        var d = new Date();
                        $scope.info = data[1];
                        $scope.dateNow = moment().format();

                        //start check step2 ตรวจสอบ expire date

                        if ($scope.dateNow > $scope.info.expire) {

                            $scope.access = 'no';

                            //ในกรณีหมดเวลา

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

                            $scope.dataloaded = false;

                        } else {

                            //ยังไม่หมดเวลา


                            $http.post('webservice/popOlderDD.php', { 'hospcode': $scope.hospcode })
                                .success(function(data) {

                                    $scope.view = data;


                                    if ($scope.info.level_userid == 'staff') {

                                        $scope.access = 'yes';

                                    } else if ($scope.info.level_userid == 'ssj') {
                                        $scope.access = 'yes';

                                    } else if ($scope.info.level_userid == 'sso') {

                                        //ตรวจสอบอำเภอ
                                        if ($scope.info.amp == $scope.view[0]['amp']) {

                                            $scope.access = 'yes';

                                        } else {
                                            $scope.access = 'no';
                                        }
                                        //จบ

                                    } else if ($scope.info.level_userid == 'hos') {

                                        //ตรวจสอบอำเภอ
                                        if ($scope.info.hospcode == $scope.view[0]['hospcode']) {

                                            $scope.access = 'yes';

                                        } else {
                                            $scope.access = 'no';
                                        }
                                        //จบ


                                    } else if ($scope.info.level_userid == 'so') {

                                        //ตรวจสอบอำเภอ
                                        if ($scope.info.hospcode == $scope.view[0]['hospcode']) {

                                            $scope.access = 'yes';

                                        } else {
                                            $scope.access = 'no';
                                        }
                                        //จบ

                                    } else {

                                        $scope.access = 'no';

                                    }

                                    if ($scope.access == 'yes') {

                                        $scope.dtOptions = DTOptionsBuilder.newOptions()
                                            .withTableTools('./lib/TableTools/swf/copy_csv_xls_pdf.swf')
                                            .withTableToolsButtons([
                                                'copy',
                                                'print'
                                            ])
                                            .withPaginationType('full_numbers')
                                            .withOption('responsive', true)
                                            .withDisplayLength(25);
                                        $scope.dtColumnDefs = [
                                            DTColumnDefBuilder.newColumnDef(0),
                                            DTColumnDefBuilder.newColumnDef(1).notVisible(),
                                            DTColumnDefBuilder.newColumnDef(2).notVisible(),
                                            DTColumnDefBuilder.newColumnDef(3).notVisible(),
                                            DTColumnDefBuilder.newColumnDef(4).notVisible()
                                        ];

                                    } else {

                                        $.Notify({
                                            type: 'warning',
                                            caption: 'คุณไม่สิทธิ์เข้าถึงข้อมูลนี้',
                                            content: "เนื่องจากคุณไม่ได้รับสิทธิการเข้าถึงข้อมูลส่วนนี้ หรือ ข้อมูลของหน่วยบริการนี้",
                                            icon: "<span class='mif-lock'></span>"
                                        });
                                    }

                                    $scope.dataloaded = true;

                                    //จบ

                                })
                                .error(function(err) {
                                    alert('ไม่สามารถแสดงข้อมูลได้ครับ');
                                });

                        }
                        //end check step2 


                    } else {

                        $scope.access = 'no';
                        $scope.dataloaded = true;

                        $.Notify({
                            type: 'warning',
                            caption: 'คุณไม่สิทธิ์เข้าถึงข้อมูลนี้',
                            content: "กรุณา Login ก่อนจึงจะสามารถเข้าถึงข้อมูลส่วนนี้ได้",
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


        } else {

            //ยังไม่ login
            $scope.access = 'no';
            $scope.dataloaded = true;
            $.Notify({
                type: 'warning',
                caption: 'คุณไม่สิทธิ์เข้าถึงข้อมูลนี้',
                content: "กรุณา Login ก่อนจึงจะสามารถเข้าถึงข้อมูลส่วนนี้ได้",
                icon: "<span class='mif-lock'></span>"
            });
        }

    }
]);
