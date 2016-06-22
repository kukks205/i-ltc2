angular.module('popOlder.services', [])



.factory('PushService', function ($q, $http) {
    return {
      getPopOlder: function () {
        var q = $q.defer();
        $http.get('../../webservice/popOlder.php')
          .success(function (data) {
            q.resolve(data);
          })
          .error(function () {
            q.reject('Connection failed');
          });


        return q.promise;
      }
    }
  });


/*

.factory('popOlder', function($scope, $http, q) {

    return {
        getPopOlder: function() {

            var q = $q.defer();

            $http.get('../../webservice/popOlder.php', config)
                .then(function(res) {

                	q.

                }, function(err) {

                });

            return q.promise;
        }
    }

});
*/