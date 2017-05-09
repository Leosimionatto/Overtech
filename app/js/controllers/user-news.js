angular
  .module("fatec_system")
  .controller("userNews", function($scope,httpService,$cookies,$timeout,$state){
    // My declarations
    $scope.search = [];
    $scope.number = 10;
    $scope.new_question = [];
    $scope.some_questions = [];
    var user_id = $cookies.get("user_id");

    // My functions
    $scope.showLess = showLess;
    $scope.showMore = showMore;
    $scope.someQuestions = someQuestions;
    $scope.questions_news = questions_news;
    $scope.filterQuestions = filterQuestions;

    function questions_news(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("questions-news.php",{"id":user_id});
      request
        .then(function(data){
          $scope.loading = undefined;
          $scope.q_news = data.data;
          someQuestions($scope.q_news);
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
    function someQuestions(q_news){
      var number = $scope.number;
      if(q_news.length > number){
        for(var i=0;i<number;i++){
          $scope.some_questions[i] = q_news[i];
        }
        $scope.cont = i;
        $scope.current_questions = $scope.some_questions;
      }else{
        //Do nothing
        $scope.cont = q_news.length;
        $scope.some_questions = q_news;
        $scope.current_questions = q_news;
      }
    }
    function showLess(q_news){
      $scope.number = 10;
      $scope.some_questions = [];
      return $scope.someQuestions(q_news);
    }
    function showMore(cont){
      var number = $scope.number;
      if(cont <= 5){
        return $scope.someQuestions($scope.q_news);
      }else{
        // Apenas retornar os registros anteriores
        $scope.some_questions = $scope.current_questions;

        // Prosseguir com os prõximos registros
        var show_more = cont + 10;
        for(cont;cont<show_more;cont++){
          if(cont < $scope.q_news.length){
            $scope.some_questions[cont] = $scope.q_news[cont];
          }else if(cont == $scope.q_news.length){
            break;
          }
        }
      }
      $scope.cont = cont;
      $scope.number = number + cont;
      $scope.current_questions = $scope.some_questions;
    }
    function filterQuestions(some_questions){
      if($scope.search == undefined){
        $scope.some_questions = $scope.current_questions;
      }else if(!$scope.search.name){
        $scope.some_questions = $scope.current_questions;
      }else{
        $scope.some_questions = $scope.q_news.filter(filterTest);
      }
    }
    function filterTest(question){
      var search_name = $scope.search.name;

      search_name = search_name.toLowerCase();
      var test = question.title.toLowerCase();

      if(test.startsWith(search_name)){
        return question.title;
      }
    }
  });
