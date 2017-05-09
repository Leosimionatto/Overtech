<?php
// PHP Imports
include_once("db_connection.php");
include_once("sql_queries/queries.php");

class Category{
  // My declarations
  private $conn;
  private $queries;
  private $table = "categories";

  function __construct(){
    // Connection with DB
    $conn = new DB_Connection();
    $this->conn = $conn->Call_DB();

    // Set queries
    $this->queries = new Queries();
  }
  function select_categories($condition=1,$fields="*",$params=""){
    $conn = $this->conn;
    $sql = $this->queries->select("*",$this->table,$condition);
    try{
      $query = $conn->prepare($sql);
      isset($_SESSION["semester"]) ? $query->bindParam(':semester',$_SESSION["semester"],PDO::PARAM_INT) : false;
      isset($_SESSION["course"]) ? $query->bindParam(':course',$_SESSION["course"],PDO::PARAM_INT) : false;
      isset($params["semester"]) ? $query->bindParam(':semester',$params["semester"],PDO::PARAM_INT) : false;
      isset($params["id_course"]) ? $query->bindParam(':id_course',$params["id_course"],PDO::PARAM_INT) : false;
      $query->execute();
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      return $result;
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
  }
  function find_specific_category($fields='*',$params,$condition=1){
    // Connect with DB
    $conn = $this -> conn;

    // Construct the query to BD
    try{
      $sql = $this -> queries -> select($fields,$this->table,$condition);
      $query = $conn -> prepare($sql);
      isset($params["id"]) ? $query -> bindParam(':id',$params["id"],PDO::PARAM_INT) : false;
      $query -> execute();
      $result = $query -> fetchAll(PDO::FETCH_ASSOC);
      if(count($result) > 0){
        echo json_encode($result);
      }else{
        header("HTTP/1.0 204 Nenhum registro encontrado!");
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return $result;
  }
}




?>
