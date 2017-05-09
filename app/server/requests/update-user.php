<?php

//Include User Class
include_once("../classes/user.php");

// Receive request values
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Set user fields
$user = array(
  "id"       => $request->id,
  "name"     => $request->name,
  "email"    => $request->email,
  "age"      => $request->age,
  "course"   => $request->course,
  "semester" => $request->semester
);
// Check if the params are standardized
if(!empty($user["name"]) AND !empty($user["email"]) AND !empty($user["age"]) AND !empty($user["semester"]) AND !empty($user["course"])){
  if(is_numeric($user["semester"]) AND is_numeric($user["age"]) AND is_numeric($user["course"])){
    if(filter_var($user["email"],FILTER_VALIDATE_EMAIL)){
      $condition = "id = :id";
      request($user,$condition);
    }else{
      header("HTTP/1.0 406 Os campos precisam ser preenchidos!");
    }
  }else{
    header("HTTP/1.0 406 Os campos precisam ser preenchidos!");
  }
}else{
  header("HTTP/1.0 406 Os campos precisam ser preenchidos!");
}

function request($params,$condition){
  $user = new User();
  $new_values = "`name` = :name,`email` = :email,`age` = :age,`semester` = :semester,`course` = :course";
  $user->update_user($params,$new_values,$condition);
  $_SESSION["semester"] = $params["semester"];
  $_SESSION["course"] = $params["course"];
}
?>
