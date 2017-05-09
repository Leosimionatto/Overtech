<?php
//Import User Class
include_once("../classes/category.php");

// Receive request params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$semester = $request->semester;
$id_course = $request->id_course;

$condition = "semester <= :semester AND course = :id_course";

if(!empty($id_course) AND !empty($semester)){
  if(is_numeric($id_course) AND is_numeric($semester)){
    $params = array(
      "id_course" => $id_course,
      "semester"  => $semester
    );
    $category = new Category();
    $categories = $category->select_categories($condition,"*",$params);
    echo json_encode($categories);
  }
}else{
  header("HTTP/1.0 406 Parâmetros inválidos!");
}

?>
