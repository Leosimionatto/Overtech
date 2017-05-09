<?php
session_start();

// Import uploads class
include_once("../classes/upload.php");

// Receive params from request
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Checking the params
if($request->id){
  // Set condition and params
  $condition = '`id_user` = :id_user';
  $params = array(
    "id_user" => $request->id
  );
  // Send request from server
  $upload = new Upload();
  $uploads = $upload->select_all_uploads('*',$condition,$params);
  echo json_encode($uploads);
}else{
  header("HTTP/1.0 400 Requisição ruim!");
}


?>
