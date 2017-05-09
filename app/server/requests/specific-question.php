<?php
//Import User Class
include_once("../classes/question.php");

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(!empty($request->id)){
  $id = $request->id;
  $fields = '*';
  $condition = " id = :id AND id_category = :id_category";
  $params = array(
    "id" => $id,
  );
}else{
  $title = $request->title;
  $fields = '`id`';
  $condition = " title = :title AND id_category = :id_category";
  $params = array(
    "title" => $title,
  );
}

if(!empty($request->id_category)){
  $id_category = $request->id_category;

  // Set id category in params
  $params["id_category"] = $id_category;

  $question = new Question();
  $result = $question->find_specific_question($fields,$condition,$params);
  echo json_encode($result);
}else{
  header("HTTP/1.0 406 Parametros incorretos!");
}

?>
