<?php
include_once("db_connection.php");
include_once("sql_queries/queries.php");

class Answer{
  // My declarations
  private $conn;
  private $queries;
  private $table = "answers";

  function __construct(){
    // Connect with database
    $conn = new DB_Connection();
    $this->conn = $conn->Call_DB();

    // Set queries
    $this->queries = new Queries();
  }
  public function select_all_answers($condition,$params){
    $conn = $this->conn;
    try{
      $sql = $this->queries->select("*",$this->table,$condition);
      $queries = $conn->prepare($sql);
      isset($params["id_user"]) ? $queries->bindParam(':id_user',$params["id_user"],PDO::PARAM_INT) : false;
      isset($params["id_question"]) ? $queries->bindParam(':id_question',$params["id_question"],PDO::PARAM_INT) : false;
      $queries->execute();
      $result = $queries->fetchAll(PDO::FETCH_ASSOC);
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return $result;
  }
  function insert_answer($table_fields,$insert_values,$params){
    // Set DB Connection
    $conn = $this->conn;
    // Set query
    $sql = $this->queries->insert($table_fields,$insert_values,$this->table);
    try{
      $query = $conn->prepare($sql);
      $query->bindParam(':id_user',$params["id_user"],PDO::PARAM_INT);
      $query->bindParam(':id_question',$params["id_question"],PDO::PARAM_INT);
      $query->bindParam(':user_name',$params["user_name"],PDO::PARAM_STR);
      $query->bindParam(':answer',$params["answer"],PDO::PARAM_STR);
      $query->bindParam(':creation_date',$params["creation_date"]);
      $query->execute();
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
  }
  function update_answer($table_fields,$condition,$params){
    $conn = $this->conn;
    // Set the query
    $sql = $this->queries->update($table_fields,$this->table,$condition);
    try{
      $query = $conn->prepare($sql);
      $query->bindParam(':id',$params['id'],PDO::PARAM_INT);
      $query->bindParam(':id_user',$params['id_user'],PDO::PARAM_INT);
      $query->bindParam(':answer',$params['answer'],PDO::PARAM_STR);
      $query->execute();
      if($query){
        return true;
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return false;
  }
  function delete_answer($condition,$params){
    $conn = $this->conn;
    try{
      $sql = $this->queries->delete($this->table,$condition);
      $query = $conn->prepare($sql);
      $query->bindParam(':id',$params["id"],PDO::PARAM_INT);
      $query->bindParam(':id_user',$params["id_user"],PDO::PARAM_INT);
      $query->execute();
      if($query){
        return true;
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return false;
  }
  function delete_answers($condition,$params){
    //Pull connection with DB
    $conn = $this->conn;
    try{
      $sql = $this->queries->delete($this->table,$condition);
      $query = $conn->prepare($sql);
      $query->bindParam(':id_question',$params["id_question"],PDO::PARAM_INT);
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
