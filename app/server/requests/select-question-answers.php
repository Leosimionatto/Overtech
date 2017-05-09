<?php
// Include Answer Class
include_once("../classes/answer.php");

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;

$condition = "id_question = :id_question";

if(!empty($id)){
  $answer = new Answer();
  $params = array("id_question" => $id);
  $answers = $answer->select_all_answers($condition,$params);
  echo json_encode($answers);
}


?>
