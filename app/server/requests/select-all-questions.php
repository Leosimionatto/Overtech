<?php
session_start();

// Include Question Class
include_once("../classes/question.php");

// Receive category course value
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id_category     = $request->id;
$category_course = $request->course;

$condition = "id_category = :id_category";

// Check if
if(isset($_SESSION["semester"]) AND isset($_SESSION["course"]) AND !empty($id_category)){
  if($category_course == $_SESSION["course"]){
    $params = array(
      "id_category" => $id_category
    );
    $question = new Question();
    $questions = $question->find_all_questions("*",$condition,$params);
    echo json_encode($questions);
  }else{
    header("HTTP/1.0 401 Você não possui acesso a esta categoria!");
  }
}else{
  if(!empty($id_category) AND is_numeric($id_category)){
    // Set Params
    $params = array(
      "id_category" => $id_category
    );
    // Find category information
    $question = new Question();
    $questions = $question->find_all_questions("*",$condition,$params);
    echo json_encode($questions);
  }
}


?>
