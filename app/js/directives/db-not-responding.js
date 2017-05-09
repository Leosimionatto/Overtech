angular
  .module("fatec_system")
  .directive("dbNotResponding", function(){
    return {
			"restrict": "EA",
			"templateUrl": "templates/db-not-responding.html"
		}
  });
