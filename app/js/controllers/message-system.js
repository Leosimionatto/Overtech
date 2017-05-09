angular
  .module("fatec_system")
  .controller("messageSystem", function($scope){
    $scope.friendsList  = friendsList;
    $scope.selectFriend = selectFriend;
    $scope.friends = [
      {"name":"Gilberto Giro Resende","course":"Análise e Desenvolvimento de Sistemas"},
      {"name":"Gabriel Giro Resende","course":"Análise e Desenvolvimento de Sistemas"},
      {"name":"Gustavo Giro Resende","course":"Gestão de Produção"},
      {"name":"Jeferson Mendes","course":"Gestão Ambiental"}
    ];
    function selectFriend(friend){
      $scope.selected_friend = friend;
    }
    function friendsList(){
      $scope.selected_friend = undefined;
    }
  });
