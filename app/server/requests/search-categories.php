<?php
// Import Categories Class
session_start();

include_once("../classes/category.php");

// Receive request values
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$user_id = $request->id;

// Find Categories from db
if(isset($_SESSION["semester"]) AND !empty($_SESSION["semester"]) AND isset($_SESSION["user_id"]) AND isset($_SESSION["course"])){
  // Select only the categories of user semester and course
  $condition = 'semester <= :semester AND course = :course';
  // Request categories from DB
  request($condition);
}else{
  request();
}

function request($condition=1){
  $category = new Category();
  $categories = $category->select_categories($condition);
  
  echo json_encode($categories);
}

?>
