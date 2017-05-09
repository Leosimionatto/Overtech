<?php
session_start();

// Import Question and Answer Classes
include_once("../classes/question.php");
include_once("../classes/answer.php");


// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Params
$user       = $request->id;
$question   = $request->id_question;
$check_user = $request->creator;

if(isset($user) AND isset($question) AND isset($check_user)){
  if($check_user == $user AND $user == $_SESSION["user_id"]){
    // Instance Question class
    $questions = new Question();

    // Set params
    $condition = 'id = :id_question AND id_user = :id_user';
    $params = array(
      "id_question" => $question,
      "id_user"     => $user
    );
    $result = $questions->delete_question($condition,$params);
    if($result){
      // Instance Answer class
      $answer = new Answer();

      // Set condition and params
      $condition = "`id_question` = :id_question";
      $params = array(
        "id_question" => $question,
      );
      // Instance the answer class
      $delete = $answer->delete_answers($condition,$params);
      echo json_encode($delete);
    }
  }else{
    header("HTTP/1.0 401 Sem autorização para completar a ação!");
  }
}else{
  header("HTTP/1.0 406 Parâmetros inválidos!");
}

?>
