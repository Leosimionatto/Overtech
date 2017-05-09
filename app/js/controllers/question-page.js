angular
  .module("fatec_system")
  .controller("questionPage", function($scope,$stateParams,$cookies,$timeout,$state,httpService,$uibModal){
    //My declarations
    $scope.new_answer = [];
    var user_id = $cookies.get("user_id");
    var category = $stateParams.category;
    var id_question = $stateParams.question;

    //My functions
    $scope.add_answer = add_answer;
    $scope.edit_answer = edit_answer;
    $scope.userProfile = userProfile;
    $scope.save_changes = save_changes;
    $scope.check_answer = check_answer;
    $scope.load_answers = load_answers;
    $scope.delete_answer = delete_answer;
    $scope.load_question_information = load_question_information;

    function load_question_information(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("specific-question.php",{"id":id_question,"id_category":category});
      request
        .then(function(data){
          if(data.status == 204){
            $scope.statusText = true;
            $scope.loading = undefined;
          }else{
            $timeout(function(){
              $scope.question = data.data[0];
              load_answers();
            },1000);
          }
        }).catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else if(error.status = 406){
            $scope.statusText = true;
          }else{
            $scope.db_not_responding = true;
          }
        })
    }
    function load_answers(){
      var config = 10000;
      var startTime = new Date().getTime();
      var request = httpService.request("select-question-answers.php",{"id":id_question});
      request
        .then(function(data){
          $scope.loading = undefined;
          $scope.answers = data.data;
        }).catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else if(error.status = 406){
            $scope.statusText = true;
          }else{
            $scope.db_not_responding = true;
          }
        })
    }
    function add_answer(answer){
      if(!user_id){
        $scope.unlogged = true;
        $timeout(function () {
          $scope.unlogged = undefined;
        }, 2000);
      }else{
        var config = 10000;
        $scope.loading = true;
        var startTime = new Date().getTime();
        var request = httpService.request("insert-answer.php",{"answer":answer,"id_user":user_id,"id_question":id_question});
        request
          .then(function(data){
            $scope.loading = undefined;
            $scope.answer_additioned = true;
            $timeout(function(){
              $scope.answer_additioned = undefined;
              $state.reload();
            }, 2000);
          }).catch(function(error){
            $scope.loading = undefined;
            var respTime = new Date().getTime() - startTime;
            if(respTime >= config){
              $scope.timeout_error = true;
            }else if(error.status == 406){
              $scope.globalError = true;
              $timeout(function(){
                $scope.globalError = undefined;
              },2500);
            }else{
              $scope.db_not_responding = true;
            }
          })
        }
    }
    function edit_answer(answer){
      // Set answer value
      $scope.answer = answer;

      // Open modal to edit information
      $scope.modalInstance = $uibModal.open({
          templateUrl: 'modal/edit_answer.html',
          scope:$scope
      });
    }
    function save_changes(new_answer){
      var check = check_answer(new_answer);
      if(check){
        var config = 10000;
        $scope.loading = true;
        var startTime = new Date().getTime();
        var request = httpService.request("edit_answer.php",{"id":$scope.answer.id,"answer":new_answer.body,"id_user":$scope.answer.id_user});
        request
          .then(function(data){
            $scope.loading = undefined;
            $scope.success_edit = true;
            $timeout(function(){
              $state.reload();
            }, 2000);
          }).catch(function(error){
            $scope.loading = undefined;
            var respTime = new Date().getTime() - startTime;
            if(respTime >= config){
              $scope.timeout_error = true;
            }else{
              $scope.db_not_responding = true;
            }
          })
      }else{
        $scope.edit_error = true;
        $timeout(function(){
          $scope.edit_error = undefined;
        },2000);
      }
    }
    function delete_answer(answer){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("delete_answer.php",{"id":answer.id,"id_user":answer.id_user});
      request
        .then(function(data){
          $scope.loading = undefined;
          $scope.success_delete = true;

          // Delete the question from array
          $scope.answers = $scope.answers.filter(function(other_answer){
            return other_answer.id != answer.id;
          });

          $timeout(function(){
            $scope.success_delete = undefined;
          }, 2000);
        }).catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else{
            $scope.db_not_responding = true;
          }
        })
    }
    function userProfile(type){
      $state.go('user-profile',{"user_id":type.id_user});
    }
    function check_answer(new_answer){
      if(!new_answer){
        return false;
      }else{
        if(!new_answer.body){
          return false;
        }
        return true;
      }
    }
    $scope.return = function(){
      $state.go("category-page",{"category":category});
    }
    $scope.close = function(){
        $scope.modalInstance.dismiss();
    };
  });
