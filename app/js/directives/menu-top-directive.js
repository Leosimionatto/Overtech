angular
  .module("fatec_system")
  .directive("menuTop", function(){
    return {
			"restrict":"EA",
			"templateUrl":"templates/menu-top.html",
      "controller":"menuController"
		}
  });
