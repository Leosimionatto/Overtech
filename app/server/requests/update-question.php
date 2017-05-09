<?php
session_start();

// Import Question Class
include_once("../classes/question.php");

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Set: Condition and fields
$condition = '`id` = :id_question';
$fields = "`title` = :title, `body` = :body";

if(isset($request->id) AND $request->id == $_SESSION["user_id"]){
  if(isset($request->id_question) AND isset($request->title) && isset($request->body)){
    $params = array(
      "id"    => $request->id_question,
      "title" => $request->title,
      "body"  => $request->body
    );
    $question = new Question();
    $result = $question->update_question($fields,$condition,$params);
  }else{
    header("HTTP/1.0 204 Parâmetros inválidos!");
  }
}else{
  header("HTTP/1.0 401 Não possui autorização para isso!");
}



?>
