angular
  .module("fatec_system")
  .controller("yourQuestions", function($scope,$cookies,httpService,$timeout,$uibModal,$state){

    // My declarations
    $scope.search = [];
    $scope.questions = [];
    $scope.new_question = [];
    $scope.some_questions = [];
    var user_id = $cookies.get("user_id");

    // My functions
    $scope.new_list = new_list;
    $scope.showMore = showMore;
    $scope.showLess = showLess;
    $scope.edit_question = edit_question;
    $scope.someQuestions = someQuestions;
    $scope.your_questions = your_questions;
    $scope.delete_question = delete_question;
    $scope.update_question = update_question;
    $scope.filter_questions = filter_questions;
    $scope.your_information = your_information;

    function your_information(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("specific-user.php",{'id':user_id});
      request
      .then(function(data){
        $scope.user = data.data;
        your_questions();
      })
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
    function your_questions(){
      var config = 10000;
      var startTime = new Date().getTime();
      var request = httpService.request("user-questions.php",{'id':user_id});
      request
      .then(function(data){
        $scope.loading = undefined;
        $scope.questions = data.data;
        someQuestions($scope.questions);
      })
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
    function someQuestions(questions){
      if(questions.length > 10){
        for(i=0;i<10;i++){
          $scope.some_questions[i] = $scope.questions[i];
        }
        $scope.cont = 10;
        $scope.current_questions = $scope.some_questions;
      }else{
        $scope.cont = $scope.questions.length;
        $scope.some_questions = $scope.questions;
        $scope.current_questions = $scope.some_questions;
      }
    }
    function filter_questions(current_questions,search){
      if(search == undefined){
        $scope.some_questions = current_questions;
      }else{
        $scope.some_questions = current_questions.filter(new_list);
      }
    }
    function new_list(question){
      var search = $scope.search;
      if(!search.name && !search.category){
        return question;
      }else if(!search.name){
        return question.id_category == search.category;
      }else if(!search.category){
        var test = question.title.toLowerCase();
        var test2 = search.name.toLowerCase();
        return test.startsWith(test2);
      }else{
        var test = question.title.toLowerCase();
        var test2 = search.name.toLowerCase();

        return test.startsWith(test2) && question.id_category == search.category;
      }
    }
    function showMore(cont){
      $scope.some_questions = $scope.current_questions;
      var new_cont = cont + 10;
      for(i=cont;i<new_cont;i++){
        if($scope.some_questions.length == $scope.questions.length){
          break;
        }else{
          $scope.some_questions[i] = $scope.questions[i];
        }
      }
      $scope.cont = new_cont;
      $scope.current_questions = $scope.some_questions;
    }
    function showLess(){
      $scope.some_questions = [];
      someQuestions($scope.questions);
    }
    function edit_question(question){
      $scope.question = question;
      $scope.new_question.id = question.id;
      $scope.modalInstance = $uibModal.open({
          templateUrl: 'modal/edit_question_information.html',
          scope:$scope
      });
    }
    function update_question(new_question){
      var check = check_question(new_question);
      if(check){
        var config = 10000;
        $scope.loading = true;
        var startTime = new Date().getTime();
        var request = httpService.request("update-question.php",{'id':user_id,'id_question':new_question.id,"title":new_question.title,"body":new_question.body});
        request
        .then(function(data){
          $scope.loading = undefined;
          $scope.success_update = true;
          $scope.question.body = new_question.body;
          $scope.question.title = new_question.title;
          $timeout(function(){
            $scope.success_update = undefined;
          }, 2500);
        })
        .catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else{
            $scope.db_not_responding = true;
          }
        });
      }else{
        $scope.edit_error = true;
        $timeout(function(){
          $scope.edit_error = undefined;
        },2500);
      }
    }
    function delete_question(question){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("delete-question.php",{'id':user_id,"id_question":question.id,"creator":question.id_user});
      request
      .then(function(data){
        $scope.loading = undefined;
        if(data.data == 'true'){
          $scope.success_delete = true;
          var all_questions = $scope.questions;

          $scope.questions = all_questions.filter(function(other_question){
            return other_question.id != question.id;
          });
          $scope.some_questions = $scope.questions;
          $scope.current_questions = $scope.questions;

          $timeout(function(){
            $scope.success_delete = undefined;
          }, 2000);
        }else{
          $scope.db_not_responding = true;
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
      });
    }
    function check_question(new_question){
      if(!new_question){
        return false;
      }else{
        if(!new_question.title){
          new_question.title = $scope.question.title;
        }
        if(!new_question.body){
          new_question.body = $scope.question.body;
        }
        return true;
      }
    }
  });
