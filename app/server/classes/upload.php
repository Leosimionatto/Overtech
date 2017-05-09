<?php

include_once("db_connection.php");
include_once("sql_queries/queries.php");

class Upload{
  private $conn;
  private $queries;
  private $table = "uploads";

  function __construct(){
    $conn = new DB_Connection();
    $this->conn = $conn->Call_DB();

    $this->queries = new Queries();
  }
  public function select_all_uploads($fields="*",$condition=1,$params){
    $conn = $this->conn;

    $sql = $this->queries->select($fields,$this->table,$condition);
    try{
      $query = $conn->prepare($sql);
      isset($params["id_category"]) ? $query->bindParam(":id_category",$params["id_category"],PDO::PARAM_INT) : false;
      isset($params["id_user"]) ? $query->bindParam(":id_user",$params["id_user"],PDO::PARAM_INT) : false;
      $query->execute();
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return $result;
  }
  public function upload_file($table_fields,$insert_fields,$params){
    // Set configuration
    $conn = $this->conn;

    // Set query
    $sql = $this->queries->insert($table_fields,$insert_fields,$this->table);
    try{
      $query = $conn->prepare($sql);
      $query->bindParam(':id_user',$params["id_user"],PDO::PARAM_INT);
      $query->bindParam(':id_category',$params["id_category"],PDO::PARAM_INT);
      $query->bindParam(':name',$params["file-name"],PDO::PARAM_STR);
      $query->bindParam(':matter',$params["matter"],PDO::PARAM_STR);
      $query->bindParam(':type',$params["type"],PDO::PARAM_STR);
      $query->bindParam(':path',$params["file-path"],PDO::PARAM_STR);
      $query->bindParam(':creation_date',$params["creation_date"]);
      $query->execute();
      if($query){
        return true;
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return false;
  }
}




?>
