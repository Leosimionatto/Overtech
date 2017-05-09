angular
  .module("fatec_system")
  .directive("statusText", function(){
    return{
      "restrict":"EA",
      "templateUrl":"templates/status-text.html"
    }
  })
