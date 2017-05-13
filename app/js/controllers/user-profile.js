angular
  .module("fatec_system")
  .controller("userProfile", function($scope,$stateParams,$state,$timeout,httpService){
    // My declarations
    var user_id = $stateParams.user_id;

    //My functions
    $scope.categoryPage = categoryPage;
    $scope.all_information = all_information;

    function all_information(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("specific-user.php",{"id":user_id});
      request
        .then(function(data){
          if(data.status == 204){
            $scope.loading = undefined;
            $scope.statusText = data.statusText;
          }else{
            $timeout(function(){
              $scope.user = data.data[0];
              user_uploads(data.data[0]);
            }, 1000);
          }
        })
        .catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else{
            $scope.db_not_responding = true;
          }
        })
    }
    function user_uploads(user){
      var config = 10000;
      var startTime = new Date().getTime();
      var request = httpService.request("user-uploads.php",{'id':user.id});
      request
        .then(function(data){
          $scope.uploads = data.data;
          user_participation();
        })
        .catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else{
            $scope.db_not_responding = true;
          }
        })
    }
    function user_participation(){
      var config = 10000;
      var startTime = new Date().getTime();
      var request = httpService.request("user-categories.php",{"id_course":$scope.user.course,"semester":$scope.user.semester});
      request
        .then(function(data){
          $scope.loading = undefined;
          $scope.categories = data.data;
        })
        .catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else{
            $scope.db_not_responding = true;
          }
        })
    }
    function categoryPage(category){
      $state.go('category-page',{'category':category.id});
    }
  });
