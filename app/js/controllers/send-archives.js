angular
  .module("fatec_system")
  .controller("sendArchives", function($scope,$stateParams,$http,$timeout,$cookies,$state){
    // My declarations
    $scope.form = [];
    $scope.files = [];
    var user_id = $cookies.get("user_id");
    var category = $stateParams.id_category;
    $scope.category = category;

    // My functions
    $scope.uploadFile = uploadFile;
    $scope.check_category = check_category;

    function check_category(categories){
      if(!categories[category - 1]){
        $scope.statusText = true;
      }
    }
    function uploadFile(){
      if(!user_id){
        $scope.unlogged = true;
        $timeout(function () {
          $scope.unlogged = undefined;
        },2500);
      }else{
        // Set configurations
        var config = 10000;
        $scope.loading = true;
        var startTime = new Date().getTime();

        // Find file especifications
        $scope.form.file = $scope.files[0];

        // Make the request
        var request = $http({
          method:'POST',
          url:'server/requests/upload-files.php',
          processData:false,
          transformRequest: function(data){
            var formData = new FormData();
            formData.append("file", $scope.form.file);
            formData.append("matter", $scope.form.matter);
            formData.append("id_user", user_id);
            formData.append("id_category", category);
            return formData;
          },
          data:{"file":$scope.form,"archive_name":"teste"},
          headers:{'Content-Type':undefined},
          timeout:10000
        });
        request
          // Receive the response
          .then(function(data){
            $scope.loading = undefined;
            if(data.data == 'true'){
              $scope.success_upload = true;
              $timeout(function(){
                $state.reload();
              },2500);
            }else{
              $scope.error = data.data;
              $timeout(function(){
                $scope.error = undefined;
              },2500)
            }
          })
          // Receive the error
          .catch(function(error){
            $scope.loading = undefined;
            var respTime = new Date().getTime() - startTime;
            if(respTime >= config){
              $scope.timeout_error = true;
            }else{
              $scope.db_not_responding = true;
            }
          });
      }
    }
    $scope.uploadedFile = function(element) {
		    $scope.currentFile = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
        reader.readAsDataURL(element.files[0]);
		  }
  });
