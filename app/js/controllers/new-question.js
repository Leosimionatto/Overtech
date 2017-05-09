angular
  .module("fatec_system")
  .controller("newQuestion", function($scope,httpService,$cookies,$timeout,$state){
    // My declarations
    $scope.level_1 = true;
    $scope.level_2 = false;
    $scope.level_3 = false;
    $scope.question = {};
    var user_id = $cookies.get("user_id");
    $scope.disclosures = [
      {"disclosure":"Feed de notícias"},
      {"disclosure":"Página do facebook"},
      {"disclosure":"Sem divulgação"}
    ];

    // My functions
    $scope.step_1 = step_1;
    $scope.step_2 = step_2;
    $scope.step_3 = step_3;
    $scope.load_content = load_content;
    $scope.insert_question = insert_question;
    $scope.verify_question = verify_question;

    function load_content(){
      if(!user_id){
        $scope.loading = true;
        $timeout(function(){
          $scope.load = true;
          $scope.loading = undefined;
        },1000);
      }else{
        var config = 10000;
        $scope.loading = true;
        var startTime = new Date().getTime();
        var request = httpService.request("specific-user.php",{"id":user_id});
        request
          .then(function(data){
            $scope.loading = undefined;
            if(data.status == 204){
              $scope.statusText = true;
            }else{
              $scope.your_information = data.data;
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
    }
    function verify_question(question, cb){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("check-question.php",{"title":question.title});
      request
        .then(function(data){
          $scope.loading = undefined;

          if(data.data == 'true'){
            return cb(true);
          }else{
            return cb(false);
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
    function insert_question(question){
      if(question != undefined){
        if(question.title && question.body && question.category){
          var config = 10000;
          $scope.loading = true;
          var startTime = new Date().getTime();
          var request = httpService.request("insert-question.php",{"id_user":user_id,"title":question.title,"body":question.body,"id_category":question.category});
          request
            .then(function(data){
              $scope.loading = undefined;
              $scope.success_create = true;
              $timeout(function(){
                questionPage(question);
              },2000);
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
      }
    }
    function step_1(){
      if($scope.level_1){
        //Do nothing
      }else{
        $scope.level_1 = true;
        $scope.level_2 = false;
        $scope.level_3 = false;
      }
    }
    function step_2(question){
      if($scope.level_2){
        //Do nothing
      }else{
        if(!question){
          $scope.empty_fields = true;
          $timeout(function(){
            $scope.empty_fields = false;
          },4000);
        }else{
          if(!user_id){
            $scope.unlogged = true;
            $timeout(function () {
              $scope.unlogged = undefined;
            }, 4000);
          }else{
            if(!question.title || !question.body){
              $scope.empty_fields = true;
              $timeout(function(){
                $scope.empty_fields = false;
              },4000);
            }else{
              verify_question(question, function(condition){
                if(condition){
                  $scope.level_1 = false;
                  $scope.level_2 = true;
                  $scope.level_3 = false;
                }else{
                  $scope.exists_question = true;
                  $timeout(function(){
                    $scope.exists_question = undefined;
                  },2500);
                }
              });
            }
          }
        }
      }
    }
    function step_3(question){
      if($scope.level_3){
        //Do nothing
      }else{
        if(question == undefined){
          $scope.empty_fields = true;
          $timeout(function(){
            $scope.empty_fields = false;
          },4000);
        }else{
          if(!question.title || !question.body || !question.category){
            $scope.empty_fields = true;
            $timeout(function(){
              $scope.empty_fields = false;
            },4000);
          }else{
            verify_question(question, function(condition){
              if(condition){
                $scope.level_1 = false;
                $scope.level_2 = false;
                $scope.level_3 = true;
              }else{
                $scope.exists_question = true;
                $timeout(function(){
                  $scope.exists_question = undefined;
                },2500);
              }
            });
          }
        }
      }
    }
    function questionPage(question){
      var config = 10000;
      var startTime = new Date().getTime();
      var request = httpService.request("specific-question.php",{"title":question.title,"id_category":question.category});
      request
        .then(function(data){
          $state.go("question-page",{'category':question.category,'question':data.data[0].id});
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
  });
