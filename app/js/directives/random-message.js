angular
  .module("fatec_system")
  .directive("randomMessage", function(){
    return{
      "restrict":"EA",
      "templateUrl":"templates/random-message.html"
    }
  })
