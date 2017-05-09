angular
  .module("fatec_system")
  .controller("menuController", function($scope,$uibModal,$timeout,$http,httpService,$cookies,$state,$rootScope){
    //My declarations
    $scope.courses = [];
    $scope.course = null;
    $scope.categories = [];
    var user_id = $cookies.get("user_id") || "";
    $rootScope.user_id = $cookies.get("user_id") || "";

    //My functions
    $scope.login = login;
    $scope.logoff = logoff;
    $scope.close_session = close_session;
    $scope.register_user = register_user;
    $scope.check_information = check_information;

    $scope.$on('find-categories', function(){
      findCategories();
    });
    function initInfo(){
        findCourses();
    }
    function findCourses(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request('select-courses-records.php');
      request
        .then(function(data){
          $timeout(function(){
            $scope.loading = undefined;
            $scope.courses = data.data.courses;
            findCategories();
          },1000);
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
    function findCategories(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request('search-categories.php',{"id":user_id});
      request
        .then(function(data){
          $scope.loading = undefined;
          $scope.menu_loaded = true;
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
    function login(user){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request('login.php',{
        "email":user.name,
        "password":user.password
      });
      request
      .then(function(data){
        $scope.loading = undefined;
        $cookies.put("user_id",data.data);
        $rootScope.user_id = $cookies.get("user_id");
        $scope.success_login = true;
        $timeout(function(){
          $scope.success_proccess = undefined;
          $scope.success_login = undefined;
          $scope.modalInstance.dismiss();
          $state.go("user-page");
          findCategories();
        }, 1500);
      })
      .catch(function(error){
        $scope.loading = undefined;
        var respTime = new Date().getTime() - startTime;
        if(respTime >= config){
          $scope.timeout_error = true;
        }else if(error.status == 406){
          $scope.incorrect_fields = true;
          $timeout(function(){
            $scope.incorrect_fields = false;
          }, 2500);
        }else{
          $scope.db_not_responding = true;
        }
      });
    }
    function check_information(new_user){
      if(new_user != undefined){
        if(new_user.password != new_user.repeat_password){
          $scope.password_error = true;
          $timeout(function(){
            $scope.password_error = undefined;
          }, 4000);
        }else if(!new_user.email || !new_user.password || !new_user.name || !new_user.age || !new_user.course || !new_user.semester){
          $scope.password_error = true;
          $timeout(function(){
            $scope.password_error = undefined;
          }, 4000);
        }else{
          register_user(new_user);
        }
      }else{
        $scope.incorrect_fields = true;
        $timeout(function(){
          $scope.incorrect_fields = undefined;
        }, 4000);
      }
    }
    function register_user(new_user){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("register.php",{
        "name":new_user.name,
        "email":new_user.email,
        "age":new_user.age,
        "semester":new_user.semester,
        "password":new_user.password,
        "course":new_user.course
      });
      request
        .then(function(data){
          $scope.loading = undefined;
          $scope.success_proccess = true;
          $timeout(function (){
            new_user.name = new_user.email;
            login(new_user);
          }, 2000);
        })
        .catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else if(error.status == 406){
            $scope.register_error = true;
            $timeout(function () {
              $scope.register_error = undefined;
            }, 2500);
          }else{
            $scope.db_not_responding = true;
          }
        })
    }
    function close_session(){
      $scope.modalInstance = $uibModal.open({
          templateUrl: 'modal/logoff.html',
          scope:$scope
      });
    }
    function logoff(){
      var request = httpService.request("logout.php");
      request
        .then(function(data){
          $cookies.remove("user_id");
          $rootScope.user_id = undefined;
          $scope.modalInstance.dismiss();
          findCategories();
          $state.go("/");
        })
        .catch(function(error){
          //Do nothing
        })
    }
    $scope.loginModal = function(){
      $scope.modalInstance = $uibModal.open({
          templateUrl: 'modal/login.html',
          scope:$scope
      });
    }
    $scope.registerModal = function(){
      $scope.modalInstance = $uibModal.open({
          templateUrl: 'modal/register.html',
          scope:$scope
      });
    }
    $scope.close = function(){
        $scope.modalInstance.dismiss();
    };

    initInfo();
  })
