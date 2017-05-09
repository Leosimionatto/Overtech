angular
  .module("fatec_system")
  .controller("userPage", function($scope,$timeout,httpService,$cookies,$state,$uibModal){
    // My variables
    var user_id = $cookies.get("user_id");

    //My functions
    $scope.send_archives = send_archives;
    $scope.category_page = category_page;
    $scope.your_information = your_information;
    $scope.check_edit_information = check_edit_information;
    $scope.save_edited_information = save_edited_information;

    function your_information(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("specific-user.php",{"id":user_id});
      request
        .then(function(data){
          $timeout(function(){
            $scope.loading = undefined;
            $scope.user = data.data[0];
          }, 1000);
        })
        .catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else if(error.status = 406){
            $scope.global_error = true;
            $timeout(function(){
              $scope.global_error = undefined;
            }, 2500);
          }else{
            $scope.db_not_responding = true;
          }
        });
    }
    function save_edited_information(edit_user){
      //Check the user information
      var check = check_edit_information(edit_user);
      //Do the updates in BD
      if(check){
        var config = 10000;
        $scope.loading = true;
        var startTime = new Date().getTime();
        var request = httpService.request("update-user.php",{"id":user_id,"name":edit_user.name,"email":edit_user.email,"age":edit_user.age,"semester":edit_user.semester,"course":edit_user.course});
        request
          .then(function(data){
            $scope.loading = undefined;
            $scope.information_edited = true;

            // Set new user values
            $scope.user.name = edit_user.name;
            $scope.user.course = edit_user.course;
            $scope.user.age = edit_user.age;
            $scope.user.email = edit_user.email;
            $scope.user.semester = edit_user.semester;

            $scope.$emit('find-categories');

            $timeout(function(){
              $scope.information_edited = undefined;
            },2000)
          })
          .catch(function(error){
            $scope.loading = undefined;
            var respTime = new Date().getTime() - startTime;
            if(respTime >= config){
              $scope.timeout_error = true;
            }else if(error.status = 406){
              $scope.global_error = true;
              $timeout(function(){
                $scope.global_error = undefined;
              }, 2500);
            }else{
              $scope.db_not_responding = true;
            }
          });
      }
    }
    function check_edit_information(edit_user){
      if(!edit_user){
        $scope.edit_error = true;
        $timeout(function(){
          $scope.edit_error = undefined;
        },2000);
        return false;
      }else{
        if(!edit_user.name){
          edit_user.name = $scope.user.name;
        }
        if(!edit_user.age){
          edit_user.age = parseInt($scope.user.age);
        }
        if(!edit_user.course){
          edit_user.course = parseInt($scope.user.course);
        }
        if(!edit_user.semester){
          edit_user.semester = parseInt($scope.user.semester);
        }
        if(!edit_user.email){
          edit_user.email = $scope.user.email;
        }
        return true;
      }
    }
    function send_archives(category){
      $state.go("send-archives",{"id":category});
    }
    $scope.edit_your_information = function(){
      $scope.modalInstance = $uibModal.open({
          templateUrl: 'modal/edit-your-information.html',
          scope:$scope
      });
    }
    function category_page(category){
      $state.go('category-page',{"category":category.id});
    }
  });
