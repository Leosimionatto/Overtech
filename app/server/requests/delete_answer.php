<?php
session_start();

// Import Answer class
include_once("../classes/answer.php");

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Checking the information
if($request->id_user == $_SESSION["user_id"]){
  // Instance the class
  $answer = new Answer();

  // Set condition and params
  $condition = "`id` = :id AND `id_user` = :id_user";
  $params = array(
    "id"      => $request->id,
    "id_user" => $request->id_user,
  );

  $result = $answer->delete_answer($condition,$params);
  if($result){
    echo json_encode($result);
  }else{
    header("HTTP/1.0 503 Erro ao realizar a query!");
  }
}else{
  header("HTTP/1.0 401 Sem altorização!");
}


?>
