angular
  .module("fatec_system")
  .directive("serverError", function(){
    return{
      "restrict":"EA",
      "templateUrl":"templates/error-404.html",
    }
  })
