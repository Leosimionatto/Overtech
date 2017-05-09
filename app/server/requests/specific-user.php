<?php
//Import User Class
include_once("../classes/user.php");

// Fields
$fields = "`id`,`name`,`course`,`age`,`semester`,`email`,`creation_date`,`last_login`";

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;

if(isset($id)){
  $condition = "id = :id";
  $params = array("id" => $id);

  $user = new User();
  $user->find_specific_user($fields,$params,$condition);
}


?>
