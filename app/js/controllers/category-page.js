angular
  .module("fatec_system")
  .controller("categoryPage", function($scope,$timeout,$state,$stateParams,httpService){
    //My declarations
    $scope.search = [];
    $scope.questions = [];
    $scope.some_questions = [];
    var id = $stateParams.category;

    //My functions
    $scope.order_by = order_by;
    $scope.showMore = showMore;
    $scope.showLess = showLess;
    $scope.new_list = new_list;
    $scope.someQuestions = someQuestions;
    $scope.question_page = question_page;
    $scope.find_questions = find_questions;
    $scope.filter_questions = filter_questions;
    $scope.category_information = category_information;

    function category_information(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request('specific-category.php',{"id":id});
      request
        .then(function(data){
          if(data.status == 204){
            $scope.statusText = data.statusText;
          }else{
            $scope.category = data.data[0];
            //Call my function to find all the questions of this category
            find_questions($scope.category);
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
    function find_questions(category){
      var config = 10000;
      var startTime = new Date().getTime();
      var request = httpService.request('select-all-questions.php',{"id":category.id,"course":category.course});
      request
        .then(function(data){
          $scope.loading = undefined;
          // Receiving questions
          $scope.questions = data.data;
          someQuestions(data.data);
        })
        .catch(function(error){
          $scope.loading = undefined;
          var respTime = new Date().getTime() - startTime;
          if(respTime >= config){
            $scope.timeout_error = true;
          }else if(error.status == 401){
            $scope.statusText = true;
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
        $scope.loading = undefined;
        $scope.cont = $scope.questions.length;
        $scope.some_questions = $scope.questions;
        $scope.current_questions = $scope.some_questions;
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
    function filter_questions(current_questions,search){
      if(search == undefined){
        $scope.some_questions = current_questions;
      }else{
        if(search.order){
          order_by(search.order);
        }else{
          $scope.some_questions = $scope.questions.filter(new_list);
        }
      }
    }
    function new_list(question){
      var test = question.title.toLowerCase();
      var search = $scope.search.name.toLowerCase();
      if(search){
        return test.startsWith(search);
      }else{
        return question;
      }
    }
    function order_by(order){
      if(order === "news"){
        order = "creation_date";
        $scope.some_questions.sort(function(a, b){
          return new Date(b[order]) - new Date(a[order]);
        });
      }else{
        order = "creation_date";
        $scope.some_questions.sort(function(a, b){
          return new Date(a[order]) - new Date(b[order]);
        });
      }
    }
    function question_page(question,category){
      $state.go("question-page",{"category":category.id,"question":question.id});
    }
  });
// $scope.questions.sort(function(a, b) {
//   return a["title"] - b["title"];
// });
