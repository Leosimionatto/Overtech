<?php
// Include User Class
include_once("../classes/user.php");

// Take the request values
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Request information from server
$fields = array(
  "email" => $request->email,
  "password" => $request->password
);

// Check user passed information
if(!empty($fields["email"]) AND !empty($fields["password"])){
  if(filter_var($fields["email"], FILTER_VALIDATE_EMAIL)){
    login($fields);
  }
}

function login($fields){
  $user = new User();
  $user->user_login($fields);
}


?>
