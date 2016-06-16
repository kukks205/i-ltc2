angular.module('myApp', [
    'ui.router',
    'menu.controllers',
    'pop.controllers'
])




//.run(function($rootScope) {
//
////window.localStorage['logged'] = 'true';
//
//
//
//})


        .config(function ($stateProvider, $urlRouterProvider) {


            $urlRouterProvider.otherwise("/home");


            $stateProvider
                    .state('about', {
                        url: '/about',
                        template: '<p>this is part of about</p>'
                    })
                    .state('popOlder', {
                        url: "/popOlder",
                        templateUrl: "views/popOlder/pop_older.html",
                        controller: 'PopOlderController'
                    })
                    .state('popOlderDetail', {
                        url: "/popOlderD/:cupID",
                        templateUrl: "views/popOlder/pop_older_detail.html",
                        controller: 'PopOlderDetailController'
                    })
                    .state('home', {
                        url: "/home",
                        templateUrl: "views/home.html",
                        controller: 'homeController'
                    });



            /*
             if (window.localStorage['logged'] == true) {
             
             var $rootScope.logged= true;
             //var $rootScope.username = window.localStorage['username']; 
             //var $rootScope.token = window.localStorage['token'];
             
             
             } else {
             
             var $rootScope.logged= true;
             //var $rootScope.username = 'Guest'; 
             //var $rootScope.token = null;
             
             
             }
             */
        });
