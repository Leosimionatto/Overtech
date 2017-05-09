angular
  .module("fatec_system")
  .factory("userConfiguration", function($http,$rootScope){
    var functions = {};
    functions.check_data = check_data;

    function check_data(user){
      if(user){
        //Do nothing
      }else{
        return true;
      }
    }
    return functions;
  });
