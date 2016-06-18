angular.module('menu.controllers', [])

.controller('loginController', ['$scope', '$http', function($scope, $http) {

    $scope.logged = window.localStorage['logged'];



    if ($scope.logged == 'true') {

        $scope.fullname = 'คุณ'+window.localStorage['fullname'];

    } else {

        $scope.fullname = 'Guest';

    }


    $scope.LoginData = [];



    $scope.Logout = function() {
        window.localStorage.removeItem('logged');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('fullname');
        window.localStorage.removeItem('hospcode');
        window.localStorage.removeItem('hospname');
        window.localStorage.removeItem('token');


        $.Notify({
            type: 'warning',
            caption: 'กำลังออกจากระบบ',
            content: "กรุณารอซักครู่นะครับกำลังลงชื่อออกจากระบบ",
            icon: "<span class='mif-lock'></span>"
        });

        setTimeout(function() {
            window.location.reload();
        }, 2000);
    }


    $scope.Login = function(user) {

        var username = user.username;
        var password = user.password

        $http.post('webservice/loginCheck.php', {
                'username': username,
                'password': password
            })
            .success(function(data) {

                $scope.status = data[0]['status'];

                if ($scope.status == 'Success') {

                    $scope.info = data[1];
                    $scope.dataloaded = true;

                    window.localStorage['logged'] = 'true';
                    window.localStorage['username'] = $scope.info.username;
                    window.localStorage['fullname'] = $scope.info.fullname;
                    window.localStorage['hospcode'] = $scope.info.hoscode;
                    window.localStorage['hospname'] = $scope.info.hospname;
                    window.localStorage['token'] = $scope.info.token;

                    $.Notify({
                        type: 'success',
                        caption: 'กำลัง',
                        content: "ยินดีต้อนรับคุณ " + $scope.info.fullname + " เข้าสู่ระบบสมาชิก i-LTC ครับ",
                        icon: "<span class='mif-lock'></span>"
                    });

                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);



                } else {

                    $.Notify({
                        type: 'warning',
                        caption: 'ไม่สามารถ Loin ได้',
                        content: "กรุณาตรวจสอบ username หรือ password",
                        icon: "<span class='mif-lock'></span>"
                    });

                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);



                }


            })
            .error(function(err) {
                alert('ไม่สามารถแสดงข้อมูลได้ครับ');
            });


    }

}])

.controller('homeController', ['$scope', function($scope) {

    $scope.name = 'Kukks';

    $scope.logged = window.localStorage['logged'];

    $scope.person = [{ cid: '123456', fullname: '555555' }];
}]);
