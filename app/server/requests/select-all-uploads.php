<?php
// Import uploads Class
include_once("../classes/upload.php");

// Receive params
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$condition = "id_category = :id_category";

if(!empty($request->id_category)){
  $params = array(
    "id_category" => $request->id_category
  );
  $upload = new Upload();
  $uploads = $upload->select_all_uploads("*",$condition,$params);
  echo json_encode($uploads);
}else{
  header("HTTP/1.0 406 Parâmetros inválidos!");
}

?>
