angular
  .module("fatec_system")
  .controller("checkUploads", function($scope,$state,$stateParams,$cookies,httpService,$timeout){
    // My declarations
    $scope.search = [];
    $scope.uploads = [];
    var category = $stateParams.id;
    $scope.category = category;
    var user_id = $cookies.get("user_id");

    // My functions
    $scope.showLess = showLess;
    $scope.showMore = showMore;
    $scope.findUploads = findUploads;
    $scope.someUploads = someUploads;
    $scope.sendArchives = sendArchives;
    $scope.filterUploads = filterUploads;
    $scope.check_category = check_category;

    function check_category(categories){
      if(!categories[category - 1]){
        $scope.statusText = true;
      }
    }
    function findUploads(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("select-all-uploads.php",{"id_category":category});
      request
        .then(function(data){
          $timeout(function(){
            $scope.loading = undefined;
            $scope.uploads = data.data;
            someUploads(data.data);
          }, 1000);
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
    function someUploads(uploads){
      var number = $scope.number;
      if(uploads.length > number){
        for(var i=0;i<number;i++){
          $scope.some_uploads[i] = uploads[i];
        }
        $scope.cont = i;
        $scope.current_uploads = $scope.some_uploads;
      }else{
        //Do nothing
        $scope.cont = uploads.length;
        $scope.some_uploads = uploads;
        $scope.current_uploads = uploads;
      }
    }
    function showLess(uploads){
      $scope.number = 10;
      $scope.some_uploads = [];
      return $scope.someUploads(uploads);
    }
    function showMore(cont){
      var number = $scope.number;
      if(cont <= 5){
        return $scope.someUploads($scope.uploads);
      }else{
        // Apenas retornar os registros anteriores
        $scope.some_uploads = $scope.current_uploads;

        // Prosseguir com os prõximos registros
        var show_more = cont + 10;
        for(cont;cont<show_more;cont++){
          if(cont < $scope.uploads.length){
            $scope.some_uploads[cont] = $scope.uploads[cont];
          }else if(cont == $scope.uploads.length){
            break;
          }
        }
      }
      $scope.cont = cont;
      $scope.number = number + cont;
      $scope.current_uploads = $scope.some_uploads;
    }
    function filterUploads(some_uploads){
      if($scope.search == undefined){
        $scope.some_uploads = $scope.current_uploads;
      }else if(!$scope.search.name){
        $scope.some_uploads = $scope.current_uploads;
      }else{
        $scope.some_uploads = $scope.uploads.filter(filterTest);
      }
    }
    function filterTest(upload){
      var search_name = $scope.search.name;

      // Lower all
      search_name = search_name.toLowerCase();
      var test = upload.name.toLowerCase();
      var test2 = upload.matter.toLowerCase();

      if(test.startsWith(search_name) || test2.startsWith(search_name)){
        return upload.name;
      }
      // Check if it's equal
    }
    function sendArchives(){
      $state.go("send-archives",{"id_category":category});
    }
  });
