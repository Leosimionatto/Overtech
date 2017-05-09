angular
  .module("fatec_system")
  .controller("initialController", function($scope,$uibModal,$interval){
    $scope.image    = 1;
    $scope.changeImage = changeImage;

    function changeImage(image){
      if(image == 1){
        $scope.image = 2;
      }else{
        $scope.image = 1;
      }
    }
    $interval(function () {
      if($scope.image == 1){
        $scope.image = 2;
      }else{
        $scope.image = 1;
      }
    },8000);
  });
