angular
  .module("fatec_system")
  .directive("loadingServer", function(){
    return {
			"restrict": "EA",
			"templateUrl": "templates/loading-server-information.html",
		}
  });
