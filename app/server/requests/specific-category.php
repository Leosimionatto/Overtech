<?php
//Import User Class
include_once("../classes/category.php");

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;

if(isset($id)){
  $condition = " id = :id";
  $params = array("id" => $id);

  $user = new Category();
  $user->find_specific_category('*',$params,$condition);
}


?>
