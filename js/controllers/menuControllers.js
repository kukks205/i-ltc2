angular.module('menu.controllers', [])

.controller('loginController', ['$scope', function($scope) {

    $scope.logged = window.localStorage['logged'];

    if($scope.logged=='true'){

    	$scope.username = window.localStorage['username']; 

    }else{

    	$scope.username = 'Guest';

    }


    $scope.LoginData =[];



    $scope.Notify = function() {
        $.Notify({
            type: 'success',
            caption: 'Success',
            content: "Metro UI CSS is Sufficient!!!",
            icon: "<span class='mif-vpn-publ'></span>"
        });
    }

    $scope.Logout = function() {
        window.localStorage.removeItem("logged");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("token");

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

        window.localStorage['logged'] = 'true';
        window.localStorage['username'] = user.username;
        window.localStorage['token'] = '$hdytdghjdfsjkjk12544sdsds$';

         $.Notify({
            type: 'success',
            caption: 'กำลังออกจากระบบ',
            content: "ยินดีต้อนรับคุณ "+user.username+" เข้าสู่ระบบสมาชิก i-LTC ครับ",
            icon: "<span class='mif-lock'></span>"
        });

        setTimeout(function() {
            window.location.reload();
        }, 2000);

    }

}])



.controller('homeController', ['$scope', function($scope) {

    $scope.name = 'Kukks';

    $scope.logged = window.localStorage['logged'];

    $scope.person = [{ cid: '123456', fullname: '555555' }];
}]);
