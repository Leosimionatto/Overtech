angular
  .module("fatec_system")
  .directive("incorrectFields", function(){
    return{
			"restrict":"EA",
			"templateUrl":"templates/incorrect-fields.html",
      "controller":"menuController"
		}
  })
