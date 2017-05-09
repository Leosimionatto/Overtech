<?php
// Include Answer Class
include_once("../classes/question.php");
include_once("../classes/user.php");

// Receive request values
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$table_fields = "(`id_category`,`id_user`,`user_name`,`title`,`body`,`image_path`,`creation_date`)";
$insert_values = "(:id_category,:id_user,:user_name,:title,:body,:image_path,:creation_date)";

if(!empty($request->id_user) AND !empty($request->id_category) AND !empty($request->title) AND !empty($request->body)){
  if(is_numeric($request->id_category) AND is_numeric($request->id_user)){
    // Find username
    $user_name = request_name($request->id_user);

    // Set answer values
    $params = array(
      "id_category"   => $request->id_category,
      "id_user"       => $request->id_user,
      "user_name"     => $user_name[0]["name"],
      "title"         => $request->title,
      "body"          => $request->body,
      "image_path"    => $request->archive,
      "creation_date" => date('Y-m-d')
    );
    // Call the function to insert values
    $answer = new Question();
    $answer->insert_question($table_fields,$insert_values,$params);
  }
}


function request_name($user){
  // Set params User class function
  $condition = "id = :id";
  $params["id"] = $user;

  // Find username on db
  $class = new User();
  return $class->find_specific_user("name",$params,$condition);
}


?>
