angular
  .module("fatec_system")
  .directive("timeoutError", function(){
    return {
			"restrict": "EA",
			"templateUrl": "templates/timeout-error.html"
		}
  });
