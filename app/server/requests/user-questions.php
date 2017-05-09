<?php
session_start();

// Import User class
include_once("../classes/question.php");

// Receive request values
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(isset($request->id) AND isset($_SESSION["user_id"])){
  if($request->id == $_SESSION["user_id"]){
    // Set condition
    $condition = "`id_user` = :id_user";

    // Set params
    $params = array(
      "id_user" => $request->id
    );

    $question = new Question();
    $result = $question->find_all_questions("*",$condition,$params);
    echo json_encode($result);
  }else{
    header("HTTP/1.0 503 Erro ao realizar a query!");
  }
}else{
  header("HTTP/1.0 503 Erro ao realizar a query!");
}





?>
