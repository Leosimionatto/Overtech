<?php
// Include user class
include_once("../classes/user.php");

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$creation_date = date("Y-m-d");
$last_login = date("Y-m-d");

$params = array(
  "name" => $request->name,
  "email" => $request->email,
  "age" => $request->age,
  "password" => $request->password,
  "semester" => $request->semester,
  "course" => $request->course,
  "creation_date" => $creation_date,
  "last_login" => $last_login
);

if(!empty($params["name"]) AND !empty($params["email"]) AND !empty($params["age"]) AND !empty($params["password"]) AND !empty("course") AND !empty("semester")){
  if(filter_var($params["email"], FILTER_VALIDATE_EMAIL)){
    if(is_numeric($params["course"]) AND is_numeric($params["age"]) AND is_numeric($params["semester"])){
      register($params);
    }
  }else{
    header("HTTP/1.0 406 E-mail inválido!");
  }
}

// Instance user class
function register($params){
  $user = new User();
  $user->register_user($params);
}


?>
