angular
  .module("fatec_system")
  .factory("httpService", function($http){
    var http = {},
        path = 'server/requests/';

    http.request = request;

    function request(archive,body=null){
      var request = $http({
        "url": path + archive,
        "method":"POST",
        "data":body,
        "timeout":10000
      });
      return request;
    }

    return http;
});
