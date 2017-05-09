<?php
// Include User Class
include_once("../classes/question.php");

// // Take the request values
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$condition = 'title LIKE ?';
$params = array("%" . $request->title . "%");

if(isset($request->title) AND !empty($request->title)){
  $question = new Question();
  $response = $question->check_question($params,$condition);
  echo json_encode($response);
}




?>
