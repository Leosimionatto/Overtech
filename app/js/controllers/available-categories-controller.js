angular
  .module("fatec_system")
  .controller("availableCategories", function($scope,$uibModal,$state,$timeout,$cookies,httpService){
    // My declarations
    $scope.search = [];
    $scope.number = 10;
    $scope.some_categories = [];

    // My funcions
    $scope.showLess = showLess;
    $scope.showMore = showMore;
    $scope.viewCategory = viewCategory;
    $scope.someCategories = someCategories;
    $scope.filterCategories = filterCategories;

    function someCategories(categories){
      var number = $scope.number;
      if(categories.length > number){
        for(var i=0;i<number;i++){
          $scope.some_categories[i] = categories[i];
        }
        $scope.cont = i;
        $scope.current_categories = $scope.some_categories;
      }else{
        //Do nothing
        $scope.cont = categories.length;
        $scope.some_categories = categories;
        $scope.current_categories = categories;
      }
    }
    function showLess(categories){
      $scope.number = 10;
      $scope.some_categories = [];
      return $scope.someCategories(categories);
    }
    function showMore(cont){
      var number = $scope.number;
      if(cont <= 5){
        return $scope.someCategories($scope.categories);
      }else{
        // Apenas retornar os registros anteriores
        $scope.some_categories = $scope.current_categories;

        // Prosseguir com os prõximos registros
        var show_more = cont + 10;
        for(cont;cont<show_more;cont++){
          if(cont < $scope.categories.length){
            $scope.some_categories[cont] = $scope.categories[cont];
          }else if(cont == $scope.categories.length){
            break;
          }
        }
      }
      $scope.cont = cont;
      $scope.number = number + cont;
      $scope.current_categories = $scope.some_categories;
    }
    function filterCategories(some_categories){
      if($scope.search == undefined){
        $scope.some_categories = $scope.current_categories;
      }else if(!$scope.search.name){
        $scope.some_categories = $scope.current_categories;
      }else{
        $scope.some_categories = $scope.categories.filter(filterTest);
      }
    }
    function filterTest(category){
      var search_name = $scope.search.name;

      // Lower all
      search_name = search_name.toLowerCase();
      var test = category.name.toLowerCase();

      if(test.startsWith(search_name)){
        return category.name;
      }
      // Check if it's equal
    }
    function viewCategory(category){
      $state.go("category-page",{category:category.id});
    }
  });
