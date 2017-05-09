<?php
// Import question class
include_once("../classes/question.php");
include_once("../classes/answer.php");

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(!empty($request->id) AND is_numeric($request->id)){
  // Set condition
  $condition = "id_user = :id_user";

  // Set params and fields
  $fields = "*";
  $params = array(
    "id_user" => $request->id
  );

  // Find questions in database
  $question = new Question();
  $questions = $question->find_all_questions($fields,$condition,$params);
  if(count($questions) > 0){
    // Set new condition
    $condition = "`id_user` = :id_user";

    // Select all answers
    $answer = new Answer();
    $answers = $answer->select_all_answers($condition,$params);

    // Prepare questions with new information
    $result = prepare_resolve($questions,$answers);

    // Return result
    echo json_encode($result);
  }
}

function prepare_resolve($questions,$answers){
  for($i = 0;$i < count($questions);$i++){
    $questions[$i]["answers"] = 0;
    for($j = 0;$j < count($answers);$j++){
      if($answers[$j]["id_question"] == $questions[$i]["id"]){
        $questions[$i]["answers"] = $questions[$i]["answers"] + 1;
      }
    }
  }
  return $questions;
}

?>
