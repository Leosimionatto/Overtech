angular
  .module("fatec_system")
  .directive("messageSystem", function(){
    return{
			"restrict":"EA",
			"templateUrl":"templates/message-system.html",
      "controller":"messageSystem"
		}
  });
