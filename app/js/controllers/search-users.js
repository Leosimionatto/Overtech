angular
  .module("fatec_system")
  .controller("users", function($scope,$uibModal,$interval,$timeout,$state,httpService){
    // My declarations
    $scope.users = [];
    $scope.search = [];
    $scope.some_users = [];
    $scope.current_users = [];
    // $scope.friends = [
    //   {"name":"Gilberto Giro Resende","course":"Análise e Desenvolvimento de Sistemas"},
    //   {"name":"Gabriel Giro Resende","course":"Análise e Desenvolvimento de Sistemas"},
    //   {"name":"Gustavo Giro Resende","course":"Gestão de Produção"},
    //   {"name":"Jeferson Mendes","course":"Gestão Ambiental"}
    // ];

    // My functions
    $scope.showMore = showMore;
    $scope.showLess = showLess;
    $scope.new_list = new_list;
    $scope.someUsers = someUsers;
    $scope.seeProfile = seeProfile;
    $scope.friendsList = friendsList;
    $scope.filterUsers = filterUsers;
    $scope.selectFriend = selectFriend;
    $scope.loadingContent = loadingContent;

    function loadingContent(){
      var config = 10000;
      $scope.loading = true;
      var startTime = new Date().getTime();
      var request = httpService.request("search-users.php");
      request
        .then(function(data){
          $timeout(function (){
            $scope.loading = undefined;
            $scope.users = data.data;
            someUsers($scope.users);
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
        });
    }
    function someUsers(users){
      if(users.length > 10){
        for(i=0;i<10;i++){
          $scope.some_users[i] = $scope.users[i];
        }
        $scope.cont = 10;
        $scope.current_users = $scope.some_users;
      }else{
        $scope.cont = $scope.users.length;
        $scope.some_users = $scope.users;
        $scope.current_users = $scope.some_users;
      }
    }
    function showMore(cont){
      $scope.some_users = $scope.current_users;
      var new_cont = cont + 10;
      for(i=cont;i<new_cont;i++){
        if($scope.some_users.length == $scope.users.length){
          break;
        }else{
          $scope.some_users[i] = $scope.users[i];
        }
      }
      $scope.cont = new_cont;
      $scope.current_users = $scope.some_users;
    }
    function showLess(){
      $scope.some_users = [];
      someUsers($scope.users);
    }
    function filterUsers(current_users,search){
      if(search == undefined){
        $scope.some_users = current_users;
      }else if(!search.name && !search.course){
        $scope.some_users = current_users;
      }else{
        $scope.some_users = $scope.users.filter(new_list);
      }
    }
    function new_list(user){
      var search = $scope.search;
      if(!search.name && !search.course){
        return user;
      }else if(!search.name){
        return user.course == search.course;
      }else if(!search.course){
        var test = user.name.toLowerCase();
        var test2 = search.name.toLowerCase();
        return test.startsWith(search.name);
      }else{
        var test = user.name.toLowerCase();
        var test2 = search.name.toLowerCase();
        return test.startsWith(test2) && user.course == search.course;
      }
    }
    function seeProfile(user){
      $state.go("user-profile",{"user_id":user.id});
    }
    function selectFriend(friend){
      $scope.selected_friend = friend;
    }
    function friendsList(){
      $scope.selected_friend = undefined;
    }
  });
