<?php
// Import the class for connection
include_once("db_connection.php");
include_once("sql_queries/queries.php");

class Question{
  private $conn;
  private $queries;
  private $table = 'questions';

  function __construct(){
    $this -> queries = new Queries();
    $conn = new DB_Connection();

    $this->conn = $conn->Call_DB();

  }
  function insert_question($table_fields,$insert_values,$fields){
    //Pull connection with DB
    $conn = $this->conn;

    //Query for insert question
    $sql = $this->queries->insert($table_fields,$insert_values,$this->table);
    echo $sql;
    try{
      $query = $conn->prepare($sql);
      $query->bindParam(':id_category',$fields["id_category"],PDO::PARAM_INT);
      $query->bindParam(':id_user',$fields["id_user"],PDO::PARAM_INT);
      $query->bindParam(':user_name',$fields["user_name"],PDO::PARAM_STR);
      $query->bindParam(':title',$fields["title"],PDO::PARAM_STR);
      $query->bindParam(':body',$fields["body"],PDO::PARAM_STR);
      $query->bindParam(':image_path',$fields["image_path"],PDO::PARAM_STR);
      $query->bindParam(':creation_date',$fields["creation_date"]);
      $query->execute();
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
  }
  function find_specific_question($fields="*",$condition,$params){
    //Pull connection with DB
    $conn = $this -> conn;

    //Query for find a specific question
    try{
      $sql = $this->queries->select($fields,$this->table,$condition);
      $query = $conn->prepare($sql);
      // Check the passed params by user
      isset($params['id']) ? $query -> bindParam(':id',$params['id'],PDO::PARAM_INT) : false; //Do nothing
      isset($params['title']) ? $query -> bindParam(':title',$params['title'],PDO::PARAM_STR) : false; //Do nothing
      isset($params['id_category']) ? $query -> bindParam(':id_category',$params['id_category'],PDO::PARAM_INT) : false; //Do nothing
      isset($params['id_user']) ? $query -> bindParam(':id_user',$params['id_user'],PDO::PARAM_INT) : false; //Do nothing
      isset($params['creation_date']) ? $query -> bindParam(':creation_date',$params['creation_date']) : false; //Do nothing
      $query -> execute();
      $result = $query -> fetchAll(PDO::FETCH_ASSOC);
      if(count($result) == 0){
        header("HTTP/1.0 204 Nenhum registro encontrado!");
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return $result;
  }
  function find_all_questions($fields="*",$condition=1,$params){
    // Pull connection with DB
    $conn = $this->conn;
    // Query for find all questions
    $sql = $this->queries->select($fields,$this->table,$condition);
    try{
      $query = $conn->prepare($sql);
      isset($params["id_user"]) ? $query->bindParam(':id_user',$params["id_user"],PDO::PARAM_INT) : false;
      isset($params["id_category"]) ? $query->bindParam(':id_category',$params["id_category"],PDO::PARAM_INT) : false;
      $query->execute();
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return $result;
  }
  function check_archive($archive){
    // Some code to valid the archive
  }
  function check_question($params,$condition){
    //Pull connection with DB
    $conn = $this->conn;
    //Query for find a specific question
    try{
      $sql = $this->queries->select("*",$this->table,$condition);
      $query = $conn->prepare($sql);
      $query->execute($params);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if(count($result) > 0){
        return false;
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return true;
  }
  function update_question($fields,$condition,$params){
    // Set connection
    $conn = $this->conn;

    try{
      $sql = $this->queries->update($fields,$this->table,$condition);
      $query = $conn->prepare($sql);
      $query->bindParam(':id_question',$params["id"],PDO::PARAM_INT);
      $query->bindParam(':title',$params["title"],PDO::PARAM_STR);
      $query->bindParam(':body',$params["body"],PDO::PARAM_STR);
      $query->execute();
      if($query){
        return true;
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return false;
  }
  function delete_question($condition,$params){
    //Pull connection with DB
    $conn = $this->conn;
    try{
      $sql = $this->queries->delete($this->table,$condition);
      $query = $conn->prepare($sql);
      $query->bindParam(':id_question',$params["id_question"],PDO::PARAM_INT);
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
}
// A tabela das questões terá os seguintes campos(por enquanto): id_question, id_category, id_user, title, body, creation_date
?>
