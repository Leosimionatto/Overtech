<?php
// Include Answer Class
include_once("../classes/answer.php");
include_once("../classes/user.php");

// Receive request values
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$table_fields = "(`id_user`,`id_question`,`user_name`,`answer`,`creation_date`)";
$insert_values = "(:id_user,:id_question,:user_name,:answer,:creation_date)";

if(!empty($request->id_question) AND !empty($request->id_user) AND !empty($request->answer)){
  if(is_numeric($request->id_question) AND is_numeric($request->id_user)){
    // Find username
    $user_name = request_name($request->id_user);
    // Set answer values
    $params = array(
      "id_question"   => $request->id_question,
      "id_user"       => $request->id_user,
      "user_name"     => $user_name[0]["name"],
      "answer"        => $request->answer,
      "creation_date" => date('Y-m-d')
    );

    // Call the function to insert values
    $answer = new Answer();
    $answer->insert_answer($table_fields,$insert_values,$params);
  }
}else{
  header("HTTP/1.0 406 Parâmetros inválidos!");
}

function request_name($user){
  // Set params User class function
  $condition = "id = :id";
  $params["id"] = $user;

  // Find username on db
  $class = new User();
  return $class->find_specific_user("name",$params,$condition);
}

?>
