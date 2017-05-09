angular
  .module("fatec_system")
  .directive("unlogged", function(){
    return{
      "restrict":"EA",
      "templateUrl":"templates/unlogged.html",
      "controller":"newQuestion"
    }
  });
