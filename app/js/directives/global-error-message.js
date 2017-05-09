angular
  .module("fatec_system")
  .directive("globalError", function(){
    return{
      "restrict":"EA",
      "templateUrl":"templates/global-error-message.html"
    }
  })
